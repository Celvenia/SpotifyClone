import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { createASong } from '../../store/songs';
import "./SongCreate.css"

export default function SongCreate() {
    const dispatch = useDispatch()
    const history = useHistory()
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
        } catch (err) {
            alert(err);
        }
    };
    return (
        <>
            {sessionUser?.is_artist ? (
                <div className="song_create_container">
                    <h2>Create a New Song</h2>

                    <form className="song_create_form" onSubmit={handleCreateSongSubmit}>
                        <ul>
                            {errors.length ? <h3>Errors</h3> : ""}
                            <div className="errors">
                                {errors.map((error, idx) => (
                                    <li key={idx}>{error}</li>
                                ))}
                            </div>
                        </ul>

                        <label className="song-create-label">AlbumId</label>
                        <input
                            className="song-create-input"
                            type="number"
                            step="1"
                            min="1"
                            max="4"
                            placeholder="Album Id"
                            onChange={(e) => setAlbumId(e.target.value)}
                            required
                        />

                        <label className="song-create-label">Song Title</label>
                        <input
                            className="song-create-input"
                            type="text"
                            placeholder="Song Title"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <label className="song-create-label">Duration</label>
                        <input
                            className="song-create-input"
                            type="number"
                            placeholder="Song Duration in ms"
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                        <label className="song-create-label">Song URL</label>
                        <input
                            className="song-create-input"
                            type="url"
                            placeholder="Song URL for upload"
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />

                        <label className="song-create-label">Release Date</label>
                        <input
                            className="song-create-input"
                            type="date"
                            placeholder="Release Date"
                            onChange={(e) => setReleaseDate(e.target.value)}
                            max={new Date().toISOString().split("T")[0]}
                            required
                        />
                        <label className="song-create-label">Genre</label>
                        <select className="song-create-input" value={genre} onChange={(e) => setGenre(e.target.value)} required>
                            <option value="">--Please choose a genre--</option>
                            <option value="hip-hop">Hip Hop</option>
                            <option value="rap">Rap</option>
                            <option value="rock">Rock</option>
                            <option value="pop">Pop</option>
                        </select>
                        <button
                            className="song_create_button"
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
