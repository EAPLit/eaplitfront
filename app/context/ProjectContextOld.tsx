"use client"

import { createContext, useContext, useState, useEffect, ReactNode} from "react";
import { IProjects, IText, ILessons, ILessonTypes, ITaskTypes, IChosenTasks } from "../interfaces/ProjectInterfaces";
import { MockProjects } from "../mockData/mockProjects";
import { lessons as mockLessons } from "../mockData/mockLessons";

interface ProjectContextType {
    projects: IProjects | null;
    setProjects: (projects: IProjects) => void;
    text: IText | null;
    setText: (text: IText) => void;
    lessons: ILessons | null;
    setLessons: (lessons: ILessons) => void;
    lessonTypes: ILessonTypes | null;
    setLessonTypes: (lessonTypes: ILessonTypes) => void;
    taskTypes: ITaskTypes | null;
    setTaskTypes: (taskTypes: ITaskTypes) => void;
    chosenTasks: IChosenTasks | null;
    setChosenTasks: (chosenTasks: IChosenTasks) => void;
    selectProject: (aProjectID: string) => void;
    fetchLessonsForProject: () => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<IProjects | null>(null);
    const [text, setText] = useState<IText | null>(null);
    const [lessons, setLessons] = useState<ILessons | null>(null);
    const [lessonTypes, setLessonTypes] = useState<ILessonTypes | null>(null);
    const [taskTypes, setTaskTypes] = useState<ITaskTypes | null>(null);
    const [chosenTasks, setChosenTasks] = useState<IChosenTasks | null>(null);

    const [selectedProjectID, setSelectedProjectID] = useState<string | null>(null); // Tracks which project the user is currently viewing


    useEffect(() => {
        const fetchProjects = async () => {
            setTimeout(() => {
                setProjects(MockProjects);
            }, 1000);
        }

        fetchProjects();
    }, []);

    const selectProject = (aProjectID: string) => {
        setSelectedProjectID(aProjectID);
    }

    const fetchLessonsForProject = () => {
        // get lessons according to which project is currently selected
        // using fetch request.
        // While mocking, just set the mock data.
        console.log("The currently selected project ID is: ", selectedProjectID);
        setLessons(mockLessons);
    }

    return (
        <ProjectContext.Provider value={{ projects, setProjects, text, setText, lessons, setLessons, lessonTypes, setLessonTypes, taskTypes, setTaskTypes, chosenTasks, setChosenTasks, selectProject, fetchLessonsForProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) throw new Error("useProject must be used within a ProjectProvider");
    return context;
};