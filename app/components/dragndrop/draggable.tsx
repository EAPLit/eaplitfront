"use client"

import { useState, useEffect } from 'react';

type DraggableDataType = {
    id: number;
    type: string;
}

type DraggableProps = {
    id: string;
    onDragStart: (e:React.DragEvent<HTMLDivElement>, id:string, draggableData:DraggableDataType) => void;
    onDelete: () => void;
    draggableData: DraggableDataType;
    setRef: (el: HTMLDivElement | null) => void;
}

const Draggable: React.FC<DraggableProps> = ({ id, onDragStart, onDelete, draggableData, setRef }) => {

    return (
        <div
            ref={setRef}
            className="draggable"
            draggable
            onDragStart={(e) => onDragStart(e, id, draggableData)}
        >
            <button
                className='delete-draggable'
                onClick={onDelete}
            >
                X    
            </button>

            <div className='draggable-title'>
                <span
                    className='draggable-type-label'
                >
                    {draggableData.type}
                </span>
            </div>

        </div>
    );
};

export default Draggable