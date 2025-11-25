import React, { useState } from "react";
import './CustomCreateModal.css'
import ReactModal from "react-modal";


const CustomCreateModal = ({isOpen, onClose, project_id, UpdateList}) => {
    const [status, setStatus] = useState('planned');

    const CloseModal = () => {
        onClose();
    }

    const SubmitModal = () => {
        const data = {
            title: document.getElementById('new_title').value,
            description: document.getElementById('new_description').value,
            status: document.getElementById('new_status').value,
        }
        onClose();
        const TaskCreate = async () => {       
            const url = `http://127.0.0.1:8000/task/post?project_id=${project_id}&title=${data.title}&description=${data.description}&status=${data.status}`
            const response = await fetch(url, {
                method: 'POST'
            });
            UpdateList();
        }
        TaskCreate();
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <ReactModal 
            isOpen={isOpen}
            overlayClassName={'modal-overlay'}
            className={'modal-content'}
            ariaHideApp={false}
        >
            <h2 className="ModalTitle">Create New Task</h2>
            <div className="EnterNewTaskData">
                <input id='new_title' placeholder="Enter title: "/>
                <input id='new_description' placeholder="Enter description: "/>
                <select 
                    id="new_status" 
                    value={status}
                    onChange={handleStatusChange}
                    >
                    <option value="planned">Planned</option>
                    <option value="in_progress">In Progress</option>
                    <option value="ready">Ready</option>
                </select>
            </div>
            <button className="submit_modal" onClick={SubmitModal}>Submit</button>
            <button className="close_modal" onClick={CloseModal}>Close</button>
        </ReactModal>
    );
}

export default CustomCreateModal;