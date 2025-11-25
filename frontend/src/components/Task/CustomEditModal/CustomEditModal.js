import React, { useState } from "react";
import './CustomEditModal.css'
import ReactModal from "react-modal";


const CustomEditModal = ({isOpen, onClose, task, UpdateTaskList}) => {
    const [status, setStatus] = useState(task.status);

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
        const TaskUpdate = async () => {
            const url = `http://127.0.0.1:8000/task/update?id=${task.id}&project_id=${task.project_id}&title=${data.title}&description=${data.description}&status=${data.status}`
            const response = await fetch(url, {
                method: 'PUT'
            });
            UpdateTaskList();
        }    
        TaskUpdate();
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
            <h2 className="UpdateTaskData">Update Task Data</h2>
            <div className="EnterNewTaskData">
                <input id='new_title' defaultValue={task.title} placeholder="Enter new title: "/>
                <input id='new_description' defaultValue={task.description} placeholder="Enter new description: "/>
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

export default CustomEditModal;