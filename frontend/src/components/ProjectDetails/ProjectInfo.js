import React, { useState } from 'react';
import './ProjectInfo.css'


const ProjectInfo = ({ project }) => {

  return (
    <div className="ProjectInfo">
        <h3>📊 Information about project</h3>
        <div className="InfoGrid">
        <div className="InfoItem">
            <label>ID:</label>
            <span>{project.id}</span>
        </div>
        <div className="InfoItem">
            <label>Status:</label>
            <span className={`InfoStatus ${project.status}`}>{project.status}</span>
        </div>
        <div className="InfoItem">
            <label>Created at:</label>
            <span>{project.updated_at}</span>
        </div>
        </div>
    </div>
  );
};

export default ProjectInfo;