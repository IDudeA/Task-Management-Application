"""
Router for interact with task endpoints
"""

# Imports
from fastapi import APIRouter, Depends
from ...models.models import TaskCreateModel, TaskUpdateModel
from ...schemas.schemas import TaskOrm
from ...core.database import session_fabric
from sqlalchemy import select, delete

# Create router
task_router = APIRouter(prefix='/task', tags=['Task'])


"""
Endpoints
"""
# Create task
@task_router.post(path='/post')
async def TaskCreate(task: TaskCreateModel = Depends()):
    new_task = TaskOrm(
        project_id = task.project_id,
        title = task.title, 
        description = task.description, 
        status = task.status
    )
    async with session_fabric() as session:
        session.add(new_task)
        await session.commit()
        return {'message': 'Task has been successfully created'}


# Get all tasks into project by project_id
@task_router.get(path='/get')
async def TaskGetAll(project_id: int):
    stmt = select(TaskOrm).where(TaskOrm.project_id == project_id)
    async with session_fabric() as session:
        result = await session.execute(stmt)
        
        return (result.scalars().all())
    

# Update task data by id
@task_router.put(path='/update')
async def TaskUpdate(id: int, task: TaskUpdateModel = Depends()):
    async with session_fabric() as session:
        task_update = await session.get(TaskOrm, id)
        update_data = task.model_dump(exclude_none=True)
        for field, value in update_data.items():
            setattr(task_update, field, value)
        await session.commit()
        return {'message': f'Task (id={id}) successfully updated'}


# Delete task by id
@task_router.delete(path='/delete')
async def TaskDelete(id: int):
    stmt = delete(TaskOrm).where(TaskOrm.id == id)
    async with session_fabric() as session:
        await session.execute(stmt)
        await session.commit()
        return {'message': f'Task (id={id}) successfully deleted from database'}