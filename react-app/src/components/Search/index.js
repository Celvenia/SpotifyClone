import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './Search.css'

export default function Search() {
  return (
    <div className="search-container">
      <div className="search-icon">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <input
        type="text"
        placeholder="What do you want to listen to"
        className="search-input"
      />
    </div>
  )
}