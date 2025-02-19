"use client"
import { useProject } from "../context/ProjectContext";
import { useRouter } from "next/navigation";

const ProjectsList = () => {

    const { projects, selectProject } = useProject();
    const router = useRouter();

    const handleSelectProject = (projectID: string) => {
        selectProject(projectID);
        router.push('/projectdesign')
    }

    return (
        <div className="projects-list-panel">
            <div className="projects-list">
                <section className="projects-list-title">
                    <h1>Projects</h1>
                </section>
                <section className="projects-list-section">
                    <div className="project-details">
                        {
                            projects?.projectsArray.map((project, i) => (
                                <div className={`a-project ${i % 2 === 0 ? "a-project-light" : "a-project-dark"}`} key={i}>
                                    <p onClick={() => handleSelectProject(project.projectID)}>{project.projectName}</p>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <section className="projects-list-footer">
                    
                </section>
            </div>
        </div>
    );
};

export default ProjectsList;