import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import CustomCreateModal from "./CustomCreateModal/CustomCreateModal";
import './TaskList.css'
import { FaPlus } from "react-icons/fa";


const TaskList = ({project_id, setProjectStatus}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [tasks, setTasks] = useState()

    useEffect(() => {
        GetTasks();
    }, []);

    const GetTasks = async () => {
        try {
            const url = `http://127.0.0.1:8000/task/get?project_id=${project_id}`
            const response = await fetch(url)
            const data = await response.json()
            setTasks(data)
            setProjectStatus(checkTasksStatusAlternative(data))
        } catch (err) {
            setError(err);
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    function checkTasksStatusAlternative(tasks) {
        // Проверяем, что массив не пустой
        if (!tasks || tasks.length === 0) {
            return "planned";
        }
        // Проверяем, все ли задачи имеют статус 'planned'
        const allPlanned = tasks.every(task => task.status === 'planned');
        if (allPlanned) {
            return 'planned';
        }
        // Проверяем, все ли задачи имеют статус 'ready'
        const allReady = tasks.every(task => task.status === 'ready');
        if (allReady) {
            return 'ready';
        }
        // Если не все задачи имеют одинаковый статус planned или ready
        return 'in_progress';
    }



    if (loading) {
        return (
            <div>
                LOADING
            </div>  
        )
    } else if (error) {
        return (
            <div>
                ERROR
            </div>  
        )}

    return (
        <div className='TaskList'>
            <div className="TaskListData">
                <h3>📈 Tasks</h3>
                <button className="CreateTaskButton" onClick={() => {setIsModalOpen(true)}}><FaPlus /></button>
            </div>
            <div className="List">
                <CustomCreateModal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false)}} project_id={project_id} UpdateList={GetTasks}/>

                {/* Столбец для запланированных задач */}
                <div className="TaskColumn">
                    <h4>Planned</h4>
                    <div className="TaskColumnContent">
                    {tasks
                        .filter(task => task.status === 'planned')
                        .map(task => (
                        <TaskItem task={task} key={task.id} UpdateTaskList={GetTasks}/>
                        ))
                    }
                    </div>
                </div>

                {/* Столбец для задач в процессе */}
                <div className="TaskColumn">
                    <h4>In Progress</h4>
                    <div className="TaskColumnContent">
                    {tasks
                        .filter(task => task.status === 'in_progress')
                        .map(task => (
                        <TaskItem task={task} key={task.id} UpdateTaskList={GetTasks}/>
                        ))
                    }
                    </div>
                </div>

                {/* Столбец для готовых задач */}
                <div className="TaskColumn">
                    <h4>Ready</h4>
                    <div className="TaskColumnContent">
                    {tasks
                        .filter(task => task.status === 'ready')
                        .map(task => (
                        <TaskItem task={task} key={task.id} UpdateTaskList={GetTasks}/>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default TaskList;