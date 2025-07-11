"use client"
// Creates a card with a large title that, when clicked, will flip over to reveal information behind it.

import { useState, useEffect } from 'react';

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

                </div>
            </div>
            
        </div>
    )
}

export default FlipCard;