import React, { useState } from "react";
import './TaskItem.css'
import CustomEditModal from "./CustomEditModal/CustomEditModal";
import { LuPencil } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";



const TaskItem = ({task, UpdateTaskList}) => {
   const [isModalOpen, setIsModalOpen] = useState(false)


   const TaskDelete = async () => {
      const result = confirm('Do you want to delete this task?')
      if (result) {
         const url = `http://127.0.0.1:8000/task/delete?id=${task.id}`
         const response = await fetch(url, {
            method: 'DELETE'
         });
         UpdateTaskList();
      }
   }     




    return (
        <div className='TaskCard' data-status={task.status}>
         <div className='TaskCardHeader'>
            <p>{task.title}</p>
            <p>{task.description}</p>
         </div>
         <div className='TaskButtons'>
            <button className='TaskDeleteButton' onClick={TaskDelete}><MdOutlineDelete/></button>
            <button className='TaskEditButton' onClick={() => {setIsModalOpen(true)}}><LuPencil/></button>
            <CustomEditModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} task={task} UpdateTaskList={UpdateTaskList}/>
         </div>
         <div className='TaskDatetime'>
            <p>Updated last time: {task.updated_at}</p>
         </div>
        </div>

        
    );
}

export default TaskItem;