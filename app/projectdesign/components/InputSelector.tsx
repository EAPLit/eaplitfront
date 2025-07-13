"use client"

import { useState, useEffect } from 'react';
import './styles/inputselector.scss';

import Draggable from '@/app/components/dragndrop/draggable';
import Droppable from '@/app/components/dragndrop/droppable';

const InputSelector = ({  }) => {

    return (
        <div className="input-selector-container">
            <section className="activity-selector-area">

            </section>
            <section className="learning-path-area">
                <svg className="learning-path-svg" viewBox="0 0 200 800" xmlns="http://www.w3.org/2000/svg">
                    {[0, 1, 2, 3, 4].map((j, i) => (
                        <circle 
                            key={i}
                            className="learning-node"
                            cx={100}
                            cy={100 + i * 100}
                            r="40"
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