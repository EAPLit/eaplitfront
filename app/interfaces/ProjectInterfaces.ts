export interface IProject {
    projectID: string;
    projectName: string;
    textID: string;
}

export interface IProjects {
    projectsArray: IProject[];
}

export interface IText {
    textID: string;
    text: string;
}

export interface ILesson {
    lessonID: string;
    lessonName: string;
}

export interface ILessons {
    lessonsArray: ILesson[];
}

export interface ILessonType {
    lessonTypeID: string;
    lessonTypeName: string;
}

export interface ILessonTypes {
    lessonTypesArray: ILessonType[];
}

export interface ITaskType {
    taskTypeID: string;
    taskTypeName: string;
}

export interface ITaskTypes {
    taskTypesArray: ITaskType[];
}

export interface IChosenTask {
    chosenTaskID: string;
    taskTypeID: string;
    order: number;
}

export interface IChosenTasks {
    chosenTasksArray: IChosenTask[]
}