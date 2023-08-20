<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Services\AgentServiceRequest;
use App\Services\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatController extends Controller
{
    public function chat(){
        $validator = Validator::make(\request()->all(), [
            'message' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }

        $validation = (new AgentServiceRequest)->request(config('ai_agent.chat_url'), ['question' => $validator->validated()['message']]);
        if (!$validation->isSuccessfulCheck()) {
            return $validation;
        }
    }
}
