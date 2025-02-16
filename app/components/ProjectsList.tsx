"use client"
import { useProject } from "../context/ProjectContext";

const ProjectsList = () => {

    const { projects } = useProject();

    return (
        <div className="projects-list">
            <section className="projects-list-section">
                <div className="project-details">
                    {
                        projects?.projectsArray.map((project, i) => (
                            <div key={i}>
                                <p>{project.projectName}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default ProjectsList;