"""
Main App
"""

# Imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.task_router import task_router
from .routes.project_router import project_router
from ..core.database import engine
from ..schemas.schemas import Base


# Create and configure the app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Extends app with routes
app.include_router(router=task_router)
app.include_router(router=project_router)






@app.on_event("startup")
async def startup_event():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
