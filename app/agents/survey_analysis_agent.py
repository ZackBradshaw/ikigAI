import chromadb
from langchain import OpenAI
from agentmemory import (
    create_memory,
    get_memories,
    update_memory
)

from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)


class SurveyAnalysisAgent:
    def __init__(self):
        self.langchain = OpenAI()
        self.db = chromadb.HttpClient(
            host="localhost", port=8000)

    def analyze_and_store_goals(self, survey_data):
        # Analyze survey data using LangChain

        with open('templates/survey_analysis.txt', 'r') as file:
            self.prompt_template = file.read()

        prompt = self.prompt_template.format(survey_data=survey_data)

        print("Survey Data:", survey_data)
        print("Constructed Prompt:", prompt)

        return prompt
        # goals = self.analyze_survey_data(prompt)

        # print("AI Response:", goals, flush=True)  # Print AI's response

        # Store goals using AgentMemory
        # for goal in goals:
        # create_memory(category="goal", text="Goals",
        #   metadata={"goal": goal})
        # return "[{goals}]"

    def analyze_survey_data(self, survey_data):
        # Analyze survey data using LangChain
        goals = self.langchain.predict(survey_data)
        return goals

    def generate_daily_tasks(self, goals):
        # Generate daily tasks using LangChain
        tasks = self.langchain.generate_daily_tasks(goals)
        return tasks

    def calculate_task_completion_percentage(self, user_id):
        # Retrieve user's tasks from AgentMemory
        tasks = get_memories(category="task", user_id=user_id)

        # Calculate task completion percentage
        completed_tasks = [
            task for task in tasks if task['content']['status'] == 'completed']
        completion_percentage = len(completed_tasks) / len(tasks) * 100

        return completion_percentage
