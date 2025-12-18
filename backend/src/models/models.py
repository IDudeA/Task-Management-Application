from enum import Enum
from pydantic import BaseModel
from typing import Optional



"""
Models for Tasks
"""
class TaskStatus(Enum):
    PLANNED = 'planned'
    IN_PROGRESS = 'in_progress'
    READY = 'ready'
 
class TaskBaseModel(BaseModel):
    project_id: int
    title: str
    description: str
    status: TaskStatus

class TaskCreateModel(TaskBaseModel):
    pass

class TaskUpdateModel(TaskBaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None



"""
Models for Projects
"""

class ProjectBaseModel(BaseModel):
    name: str

class ProjectCreateModel(ProjectBaseModel):
    pass 

class ProjectUpdateModel(ProjectBaseModel):
    name: Optional[str] = None

