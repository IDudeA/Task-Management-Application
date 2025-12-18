import React, { useState } from "react";
import ReactModal from "react-modal";
import './CreateProjectModal.css'


const CreateProjectModal = ({isOpen, onClose, UpdateList}) => {

    const SubmitModal = () => {
        const data = {
            name: document.getElementById('new_name').value,
        }
        onClose();
        const ProjectCreate = async () => {
            const url = `http://127.0.0.1:8000/project/post?name=${data.name}`
            const response = await fetch(url, {
                method: 'POST'
            });
            UpdateList();
        }
        ProjectCreate();
    }

    const CloseModal = () => {
        onClose();
    }


    return (
        <ReactModal 
            isOpen={isOpen}
            overlayClassName={'modal-overlay'}
            className={'modal-content'}
            ariaHideApp={false}
        >
            <h2 className="Title">Create New Project</h2>
            <div className="EnterNewProjectData">
                <input id='new_name' placeholder="Enter name: "/>
            </div>
            <button onClick={SubmitModal}>Submit</button>
            <button onClick={CloseModal}>Close</button>
        </ReactModal>
    );
}

export default CreateProjectModal; 