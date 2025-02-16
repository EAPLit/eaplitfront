"use client"

const MyLearningHead = () => {
    return (
        <div className="mylearning-head">
            <section className="title-area">
                <div>
                    <p>My Learning</p>
                </div>
            </section>
            <section className="buttons-area">
                <div className="buttons-panel">
                    <div className="button-area">
                        <button className="mylearning-button">New Project</button>
                    </div>
                    <div>
                        <button className="mylearning-button">Choose from library</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyLearningHead;