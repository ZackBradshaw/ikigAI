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
        $message=$validator->validated()['message'];
        $validation = (new AgentServiceRequest)->request(config('ai_agent.chat_url'),
            ['question' =>
            $message,'overrideConfig'=>[
                'sessionId'=>authUser()->sessionId()
        ]]);
        if (!$validation->isSuccessfulCheck()) {
            return $validation;
        }
        $response_data=$validation->getValidatedItem('response_data');
        authUser()->addChatMessage($message,$response_data);
        return ApiResponse::successResponse('Agent response',['response'=>$response_data]);
    }

    public function getChatMessages(){
        $messages=authUser()->ChatMessages()->where('created_at','>=',now()->subWeek()->startOfDay())->get(['id','message','response','user_id','created_at','updated_at']);
        return ApiResponse::successResponse('Previous messages',['messages'=>$messages]);

    }
}
