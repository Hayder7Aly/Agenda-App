import React, { useContext } from 'react'
import { Context } from './ContextProvider'
import {Navigate} from "react-router-dom"

const AuthRoute = ({component : Component}) => {
  const {user} = useContext(Context)
  return (
    <>
      {
       user ? <Component /> : <Navigate to ="/sigin" />
      }
    </>
  )
}

export default AuthRoute