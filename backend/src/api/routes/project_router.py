"""
Router for interact with project endpoints
"""

# Imports
from fastapi import APIRouter, Depends
from sqlalchemy import select, delete
from ...schemas.schemas import ProjectOrm
from ...models.models import ProjectCreateModel, ProjectUpdateModel
from ...core.database import session_fabric
from sqlalchemy import select

# Create router
project_router = APIRouter(prefix='/project', tags=['Project'])


"""
Endpoints
"""
# Create project
@project_router.post(path='/post')
async def ProjectCreate(project: ProjectCreateModel = Depends()):
    new_project = ProjectOrm(
        name = project.name,
    )
    async with session_fabric() as session:
        session.add(new_project)
        await session.commit()
        return {'message': 'Project has been successfully created'}



# Get all projects into user by user_id
@project_router.get(path='/get')
async def ProjectGetAll():
    stmt = select(ProjectOrm)
    async with session_fabric() as session:
        projects = await session.execute(stmt)
        return (projects.scalars().all())
    


@project_router.get(path='/getProject')
async def GetProject(id: int):
    stmt=select(ProjectOrm).where(ProjectOrm.id == id)
    async with session_fabric() as session:
        response = await session.execute(stmt)
        return (response.scalars().all())



# Update project data by id
@project_router.put(path='/update')
async def ProjectUpdate(id: int, project: ProjectUpdateModel = Depends()):
    async with session_fabric() as session:
        project_update = await session.get(ProjectOrm, id)
        update_data = project.model_dump(exclude_none=True)
        for field, value in update_data.items():
            setattr(project_update, field, value)
        await session.commit()
        return project_update



# Delete project by id
@project_router.delete(path='/delete')
async def ProjectDelete(id: int):
    stmt = delete(ProjectOrm).where(ProjectOrm.id == id)
    async with session_fabric() as session:
        await session.execute(stmt)
        await session.commit()
        return {'message': f'Project (id={id}) successfully deleted from database'}