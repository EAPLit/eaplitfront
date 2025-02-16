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
        <div className="projects-list">
            <section className="projects-list-section">
                <div className="project-details">
                    {
                        projects?.projectsArray.map((project, i) => (
                            <div key={i}>
                                <p onClick={() => handleSelectProject(project.projectID)}>{project.projectName}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </div>
    );
};

export default ProjectsList;