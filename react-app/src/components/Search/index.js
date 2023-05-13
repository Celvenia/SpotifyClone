import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSongs } from '../../store/songs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Search.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Search() {
	const dispatch = useDispatch();
	const [state, setstate] = useState({
		query: '',
		list: [],
	});
	const songsObj = useSelector((state) => state.songReducer);
	const songsArr = Object.values(songsObj);
	const [searchInput, setSearchInput] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		const results = songsArr.filter((song) => {
			if (e.target.value === '') return song;
			return song.title
				.toLowerCase()
				.includes(e.target.value.toLowerCase());
		});
		setstate({
			query: e.target.value,
			list: results,
		});
	};

	useEffect(() => {
		dispatch(getSongs());
	}, [dispatch]);

	return (
		<>
			<div className="search-container">
				<div className="search-icon">
					<FontAwesomeIcon icon={faSearch} />
				</div>
				<input
					type="text"
					placeholder="What do you want to listen to"
					className="search-input"
					value={searchInput}
					onChange={handleChange}
				/>
			</div>
			        
			<ul>
				          
				{state.query === ''
					? ''
					: state.list.map((song) => {
							return (
									  <div key={song.title}>{song.title}</div>
							);
					  })}
				        
			</ul>
		</>
	);
}
