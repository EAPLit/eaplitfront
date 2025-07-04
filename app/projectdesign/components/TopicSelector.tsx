"use client"

import { useState, useMemo } from 'react';
import { mockTopics } from './mockdata/mockTopics';
import "./styles/topicselector.scss";

type Topic = {
    topicId: string;
    topic: string;
};

const TopicSelector = ({  }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [AITopicKeyword, setAITopicKeyword] = useState<string>("");

    const filteredTopics = useMemo(() => {
        return mockTopics.filter((item: Topic ) =>
            item.topic.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <>
            <div className="topic-search-header">
                <h2 className="topic-search-title">Brainstorm a topic</h2>
                <p className="topic-search-description">
                    Use the list below to brainstorm a topic for your writing project.
                    You can also search for specific ideas using the search bar.
                    Or, use AI to help you brainstorm a topic idea.
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
                                    <span className="search-results-count">
                                        {filteredTopics.length} ideas found
                                        {
                                            filteredTopics.filter((item: Topic) => {
                                                return item.topic.toLowerCase().startsWith(searchTerm[0].toLowerCase());
                                            }).map((item: Topic) => (
                                                <li key={item.topicId} className="topic-selector-topic-item">
                                                    <span className="topic-selector-topic-text">{item.topic}</span>
                                                </li>
                                            ))
                                        }
                                    </span>
                                ) : (
                                    <span className="search-results-count">
                                        No results found
                                    </span>
                                )
                            ) : (
                                <span className="search-results-count">
                                    Type a letter to get ideas
                                </span>
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