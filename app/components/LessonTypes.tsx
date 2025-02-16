"use client"
import { useProject } from "../context/ProjectContext";

const LessonTypes = () => {
    const { selectLessonType, lessonTypes } = useProject();

    const handleSelectLessonType = (lessonTypeID: string) => {
        selectLessonType(lessonTypeID);
    }

    return (
        <div>
            {
                lessonTypes?.lessonTypesArray.map((lessonType, i) => (
                    <div key={i}>
                        <p onClick={() => handleSelectLessonType(lessonType.lessonTypeID)}>{lessonType.lessonTypeName}</p>
                    </div>
                ))
            }

        </div>
    );
};

export default LessonTypes;