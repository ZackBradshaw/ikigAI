<?php

namespace App\Services;

use App\Models\Goal;
use App\Models\Task;

class TasksService
{

    private $task_categories = Task::CATEGORIES;
    private $user;
    public function __construct(private $requestAgent=new  AgentServiceRequest)
    {
        $this->user=authUser();
    }

    public function getAiAgentPoints(string $task,$model)
    {
        $validation=new ValidationService;
        if(!in_array($model,['task','goal'])){
            return  $validation->errorEncountered('Invalid model');
        }
        $url = match ($model) {
            'goal' => config('ai_agent.goal_points_url'),
            default => config('ai_agent.task_points_url'),
        };
        $validation = (new AgentServiceRequest)->request($url, ['question' => $task]);
        if (!$validation->isSuccessfulCheck()) {
            return $validation;
        }
        $response_data = $validation->getValidatedItem('response_data');
        if (!is_numeric($response_data) || (int)$response_data < 0) {
            $points = 0;
        } else {
            $points = (int)$response_data;
        }
        return $validation->addValidatedItems(compact('points'));
    }

    public function getGoalsRequest($ai_profile)
    {
        $validation = $this->requestAgent->request(config('ai_agent.goals_url'), ['question' => $ai_profile]);
        if (!$validation->isSuccessfulCheck()) {
            return $validation;
        }
        $response_data = $validation->getValidatedItem('response_data');
        $goals = json_decode($response_data, true);
        if (isset($goals['goals'])) {
            $goals = $goals['goals'];
        }
        $this->processGoals($goals);
        return $validation->addValidatedItems(compact('goals'));
    }


    public function requestTasks($goals)
    {
        $validation = $this->requestAgent->request(config('ai_agent.get_tasks_url'), ['question' => json_encode($goals)]);
        if (!$validation->isSuccessfulCheck()) {
            return $validation;
        }
        $response_data = $validation->getValidatedItem('response_data');
        $this->processTasks($response_data);
        return $validation->successfulCheck();
    }

    private function processTasks(string $response_data): void
    {
        try {
            $tasks = json_decode($response_data, true);
            $now = now();
            $db_data = [];
            $categories = $this->task_categories;
            foreach ($tasks as $task) {
                if (!isset($task['category'])) {
                    continue;
                }
                $category = strtolower($task['category']);
                if (!in_array($category, $categories)) {
                    continue;
                }
                $db_data[] = [
                    'task' => $task['task'] ?? '',
                    'points' => (isset($task['points']) && (int)$task['points'] >= 0) ? (int)$task['points'] : 0,
                    'category' => $category,
                    'user_id' => $this->user->id,
                    'completed' => false,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
            shuffle($db_data);
            Task::insert($db_data);

        } catch (\Exception $e) {
            fullLog($e->getMessage());
        }
    }


    private function processGoals(array $goals): void
    {

        try {

            $now = now();
            $db_data = [];
            $categories = $this->task_categories;
            foreach ($goals as $goal) {
                if (!isset($goal['category'])) {
                    continue;
                }
                $category = strtolower($goal['category']);
                if (!in_array($category, $categories)) {
                    continue;
                }
                $db_data[] = [
                    'goal' => $goal['goal'] ?? '',
                    'points' => (isset($goal['points']) && (int)$goal['points'] >= 0) ? (int)$goal['points'] : 0,
                    'category' =>$category,
                    'user_id' => $this->user->id,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
            Goal::insert($db_data);
        } catch (\Exception $e) {
            fullLog($e->getMessage());
        }
    }
    public function processGoalsAndTasksRequest(string $ikigai_data)
    {
        //get goals request
        $validation = $this->getGoalsRequest($ikigai_data);
        if (!$validation->isSuccessfulCheck()) {
            return $validation;
        }
        $goals = $validation->getValidatedItem('goals');
        return $this->requestTasks($goals);

    }
}
