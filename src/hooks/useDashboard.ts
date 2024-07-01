import { SleepData, SleepUser } from "@prisma/client";
import { create } from "zustand";


interface DashbarState {
    activePath?: string;
}

interface DashbarStore {
    currentState: DashbarState | null;
    userData: SleepUser & {
        sleepData: SleepData[];
    } | null;
    isActive: boolean;
    setActive: (currentState: DashbarState, userData: SleepUser & {sleepData: SleepData[]}) => void;
    onInactive: () => void;
}

export const useDashbar = create<DashbarStore>((set) => ({
    currentState: null,
    userData: null,
    isActive: false,
    setActive: (currentState, userData) => set({ currentState, userData, isActive: true }),
    onInactive: () => set({ currentState: null, userData: null, isActive: false })
}));