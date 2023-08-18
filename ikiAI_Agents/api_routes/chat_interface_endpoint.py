from flask import Blueprint, request, jsonify
from backend.agents.chat_interface_agent import start_chat, provide_task_guidance, store_chat_history

chat_interface_endpoint = Blueprint('chat_interface_endpoint', __name__)

@chat_interface_endpoint.route('/start_chat/<user_id>', methods=['GET'])
def start_chat_endpoint(user_id):
    response = start_chat(user_id)
    return jsonify(response)

@chat_interface_endpoint.route('/provide_task_guidance', methods=['POST'])
def provide_task_guidance_endpoint():
    user_id = request.json.get('user_id')
    message = request.json.get('message')
    response = provide_task_guidance(user_id, message)
    return jsonify(response)

@chat_interface_endpoint.route('/store_chat_history', methods=['POST'])
def store_chat_history_endpoint():
    user_id = request.json.get('user_id')
    chat_data = request.json.get('chat_data')
    response = store_chat_history(user_id, chat_data)
    return jsonify(response)
