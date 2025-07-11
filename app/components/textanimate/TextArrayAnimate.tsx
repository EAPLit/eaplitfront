"use client"
import { useState, useEffect } from 'react';

interface TextArrayAnimateProps {
    texts: string[];
    speed?: number; // Speed in milliseconds
    className?: string;
    animate?: boolean; // Optional prop to control animation
    orientation?: 'horizontal' | 'vertical'; // Optional prop to control orientation
    maxLines?: number; // Optional prop to limit the number of lines displayed
}

const TextArrayAnimate: React.FC<TextArrayAnimateProps> = ({ texts, speed = 100, className, animate = true, orientation = 'vertical', maxLines = 10,  }) => {
    const [displayedText, setDisplayedText] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [orientationStyle, setOrientationStyle] = useState<string>('');

    // Effect to animate text
    useEffect(() => {
        
        if (orientation === 'horizontal') {
            setOrientationStyle('flex-row');
        } else if (orientation === 'vertical') {
            setOrientationStyle('flex-col');
        } else {
            setOrientationStyle('flex-row'); // Default to horizontal if invalid value
        }


        if (!animate || texts.length === 0) {
            setDisplayedText(texts);
            setCurrentIndex(texts.length);
            return;
        }

        if (currentIndex < texts.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => [...prev, texts[currentIndex]]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, texts, speed]);

    return (
        <span className={`{className} flex ${orientationStyle} overflow-hidden whitespace-nowrap`}>
            {/* Display the text array with a maximum number of lines */}
            {displayedText.slice(0, maxLines).map((text, index) => (
                <div key={index}>
                    <span>{text}</span>
                </div>
            ))}
            {/* If there are more texts than maxLines, show a "..." at the end */}
            {displayedText.length > maxLines && (
                <span>...</span>
            )}
        </span>
    );
};

export default TextArrayAnimate;