import React, { useState } from 'react';
import TaskList from '../Task/TaskList'
import './ProjectDetails.css'
import { FaPencil } from "react-icons/fa6";
import UpdateProjectModal from '../Project/UpdateProjectModal/UpdateProjectModal';
import ProjectInfo from './ProjectInfo';


const ProjectDetails = ({ project, UpdateList, setSelectedProject}) => {
  const [projectStatus, setProjectStatus] = useState('planned')
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!project) {
    return (
      <div className="ProjectDetails empty">
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>Выберите проект</h3>
          <p>Выберите проект из списка слева, чтобы посмотреть подробную информацию</p>
        </div>
      </div>
    );
  }

  const ProjectDelete = async () => {
      const result = confirm('Do you want to delete this project?')
      if (result) {
         const url = `http://127.0.0.1:8000/project/delete?id=${project.id}`
         const response = await fetch(url, {
            method: 'DELETE'
         });
        UpdateList();
        setSelectedProject(null)
      }
   }
   
  return (
    <div className="ProjectDetails">

      <div className="ProjectHeader">
        <div className="ProjectTitle">
          <h1>{project.name}</h1>
          <button className='ProjectUpdateButton' onClick={() => {setIsModalOpen(true)}}><FaPencil size={10}/></button>
          <UpdateProjectModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} project={project} UpdateList={UpdateList} setSelectedProject={setSelectedProject}/>
        </div>
        <button className='ProjectDeleteButton' onClick={ProjectDelete}>DELETE PROJECT</button>
      </div>

      <div className="ProjectContent">
        <ProjectInfo project={project} projectStatus={projectStatus}/>

        <div className="ProjectInfo">
          <TaskList key={project.id} project_id={project.id} setProjectStatus={setProjectStatus}/>
        </div>
      </div>
      
    </div>
  );
};

export default ProjectDetails;