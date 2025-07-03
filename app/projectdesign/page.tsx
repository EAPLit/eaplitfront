"use client"

import { useState, useRef, useEffect } from 'react';

import TopicSelector from "./components/TopicSelector";
import GenreSelector from "./components/GenreSelector";
import StyleSelector from "./components/StyleSelector";
import PromptSelector from "./components/PromptSelector";
import InputSelector from "./components/InputSelector";
import ReviewSelector from "./components/ReviewSelector";
import { useRouter } from "next/navigation";

import "../styles/projectdesign.scss";

const ProjectDesign = () => {

    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [projectTitle, setProjectTitle] = useState<string>("My New Project");
    const [originalProjectTitle, setOriginalProjectTitle] = useState<string>("");
    const [editingProjectTitle, setEditingProjectTitle] = useState<boolean>(false);

    const handleSetEditingProjectTitle = () => {
        console.log("Set original:", projectTitle);
        setOriginalProjectTitle(projectTitle);
        setEditingProjectTitle(true);
    }

    const handleFinishEditingProjectTitle = () => {
        if (projectTitle.trim() === "") {
            setProjectTitle(originalProjectTitle);
        }
        setEditingProjectTitle(false);
    }

    const handleCancelEditingProjectTitle = () => {
        console.log("Reverting to original:", originalProjectTitle);
        setProjectTitle(originalProjectTitle);
        setEditingProjectTitle(false);
    }

    const handleCancelNewProject = () => {
        router.push('/mylearning');
    }
    
    return (
        <div className="project-design-page">
            <section className="project-design-header">
                <div className="project-design-title">

                    {/* The title should be editable by the user and part of sent data */}
                    {
                        !editingProjectTitle && (
                            <h1 
                                className="project-design-title-text" 
                                onClick={handleSetEditingProjectTitle}
                            >{projectTitle}</h1>
                        )
                    }
                    {
                        editingProjectTitle && (
                            <div className="project-design-title-editing">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    onBlur={handleFinishEditingProjectTitle}
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleFinishEditingProjectTitle();
                                        } else if (e.key === "Escape") {
                                            e.preventDefault();
                                            handleCancelEditingProjectTitle();
                                        }
                                    }}
                                    className="project-design-title-input"
                                />
                                <h1 
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={handleFinishEditingProjectTitle}
                                >
                                        OK
                                </h1>
                                <h1
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={handleCancelEditingProjectTitle}
                                >
                                    NO
                                </h1>
                            </div>
                            
                        )
                    }
                    

                </div>
                <div className="project-design-cancel">
                    {/* Make this into a nicer button. The handleCancelNewProject should reset all the data, too */}
                    <h1 onClick={handleCancelNewProject}>X</h1>
                </div>
            </section>

            {/* This is the area where the user selects a writing topic */}
            <section className="select-writing-topic">
                <div className="select-writing-topic-panel">
                    <TopicSelector />
                </div>
            </section>

            {/* This is the area where the user selects a writing genre */}
            <section className="select-writing-genre">
                <div className="select-writing-genre-panel">
                    <GenreSelector />
                </div>
            </section>

            {/* This is the area where the user selects a writing style */}
            <section className="select-writing-style">
                <div className="select-writing-style-panel">
                    <StyleSelector />
                </div>
            </section>

            {/* This is the area where the user selects a writing prompt */}
            <section className="select-writing-prompt">
                <div className="select-writing-prompt-panel">
                    <PromptSelector />
                </div>
            </section>

            {/* This is the area where the user selects a writing input */}
            <section className="select-writing-input">
                <div className="select-writing-input-panel">
                    <InputSelector />
                </div>
            </section>

            {/* This is the area where the user selects a writing review */}
            <section className="select-writing-review">
                <div className="select-writing-review-panel">
                    <ReviewSelector />
                </div>
            </section>
            <section className="project-design-footer">
                <div className="project-design-footer-panel">
                    <div className="project-design-footer-buttons">
                        <div className="project-design-footer-button">
                            <button
                                type="button"
                                className="project-design-button"
                                onClick={handleCancelNewProject}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDesign;