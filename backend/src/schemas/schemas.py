# Imports
from ..models.models import TaskStatus
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase
from sqlalchemy import Enum, ForeignKey
from sqlalchemy.sql import func
from datetime import datetime


class Base(DeclarativeBase):
    pass


class TaskOrm(Base):
    __tablename__ = 'tasks'

    id: Mapped[int] = mapped_column(primary_key=True, unique=True, nullable=False)
    project_id: Mapped[int] = mapped_column(ForeignKey('projects.id', ondelete='CASCADE'), unique=False, nullable=False)
    title: Mapped[str] = mapped_column(unique=False, nullable=False)
    description: Mapped[str] = mapped_column(unique=False, nullable=False)
    status: Mapped[TaskStatus] = mapped_column(Enum(TaskStatus), unique=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now(), nullable=False)
    

class ProjectOrm(Base):
    __tablename__ = 'projects'

    id: Mapped[int] = mapped_column(primary_key=True, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(unique=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now(), nullable=False)
    
