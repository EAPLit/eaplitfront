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

    const [showFront, setShowFront] = useState<boolean>(true);
    const [description, setDescription] = useState<string>("");
    const [item, setItem] = useState<string>("");

    return (
        <div className="flipcard-container">
            <div className={`flipcard-inner ${showFront ? '' : 'flipped'}`}>
                {/* Front of the card */}
                <div className="flipcard-front" onClick={() => setShowFront(!showFront)}>
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
                    <div className="flipcard-close" 
                        onClick={() => {
                            setDescription(""); 
                            setItem(""); 
                            setTimeout(() => {
                             setShowFront(prev => !prev);
                            }, 500);
                        }}
                    >X
                    </div>
                    <div className="flipcard-items">
                        {
                            listAndDetails.map((item, index) => (
                                <div className="flipcard-item" key={index}>
                                    <h3 onMouseEnter={()=>{
                                        setDescription(item.description);
                                        setItem(item.item)}}
                                    >
                                        {item.item}
                                    </h3>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`flipcard-description ${description === "" ? '' : 'animate'}`}>
                        <p onClick={()=>{
                            setDescription(""); 
                            setItem("")}}
                        >
                            X
                        </p>
                        <p>{item}</p>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlipCard;