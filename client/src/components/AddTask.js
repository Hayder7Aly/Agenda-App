import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GET_TASKS} from "../pages/Home";

const ADD_TASK = gql`
  mutation AddTask($input: TaskInput!) {
    addTask(input: $input) {
      title
      content
      createdAt
      username
    }
  }
`;

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
  });

  const [newTask, task] = useMutation(ADD_TASK, {
    update(cache, {data: {addTask}}){
      console.log("add : ", addTask )

      const {getTasks} = cache.readQuery({query: GET_TASKS})
      cache.writeQuery({
        query: GET_TASKS,
        data: {getTasks: [addTask, ...getTasks]}
      })
      // console.log("GetTasks : ", getTasks);
    }
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    newTask({
      variables: {
        input: taskData
      }
    });
  };

  return (
    <>
      <form style={{ width: "50%", margin: "auto" }} onSubmit={handleAddTask}>
        <label htmlFor="psw-repeat">
          <b>Title</b>
        </label>
        <input
          type="text"
          placeholder="Enter Title"
          name="psw-repeat"
          id="psw-repeat"
          required
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <label htmlFor="email">
          <b>Content</b>
        </label>
        <input
          type="text"
          placeholder="Enter Content"
          name="email"
          id="email"
          required
          onChange={(e) =>
            setTaskData({ ...taskData, content: e.target.value })
          }
        />
        <button type="submit" className="registerbtn" disabled={task.loading}>
          Add Task
        </button>
      </form>
    </>
  );
};

export default AddTask;
