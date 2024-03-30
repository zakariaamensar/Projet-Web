import "./App.css"
import AddTaskModal from "./components/Modals/AddTaskModal";

import KanbanBoard from "./components/KanbanBoard";

import Login from "./components/Login/Login";
import EditTaskModal from "./components/Modals/EditTaskModal";
import styles from "./index.css"
import { useState } from "react";
import Projects from "../src/pages/Projects";
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Header from "./components/Header/Header";


function App() {
  


  const task = {
    title: 'Task Title',
    description: 'Task Description',
    status: 'completed',
    assignedUser: 'John Doe',
};
  return (
    <Router>
      {/* <KanbanBoard/> */}
      {/* <Login/> */}
      
      <Routes>
        <Route exact path='/projects' element={ <Projects/> }/>
        <Route exact path="/kanban" element={<KanbanBoard/>}/>
      </Routes>
     
   
     {/* <EditTaskModal task={task} /> */}
    </Router>

  );
}

export default App;
