import React from 'react';

function AddProjectModal({visible, onClose}) {
    if (!visible) return null;

    const handleOnClose = (e) => {
      if (e.target.id === "container") onClose();
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const projectData = {
          title: formData.get('ProjectTitle'),
          description: formData.get('ProjectDesc'),
          status: formData.get('status'),
      };
      console.log('New Project Data:', projectData);
      
      onClose(); // Close the modal after submitting
  }
    return (
      <div 
        id='container' 
        onClick={handleOnClose}
        className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col justify-center items-center h-screen text-white"
      >
        <div className='bg-black p-9 rounded-2xl w-96'>
        <h1 className='text-3xl mt-0 mb-6 pb-3 flex justify-center border-b-2 border-t-gray-400'>Add New Project</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
                    name='ProjectTitle'
                    className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                    type="text"
                    placeholder="Your Project Title"
                    required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
                	name='ProjectDesc'
                    className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"               
                    type="text"
                    placeholder="Enter your Project description here"
                    required
            />
          </div>
          <div className="mb-9">
              <label className="block text-sm font-medium">Status</label>
              <select 
                name="status" 
                id="Projects"
                className="form-input mt-1 block w-full border border-gray-400 rounded-md px-3 py-2"
                required
                >
                  <option value="To Do">To Do</option>
                  <option value="Done">Done</option>
                  <option value="In Progress">In Progress</option>
              </select>
          </div>
          <div className='flex justify-center'>
              <button 
                type='submit' 
                value="addProject" 
                className=" bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                >
                Add Project
              </button>
          </div>          

          </form>
          </div>            
      </div>
    );
}

export default AddProjectModal;

