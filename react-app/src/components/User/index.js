import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFollowers } from '../../store/followers'
import { getUser } from '../../store/users'
import "./User.css"
import { followUser, unfollowUser } from '../../store/followers'


export default function User() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const currentUserId = sessionUser?.id
  const followersObj = useSelector(state => state.followerReducer)
  const followersArr = Object.values(followersObj)
  const pageUserObj = useSelector(state => state.userReducer)
  const { userId } = useParams()
  const pageUser = pageUserObj[userId]


  const handleFollowClick = async (e) => {
    e.preventDefault()
    if (!sessionUser) alert("Log in to Follow")

    try {
      if (userId && userId !== 0) {
        await dispatch(followUser(userId))
        await dispatch(getFollowers(userId))
      }
    } catch (err) {
      alert(err)
    }
  }

  const handleUnfollowClick = async (e) => {
    e.preventDefault()

    try {
      if (userId && userId !== 0) {
          await dispatch(unfollowUser(userId))
          await dispatch(getFollowers(userId))
      }
    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    if (userId && userId !== 0) {
      dispatch(getFollowers(userId))
      dispatch(getUser(userId))
    }
  }, [dispatch, userId])

  return (
    <>
      <div className="user-banner-container">
        <img alt="banner" className="user-banner" src={pageUser?.banner_image}></img>
      </div>
      <div className="user-info-container">
        <div className="user-profile-image-container">
          <img alt="user profile" className="user-profile-image" src={pageUser?.profile_image}></img>
        </div>
        <div className="user-info">
          <h1>{pageUser?.public_name}</h1>
          <div>{followersArr.length ? `${followersArr.length} Followers` : currentUserId === userId ? "" : "Be the first to follow!"}</div>
          {currentUserId === userId ? "" : followersObj[currentUserId] ?
            <button className="unfollow-button" onClick={handleUnfollowClick}>Following</button>
            :
            <button className="follow-button" onClick={handleFollowClick}>Follow</button>
          }
        </div>
      </div>
      <div className="user-tabs">
        <ul>
          <button>Overview</button>
          <button>Related Artists</button>
          <button>Top Tracks</button>
          <button>Albums</button>
          <button>Singles and EPs</button>
          <button>Appears On</button>
          <button>Compilations</button>
        </ul>
      </div>
      <div className="user-content">
      </div>
    </>
  )
}
