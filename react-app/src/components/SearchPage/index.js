
import React, { useState } from 'react';
import './SearchPage.css';

export default function SearchPage({ recentSearch }) {
    const [slideIndex, setSlideIndex] = useState(0);

    const browseCards = [];

    for (let i = 0; i < 12; i++) {
        browseCards.push(
            <div className="browse-card" key={i}>
                <h3 className="card-title">ArtistS {i + 1}</h3>
                <img src="https://picsum.photos/300/200" alt="Card Image" />
                <div className="card-body"></div>
            </div>
        );
    }

    const handlePrevSlide = () => {
        setSlideIndex((slideIndex - 1 + browseCards.length) % browseCards.length);
    };

    const handleNextSlide = () => {
        setSlideIndex((slideIndex + 1) % browseCards.length);
    };

    return (
        <>
             <div className="browse-card">
                <h3 className="card-title">Recent Search - {recentSearch} </h3>
                <img src="https://picsum.photos/300/200" alt="Card Image" />
                <div className="card-body"></div>
            </div>
            <h3>Artist Suggestions</h3>
            <div className="search-page">
                <div className="carousel-container">
                    <div className="carousel-slide" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
                        {browseCards.map((card, index) => (
                            <div className="carousel-slide-item" key={index}>
                                {card}
                            </div>
                        ))}
                    </div>
                    <button className="carousel-button carousel-button-prev" onClick={handlePrevSlide}>
                        &#8249;
                    </button>
                    <button className="carousel-button carousel-button-next" onClick={handleNextSlide}>
                        &#8250;
                    </button>
                </div>
            </div>
        </>
    );
}
