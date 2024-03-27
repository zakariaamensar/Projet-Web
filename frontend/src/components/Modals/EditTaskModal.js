import React, { useEffect, useState } from 'react';

import {Avatar} from "antd";
import CommentCard from '../CommentCard';

function EditTaskModal({ task, onSave,visible, onClose }) {

    

    const [users, setUsers] = useState([]);
    const commentsData = [
        {
            content:"Your comment content",
            createdAt: "Yesterday at 4:00pm",
            author:"Abdellah",
            task:""
        },
    ];
    // for update task section 
    // const [id, setId] = useState(task.id);
    const id = task.id;
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState("this task does not have any description");
    const [status, setStatus] = useState(task.completed);
    const [assignedUser, setAssignedUser] = useState("");

    //for comments section
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users/")
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
            
    }, []);

    useEffect(() => {
        if (task.id) {
            const user = users.find(user => user.id === task.id);
            if (user) {
                setAssignedUser(user.name);
            }
        }
    }, [assignedUser,task.id, users]);
    

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...task,
            title,
            description,
            status,
            assignedUser,
        };
        onSave(updatedTask);
    };

    const handleDeleteTask = (e) => {
        e.preventDefault()
        
        onClose(); //close the model after deleting the task!
    }

    const handleAddComment = (e) => {
        e.preventDefault();
        const newCommentData = {
          content: newComment,
          createdAt: new Date().toLocaleString(),
          author: "Abdellah",
          task: ""
        };
        setComments([...comments, newCommentData]);
        setNewComment(''); 
      };

      const handleOnClose = (e) => {
        if (e.target.id === "container") onClose();
      }
  


    if (!visible) return null;

    return (
        <div  
            className='fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm grid grid-cols-2 gap-0'
            onClick={handleOnClose}
        >
            <section id='container' className="updateTask flex flex-col justify-center items-center h-screen text-white">
                <div className='bg-black p-9 w-96'>
                    <h1 className='text-3xl mt-0 mb-6 pb-3 flex justify-center border-b-2 border-t-gray-400'>Update Task</h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input focus:outline-none mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2 focus:outline-none"
                        >
                            <option value="false">To Do</option>
                            <option value="true">Done</option>
                            <option value="inReview">In review</option>
                            <option value="backlog">Backlog</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Assigned User</label>
                        <div className="flex items-center bg-MyGray mt-1 mb-4 rounded-md">
                            <Avatar
                                src={"https://joesch.moe/api/v1/random?key="+ id}                  
                            />
                            <input
                                type="text"
                                value={assignedUser}
                                onChange={(e) => setAssignedUser(e.target.value)}
                                className="bg-MyGray flex-grow rounded-md  px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className='flex justify-center justify-between'>
                        <button
                            onClick={handleSubmit}
                            className="bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleDeleteTask}
                            className="bg-red-600 hover:bg-red-300 text-white font-semibold py-2 px-4 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </section>
            <section id='container' className='comments flex flex-col justify-center items-center h-screen text-white'>
                <div className='bg-black p-9 w-96 min-h-96 overflow-y-auto'>
                    <h1 className='text-3xl mt-0 mb-6 pb-3 flex justify-center border-b-2 border-t-gray-400'>Comments</h1>
                    <div className='block'>
                          <CommentCard comments={comments} />
                        <div className='add-comment bg-MyGray flex justify-between rounded-md mt-9 bottom-0'>
                            <input
                                className='form-input focus:outline-none'
                                type='text'
                                placeholder='write your comment'
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button 
                                type='submit' 
                                className='bg-white hover:bg-gray-400 text-black rounded-md m-4 p-2'
                                onClick={handleAddComment}
                            >
                                Send
                            </button>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    );
}

export default EditTaskModal;
