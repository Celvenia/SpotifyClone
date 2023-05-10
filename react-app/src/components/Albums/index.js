import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersLikedAlbums } from "../../store/albums";

function LikedAlbums() {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersLikedAlbums(sessionUser.id));
  }, [dispatch, sessionUser]);

  return (
    <div></div>
  )
}