"use client"
import { useEffect } from 'react';
import { useProject } from "../context/ProjectContext";

const ProjectLessonsDisplay = () => {
    const { fetchLessonsForProject, lessons } = useProject();
    
    useEffect(() => {
        fetchLessonsForProject();
    }, []);

    return (
        <div>
            <section className="lessons-display">
                <div>
                    {
                        lessons?.lessonsArray.map((lesson, i) =>(
                            <div key={i}>{lesson.lessonName}</div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default ProjectLessonsDisplay;