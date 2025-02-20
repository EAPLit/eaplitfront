"use client"
import { useState, useEffect } from 'react';
import useFetch from '../api/useFetch';
import '../styles/writingcorrection.scss';
import TypingText from './TypingText';

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

    const { sendRequest, loading } = useFetch<CorrectoBot>('/writingcorrection/correctobot',);

    const [text, setText] = useState<string>("");
    const [viewing, setViewing] = useState<boolean[] | null>(null);
    const [viewingCorrection, setViewingCorrection] = useState<boolean[] | null>(null);
    const [viewingExplanation, setViewingExplanation] = useState<boolean[] | null>(null);

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handlePrevIndex = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNextIndex = () => {
        setCurrentIndex((prev) => (prev < data?.output.length - 1 ? prev + 1 : prev));
    }

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

    // useEffect(() => {
    //     if (success && data?.output?.length) {
    //         console.log(data);
    //         setViewing(Array(data?.output.length).fill(false));
    //         setViewingExplanation(Array(data?.output.length).fill(false));
    //         setViewingCorrection(Array(data?.output.length).fill(false));
    //     } else {
    //         console.log("Well, that didn't work very well did it!");
    //     }
    // }, [success, data]);

    
      const data = { "output": 
       [
          {
              "category": "giving opinions",
              "student_text": "Of course, I have a part-time job.",
              "advice": "Remember, in academic writing, it is better to avoid personal references like 'I'. Could you rephrase this to make it less personal and more formal?",
              "examples": "It is common for students to have part-time jobs. - Many students often engage in part-time work.",
              "specific_correction": "It is common for students to engage in part-time work.",
              "explanation": "Using 'It is common for students...' makes the statement more general and suitable for academic tone, avoiding the personal pronoun 'I'."
          },
          {
              "category": "basic grammar",
              "student_text": "Many high school students are banned to have a part-time job.",
              "advice": "Looks like there's a grammatical issue with the verb form after 'banned'. What would be the correct form here?",
              "examples": "Many high school students are required to follow rules. - People are prohibited from smoking.",
              "specific_correction": "Many high school students are banned from having a part-time job.",
              "explanation": "The correct expression is 'banned from doing something'. In this case, 'having a part-time job' uses the -ing form of the verb, which is required after 'from'."
          },
          {
              "category": "unnatural phrase",
              "student_text": "People do not apt to forget things which they learned when they were young.",
              "advice": "This sentence structure sounds a bit off. How can you rephrase it to sound more natural in English?",
              "examples": "People often remember things they learned as children. - It is common for individuals to recall their early lessons.",
              "specific_correction": "People tend not to forget things which they learned when they were young.",
              "explanation": "The phrase 'tend not to' is more natural and grammatically correct than 'do not apt to' in English."
          },
          {
              "category": "unnatural phrase",
              "student_text": "My mother said It is very valuable for young people to have a trouble.",
              "advice": "The use of 'a trouble' isn't quite right in this context. Can you think of a better way to phrase this?",
              "examples": "Experiencing challenges is important for young people. - Facing difficulties is beneficial for youth.",
              "specific_correction": "My mother said it is very valuable for young people to face troubles.",
              "explanation": "Troubles are typically referred to in the plural when discussed in abstract terms, and 'to face troubles' is a more natural collocation than 'to have a trouble.'"
          }
        ]
      }

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
                    data?.output.length > 0 && (
                        <div className="feedback-panel" key={currentIndex}>
                            <div className="navigation-buttons">
                                <button onClick={handlePrevIndex} disabled={currentIndex === 0}>⬅️</button>
                                <button onClick={handleNextIndex} disabled={currentIndex === data.output.length - 1}>➡️</button>
                                <p>{currentIndex + 1} / {data?.output.length}</p>
                            </div>
                            <div className="step-one">
                                <h2 className="step-one-title">Let's look at "{data.output[currentIndex].category}"</h2>
                                <TypingText htmlContent={`
                                    <div className="step-one-student-text">
                                        <p>You wrote this in your paragraph: "<i><strong>${data.output[currentIndex].student_text}</strong></i>"</p>
                                    </div>
                                    <div className="step-one-comment">
                                        <p>Here is my comment: ${data.output[currentIndex].advice}</p>
                                    </div>
                                `}/>
                                
                                <div className="step-one-request-example">
                                    <p onClick={() => seeExample(currentIndex)}>Want to see examples? Click here ✎</p>
                                    <button className="reveal-next-button" onClick={() => seeExample(currentIndex)}>See examples</button>
                                    
                                </div>
                                
                                
                            </div>
                            {
                                viewing?.[currentIndex] ? 
                                <div className="step-two">
                                    <TypingText htmlContent={`
                                        <div className="step-two-examples">
                                            <p>Okay, here are some examples to help you. Think carefully about them!</p>
                                            <p><i><strong>"${data.output[currentIndex].examples}"</strong></i></p>
                                        </div>
                                    `}/>
                                    
                                    <div className="step-two-request-correction">
                                        <p onClick={() => seeCorrection(currentIndex)}>Can you update your writing?</p>
                                        <p onClick={() => seeCorrection(currentIndex)}>Do you want to see my correction?</p>
                                        <button className="reveal-next-button" onClick={() => seeCorrection(currentIndex)}>See correction</button>
                                    </div>
                                    {
                                        viewingCorrection?.[currentIndex] ?
                                        <div className="step-three">
                                            <TypingText htmlContent={`
                                                <div className="step-three-see-corrections">
                                                    <p>No problem. Here is my correction to your text:</p>
                                                    <p><i><strong>${data.output[currentIndex].specific_correction}</strong></i></p>
                                                </div>
                                            `} />
                                            <div className="step-three-request-explanation">
                                                <p onClick={() => seeExplanation(currentIndex)}>Would you like to see an explanation</p>
                                                <button className="reveal-next-button" onClick={() => seeExplanation(currentIndex)}>See explanation</button>
                                            </div>
                                            {
                                                viewingExplanation?.[currentIndex] ?
                                                <div>
                                                    <TypingText htmlContent={`
                                                        <p>${data.output[currentIndex].explanation}</p>
                                                    `} />
                                                    
                                                </div> : null
                                            }
                                        </div> : null
                                    }
                                </div> : null
                            }
                        </div>
                    )
                }
            </section>
            
        </div>
  );
};

export default WritingCorrection;