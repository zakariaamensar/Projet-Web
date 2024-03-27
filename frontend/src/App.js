import "./App.css"
import AddTaskModal from "./components/Modals/AddTaskModal";

import KanbanBoard from "./components/KanbanBoard";

import Login from "./components/Login/Login";
import EditTaskModal from "./components/Modals/EditTaskModal";
import styles from "./index.css"
import { useState } from "react";


function App() {
  


  const task = {
    title: 'Task Title',
    description: 'Task Description',
    status: 'completed',
    assignedUser: 'John Doe',
};
  return (
    <>
      <KanbanBoard/>
      {/* <Login/> */}
   
      
   
     {/* <EditTaskModal task={task} /> */}
    </>

  );
}

export default App;
