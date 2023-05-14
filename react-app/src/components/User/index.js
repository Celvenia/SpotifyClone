import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFollowers } from '../../store/followers'
import { getUser } from '../../store/users'
import "./User.css"

export default function User() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const currentUserId = sessionUser?.id
  const followersObj = useSelector(state => state.followerReducer)
  const followersArr = Object.values(followersObj)
  const pageUserObj = useSelector(state => state.userReducer)
  const { userId } = useParams()
  const pageUser = pageUserObj[userId]
  // const following = useState(state => state.following)

  useEffect(() => {
    dispatch(getFollowers(userId))
    dispatch(getUser(userId))
  }, [dispatch])

  return (
    <>
      <div className="user-banner-container">
        <img className="user-banner" src={pageUser?.banner_image}></img>
      </div>
      <h1>{pageUser?.public_name}</h1>
    </>
  )
}
