import React, { createContext, useReducer } from 'react'
export const Context = createContext()

const token = localStorage.getItem("jwt-token-agenda")

const initialState = {
    user: token ? true : false,
    error: false,
    errorMsg: ""
}

const reducer = (state, action) => {
    switch(action.type){
        case "register":
            localStorage.setItem('jwt-token-agenda', action.payload.user.token)
            return {user: action.payload.user.username, error: false, errorMsg: ""}
        case "login":
            localStorage.setItem('jwt-token-agenda', action.payload.user.token)
            return {user: action.payload.user.username, error: false, errorMsg: ""}
        case "logout":
            localStorage.removeItem("jwt-token-agenda")
            return {user: null, error: false, errorMsg: ""}
        case "errorMsg":
            return {...state, error: true, errorMsg: action.payload.message}
        default : 
            return state
    }
}

const ContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    
  return (
    <Context.Provider value={{user: state.user, errorInfo: {error: state.error, errorMsg: state.errorMsg}, dispatch}}>
        {children}
    </Context.Provider>
  )
}

export default ContextProvider