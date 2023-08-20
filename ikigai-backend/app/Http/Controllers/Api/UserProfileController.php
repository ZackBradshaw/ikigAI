<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\AgentServiceRequest;
use App\Services\ApiResponse;
use App\Services\TasksService;
use App\Services\TasksStatistics;
use Illuminate\Support\Facades\Validator;

class UserProfileController extends Controller
{
    public function profile()
    {
        $user = auth('sanctum')->user();
        $ai_agent_profile = $user->Survey?->aiAgentProfile();
        $statistics = (new TasksStatistics)->calculateStatistics();
        $user->survey_done = isset($user->Survey);
        $user->unsetrelation('Survey')->unsetRelation('Tasks');

        return ApiResponse::successResponse('Login successful', compact('user', 'ai_agent_profile', 'statistics'));
    }

    public function updateIkigai()
    {
        $validator = Validator::make(\request()->all(), [
            'category' => 'required|in:' . implode(',', Task::CATEGORIES),
            'value' => 'required|string|max:1000'
        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $user = authUser();
        $validated = $validator->validated();
        $ai_agent_profile = $user->Survey?->aiAgentProfile();
        if (!$ai_agent_profile) {
            return ApiResponse::errorResponse('No profile data available.');
        }
        foreach ($ai_agent_profile as $k => $profile_data) {
            if ($validated['category'] === $profile_data['type']) {
                $ai_agent_profile[$k]['value'] = $validated['value'];
            }
        }
        $ikigai_data = json_encode($ai_agent_profile);
        $user->Survey->update(['user_ai_agent_profile' => $ikigai_data]);
        $old_tasks_ids = $this->getOldTasksIds($user);
        $validation = (new TasksService(new AgentServiceRequest))->processGoalsAndTasksRequest($ikigai_data);
        if (!$validation->isSuccessfulCheck()) {
            return ApiResponse::errorResponse($validation->getErrors());
        }
        Task::whereIn('id',$old_tasks_ids)->delete();
        return ApiResponse::successResponse('Ikigai profile updated successfully');
    }

    private function getOldTasksIds($user)
    {
        return $user->Tasks->filter(function ($task) {
            if ($task->madeByUser()) {
                return false;
            }
            return !$task->completed;
        })->pluck('id')->toArray();

    }
}
