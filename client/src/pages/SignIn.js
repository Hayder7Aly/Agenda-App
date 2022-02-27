import { gql, useLazyQuery } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../utils/ContextProvider'



const SIGNIN_USER = gql`
query LoginUser($username: String!, $password: String!){
  loginUser(username: $username, password: $password) {
    username
    token
    email
  }
}
`


const SignIn = () => {

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })
  const {dispatch, errorInfo} = useContext(Context)

  const navigate = useNavigate()
  
  const [loggedUser] = useLazyQuery(SIGNIN_USER, {
    onError(error){
      dispatch({
        type: "errorMsg",
        payload: {message: error.message}
      })
    },
    onCompleted(data){
      if(!data){
        return
      }
      dispatch({
        type: "login",
        payload: {user: data.loginUser}
      })
      navigate("/")
    }
  })

  // console.log(loggedUserInfo);

  const siginHandler = e => {
    e.preventDefault()
    loggedUser({
      variables: loginData
    })



  }




  return (
    <>
    <form onSubmit={siginHandler}>
      <div className="container">
        <h1 style={{textAlign: "center", padding: "20px 0"}}>SignIn</h1>
        <hr />
          <h1 style={{color: 'red'}}>{errorInfo.error ? errorInfo.errorMsg : null}</h1>
        <label htmlFor="psw-repeat">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="psw-repeat"
          id="psw-repeat"
          required
          onChange={e => setLoginData({...loginData, username: e.target.value})}
        />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
          onChange={e => setLoginData({...loginData, password: e.target.value})}

        />

      
        <hr />


        <button type="submit" className="registerbtn">
          Sigin
        </button>
      </div>

      <div className="container signin">
        <p>
          Do not have an account ? <a href="/register">Register</a>.
        </p>
      </div>
    </form>

    </>
  )
}

export default SignIn