"use client"

import { useState, useMemo } from 'react';
import { mockTopics } from './mockdata/mockTopics';
import "./styles/topicselector.scss";

import TextAnimate from '@/app/components/textanimate/TextAnimate';
import TextArrayAnimate from '@/app/components/textanimate/TextArrayAnimate';

type Topic = {
    topicId: string;
    topic: string;
};

const TopicSelector = ({  }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [AITopicKeyword, setAITopicKeyword] = useState<string>("");

    const filteredTopics = useMemo(() => {
        return mockTopics.filter((item: Topic ) =>
            item.topic.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <>
            <div className="topic-search-header">
                <h2 className="topic-search-title">Topic Idea</h2>
                <p className="topic-search-description">
                    
                </p>
            </div>
            <div className="topic-selector-container">
                <div className="topic-search-area">
                    <input
                        type="text"
                        placeholder="Type a letter..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="topic-selector-search-input"
                    />
                    <div className="search-results-area">
                        {
                            searchTerm.length > 0 ? (
                                filteredTopics.length > 0 ? (
                                    <>
                                        <span className="search-results-count">
                                            {filteredTopics.length} ideas found: 
                                            <TextArrayAnimate 
                                                texts={filteredTopics.map((item: Topic) => item.topic)}
                                                speed={50}
                                                className="search-results-topics"
                                                animate={true}
                                                orientation="vertical"
                                                maxLines={10}
                                            />
                                        </span>
                                    </>
                                ) : (
                                    <TextAnimate 
                                        text="No results found"
                                        speed={50}
                                        className="search-results-count"
                                        animate={true}
                                    />
                                )
                            ) : (
                                <TextAnimate 
                                    text="Type a letter to search for topics"
                                    speed={5}
                                    className="search-results-count"
                                    animate={true}
                                />
                            )
                        }
                    </div>
                </div>
                <div className="topic-scroll-area">
                    <div className="topic-selector-scrolling-container">
                        <ul className="topic-selector-topic-list">
                            {mockTopics.map((item: Topic) => {
                                return (
                                    <li key={item.topicId} className="topic-selector-topic-item">
                                        <span className="topic-selector-topic-text">{item.topic}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="topic-AI-brainstorm">
                <div className="topic-AI-brainstorm-input-area">
                    <input
                        type="text"
                        placeholder="Set your topic e.g. 'Climate change'"
                        value={AITopicKeyword}
                        onChange={(e) => setAITopicKeyword(e.target.value)}
                        className="topic-AI-brainstorm-input"
                    />
                    <button 
                        className="topic-AI-brainstorm-button"
                        onClick={() => {
                            // Placeholder for AI interaction logic
                            console.log("AI Keyword:", AITopicKeyword);
                        }} 
                    >Set</button>
                </div>
            </div>
        </>
        
        
    )
}

export default TopicSelector;