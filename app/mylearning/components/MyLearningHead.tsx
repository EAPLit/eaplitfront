"use client"
import { useRouter } from 'next/navigation';

type MyLearningHeadProps = {
    handleViewProjectDesign: (view: boolean) => void;
}

const MyLearningHead = ({ handleViewProjectDesign  }: MyLearningHeadProps) => {

    const router = useRouter();

    const handleDesignNewProject = () => {
        handleViewProjectDesign(true);
    }

    const handleGoToWritingCorrection = () => {
        router.push('/writing-correction');
    }

    return (
        <div className="mylearning-head">
            <section className="title-area">
                <div className="title">
                    <p className="title-text">My Learning</p>
                </div>
            </section>

            <section className="buttons-area">
                <div className="buttons-panel">
                    <div className="button-area">
                        <button 
                            type="button" 
                            className="mylearning-button"
                            onClick={handleDesignNewProject}
                        >New Project</button>
                    </div>
                    <div className="button-area">
                        <button type="button" className="mylearning-button">Library</button>
                    </div>
                    <div className="button-area">
                        <button onClick={handleGoToWritingCorrection} type="button" className="mylearning-button">Writing correction</button>
                    </div>
                    <div className="button-area">
                        <button type="button" className="mylearning-button">Learning stats</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyLearningHead;