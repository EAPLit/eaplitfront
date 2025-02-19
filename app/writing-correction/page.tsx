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

    const [text, setText] = useState<string>("");
    const [viewing, setViewing] = useState<boolean[] | null>(null);
    const [viewingCorrection, setViewingCorrection] = useState<boolean[] | null>(null);
    const [viewingExplanation, setViewingExplanation] = useState<boolean[] | null>(null);

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
        if (success && data?.output?.length) {
            console.log(data);
            setViewing(Array(data?.output.length).fill(false));
            setViewingExplanation(Array(data?.output.length).fill(false));
            setViewingCorrection(Array(data?.output.length).fill(false));
        } else {
            console.log("Well, that didn't work very well did it!");
        }
    }, [success, data]);

    const seeExample = (i: number) => {
        setViewing((prev) => {
            if (!prev) return Array(data?.output.length).fill(false);;

            const newViewing = [...prev];
            newViewing[i] = true;
            return newViewing;
        });
    };

    const seeCorrection = (i: number) => {
        setViewingCorrection((prev) => {
            if (!prev) return Array(data?.output.length).fill(false);;
            const newViewing = [...prev];
            newViewing[i] = true;
            return newViewing;
        });
    };

    const seeExplanation = (i: number) => {
        setViewingExplanation((prev) => {
            if (!prev) return Array(data?.output.length).fill(false);;
            const newViewing = [...prev];
            newViewing[i] = true;
            return newViewing;
        });
    };

    

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
                    data?.output.map((out,i) => (
                        <div key={i}>
                            <p>{out.category}</p>
                            <p>Your text: {out.student_text}</p>
                            <p>Advice{out.advice}</p>
                            <p onClick={() => seeExample(i)}>See an example</p>
                            {
                                viewing?.[i] ? 
                                <div>
                                    <p>{out.examples}</p>
                                    <p onClick={() => seeCorrection(i)}>See correction</p>
                                    {
                                        viewingCorrection?.[i] ?
                                       <div>
                                            <p>{out.specific_correction}</p>
                                            <p onClick={() => seeExplanation(i)}>See explanation</p>
                                            {
                                                viewingExplanation?.[i] ?
                                                <div>
                                                    <p>{out.explanation}</p>
                                                </div> : null
                                            }
                                       </div> : null
                                    }
                                </div> : null
                            }
                        </div>
                    ))
                }
            </section>
            
        </div>
  );
};

export default WritingCorrection;