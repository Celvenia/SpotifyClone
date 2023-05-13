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
  const currentUserObj = useSelector(state => state.userReducer)
  const currentUser = currentUserObj[currentUserId]
  const { userId } = useParams()
  // const following = useState(state => state.following)

  useEffect(() => {
    dispatch(getFollowers(userId))
    dispatch(getUser(currentUserId))
  }, [dispatch])

  return (
    <div>
      <img className="user-banner" src={currentUser?.banner_image}></img>
      <div>{currentUser?.public_name}</div>
    </div>
  )
}
