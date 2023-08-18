import os

class Config:
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    FLASK_APP = os.environ.get('FLASK_APP') or 'main.py'
    FLASK_ENV = os.environ.get('FLASK_ENV') or 'development'

    # Langchain configuration
    LANGCHAIN_HOST = os.environ.get('LANGCHAIN_HOST') or 'localhost'
    LANGCHAIN_PORT = os.environ.get('LANGCHAIN_PORT') or 5000

    # Chroma DB configuration
    CHROMADB_URI = os.environ.get('CHROMADB_URI') or 'mongodb://localhost:27017/myDatabase'
    CHROMADB_USERNAME = os.environ.get('CHROMADB_USERNAME') or 'user'
    CHROMADB_PASSWORD = os.environ.get('CHROMADB_PASSWORD') or 'pass'
