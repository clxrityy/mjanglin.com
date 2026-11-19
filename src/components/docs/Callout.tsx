import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
	HiOutlineExclamation,
	HiOutlineInformationCircle,
	HiOutlineLightBulb,
	HiOutlineXCircle,
} from "react-icons/hi";

const VARIANTS = {
	note: { icon: HiOutlineInformationCircle, label: "Note" },
	tip: { icon: HiOutlineLightBulb, label: "Tip" },
	warning: { icon: HiOutlineExclamation, label: "Warning" },
	danger: { icon: HiOutlineXCircle, label: "Important" },
} satisfies Record<string, { icon: IconType; label: string }>;

type Props = {
	type?: keyof typeof VARIANTS;
	/** Defaults to the variant's label; pass `false` to hide the title row. */
	title?: ReactNode | false;
	children: ReactNode;
};

export function Callout({ type = "note", title, children }: Readonly<Props>) {
	const { icon: Icon, label } = VARIANTS[type];

	return (
		<aside className="callout" data-type={type}>
			{title !== false && (
				<p className="callout-title">
					<Icon aria-hidden size={18} />
					<span>{title ?? label}</span>
				</p>
			)}
			<div className="callout-body">{children}</div>
		</aside>
	);
}
