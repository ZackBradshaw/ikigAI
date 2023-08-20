from flask import Blueprint, request
from agents.survey_analysis_agent import SurveyAnalysisAgent

survey_endpoint = Blueprint('survey_endpoint', __name__)
survey_agent = SurveyAnalysisAgent()


@survey_endpoint.route('/analyze_and_store_goals', methods=['POST'])
def analyze_and_store_goals_route():
    survey_data = request.get_json()
    print("Survey Data:", survey_data, flush=True)
    return survey_agent.analyze_and_store_goals(survey_data)


@survey_endpoint.route('/generate_daily_tasks', methods=['POST'])
def generate_daily_tasks_route():
    goals = request.get_json()
    return generate_daily_tasks(goals)


@survey_endpoint.route('/calculate_task_completion_percentage/<user_id>', methods=['GET'])
def calculate_task_completion_percentage_route(user_id):
    return calculate_task_completion_percentage(user_id)
