<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Goal;
use App\Models\Task;
use App\Services\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GoalsController extends Controller
{
    public function index(){
        $goals=authUser()->Goals;
        return ApiResponse::successResponse('Available Goals',compact('goals'));
    }

    public function store(){
        $validator = Validator::make(\request()->all(), [
            'goal' => 'required|string|max:255',
            'category' => 'required|string|in:'.implode(',',Task::CATEGORIES),
            'points'=>'nullable|numeric|min:0'
        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $validated=$validator->validated();
        if(!isset($validated['points'])){
            $validated['points']=0;
        }
        $validated['user_id']=auth('sanctum')->id();
        $goal=Goal::create($validated);
        return  ApiResponse::successResponse('Goal created successfully!',compact('goal'));
    }

    public function update(Goal $goal){
        $validator = Validator::make(\request()->all(), [
            'goal' => 'required|string|max:255',
            'category' => 'nullable|string|in:'.implode(',',Task::CATEGORIES),
            'points'=>'nullable|numeric|min:0|max:9999'
        ]);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $validated=$validator->validated();
        if(!isset($validated['points'])){
            $validated['points']=0;
        }
            $goal->goal=$validated['goal'];
            $goal->points=$validated['points'];
            $goal->category=$validated['category'];

        return  ApiResponse::successResponse('Goal updated successfully!',compact('goal'));
    }

    public function delete(Goal $goal){
        $goal->delete();
        return  ApiResponse::successResponse('Goal delete successfully!');
    }
}
