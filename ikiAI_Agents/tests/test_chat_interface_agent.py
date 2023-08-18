import unittest
from unittest.mock import patch
from agents.chat_interface_agent import start_chat, provide_task_guidance, store_chat_history

class TestChatInterfaceAgent(unittest.TestCase):

    @patch('agents.chat_interface_agent.ChromaDB')
    def test_start_chat(self, mock_db):
        mock_db.return_value.get_user.return_value = {'user_id': '123', 'chat_status': 'active'}
        result = start_chat('123')
        self.assertEqual(result, 'Chat started')

    @patch('agents.chat_interface_agent.ChromaDB')
    def test_provide_task_guidance(self, mock_db):
        mock_db.return_value.get_user.return_value = {'user_id': '123', 'message': 'How to complete task?'}
        result = provide_task_guidance('123', 'How to complete task?')
        self.assertEqual(result, 'Task guidance provided')

    @patch('agents.chat_interface_agent.ChromaDB')
    def test_store_chat_history(self, mock_db):
        mock_db.return_value.get_user.return_value = {'user_id': '123', 'chat_data': 'Chat history'}
        result = store_chat_history('123', 'Chat history')
        self.assertEqual(result, 'Chat history stored')

if __name__ == '__main__':
    unittest.main()
