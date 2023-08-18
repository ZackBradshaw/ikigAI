import unittest
from unittest.mock import patch
from agents.time_agent import TimeAgent

class TestTimeAgent(unittest.TestCase):

    @patch('agents.time_agent.ChromaDB')
    def setUp(self, mock_db):
        self.mock_db = mock_db
        self.time_agent = TimeAgent(self.mock_db)

    def test_monitor_user_performance(self):
        user_id = 'test_user'
        self.time_agent.monitor_user_performance(user_id)
        self.mock_db.monitor_user_performance.assert_called_with(user_id)

    def test_get_task_completion_percentage(self):
        user_id = 'test_user'
        self.time_agent.get_task_completion_percentage(user_id)
        self.mock_db.get_task_completion_percentage.assert_called_with(user_id)

    def test_track_daily_task_completion(self):
        user_id = 'test_user'
        self.time_agent.track_daily_task_completion(user_id)
        self.mock_db.track_daily_task_completion.assert_called_with(user_id)

    def test_send_goal_completion_notifications(self):
        user_id = 'test_user'
        self.time_agent.send_goal_completion_notifications(user_id)
        self.mock_db.send_goal_completion_notifications.assert_called_with(user_id)

    def test_store_goal_in_database(self):
        user_id = 'test_user'
        goals = ['goal1', 'goal2']
        self.time_agent.store_goal_in_database(user_id, goals)
        self.mock_db.store_goal_in_database.assert_called_with(user_id, goals)

    def test_retrieve_goals_from_database(self):
        user_id = 'test_user'
        self.time_agent.retrieve_goals_from_database(user_id)
        self.mock_db.retrieve_goals_from_database.assert_called_with(user_id)

    def test_send_motivational_messages(self):
        user_id = 'test_user'
        self.time_agent.send_motivational_messages(user_id)
        self.mock_db.send_motivational_messages.assert_called_with(user_id)

if __name__ == '__main__':
    unittest.main()
