import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../utils/ContextProvider";

const Header = () => {
  const {user,  dispatch} = useContext(Context);

  const style = {textDecoration: "none", fontSize: "20px", color: "white"}




  return (
    <>
      <header>
        <div className="logo">
          <h1>Hayder's Agenda</h1>
        </div>
        <div className="options">
          {user ? (
            <>
              <div className="option">
                <Link to="/" style={style}>Home</Link>
              </div>
              <div className="option">
                <button onClick={() => {
                  <Navigate to="/signin" />
                  dispatch({type: "logout"})}}>Logout</button>
              </div>
            </>
          ) : null}
          {user ? null : (
            <>
              {" "}
              <div className="option">
                <Link to="/register" style={style}>Register</Link>
              </div>
              <div className="option">
                <Link to="/sigin" style={style}>Sigin</Link>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
