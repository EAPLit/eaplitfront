"use client"

import { createContext, useContext, useState, ReactNode} from "react";

interface IProject {
    projectID: string;
    projectName: string;
}

interface IProjects {
    projectsArray: IProject[];
}

interface IText {
    textID: string;
    text: string;
}

interface ILesson {
    lessonID: string;
    lessonName: string;
}

interface ILessons {
    lessonsArray: ILesson[];
}

interface ILessonType {
    lessonTypeID: string;
    lessonTypeName: string;
}

interface ILessonTypes {
    lessonTypesArray: ILessonType[];
}

interface ITaskType {
    taskTypeID: string;
    taskTypeName: string;
}

interface ITaskTypes {
    taskTypesArray: ITaskType[];
}

interface IChosenTask {
    chosenTaskID: string;
    taskTypeID: string;
    order: number;
}

interface IChosenTasks {
    chosenTasksArray: IChosenTask[]
}

interface ProjectContextType {
    projects: IProjects | null;
    setProjects: (projects: IProjects) => void;
    text: IText | null;
    setText: (text: IText) => void;
    lessonTypes: ILessonTypes | null;
    setLessonTypes: (lessonTypes: ILessonTypes) => void;
    taskTypes: ITaskTypes | null;
    setTaskTypes: (taskTypes: ITaskTypes) => void;
    chosenTasks: IChosenTasks | null;
    setChosenTasks: (chosenTasks: IChosenTasks) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<IProjects | null>(null);
    const [text, setText] = useState<IText | null>(null);
    const [lessonTypes, setLessonTypes] = useState<ILessonTypes | null>(null);
    const [taskTypes, setTaskTypes] = useState<ITaskTypes | null>(null);
    const [chosenTasks, setChosenTasks] = useState<IChosenTasks | null>(null);

    return (
        <ProjectContext.Provider value={{ projects, setProjects, text, setText, lessonTypes, setLessonTypes, taskTypes, setTaskTypes, chosenTasks, setChosenTasks }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) throw new Error("useProject must be used within a ProjectProvider");
    return context;
};