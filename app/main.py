from flask import Flask
# from api_routes import survey_endpoint, task_tracking_endpoint, chat_interface_endpoint
from api_routes.survey_endpoint import survey_endpoint
from config import config

app = Flask(__name__)

# Load configurations
app.config.from_object(config)

# Register API routes
app.register_blueprint(survey_endpoint)
# app.register_blueprint(task_tracking_endpoint.bp)
# app.register_blueprint(chat_interface_endpoint.bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
