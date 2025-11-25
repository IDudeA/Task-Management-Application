FROM python:3.11-slim

WORKDIR /app

COPY ./src/ /app/src

RUN pip install uvicorn[standard]
RUN pip install fastapi
RUN pip install sqlalchemy
RUN pip install asyncpg
RUN pip install authx



CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8000"]