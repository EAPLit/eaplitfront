"use client";

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { IProjects, IText, ILessons, ILessonTypes, ITaskTypes, IChosenTasks } from '../interfaces/ProjectInterfaces';
import { MockProjects } from '../mockData/mockProjects';
import { lessons as mockLessons } from "../mockData/mockLessons";

// Define action types
type ProjectAction = 
 | { type: "SET_PROJECTS"; payload: IProjects }
 | { type: "SELECT_PROJECT"; payload: string }
 | { type: "SET_TEXT"; payload: IText }
 | { type: "SET_LESSONS"; payload: ILessons }
 | { type: "SET_LESSON_TYPES"; payload: ILessonTypes }
 | { type: "SET_TASK_TYPES"; payload: ITaskTypes }
 | { type: "SET_CHOSEN_TASKS"; payload: IChosenTasks }

interface ProjectState {
    projects: IProjects | null;
    selectedProjectID: string | null;
    text: IText | null;
    lessons: ILessons | null;
    lessonTypes: ILessonTypes | null;
    taskTypes: ITaskTypes | null;
    chosenTasks: IChosenTasks | null;
}

const initialState: ProjectState = {
    projects: null,
    selectedProjectID: null,
    text: null,
    lessons: null,
    lessonTypes: null,
    taskTypes: null,
    chosenTasks: null,
}

const projectReducer = (state: ProjectState, action: ProjectAction): ProjectState => {
    switch (action.type) {
        case "SET_PROJECTS":
            return { ...state, projects: action.payload };
        case "SELECT_PROJECT":
            return { ...state, selectedProjectID: action.payload };
        case "SET_TEXT":
            return { ...state, text: action.payload };
        case "SET_LESSONS":
            return { ...state, lessons: action.payload };
        case "SET_LESSON_TYPES":
            return { ...state, lessonTypes: action.payload };
        case "SET_TASK_TYPES":
            return { ...state, taskTypes: action.payload };
        case "SET_CHOSEN_TASKS":
            return { ...state, chosenTasks: action.payload };
        default:
            return state;
    }
}

// Create context
interface ProjectContextType extends ProjectState {
    selectProject: (aProjectID: string) => void;
    fetchLessonsForProject: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    useEffect(() =>{
        setTimeout(() => {
            dispatch({ type: "SET_PROJECTS", payload: MockProjects });
        }, 1000);
    }, []);

    // Select project
    const selectProject = (aProjectID: string) => {
        dispatch({ type: "SELECT_PROJECT", payload: aProjectID });
    };

    // Fetch Lessons
    const fetchLessonsForProject = () => {
        console.log("Fetching lessons for project ID:", state.selectedProjectID);
        dispatch({ type: "SET_LESSONS", payload: mockLessons });
    };

    return (
        <ProjectContext.Provider value={{ ...state, selectProject, fetchLessonsForProject }}>
            {children}
        </ProjectContext.Provider>
    )
}

// Custom hook for context access
export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) throw new Error("useProject must be used within a ProjectProvider");
    return context;
}