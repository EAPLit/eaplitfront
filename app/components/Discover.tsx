"use client"
/**
 * Discover Component
 * This component allows the users to discover the descriptions of various genres.
 * It displays a title and a list of genres. When a genre is clicked, its description is shown.
 * The component can be expanded or collapsed by clicking on the title.
 */

import { useState } from 'react';

type DiscoverItem = {
    genre: string;
    description: string;
}

type DiscoverProps = {
    title: string;
    toDiscover: DiscoverItem[];
}

const Discover: React.FC<DiscoverProps> = ({ title, toDiscover }) => {
    const [discovered, setDiscovered] = useState<boolean>(false);
    const [currentDescription, setCurrentDescription] = useState<string>("");

    console.log("Discover Component Rendered with title:", title, "and items:", toDiscover);
    
    return (
        <>
            <div className="discover-container">
                {discovered 
                    ? (
                        <>
                            <div
                                className="discover-content"
                            >
                                <div
                                    className="discover-content-header"
                                    onClick={() => {setDiscovered(false); setCurrentDescription("")} }
                                >
                                    <h2 className="discover-title">{title}</h2>
                                    <span className="discover-close">X</span>
                                </div>
                                {toDiscover.map((item, index) => (
                                    <div key={index} className="discover-item">
                                        <h3
                                            className="discover-item-title"
                                            onClick={()=>setCurrentDescription(item.description)}
                                        >
                                            {item.genre}
                                        </h3>
                                    </div>
                                ))}
                            </div>
                            <div className="discover-description">
                                {currentDescription}
                            </div>
                        </>
                        
                    ) 
                    : (
                        <div 
                            className="discover-title"
                            onClick={() => setDiscovered(true)}
                        >
                            {title}
                        </div>
                    )
                
                }
            </div>
        </>
    )
}

export default Discover;