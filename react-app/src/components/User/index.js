import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFollowers } from '../../store/followers'
import { useParams } from 'react-router-dom'

export default function User() {
    const dispatch = useDispatch()
    const followers = useSelector(state => state.followerReducer)
    const { id } = useParams()
    // const following = useState(state => state.following)

    useEffect(()=> {
      if(id) {
        dispatch(getFollowers(id))
      }
    },[dispatch, id])

  return (
    <div>User</div>
  )
}
