"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { shuffleArray } from "@/utils/randomize";

export type Slot<T> = {
	current: T;
	/** The item fading out of this slot, if a swap is in progress. */
	previous: T | null;
	/** Bumped on every swap so the incoming layer re-mounts and animates. */
	version: number;
};

type Options<T> = {
	slots: number;
	startDelayMs: number;
	intervalMs: number;
	transitionMs: number;
	/** How many times every item should be shown before auto-rotation stops. */
	passes: number;
	/** True while the viewer is actually watching (tab visible, on screen, not hovered). */
	active: boolean;
	/** Disables auto-rotation entirely (e.g. prefers-reduced-motion). */
	disabled: boolean;
	/** Resolves once the item's assets are ready, so swaps never show a blank tile. */
	preload?: (item: T) => Promise<void>;
};

/**
 * Deals items into a fixed number of slots and swaps them one slot at a time.
 *
 * - The initial slots come straight from `items` so server and client render the same markup.
 * - The waiting deck is shuffled on the client only (it isn't rendered).
 * - An item is never visible in two slots at once; swapped-out items go to the back of the deck.
 */
export function useRotatingDeck<T>(items: T[], options: Options<T>) {
	const {
		slots: slotCount,
		startDelayMs,
		intervalMs,
		transitionMs,
		passes,
		active,
		disabled,
		preload,
	} = options;

	const visibleCount = Math.min(slotCount, items.length);

	const [slots, setSlots] = useState<Slot<T>[]>(() =>
		items
			.slice(0, visibleCount)
			.map((current) => ({ current, previous: null, version: 0 })),
	);

	const slotsRef = useRef(slots);
	slotsRef.current = slots;

	const deck = useRef<T[]>(items.slice(visibleCount));
	const slotOrder = useRef<number[]>([]);
	const started = useRef(false);
	const busy = useRef(false);

	// Swaps needed so every item has been on screen `passes` times.
	const totalSwaps = Math.max(0, items.length * passes - visibleCount);
	const [swapsLeft, setSwapsLeft] = useState(totalSwaps);
	// Re-arms the timer even when a swap was skipped (e.g. a manual shuffle was mid-flight).
	const [tick, setTick] = useState(0);

	useEffect(() => {
		deck.current = shuffleArray(deck.current);
	}, []);

	const nextSlotIndex = useCallback(() => {
		if (slotOrder.current.length === 0) {
			slotOrder.current = shuffleArray(
				Array.from({ length: visibleCount }, (_, i) => i),
			);
		}
		return slotOrder.current.shift() ?? 0;
	}, [visibleCount]);

	const swap = useCallback(
		async (slotIndices: number[]) => {
			if (busy.current || deck.current.length === 0) return false;
			busy.current = true;

			const incoming = slotIndices
				.slice(0, deck.current.length)
				.map((slot) => ({ slot, item: deck.current.shift() as T }));

			try {
				if (preload) {
					await Promise.all(incoming.map(({ item }) => preload(item)));
				}
			} catch {
				// A failed preload shouldn't block rotation.
			}

			// Outgoing items return to the deck here, not inside the updater
			// (StrictMode runs updaters twice, which would duplicate them).
			for (const { slot } of incoming) {
				deck.current.push(slotsRef.current[slot].current);
			}

			setSlots((prev) => {
				const next = [...prev];
				for (const { slot, item } of incoming) {
					next[slot] = {
						current: item,
						previous: prev[slot].current,
						version: prev[slot].version + 1,
					};
				}
				return next;
			});

			busy.current = false;
			return incoming.length > 0;
		},
		[preload],
	);

	/** Clears the outgoing layer once its exit animation has finished. */
	const settle = useCallback((slotIndex: number, version: number) => {
		setSlots((prev) => {
			const slot = prev[slotIndex];
			if (!slot || slot.version !== version || slot.previous === null) {
				return prev;
			}
			const next = [...prev];
			next[slotIndex] = { ...slot, previous: null };
			return next;
		});
	}, []);

	// Safety net in case an animationend event never fires.
	useEffect(() => {
		const pending = slots
			.map((slot, index) => ({ slot, index }))
			.filter(({ slot }) => slot.previous !== null);
		if (pending.length === 0) return;
		const timer = window.setTimeout(() => {
			for (const { slot, index } of pending) settle(index, slot.version);
		}, transitionMs + 200);
		return () => window.clearTimeout(timer);
	}, [slots, settle, transitionMs]);

	const rotating = !disabled && swapsLeft > 0;

	// Auto-rotation: wait out the start delay once, then swap one tile per interval.
	// biome-ignore lint/correctness/useExhaustiveDependencies: `tick` re-arms the timer after each swap attempt
	useEffect(() => {
		if (!rotating || !active) return;

		let cancelled = false;
		const delay = started.current ? intervalMs : startDelayMs;

		const timer = window.setTimeout(async () => {
			started.current = true;
			const swapped = await swap([nextSlotIndex()]);
			if (cancelled) return;
			if (swapped) setSwapsLeft((n) => n - 1);
			setTick((n) => n + 1);
		}, delay);

		return () => {
			cancelled = true;
			window.clearTimeout(timer);
		};
	}, [rotating, active, tick, startDelayMs, intervalMs, swap, nextSlotIndex]);

	/** Manually swaps every slot (used by the shuffle button). */
	const shuffleAll = useCallback(() => {
		void swap(Array.from({ length: visibleCount }, (_, i) => i));
	}, [swap, visibleCount]);

	return {
		slots,
		settle,
		shuffleAll,
		rotating,
		canShuffle: items.length > visibleCount,
	};
}
