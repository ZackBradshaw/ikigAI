import unittest
from unittest.mock import patch
from agents import survey_analysis_agent

class TestSurveyAnalysisAgent(unittest.TestCase):

    @patch('agents.survey_analysis_agent.ChromaDB')
    def test_analyze_and_store_goals(self, mock_db):
        mock_db.return_value = True
        result = survey_analysis_agent.analyze_and_store_goals('dummy_survey_data')
        self.assertTrue(result)

    @patch('agents.survey_analysis_agent.ChromaDB')
    def test_generate_daily_tasks(self, mock_db):
        mock_db.return_value = True
        result = survey_analysis_agent.generate_daily_tasks('dummy_goals')
        self.assertTrue(result)

    @patch('agents.survey_analysis_agent.ChromaDB')
    def test_calculate_task_completion_percentage(self, mock_db):
        mock_db.return_value = 50
        result = survey_analysis_agent.calculate_task_completion_percentage('dummy_user_id')
        self.assertEqual(result, 50)

if __name__ == '__main__':
    unittest.main()
