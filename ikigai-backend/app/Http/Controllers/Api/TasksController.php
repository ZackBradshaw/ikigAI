<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\AgentServiceRequest;
use App\Services\ApiResponse;
use App\Services\TasksService;
use App\Services\TasksStatistics;
use App\Services\ValidationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TasksController extends Controller
{
    public function storeTasks()
    {
        $user = auth('sanctum')->user();
        $validation = $this->validateStoreRequest();
        if (!$validation->isSuccessfulCheck()) {
            return ApiResponse::errorResponse($validation->getErrors());
        }
        $tasks = $validation->getValidatedItem('tasks');
        $now = now();
        foreach ($tasks as $key => $task) {
            $tasks[$key]['created_at'] = $now;
            $tasks[$key]['updated_at'] = $now;
            $tasks[$key]['user_id'] = $user->id;
        }
        Task::insert($tasks);
        return ApiResponse::successResponse('Tasks stored successfully');

    }

    public function store()
    {
        $user = authUser();
        $rules = [
            'task' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', Task::CATEGORIES),
        ];
        $validator = Validator::make(request()->all(), $rules);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $validated = $validator->validated();
        $task = $validated['task'];
        $category = $validated['category'];
        $points_validation = (new TasksService)->getAiAgentPoints($task,'task');
        if (!$points_validation->isSuccessfulCheck()) {
            return ApiResponse::errorResponse($points_validation->getErrors());
        }
        $points = $points_validation->getValidatedItem('points');
        $task = $user->Tasks()->create(['task' => $task, 'points' => $points, 'category' => $category, 'created_by_user' => 1]);
        return ApiResponse::successResponse('Task created successfully', compact('task'));
    }



    private function validateStoreRequest(): ValidationService
    {
        $validation = new ValidationService;
        if (!\request()->filled('tasks')) {
            return $validation->errorEncountered('Tasks are required');
        }

        $tasks = is_array(\request('tasks')) ? \request('tasks') : json_decode(\request('tasks'), true);
        foreach ($tasks as $k => $task) {
            if (!isset($task['task'])) {
                return $validation->errorEncountered('Task data is required for every task');
            }
            $categories = Task::CATEGORIES;
            if (!isset($task['category']) || !in_array($task['category'], $categories)) {
                return $validation->errorEncountered('Every task must have one of the categories: ' . implode(', ', $categories));
            }

            if (!isset($task['points']) || (int)$task['points'] < 0) {
                return $validation->errorEncountered('Points of tasks can not be less than zero.' . implode(', ', $categories));
            }
            if (!isset($task['completed'])) {
                $tasks[$k]['completed'] = false;
            } else {

                $tasks[$k]['completed'] = convert_boolean($task['completed']);

            }
        }
        return $validation->addValidatedItems(compact('tasks'));
    }

    public function getTasks()
    {
        $tasks = auth('sanctum')->user()->Tasks;
        return ApiResponse::successResponse('Available tasks', compact('tasks'));

    }

    public function update(Task $task)
    {

        $validator = Validator::make(\request()->all(), ['task' =>
            'required|string|max:255',
//            'category' => 'required|in:' . implode(',', Task::CATEGORIES),
            'completed' => 'nullable'
        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        if (!$task->belongsToAuthUser()) {
            return ApiResponse::errorResponse('Tasks does not belong to user');
        }
        $validated = $validator->validated();

        $points_validation = (new TasksService)->getAiAgentPoints($task,'task');
        if (!$points_validation->isSuccessfulCheck()) {
            return ApiResponse::errorResponse($points_validation->getErrors());
        }
        $update_data = [
            'task' => $validated['task'],
            'points' => $points_validation->getValidatedItem('points'),
        ];
        if (isset($validated['completed'])) {
            $update_data['completed'] = convert_boolean($validated['completed']);
        }
        $task->update($update_data);
        return ApiResponse::successResponse('Tasks updated successfully!', compact('task'));
    }

    public function delete(Task $task)
    {
        if (!$task->belongsToAuthUser()) {
            return ApiResponse::errorResponse('Tasks does not belong to user');
        }
        $task->delete();
        return ApiResponse::successResponse('Tasks deleted successfully!');
    }

    public function toggleCompleted(Task $task): \Illuminate\Http\JsonResponse
    {
        if (!\request()->filled('completed')) {
            return ApiResponse::errorResponse('Completed field is required');
        }
        if (!valid_boolean(request('completed'))) {
            return ApiResponse::errorResponse('Invalid request');
        }
        $completed = convert_boolean(request('completed'));
        $task->update(['completed' => $completed]);
        $statistics = (new TasksStatistics)->calculateStatistics();
        return ApiResponse::successResponse('Statistics', compact('statistics'));
    }

    public function dashboard()
    {
        $statistics = (new TasksStatistics)->calculateStatistics();
        return ApiResponse::successResponse('Statistics', compact('statistics'));

    }

    public function daily(): \Illuminate\Http\JsonResponse
    {
        $today_tasks = authUser()->Tasks()->whereDate('created_at', today())->exists();
        if (!$today_tasks) {
            $user = authUser();
            $goals = $user->Goals()->lastMonth()->get(['goal', 'points', 'category'])->toArray();
            $validation = (new TasksService(new AgentServiceRequest))->requestTasks($goals);
            if (!$validation->isSuccessfulCheck()) {
                return ApiResponse::errorResponse($validation->getErrors());
            }
        }
        $tasks = authUser()->Tasks()->where(function ($q){
            $q->whereDate('created_at', today())->orWhere(function ($q) {
                return $q->where('created_by_user', 1)->where('completed', 0);
            });
        })->get();
        return ApiResponse::successResponse('Available statistics', compact('tasks'));

    }
}
