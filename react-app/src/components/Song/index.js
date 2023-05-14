import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Song({ song }) {


    return (
        <div key={song.id}>
            <NavLink
                to={`/songs/${song.id}`}
                className="song-link"
                key={song.id}
            >

                <span>
                    {song.title}
                </span>
                <span>
                    {song.release_date}
                </span>
                <span>
                    {song.duration_ms}
                </span>

            </NavLink>
        </div>
    )
}
