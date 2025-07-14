"use client"

import { useState, useEffect } from 'react';

type DraggableDataType = {
    id: number;
    type: string;
}

type DraggableProps = {
    id: number;
    onDragStart: (e:React.DragEvent<HTMLDivElement>, id:number, draggableData:DraggableDataType) => void;
    onDelete: () => void;
    draggableData: DraggableDataType;
}

const Draggable: React.FC<DraggableProps> = ({ id, onDragStart, onDelete, draggableData }) => {

    return (
        <div
            key={id}
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