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

    return (
        <div className="flipcard-container">
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
    )
}

export default FlipCard;