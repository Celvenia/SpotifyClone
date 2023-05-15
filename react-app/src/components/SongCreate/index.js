import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createASong } from '../../store/songs'
import { useModal } from "../../context/Modal";
import "./SongCreate.css"

export default function SongCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
    const closeModal = useModal()
    const [albumId, setAlbumId] = useState(0)
    const [title, setTitle] = useState("")
    const [duration, setDuration] = useState(0)
    const [url, setUrl] = useState("")
    const [releaseDate, setReleaseDate] = useState(null)
    const [genre, setGenre] = useState(null)
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state => state.session?.user)


    const handleCreateSongSubmit = async (e) => {
        e.preventDefault();
        setErrors([])

        try {
            const song = await dispatch(createASong({
                album_id: albumId,
                title: title,
                duration_ms: duration,
                url: url,
                release_date: releaseDate,
                genre: genre
            }))
            await history.push(`/songs/${song.id}`);
             closeModal()

            } catch (err) {
                alert(err);
            }
    };
    return (
        <>
            {sessionUser?.is_artist ? (
                <div className="song-modal-container">
                    <h2>Create a New Song</h2>

                    <form className="song-modal-form" onSubmit={handleCreateSongSubmit}>
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
                            onChange={(e) => setAlbumId(e.target.value)}
                            required
                        />

                        <label className="song-modal-label">Song Title</label>
                        <input
                            className="song-modal-input"
                            type="text"
                            placeholder="Song Title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label className="song-modal-label">Duration</label>
                        <input
                            className="song-modal-input"
                            type="number"
                            placeholder="Song Duration in ms"
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                        <label className="song-modal-label">Song URL</label>
                        <input
                            className="song-modal-input"
                            type="url"
                            placeholder="Song URL for upload"
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />

                        <label className="song-modal-label">Release Date</label>
                        <input
                            className="song-modal-input"
                            type="date"
                            placeholder="Release Date"
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
                            Create
                        </button>
                    </form>
                </div>
            ) : history.push('/')}
        </>
    )
}
