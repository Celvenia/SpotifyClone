import React from "react";
import PlaylistSong from "../PlaylistSong";

export default function PlaylistSongs({ songs }) {

    return (
        <>
            <div>Songs</div>
            {songs.map((song) => (
                <div key={song.id}>
                    <PlaylistSong song={song}/>
                </div>
            ))}

        </>
    );
}





