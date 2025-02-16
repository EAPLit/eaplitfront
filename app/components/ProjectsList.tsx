"use client"
import { MockProjects } from "../mockData/mockProjects";
import { useProject } from "../context/ProjectContext";

const ProjectsList = () => {

    const { projects } = useProject();

    return (
        <div className="projects-list">
            <section className="projects-list-section">
                <div className="project-details">
                    {
                        MockProjects.ProjectsArray.map((project) => (
                            <p key={project.id}>{project.name}</p>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default ProjectsList;