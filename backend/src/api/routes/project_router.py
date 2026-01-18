"""
Router for interact with project endpoints
"""

# Imports
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy import select
from typing import List

from ...schemas.schemas import ProjectOrm
from ...models.models import ProjectCreateModel, ProjectUpdateModel, ProjectResponseModel
from ...core.database import session_fabric

# Create router
project_router = APIRouter(prefix='/projects', tags=['Projects'])

"""
Endpoints
"""
@project_router.post(
        path='/',
        # response_model=ProjectResponseModel,
        status_code=status.HTTP_201_CREATED,
        summary='Create a project'
    )
async def create_project (project: ProjectCreateModel = Depends()):
    """
    Create a project.
    
    - **project**: Name of new project
    """
    new_project = ProjectOrm(
        name = project.name,
    )
    async with session_fabric() as session:
        session.add(new_project)
        await session.commit()
        await session.refresh(new_project)
        return ProjectResponseModel.model_validate(new_project)



@project_router.get(
        path='/',
        response_model=List[ProjectResponseModel],
        summary='Get all projects'
    )
async def get_projects ():
    """
    Get all projects.
    """
    stmt = select(ProjectOrm)
    async with session_fabric() as session:
        projects = await session.execute(stmt)
        return (projects.scalars().all())



@project_router.get(
        path='/{project_id}',
        response_model=ProjectResponseModel,
        summary='Get project by ID'
    )
async def get_project (project_id: int):
    """
    Get project by ID.
    
    - **project_id**: ID for project which need to recieve
    """
    stmt=select(ProjectOrm).where(ProjectOrm.id == project_id)
    async with session_fabric() as session:
        response = await session.execute(stmt)
        return (response.scalars().one())



@project_router.put(
        path='/{project_id}',
        summary='Update Project data by ID'
    )
async def update_project (project_id: int, project: ProjectUpdateModel = Depends()):
    """
    Update Project data by ID.
    
    - **project_id**: ID of project to update
    - **project**: Information for updating the project
    """
    async with session_fabric() as session:
        project_update = await session.get(ProjectOrm, project_id)
        update_data = project.model_dump(exclude_none=True)
        for field, value in update_data.items():
            setattr(project_update, field, value)
        await session.commit()
        return project_update



@project_router.delete(
        path='/{project_id}',
        response_model=ProjectResponseModel,
        summary='Delete project by ID'
    )
async def delete_project (project_id: int):
    """
    Delete project by ID.
    
    - **project_id**: ID of project
    """
    stmt = select(ProjectOrm).where(ProjectOrm.id == project_id)
    async with session_fabric() as session:
        result = await session.execute(stmt)
        project = result.scalars().one_or_none()
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Project with ID {project_id} not found'
            )
        await session.delete(project)
        await session.commit()
        return project