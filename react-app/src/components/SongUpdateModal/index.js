import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateASong } from '../../store/songs';
import { useModal } from '../../context/Modal';
import "./SongUpdateModal.css"

export default function SongmodalModal({song}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [albumId, setAlbumId] = useState(song.album_id)
    const [title, setTitle] = useState(song.title)
    const [duration, setDuration] = useState(song.duration_ms)
    const [url, setUrl] = useState(song.url)
    const [releaseDate, setReleaseDate] = useState(song.release_date)
    const [genre, setGenre] = useState(song.genre)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal();

    const sessionUser = useSelector(state => state.session?.user)


    const handleUpdateSongSubmit = async (e) => {
        e.preventDefault();


        try {
            const data = await dispatch(updateASong({
                album_id: albumId,
                title: title,
                duration_ms: duration,
                url: url,
                release_date: releaseDate,
                genre: genre
            }))
            if (data) {
                setErrors(data);
              } else {
                  closeModal()
              }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <>
            {sessionUser?.is_artist ? (
                <div className="song-modal-container">
                    <h2>Update a Song</h2>

                    <form className="song-modal-form" onSubmit={handleUpdateSongSubmit}>
                        <ul>
                            {errors.length ? <h3>Errors</h3> : ""}
                            <div className="errors">
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </div>
                        </ul>

                        <label className="song-modal-label">AlbumId</label>
                        <input
                            className="song-modal-input"
                            type="number"
                            step="1"
                            min="1"
                            max="4"
                            placeholder="Album Id"
                            value={albumId}
                            onChange={(e) => setAlbumId(e.target.value)}
                            required
                        />

                        <label className="song-modal-label">Song Title</label>
                        <input
                            className="song-modal-input"
                            type="text"
                            placeholder="Song Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label className="song-modal-label">Duration</label>
                        <input
                            className="song-modal-input"
                            type="number"
                            placeholder="Song Duration in ms"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                        <label className="song-modal-label">Song URL</label>
                        <input
                            className="song-modal-input"
                            type="url"
                            placeholder="Song URL for upload"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />

                        <label className="song-modal-label">Release Date</label>
                        <input
                            className="song-modal-input"
                            type="date"
                            placeholder="Release Date"
                            value={releaseDate}
                            onChange={(e) => setReleaseDate(e.target.value)}
                            max={new Date().toISOString().split("T")[0]}
                            required
                        />
                        <label className="song-modal-label">Genre</label>
                        <select className="song-modal-input" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                            <option value="">--Please choose a genre--</option>
                            <option value="hip-hop">Hip Hop</option>
                            <option value="rap">Rap</option>
                            <option value="rock">Rock</option>
                            <option value="pop">Pop</option>
                        </select>
                        <button
                            className="song-modal-button"
                            type="submit"
                            disabled={errors.length ? true : false}
                        >
                            modal
                        </button>
                    </form>
                </div>
            ) : history.push('/')}
        </>
    )
}
