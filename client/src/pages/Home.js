import { gql, useQuery } from "@apollo/client";
import React from "react";
import AddTask from "../components/AddTask";
import Task from "../components/Task";


export const GET_TASKS = gql`
  query GetTasks {
    getTasks {
      title
      content
      createdAt
      username
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_TASKS);

  if (error) return <h1>Error is occured</h1>;
  if (loading) return <h1>Loading ...</h1>;

  return (
    <>
      <h1 style={{ textAlign: "center", padding: "20px" }}>Agenda Tasks </h1>
      <AddTask />
      <div
        className="taskContainer"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          margin: "auto",
        }}
      >
        {
              data.getTasks.map((task,i) => <Task key={i} {...task} /> )
          }
      </div>
    </>
  );
};

export default Home;
