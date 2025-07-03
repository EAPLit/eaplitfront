"use client"

import { useState, useEffect } from 'react';
import { mockGenres } from './mockdata/mockGenres';
import "./styles/genreselector.scss";
import Discover from '@/app/components/Discover';

type SkillGenres = {
    skill: string;
    genres_and_descriptions: {
        genre: string;
        description: string;
    }[];
}

const GenreSelector = ({  }) => {
    /**
     * From the mockGenres data be able to select a skill
     * Then from the skill, select a genre and see its description on the right side.
     * On the description, be able to set this as the genre for the project.
     */
    const [skillsList, setSkillsList] = useState<SkillGenres[]>();
    useEffect(() => {
        // Extract unique skills from the mockGenres data
        const uniqueSkills = Array.from(new Set(mockGenres.map(genre => genre.skills)));
        // Make new SkillGenres object from mockGenres and uniqueSkills as follows:
        const formattedSkills = uniqueSkills.map(skill => {
            return {
                skill: skill,
                genres_and_descriptions: mockGenres
                    .filter(genre => genre.skills === skill)
                    .map(genre => ({
                        genre: genre.genre,
                        description: genre.description
                    }))
            }
        })
        setSkillsList(formattedSkills);
    }, []);

    console.log("Skills List:", skillsList);

    return (
        <>
            <div className="genre-selector-container">
                <div className="genre-selector-header">
                    <h2 className="genre-selector-title">Select a genre</h2>
                    <p className="genre-selector-description">
                        Choose a genre for your writing project. This will help guide the style and tone of your writing.
                    </p>
                </div>
                <div className="genre-selector-area">
                    <div className="genre-selector-list">
                        {
                            skillsList?.map((skill, index) => (
                                <div key={index} className="genre-selector-item">
                                    <Discover title={skill.skill} toDiscover={skill.genres_and_descriptions} />
                                </div>
                            ))
                        }
                    </div>
                    <div className="genre-description">

                    </div>
                </div>
                
            </div>
        </>
    )
}

export default GenreSelector;