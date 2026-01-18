"""
DataBase config file
"""

# Imports
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker


# Create engine 
engine = create_async_engine(
    url = 'postgresql+asyncpg://postgres:Superdron2005@localhost:5432',
    echo=True,
)

# Create session fabric 
session_fabric = async_sessionmaker(bind=engine)

