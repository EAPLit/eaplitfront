"use client"
import ProjectTitle from "../components/ProjectTitle";
import TextDisplay from "../components/TextDisplay";
import UploadText from "../components/UploadText";
import ProjectLessonsDisplay from "../components/ProjectLessonsDisplay";
import LessonTypes from "../components/LessonTypes";
import LessonDesignHead from "../components/LessonDesignHead";
import TaskTypes from "../components/TaskTypes";
import TaskFlow from "../components/TaskFlow";
import ProjectManager from "../components/ProjectManager";

/**
 * Updated
 */

import TopicSelector from "./components/TopicSelector";
import GenreSelector from "./components/GenreSelector";
import StyleSelector from "./components/StyleSelector";
import PromptSelector from "./components/PromptSelector";
import InputSelector from "./components/InputSelector";
import ReviewSelector from "./components/ReviewSelector";

const ProjectDesign = () => {
    
    return (
        <div>
            <ProjectTitle />
            <TextDisplay />
            <UploadText />
            <ProjectLessonsDisplay />
            <LessonTypes />
            <LessonDesignHead />
            <TaskTypes />
            <TaskFlow />
            <ProjectManager />
        </div>
    );
};

export default ProjectDesign;