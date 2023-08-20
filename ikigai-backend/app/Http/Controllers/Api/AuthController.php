<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(){

        $rules = [
            'name'=>'required|string|max:190',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|confirmed|string|min:8',
        ];
        $validator = Validator::make(request()->all(), $rules);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());
        }
        $validated=$validator->validated();
        $user = User::create([
            'name'=>$validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'status'=>'accepted',
            'session_id'=>\Str::random(16)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return ApiResponse::successResponse('Registration successful',['credentials'=>getAuthCredentials($token,$user)]);
    }

    public function login()
    {

        $rules = [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ];
        $validator = Validator::make(\request()->all(), $rules);

        if ($validator->fails()) {
            return ApiResponse::errorResponse($validator->errors()->all());

        }
        $user = User::where('email', \request('email'))->first();
        if(!$user){
            return ApiResponse::errorResponse('Invalid credentials',Response::HTTP_UNAUTHORIZED);
        }
        if(!$user->isAccepted()){
            return ApiResponse::errorResponse('Account suspended',Response::HTTP_UNAUTHORIZED);

        }
        if (!auth()->attempt(request()->only('email', 'password'))) {
            return ApiResponse::errorResponse('Invalid login',Response::HTTP_UNAUTHORIZED);
        }


        $token = $user->createToken('auth_token')->plainTextToken;


        return ApiResponse::successResponse('Login successful',['credentials'=>getAuthCredentials($token,$user)]);
    }
}
