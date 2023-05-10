import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedAlbums } from "../../store/albums";

export default function LikedAlbums() {
  const sessionUser = useSelector(state => state.session.user);
//   const albumsObj = useSelector(state => Object.values(state.albumReducer.liked_albums));
  const albumsObj = useSelector(state => Object.values(state.albumReducer));
//   console.log("line11: ", albumsObj)
  const userId = sessionUser.id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedAlbums(userId));
  }, [dispatch, sessionUser]);

  if (!albumsObj.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <div>
            {albumsObj?.map((el) => {
                // console.log("forEach: ", el)
                return(
                    <div key={el.id} className='albumContainer'>
                        <div>{el.title}</div>
                        <div>{el.cover_art}</div>
                        <div>{el.created_at}</div>
                        <div>{el.created_at}</div>
                        <div>{el.genres}</div>
                        <div>{el.record_label}</div>
                        <div>{el.user_id}</div>
                        <div>{el.url}</div>
                        <div>{el.release_date}</div>
                        <div>{el.id}</div>
                    </div>
                )
            })}

        </div>
    </>
  )
}
