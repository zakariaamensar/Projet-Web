import React, { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import AddProjectModal from '../components/Modals/AddProjectModal';
import Header from '../components/Header/Header';
import UpdateProjectModal from '../components/Modals/UpdateProjectModal';



function Projects() {
    const [showMyAddModal, setShowMyAddModal] =useState(false);


    const [projects, setProjects] = useState([
        {
          title: "First Project",
          description: "this is the first project",
          status: "Done",
        },
        {
          title: "Second project",
          description: "this is the second project",
          status: "To Do",
        },
        {
          title: "3rd Project",
          description: "this is the third project",
          status: "In Progress",
        },
      ]);

      const [searchInput, setSearchInput] = useState("");

      const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
      };

      const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchInput.toLowerCase()) || project.description.toLowerCase().includes(searchInput.toLowerCase())
      );

      const handleDeleteProject = (targetIndex) => {
        setProjects(projects.filter((_, idx) => idx !== targetIndex));
      };
    

    
  return (

    <div className='mr-0'>
      <Header/>
      <div className='add-prjctANDsearch w-full pt-6 px-6 m-3 flex justify-between'>
        <div className='search'>
          <form>
                  <input className="searchInput p-2 rounded-lg"
                      placeholder='Search for project'
                      type='text'
                      value={searchInput}
                      onChange={handleSearchChange}
                  />
          </form>
        </div>
        <div className='add-prjct flex justify-center'>
            <button 
                  value="addProject" 
                  onClick={() => {setShowMyAddModal(true)}}
                  className=" bg-white hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-md"
                  >
                  + Add Project
            </button>
        </div>
      </div>
      <div className="table-wrapper w-full p-6 m-3">
        <table className="block overflow-hidden table-fixed border-collapse shadow-lg rounded-lg whitespace-nowrap max-w-full mx-auto overflow-x-auto">
          <thead className="bg-black text-white">
            <tr>
              <th className=''>Name</th>
              <th className="w-full">Description</th>
              <th className=''>Status</th>
              <th className=''>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-gray-200'>
                  <ProjectCard projects={filteredProjects} deleteProject = {handleDeleteProject}/>
          </tbody>
        </table>
      </div>
      <AddProjectModal onClose={(e) => {setShowMyAddModal(false)}} visible={showMyAddModal}/>
    </div>
  )
}

  

export default Projects