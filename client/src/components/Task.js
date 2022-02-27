import React from 'react'
import moment from "moment"

const Task = ({title, content, createdAt, username}) => {
  
  
  return (
    <>
        <div className="box">
            <h1 className="title">
                {title}
            </h1>
            <p className="content">
              {content}
            </p>
            <div className="info">
            <p>
                <b>{moment(createdAt).fromNow()}</b>
            </p>
            <p>{username}</p>
            </div>
        </div>
    </>
  )
}

export default Task