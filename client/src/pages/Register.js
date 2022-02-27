import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Context } from "../utils/ContextProvider";
import "./form.css";
import {useNavigate} from 'react-router-dom'

const REGISTER_USER = gql`
  mutation RegisterUser($input: UserInput!) {
    registerUser(input: $input) {
      username
      token
      email
    }
  }
`;

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const { errorInfo, dispatch } = useContext(Context);

  const [createUser, newUser] = useMutation(REGISTER_USER, {
    onError(error){
    dispatch({
      type: "errorMsg",
      payload: { message: error.message },
    });
    },

    onCompleted(data){
      dispatch({type: "register", payload: {user: data.registerUser}})
      navigate("/")
    }
  })



  const registerHandler = (e) => {
    e.preventDefault();
    createUser({
      variables: {input: registerData}
    })

  };

  return (
    <form onSubmit={registerHandler}>
      <div className="container">
        <h1 style={{ textAlign: "center", padding: "20px 0" }}>Register</h1>
        <hr />

        {errorInfo.error ? (
          <>
            {" "}
            <h1 style={{ color: "red" }}>{errorInfo.errorMsg}</h1> <hr />{" "}
          </>
        ) : null}

        <label htmlFor="psw-repeat">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="psw-repeat"
          id="psw-repeat"
          required
          onChange={(e) =>
            setRegisterData({ ...registerData, username: e.target.value })
          }
        />
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
          onChange={(e) =>
            setRegisterData({ ...registerData, email: e.target.value })
          }
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
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />

        <hr />
        <p>
          By creating an account you agree to our{" "}
          <a href="/home">Terms & Privacy</a>.
        </p>

        <button type="submit" className="registerbtn" disabled={newUser.loading}>
          Register
        </button>
      </div>

      <div className="container signin">
        <p>
          Already have an account? <a href="/sigin">Sign in</a>.
        </p>
      </div>
    </form>
  );
};

export default Register;
