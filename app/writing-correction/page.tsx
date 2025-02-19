"use client"
import { useState, useEffect } from 'react';
import useFetch from '../api/useFetch';

interface Correction {
    category: string,
    student_text: string,
    advice: string,
    examples: string,
    specific_correction: string,
    explanation: string,
}

interface CorrectoBot {
    output: Correction[]
}

const WritingCorrection = () => {

    const { sendRequest, success, data, loading } = useFetch<CorrectoBot>('/writingcorrection/correctobot',);

    const [text, setText] = useState("");
    const handleSubmitParagraph = async (e: React.FormEvent) => {
        e.preventDefault();
        
        console.log("I'm here!");
        await sendRequest(
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: text }),
            }
        );
    }

    useEffect(() => {
        if (success) {
            console.log(data);
        } else {
            console.log("Well, that didn't work very well did it!");
        }
    }, [success, data]);

    return (
        <div>
            <section className="writing-correction-head">
                <h1>Welcome to the EAP Correctobot</h1>
            </section>
            <section className="writing-correction-instructions">
                <div className="w-c-instructions-title">
                    <p>Instructions</p>
                </div>
                <div className="w-c-instructions-details">
                    <p>Copy and paste some text you are interested in getting corrections on.</p>
                    <p>Correctobot with offer you some suggestions and hints on your writing.</p>
                    <p>For each suggestion, you can try to write the correction and get a confirmation or you can ask for more details.</p>
                    <p>Correctobot will guide you through the process.</p>
                    <p>Note: Correctobot cannot respond to your requests, so only add your academic writing!</p>
                </div>
            </section>
            <section className="correctobot-input">
                <form onSubmit={handleSubmitParagraph}>
                    <textarea 
                        className="correctobot-text-area"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add your Academic English"
                        rows={10}
                        cols={50}
                    />
                    <button type="submit">Submit</button>
                </form>
            </section>
            <section className="response-section">
                {
                    loading ? <p>Loading your feedback! Wait a moment...</p> : null
                }
                {
                    data?.output
                }
            </section>
            
        </div>
  );
};

export default WritingCorrection;