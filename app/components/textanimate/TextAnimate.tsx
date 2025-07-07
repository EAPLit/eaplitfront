"use client"

import { useState, useEffect } from 'react';

interface TextAnimateProps {
    text: string;
    speed?: number; // Speed in milliseconds
    className?: string;
}

const TextAnimate: React.FC<TextAnimateProps> = ({ text, speed = 100, className }) => {
    const [displayedText, setDisplayedText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Effect to animate text
    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, text, speed]);

    return (
        <span className={className}>
            {displayedText}
        </span>
    );
};

export default TextAnimate;