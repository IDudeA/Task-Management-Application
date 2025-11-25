import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/SideBar/Sidebar';
import ProjectDetails from './components/ProjectDetails/ProjectDetails';


// Главный компонент приложения
const App = () => {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null);
  
  
  useEffect(() => {
          GetProjects();
      }, [])
  
  const GetProjects = async() => {
      try {
          const url = `http://127.0.0.1:8000/project/get`
          const response = await fetch(url)
          const result = await response.json()
          setProjects(result)
      } catch (err) {
          console.error(err)
      }
  }



  return (
    <div className="App">
      <Sidebar
        projects={projects}
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
        GetProjects={GetProjects}
      />
      <ProjectDetails project={selectedProject} UpdateList={GetProjects} setSelectedProject={setSelectedProject}/>
    </div>
  );
};

export default App;