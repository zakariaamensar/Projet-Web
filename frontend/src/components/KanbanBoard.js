import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from "./Column";
import Header from "./Header/Header";

function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [inReview, setInReview] = useState([]);
    const { projectId } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8080/Project/${projectId}/tasks`,{
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        })
        .then((response) => response.json())
        .then((json) => {
            // Filter tasks based on their status
            setIncomplete(json.filter((task) => task.etatStatus === "TODO"));
            setCompleted(json.filter((task) => task.etatStatus === "DONE"));
            setInReview(json.filter((task) => task.etatStatus === "IN REVIEW"));
            setBacklog(json.filter((task) => task.etatStatus === "BACKLOG"));
        });
    }, []);

    useEffect(() => {
        // Update tasks in the backend when the local state changes
        updateTasks(completed, "DONE");
        updateTasks(incomplete, "TODO");
        updateTasks(backlog, "BACKLOG");
        updateTasks(inReview, "INREVIEW");
    }, [completed, incomplete, backlog, inReview]);

    const updateTasks = (tasks, etatStatus) => {
        tasks.forEach(task => {
            fetch(`http://localhost:8080/tasks/${task._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ etatStatus })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update task');
                }
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
        });
    };

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || source.droppableId === destination.droppableId) return;

        const task = findItemById(draggableId);

        // Remove the task from the source column
        deletePreviousState(source.droppableId, draggableId);

        // Add the task to the destination column
        setNewState(destination.droppableId, task);
    }

    function deletePreviousState(sourceDroppableId, taskId) {
        switch (sourceDroppableId) {
            case "1":
                setIncomplete(prevState => removeItemById(taskId, prevState));
                break;
            case "2":
                setCompleted(prevState => removeItemById(taskId, prevState));
                break;
            case "3":
                setInReview(prevState => removeItemById(taskId, prevState));
                break;
            case "4":
                setBacklog(prevState => removeItemById(taskId, prevState));
                break;
            default:
                break;
        }
    }

    function setNewState(destinationDroppableId, task) {
        switch (destinationDroppableId) {
            case "1":   // TO DO
                setIncomplete(prevState => [task, ...prevState]);
                break;
            case "2":  // DONE
                setCompleted(prevState => [task, ...prevState]);
                break;
            case "3":  // IN REVIEW
                setInReview(prevState => [task, ...prevState]);
                break;
            case "4":  // BACKLOG
                setBacklog(prevState => [task, ...prevState]);
                break;
            default:
                break;
        }
    }

    function findItemById(id) {
        return [...incomplete, ...completed, ...inReview, ...backlog].find((item) => item._id === id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item._id !== id);
    }

  return (
        <>
         <Header />
            <DragDropContext onDragEnd={handleDragEnd}>
                <h2 style={{ textAlign: "center", color: "#ffff", margin: "25px" }}>KANBAN BOARD</h2>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "20px" }}>
                    <Column title={"TO DO"} tasks={incomplete} id={"1"} />
                    <Column title={"DONE"} tasks={completed} id={"2"} />
                    <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
                    <Column title={"BACKLOG"} tasks={backlog} id={"4"} />
                </div>
            </DragDropContext>
        </>

  )
}


export default KanbanBoard




