"""
DataBase config file
"""

# Imports
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
import os


# Create engine 
engine = create_async_engine(
    url = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:Superdron2005@db:5432"),
    echo=True,
)

# Create session fabric 
session_fabric = async_sessionmaker(bind=engine)

