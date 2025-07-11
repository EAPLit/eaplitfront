"use client"
// Creates a card with a large title that, when clicked, will flip over to reveal information behind it.

import { useState, useEffect } from 'react';
import "../styles/flipcard.scss";

type FlipCardProps = {
    title: string;
    listAndDetails: {
        item: string;
        description: string;
    }[];
}

const FlipCard: React.FC<FlipCardProps> = ({ title, listAndDetails }) => {

    const [showFront, setShowFront] = useState(true);

    return (
        <div className="flipcard-container" onClick={() => setShowFront(!showFront)}>
            <div className={`flipcard-inner ${showFront ? '' : 'flipped'}`}>
                {/* Front of the card */}
                <div className="flipcard-front">
                    <div className="flipcard-header">
                        <div className="flipcard-title">
                            {title}
                        </div>
                        <div className="flipcard-title-underline">

                        </div>
                    </div>
                    <div className="flipcard-body">

                    </div>
                    <div className="flipcard-footer">

                    </div>
                </div>
                {/* Back of the card */}
                <div className="flipcard-back">
                    <p>I'm the back, can you believe it?</p>
                </div>
            </div>
            
        </div>
    )
}

export default FlipCard;