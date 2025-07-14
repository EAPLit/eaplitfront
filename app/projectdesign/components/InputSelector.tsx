"use client"

import { useState, useEffect } from 'react';
import './styles/inputselector.scss';

import Draggable from '@/app/components/dragndrop/draggable';
import CircleDroppable from '@/app/components/dragndrop/circleDroppagle';

type ActivityType = {
    id: number;
    type: string;
}

const InputSelector = ({  }) => {

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, id: number, draggableData: ActivityType) => {
        console.log("I am now dragging a draggable with id: ", id);
        const target = e.target as HTMLDivElement;

        // Set the data to be transferred by the drag and drop
        e.dataTransfer.setData('targetId', id.toString());
        e.dataTransfer.setData('activityData', JSON.stringify(draggableData));

        // Pass the parent node classname to allow us to track
        // whether the draggable is coming OUT of a droppable or not
    }

    const handleDrop = () => {

    }

    const handleDeleteDraggable = () => {

    }

    return (
        <div className="input-selector-container">
            <section className="activity-selector-area">
                {
                    [0, 1, 2, 3, 4].map((j, i) => (
                        <Draggable
                            id={j}
                            onDragStart={handleOnDragStart}
                            onDelete={handleDeleteDraggable}
                            draggableData={{id:j, type: "hi"}}
                        />
                    ))
                }

            </section>
            <section className="learning-path-area">
                <svg className="learning-path-svg" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg">
                    {[0, 1, 2, 3, 4].map((j, i) => (
                        <CircleDroppable
                            id={i}
                            className="learning-node"
                            cx={100}
                            cy={100 + i * 100}
                            r={40}
                            onDrop={() => handleDrop()}
                        />
                    ))}

                    {[1, -1, 1, -1].map((j, i) => (
                        <path 
                            key={i}
                            className="learning-connector"
                            d={`M${100 + j * 40} ${100 + i * 100} A100 100 0 0 ${i%2 === 0 ? 1 : 0} ${100 + j * 40} ${200 + i * 100}`}
                            fill="transparent"
                        />
                    ))}
                </svg>

            </section>
        </div>
    )
}

export default InputSelector;