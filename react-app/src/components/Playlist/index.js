import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaylist } from "../../store/playlists";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../index.css"
import { getPlaylistSongs } from "../../store/playlistSongs";
import { getUser } from "../../store/users";

export default function Playlist() {
  const dispatch = useDispatch()
  const { playlistId } = useParams();

  const playlistsObj = useSelector(state => state.playlistReducer)
  const currentPlaylist = playlistsObj[playlistId]

  const songsObj = useSelector(state => state.playlistSongsReducer)
  const songsArr = Object.values(songsObj);

  const users = useSelector(state => state.userReducer)
  const userId = currentPlaylist?.['user_id']
  const user = users?.[userId]

  useEffect(() => {
    dispatch(getPlaylist(playlistId))
    dispatch(getPlaylistSongs(playlistId))
    if (currentPlaylist) {
      dispatch(getUser(currentPlaylist['user_id']))
    }
  }, [dispatch, playlistId])


  //   Song(album_id=1, title='Come & Go', duration_ms=229000, url='https://www.youtube.com/watch?v=5ho88VXJTBg', release_date=datetime(2020, 7, 10), genre='Hip Hop'),
  //   {
  //     "created_at": "Wed, 10 May 2023 10:25:59 GMT",
  //     "description": "",
  //     "id": 13,
  //     "is_private": true,
  //     "songs": [
  //         {
  //             "album_id": 1,
  //             "created_at": "Wed, 10 May 2023 10:25:59 GMT",
  //             "duration_ms": 229000,
  //             "genre": "Hip Hop",
  //             "id": 1,
  //             "release_date": "2020-07-10 00:00:00",
  //             "title": "Come & Go",
  //             "updated_at": "Wed, 10 May 2023 10:25:59 GMT",
  //             "url": "https://www.youtube.com/watch?v=5ho88VXJTBg",
  //             "user_id": null
  //         },
  //         {
  //             "album_id": 1,
  //             "created_at": "Wed, 10 May 2023 10:25:59 GMT",
  //             "duration_ms": 239836,
  //             "genre": "Hip Hop",
  //             "id": 2,
  //             "release_date": "2017-06-15 00:00:00",
  //             "title": "Lucid Dreams",
  //             "updated_at": "Wed, 10 May 2023 10:25:59 GMT",
  //             "url": "https://www.youtube.com/watch?v=mzB1VGEGcSU",
  //             "user_id": null
  //         }
  //     ],
  //     "title": "Liked Songs",
  //     "updated_at": "Wed, 10 May 2023 10:25:59 GMT",
  //     "user_id": 5
  // },
  return (

    <div>
      <p>Playlist</p>
      <h1>{currentPlaylist.title}</h1>

      {songsArr.length &&
        songsArr.map((song) =>
          song.id !== undefined ? (
            <div key={song.id}>
              <NavLink
                to={`/songs/${song.id}`}
                className="nav-link"
                key={song.id}
              >
                <span>
                  <div>
                    <img src={user?.profile_picture} className='profile-pic'></img>
                    <div>
                      {song.title}
                    </div>
                    <div>
                       {user?.public_name}
                    </div>
                  </div>
                </span>
              </NavLink>
            </div>
          ) : (
            ""
          )
        )}
    </div>
  )
}