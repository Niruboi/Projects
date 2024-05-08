import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
  const { currentUser } = useSelector ((state) => state.users);
  return (
    <>
    <h1>
     Home
    </h1>
    { currentUser.email }
    </>
  )
}

export default Home
