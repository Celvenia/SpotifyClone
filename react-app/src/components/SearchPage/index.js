
import React, { useState } from 'react';
import './SearchPage.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

export default function SearchPage({ recentSearch, artists }) {
    const [slideIndex, setSlideIndex] = useState(0);

    const browseCards = [];
    const suggestedArtists = artists

    for (let i = 0; i < suggestedArtists.length; i++) {
        if (suggestedArtists[i]) {
            browseCards.push(
                <div className="browse-card" key={i}>
                    <NavLink to={`/users/${suggestedArtists[i].id}`}>
                    <h3 className="card-title">{suggestedArtists[i].public_name}</h3>
                    </NavLink>
                    <img src={suggestedArtists[i].profile_picture} alt="Card" />
                    <div className="card-body"></div>
                </div>
            );
        }
    }
    
    // (0 - 1 + 12) % 12 = index 11 in an array length 12(max)
    const handlePrevSlide = () => {
        setSlideIndex((slideIndex - 1 + browseCards.length) % browseCards.length);
    };
    // (11 + 1) % 12 = index 0
    const handleNextSlide = () => {
        setSlideIndex((slideIndex + 1) % browseCards.length);
    };

    return (
        <>
             <div className="browse-card">
                <h3 className="card-title">Recent Search - {recentSearch} </h3>
                <img src="https://picsum.photos/300/200" alt="Card" />
                <div className="card-body"></div>
            </div>
            <h3 className="carousel-title">Artist Suggestions</h3>
            <div className="search-page">
                <div className="carousel-container">
                    {/* translateX, moves card backwards based on slideIndex -slideIndex * 100% */}
                    <div className="carousel-slide" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                        {browseCards.map((card, index) => (
                            <div className="carousel-slide-item" key={index}>
                                {card}
                            </div>
                        ))}
                    </div>
                    <button className="carousel-button carousel-button-prev" onClick={handlePrevSlide}>
                        {/* Decimal equivalent of the Unicode character code for the left-pointing angle bracket */}
                        &#8249;
                    </button>
                    <button className="carousel-button carousel-button-next" onClick={handleNextSlide}>
                        {/* Decimal equivalent of the Unicode character code for the right-pointing angle bracket */}
                        &#8250;
                    </button>
                </div>
            </div>
        </>
    );
}
