from ..config import config
from langchain.vectorstores.chroma import ChromaDB
from langchain.llms.langchain import LangChain

class SurveyAnalysisAgent:
    def __init__(self):
        self.langchain = LangChain()
        self.db = ChromaDB(config)

    def analyze_and_store_goals(self, survey_data):
        # Analyze survey data using LangChain
        goals = self.langchain.analyze_survey_data(survey_data)
        
        # Store goals in ChromaDB
        self.db.store_goals(goals)

    def analyze_survey_data(self, survey_data):
        # Analyze survey data using LangChain
        goals = self.langchain.analyze_survey_data(survey_data)
        return goals

    def generate_daily_tasks(self, goals):
        # Generate daily tasks using LangChain
        tasks = self.langchain.generate_daily_tasks(goals)
        return tasks

    def calculate_task_completion_percentage(self, user_id):
        # Retrieve user's tasks from ChromaDB
        tasks = self.db.retrieve_tasks(user_id)

        # Calculate task completion percentage
        completed_tasks = [task for task in tasks if task['status'] == 'completed']
        completion_percentage = len(completed_tasks) / len(tasks) * 100

        return completion_percentage

