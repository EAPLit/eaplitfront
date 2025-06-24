"use client"

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

    const handleCancelNewProject = () => {
        router.push('/mylearning');
    }
    
    return (
        <div className="project-design-page">
            <section className="project-design-header">
                <div className="project-design-title">

                    {/* The title should be editable by the user and part of sent data */}
                    <h1 className="project-design-title-text">Project Design</h1>

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