import React, { useState } from "react";
import ReactModal from "react-modal";
import './UpdateProjectModal.css'


const UpdateProjectModal = ({isOpen, onClose, UpdateList, project, setSelectedProject}) => {

    const SubmitModal = () => {
        const data = {
            name: document.getElementById('new_name').value,
        }
        onClose();
        const ProjectUpdate = async () => {
            const url = `http://127.0.0.1:8000/project/update?id=${project.id}&name=${data.name}`
            const response = await fetch(url, {
                method: 'PUT'
            });
            UpdateList();
            UpdateProject();
        }
        ProjectUpdate();
    }

    const CloseModal = () => {
        onClose();
    }


    const UpdateProject = () => {
        const GetProject = async () => {
            const url = `http://127.0.0.1:8000/project/getProject?id=${project.id}`
            const response = await fetch(url, {
                method: 'GET'
            });
            const result = await response.json();
            setSelectedProject(result[0])
        };
        GetProject();
    }

    return (
        <ReactModal 
            isOpen={isOpen}
            overlayClassName={'modal-overlay'}
            className={'modal-content'}
            ariaHideApp={false}
        >
            <h2 className="ModalTitle">Update Project Data</h2>
            <div className="EnterNewProjectData">
                <input id='new_name' defaultValue={project.name} placeholder="Enter new name: "/>
            </div>
            <button onClick={SubmitModal}>Submit</button>
            <button onClick={CloseModal}>Close</button>
        </ReactModal>
    );
}

export default UpdateProjectModal; 