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

    const { sendRequest, loading } = useFetch<CorrectoBot>('/writingcorrection/correctobot',);

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
                    data?.output.map((out,i) => (
                        <div className="feedback-panel" key={i}>
                            <div className="step-one">
                                <h2 className="step-">{out.category}</h2>
                                <p>Your text: {out.student_text}</p>
                                <p>Advice{out.advice}</p>
                                <p onClick={() => seeExample(i)}>See an example</p>
                            </div>
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