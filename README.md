# Project Title

This project is a backend application built with Python, Flask, Langchain (LLMS), and Chroma DB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Python, Flask, Langchain (LLMS), Chroma DB, and Docker installed on your machine.

### Installing

1. Clone the repository
2. Navigate to the project directory
3. Install the dependencies using the command `pip install -r requirements.txt`

## Running the Application

1. Set up the environment variables as specified in `backend/config/config.py`
2. Run the command `python backend/main.py` to start the server

## Running the Tests

Navigate to the `backend/tests/` directory and run `pytest` to execute the tests.

## API Endpoints

- Survey Endpoint: Receives user survey answers and triggers the survey analysis agent.
- Task Tracking Endpoint: Retrieves and returns the monthly completion percentage of user tasks.
- Chat Interface Endpoint: Initializes the chat interface agent and Langchain-powered chat for user engagement.

## Agents

- Survey Analysis Agent: Analyzes survey data to generate goals and daily tasks, and tracks task completion.
- Performance Analysis Agent: Monitors user's task performance and sends motivational messages.
- Chat Interface Agent: Engages users through a chat interface and provides task-related guidance.

## Deployment

Use Docker to deploy the application. The `docker-compose.yml` file contains the necessary configurations.

## Built With

- Python
- Flask
- Langchain (LLMS)
- Chroma DB

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- Zack Bradshaw

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
