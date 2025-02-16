"use client"
import { MockProjects } from "../mockData/mockProjects";

const ProjectsList = () => {

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