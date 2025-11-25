import React, { useState } from 'react';
import './Sidebar.css';
import CreateProjectModal from '../Project/CreateProjectModal/CreateProjectModal'
import { GoProjectRoadmap } from "react-icons/go";

const Sidebar = ({ projects, selectedProject, onProjectSelect, GetProjects }) => {
    const [isProjectSOpen, setIsProjectSOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="Sidebar">
            <div className="SidebarHeader">
                <h2>Menu</h2>
            </div>

            <div className="SidebarSection">
                <div
                    className="SectionHeader"
                    onClick={() => setIsProjectSOpen(!isProjectSOpen)}
                >
                    <div className="SectionTitle">
                        <span className="icon"><GoProjectRoadmap /></span>
                        <span>Projects</span>
                    </div>
                    <span className={`SectionProjectArrow ${isProjectSOpen ? 'open' : ''}`}>▶</span>
                </div>

                {isProjectSOpen && (
                    <div className="ProjecstList">
                        {projects.map(project => (
                            <div
                                key={project.id}
                                className={`ProjectItem ${selectedProject?.id === project.id ? 'selected' : ''}`}
                                onClick={() => onProjectSelect(project)}
                            >
                                <div className="ProjectInfo">
                                    <div className="ProjectName">{project.name}</div>
                                </div>
                            </div>
                        ))}
                        <button onClick={() => {setIsModalOpen(true)}}>Создать проект</button>
                        <CreateProjectModal 
                            isOpen={isModalOpen} 
                            onClose={() => {setIsModalOpen(false)}} 
                            UpdateList={GetProjects}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;