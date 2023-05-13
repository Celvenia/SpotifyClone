import React from 'react';
import { useSelector } from 'react-redux';
import './HomeTest.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faCircle } from '@fortawesome/free-solid-svg-icons'

const HomeTest = ({ isLoaded }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div>
      <main>

        <section>
          <h1 className="spotify-section-title">Welcome</h1>
        </section>

        <section>
          <div className="spotify-tiles-container">

            <div className="spotify-tile">
              <div className="spotify-tile-image">
                <img
                  src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
                  className="spotify-tile-image"
                  alt="Discover Weekly"
                />
              </div>
              <div className="spotify-tile-text">Discover Weekly</div>
              <div className="spotify-tile-button">
              </div>
            </div>

            <div className="spotify-tile">
              <div className="spotify-tile-image">
                <img
                  src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
                  className="spotify-tile-image"
                  alt="Liked Songs"
                />
              </div>
              <div className="spotify-tile-text">Liked Songs</div>
              <div className='play-button-container'>
              <FontAwesomeIcon icon={faCircle} className='play-button-circle'/>
              <FontAwesomeIcon icon={faPlay} className='play-button-icon'/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeTest;
