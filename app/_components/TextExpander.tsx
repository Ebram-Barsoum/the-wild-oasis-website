"use client";
import { useState } from "react";

interface TextExpanderProps {
    text: string;
}

export default function TextExpander({ text }: TextExpanderProps): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedText = isExpanded ? text : text.split(" ").slice(0, 40).join(" ");

    return (
        <p className="text-base sm:text-lg">
            {displayedText}
            <button onClick={() => setIsExpanded(!isExpanded)} className="ml-2 text-primary-600 text-sm p-0 border-b border-primary-600">
                {isExpanded ? 'Show less' : 'Show more'}
            </button>
        </p>
    );
}
