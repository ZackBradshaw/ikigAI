```python
from flask import Flask
from backend.api_routes import survey_endpoint, task_tracking_endpoint, chat_interface_endpoint
from backend.config import config

app = Flask(__name__)

# Load configurations
app.config.from_object(config)

# Register API routes
app.register_blueprint(survey_endpoint.bp)
app.register_blueprint(task_tracking_endpoint.bp)
app.register_blueprint(chat_interface_endpoint.bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
```