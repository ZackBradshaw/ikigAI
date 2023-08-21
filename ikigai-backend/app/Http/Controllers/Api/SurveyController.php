<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\AgentServiceRequest;
use App\Services\ApiResponse;
use App\Services\TasksService;

class SurveyController extends Controller
{
    private $user;
    private array $task_categories = Task::CATEGORIES;

    public function __construct(private $agent = new AgentServiceRequest)
    {
        $this->user = auth('sanctum')->user();
    }

    public function store(): \Illuminate\Http\JsonResponse
    {


        if (!\request()->filled('survey')) {
            return ApiResponse::errorResponse('Survey required');
        }
        try {
            $survey = \request('survey');
            if (!is_array($survey)) {
                $survey = json_decode($survey, true);
            }
            foreach ($survey as $k => $survey_data) {
                $survey[$k] = (array)$survey[$k];
                $survey_data = $survey[$k];
                if (!isset($survey_data['question'])) {
                    return ApiResponse::errorResponse('Question content is mandatory');

                }
                if (!isset($survey_data['answer'])) {
                    return ApiResponse::errorResponse('Every question must have an answer');

                }
            }
            $survey_data = json_encode($survey);
            $survey = $this->user->Survey()->updateOrCreate(['user_id' => $this->user->id], ['survey_data' => $survey_data]);

            $validation = $this->agent->request(config('ai_agent.profile_url'), ['question' => $survey_data]);
            if (!$validation->isSuccessfulCheck()) {
                return ApiResponse::errorResponse($validation->getErrors());
            }
            $response_data = $validation->getValidatedItem('response_data');
            $ikigai_data = json_decode($response_data, true);
            if (isset($ikigai_data['answers'])) {

                $ikigai_data = $ikigai_data['answers'];
            }

            $ikigai_data = json_encode($ikigai_data);

            $survey->update(['user_ai_agent_profile' => $ikigai_data]);
            $validation = (new TasksService($this->agent))->processGoalsAndTasksRequest($ikigai_data);
            if (!$validation->isSuccessfulCheck()) {
                return ApiResponse::errorResponse($validation->getErrors());
            }
            $tasks = $this->user->Tasks;
            return ApiResponse::successResponse('Survey processed successfully!', compact('tasks'));

        } catch (\Exception $e) {
            fullLog($e->getMessage());
            return ApiResponse::errorResponse('Sorry, an error occurred. Error:' . $e->getMessage());

        }
    }
}
