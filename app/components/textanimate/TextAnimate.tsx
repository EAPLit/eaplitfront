"use client"

import { useState, useEffect } from 'react';

interface TextAnimateProps {
    text: string;
    speed?: number; // Speed in milliseconds
    className?: string;
    animate?: boolean; // Optional prop to control animation
}

const TextAnimate: React.FC<TextAnimateProps> = ({ text, speed = 100, className, animate=true }) => {
    const [displayedText, setDisplayedText] = useState<string>("");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Effect to animate text
    useEffect(() => {
        if(!animate || text.length === 0) {
            setDisplayedText(text);
            setCurrentIndex(text.length);
            return;
        }
        
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