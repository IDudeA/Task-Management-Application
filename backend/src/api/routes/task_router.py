"""
Router for interact with task endpoints
"""

# Imports
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import select
from typing import List

from ...models.models import TaskCreateModel, TaskUpdateModel, TaskResponseModel
from ...schemas.schemas import TaskOrm
from ...core.database import session_fabric

# Create router
task_router = APIRouter(prefix='/tasks', tags=['Tasks'])

"""
Endpoints
"""
@task_router.post(
        path='/', 
        response_model=TaskResponseModel, 
        status_code=status.HTTP_201_CREATED, 
        summary='Create a new task'
    )
async def create_task (task: TaskCreateModel = Depends()):
    """
    Create a new task.
    
    - **title**: Task title
    - **description**: Task description
    - **project_id**: ID of the project this task belongs to
    - **status**: Task status
    """
    new_task = TaskOrm(
        project_id = task.project_id,
        title = task.title, 
        description = task.description, 
        status = task.status
    )
    async with session_fabric() as session:
        session.add(new_task)
        await session.commit()
        await session.refresh(new_task)
        return TaskResponseModel.model_validate(new_task)



@task_router.get(
        path='/',
        response_model=List[TaskResponseModel],
        summary='Get all tasks from project'
    )
async def get_tasks (project_id: int):
    """
    Get all tasks from project.
    
    - **project_id**: ID of project whose tasks need to receive
    """
    stmt = select(TaskOrm).where(TaskOrm.project_id == project_id)
    async with session_fabric() as session:
        result = await session.execute(stmt)
        tasks = result.scalars().all()
        if not tasks:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail=f'Tasks for project with ID {project_id} not found'
            )
        return tasks
    


@task_router.get(
        path='/{task_id}',
        response_model=TaskResponseModel,
        summary='Get task from project'
    )
async def get_task (task_id: int):
    """
    Get task from project.
    
    - **task_id**: ID of task which need to receive
    """
    stmt = select(TaskOrm).where(TaskOrm.id == task_id)
    async with session_fabric() as session:
        result = await session.execute(stmt)
        return (result.scalars().one())
    


@task_router.put(
        path='/{task_id}',
        summary='Update Task data by ID'
    )
async def update_task (task_id: int, task: TaskUpdateModel = Depends()):
    """
    Update Task data by ID.
    
    - **task_id**: ID of task to update
    - **task**: Information for updating the task
    """
    async with session_fabric() as session:
        task_update = await session.get(TaskOrm, task_id)
        update_data = task.model_dump(exclude_none=True)
        for field, value in update_data.items():
            setattr(task_update, field, value)
        await session.commit()
        return task_update



@task_router.delete(
        path='/{task_id}',
        response_model=TaskResponseModel,
        summary='Delete Task by ID'
    )
async def delete_task (task_id: int):
    """
    Delete Task by ID.
    
    - **task_id**: ID of task
    """
    stmt = select(TaskOrm).where(TaskOrm.id == task_id)
    async with session_fabric() as session:
        result = await session.execute(stmt)
        task = result.scalar_one_or_none()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f'Task with ID {task_id} not found'
            )
        await session.delete(task)
        await session.commit()
        return task
