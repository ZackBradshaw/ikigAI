from flask import Blueprint, request, jsonify
from backend.agents.time_agent import monitor_user_performance, get_task_completion_percentage, track_daily_task_completion

task_tracking_bp = Blueprint('task_tracking_bp', __name__)

@task_tracking_bp.route('/monitor_user_performance', methods=['POST'])
def monitor_performance():
    user_id = request.json.get('user_id')
    result = monitor_user_performance(user_id)
    return jsonify(result), 200

@task_tracking_bp.route('/get_task_completion_percentage', methods=['GET'])
def get_completion_percentage():
    user_id = request.args.get('user_id')
    result = get_task_completion_percentage(user_id)
    return jsonify(result), 200

@task_tracking_bp.route('/track_daily_task_completion', methods=['POST'])
def track_task_completion():
    user_id = request.json.get('user_id')
    result = track_daily_task_completion(user_id)
    return jsonify(result), 200
