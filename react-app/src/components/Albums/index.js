import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLikedAlbums } from "../../store/albums";

function LikedAlbums() {
  const sessionUser = useSelector(state => state.session.user);
  const userId = sessionUser?.id
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLikedAlbums(userId));
  }, [dispatch, sessionUser]);

  return (
    <div></div>
  )
}