"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

export const ImageComponent = (props: {
	image: Omit<ImageProps, "width" | "height" | "alt"> & {
		width: number;
		height: number;
		alt: string;
	};
	className?: string;
}) => {
	const [loading, setLoading] = useState(true);
	const { image, className } = props;
	const { onLoad, className: imageClassName, ...imageProps } = image;

	return (
		<div className="relative w-full flex items-center justify-center">
			{loading && (
				<Skeleton
					size={{
						width: image.width,
						height: image.height,
					}}
				/>
			)}
			<Image
				{...imageProps}
				className={cn(imageClassName, className)}
				alt={image.alt}
				onLoad={(event) => {
					setLoading(false);
					onLoad?.(event);
				}}
			/>
		</div>
	);
};
