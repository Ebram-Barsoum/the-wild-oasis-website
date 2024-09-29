"use client";
import { MouseEventHandler, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    pendingLabel?: string
}

export default function SubmitButton({ children, className, onClick, pendingLabel }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            className={`${className}`}
            onClick={onClick}
            disabled={pending}
            type="submit"
        >
            {pending ? pendingLabel : children}
        </button>
    );
}
