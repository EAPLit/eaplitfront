"use client"

import { useState, useEffect } from 'react';
import { useRef } from 'react';
import './styles/inputselector.scss';

import Draggable from '@/app/components/dragndrop/draggable';
import CircleDroppable from '@/app/components/dragndrop/circleDroppable';

type ActivityType = {
    id: number;
    type: string;
}

const InputSelector = ({  }) => {

    // Refs for draggable elements (keyed by id string)
    const draggableRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Refs for droppable circles (keyed by id string)
    const droppableRefs = useRef<Record<string, SVGCircleElement | null>>({});

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, id: string, draggableData: ActivityType) => {
        console.log("I am now dragging a draggable with id: ", id);
        const target = e.target as HTMLDivElement;

        // Set the data to be transferred by the drag and drop
        e.dataTransfer.setData('targetId', id.toString());
        e.dataTransfer.setData('activityData', JSON.stringify(draggableData));

        // Pass the parent node classname to allow us to track
        // whether the draggable is coming OUT of a droppable or not
    }

    const handleDrop = (
        e: React.DragEvent<SVGCircleElement>, 
        droppableId: string,
        droppableIndex: string
    ) => {
        e.preventDefault();
        const target = e.target as SVGCircleElement;
        target.classList.remove('drag-over-safe');
        target.classList.remove('drag-over-unsafe');

        // Check if a child is already appended to the droppable element
        if(!target.firstChild) {
            // get the draggable element information
            const id = e.dataTransfer.getData('targetId');
            console.log("The id data received is: ", id);
            const draggable = draggableRefs.current[id];
            const droppable = droppableRefs.current[droppableId]

            console.log("draggable:", draggable);
            console.log("droppable", droppable);
        } else {
            console.log("It seems there is already a first child!");
        }
    }

    const handleDeleteDraggable = () => {
        
    }

    return (
        <div className="input-selector-container">
            <section className="activity-selector-area">
                {
                    [0, 1, 2, 3, 4].map((j, i) => (
                        <Draggable
                            key={j}
                            id={j.toString()}
                            onDragStart={handleOnDragStart}
                            onDelete={handleDeleteDraggable}
                            draggableData={{id:j, type: "hi"}}
                            setRef={(el) => (draggableRefs.current[j.toString()] = el)}
                        />
                    ))
                }

            </section>
            <section className="learning-path-area">
                <svg className="learning-path-svg" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg">
                    {[0, 1, 2, 3, 4].map((j, i) => (
                        <CircleDroppable
                            key={i}
                            id={i.toString()}
                            className="learning-node"
                            cx={100}
                            cy={100 + i * 100}
                            r={40}
                            onDrop={(e) => handleDrop(e, i.toString(), j.toString())}
                            setRef={(el) => (droppableRefs.current[i.toString()] = el)}
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