"use client"
import { useRouter } from 'next/navigation';

const MyLearningHead = () => {

    const router = useRouter();

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
                        <button type="button" className="mylearning-button"></button>
                        <p>New Project</p>
                    </div>
                    <div className="button-area">
                        <button type="button" className="mylearning-button"></button>
                        <p>Choose from library</p>
                    </div>
                    <div className="button-area">
                        <button onClick={handleGoToWritingCorrection} type="button" className="mylearning-button"></button>
                        <p onClick={handleGoToWritingCorrection}>Writing Correction</p>
                    </div>
                    <div className="button-area">
                        <button type="button" className="mylearning-button"></button>
                        <p>My learning stats</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyLearningHead;