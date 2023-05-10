import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikedAlbums } from '../../store/albums';
import { NavLink } from "react-router-dom";

export default function LikedAlbums() {
	const sessionUser = useSelector((state) => state.session.user);
	//   const albumsObj = useSelector(state => Object.values(state.albumReducer.liked_albums));
	const albumsObj = useSelector((state) => Object.values(state.albumReducer));
	//   console.log("line11: ", albumsObj)

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLikedAlbums(sessionUser.id));
	}, [dispatch, sessionUser]);

	if (!albumsObj.length) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div>
				{albumsObj?.map((album) => {
					// console.log("forEach: ", el)
					return (
						<div key={album.id} className="albumContainer">
							<NavLink
								to={`/albums/${album.id}`}
								className="nav_link"
								key={album.id}
							>
								<div>{album.cover_art}</div>
								<div>{album.title}</div>
								{/* <div>{album.user_id}</div> */}
							</NavLink>
						</div>
					);
				})}
			</div>
		</>
	);
}
