# Imports
from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

"""
Base models
"""
class BaseResponseModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)



"""
Models for Tasks
"""
class TaskStatus(Enum):
    PLANNED = 'planned'
    IN_PROGRESS = 'in_progress'
    READY = 'ready'

class TaskBaseModel(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(max_length=1000)
    project_id: int
    status: TaskStatus = TaskStatus.PLANNED

class TaskCreateModel(TaskBaseModel):
    pass

class TaskUpdateModel(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = Field(None, max_length=1000)
    status: Optional[TaskStatus] = None

class TaskResponseModel(BaseResponseModel):
    id: int
    project_id: int
    title: str
    description: str
    status: TaskStatus
    created_at: datetime
    updated_at: datetime



"""
Models for Projects
"""

class ProjectBaseModel(BaseModel):
    name: str = Field(min_length=1, max_length=100)

class ProjectCreateModel(ProjectBaseModel):
    pass

class ProjectUpdateModel(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)

class ProjectResponseModel(BaseResponseModel):
    id: int
    name: str
    created_at: datetime
    updated_at: datetime