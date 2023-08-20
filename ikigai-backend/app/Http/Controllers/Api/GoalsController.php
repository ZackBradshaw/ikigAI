<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\Task;
use App\Services\AgentServiceRequest;
use App\Services\ApiResponse;
use App\Services\TasksService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GoalsController extends Controller
{
    public function index()
    {
        $user = authUser();
        $last_month = authUser()->Goals()->lastMonth()->exists();
        if (!$last_month) {
            $ikigai_data = $user->aiAgentProfile(false);
            $validation = (new TasksService(new AgentServiceRequest))->getGoalsRequest($ikigai_data);
            if (!$validation->isSuccessfulCheck()) {
                return ApiResponse::errorResponse($validation->getErrors());
            }
            $user->unsetRelation('Goals');
        }
        $goals = authUser()->Goals()->lastMonth()->get();
        return ApiResponse::successResponse('Available Goals', compact('goals'));
    }

    public function store()
    {
        $validator = Validator::make(\request()->all(), [
            'goal' => 'required|string|max:255',
            'category' => 'required|string|in:' . implode(',', Task::CATEGORIES),

        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $validated = $validator->validated();
        $points_validation = (new TasksService)->getAiAgentPoints($validated['goal'], 'goal');
        if (!$points_validation->isSuccessfulCheck()) {
            return ApiResponse::errorResponse($points_validation->getErrors());
        }
        $validated['user_id'] = auth('sanctum')->id();
        $validated['created_by_user'] = 1;
        $validated['points'] = $points_validation->getValidatedItem('points');

        $goal = Goal::create($validated);
        return ApiResponse::successResponse('Goal created successfully!', compact('goal'));
    }

    public function update(Goal $goal)
    {
        $validator = Validator::make(\request()->all(), [
            'goal' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $validated = $validator->validated();
        $points_validation = (new TasksService)->getAiAgentPoints($validated['goal'], 'goal');
        if (!$points_validation->isSuccessfulCheck()) {
            return ApiResponse::errorResponse($points_validation->getErrors());
        }
        $goal->goal = $validated['goal'];
        $goal->points = $points_validation->getValidatedItem('points');
        $goal->save();
        return ApiResponse::successResponse('Goal updated successfully!', compact('goal'));
    }

    public function delete(Goal $goal)
    {
        $goal->delete();
        return ApiResponse::successResponse('Goal delete successfully!');
    }
}
