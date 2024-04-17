"use client";

import {  ComponentPropsWithRef } from "react";
import { Button as Btn, ButtonProps } from "@nextui-org/react";

type Props = ButtonProps & ComponentPropsWithRef<"button">;

export default function Button({ children, ...props }: Props) {
    return <Btn {...props}>{children}</Btn>;
}