from flask import Flask, json
from api_routes.survey_endpoint import survey_endpoint
import unittest


class TestSurveyEndpoint(unittest.TestCase):
    def setUp(self):
        # Create a Flask app
        self.app = Flask(__name__)
        self.app.debug = True
        # Register the survey_endpoint blueprint
        self.app.register_blueprint(survey_endpoint)
        # Create a test client
        self.client = self.app.test_client()

    def test_analyze_and_store_goals_route(self):
        # Create some dummy survey data
        survey_data = {
            "What activities make you lose track of time, and what hobbies or tasks do you love so much that you would do them for free?": "Programing AI, Games, Apps, ECT, Playing the keyboard, various electical engineering and 3D printing projects, Exploring new tech such as AI",
            "What causes or issues deeply resonate with you, and if you had all the resources in the world, what problem would you want to solve?": "Inequality, Poverty, I would love to solve these problems with AI by either contriubiting to UBI or bring about post scarcity",
            "What are your top three skills or talents, and if you could choose any job in the world, what would it be?": " Programming, Creative Thinking, Hardworking, My dream job would be AI entrepenurer",
            "What skills or talents do you possess that people would be willing to pay for, and if you were to start a business or offer a service, what would it be?": "Programming, My AI knowledge, I would start a business doing AI consulting as well as Creating a few SAAS products",
        }
        # Send a POST request to the /analyze_and_store_goals endpoint
        response = self.client.post('/analyze_and_store_goals',
                                    data=json.dumps(survey_data),
                                    content_type='application/json')
        # Check the response (you'll need to modify this to match what your endpoint actually returns)
        self.assertEqual(response.status_code, 200)
        # You can also check the response data, headers, etc.
        print(response.data, flush=True)


if __name__ == '__main__':
    unittest.main()
