<?php

namespace App\Http\Middleware;

use App\Models\Goal;
use App\Models\Task;
use App\Services\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequestInterface
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $task = $request->route('task');
        if(auth('sanctum')->check() && $task instanceof  Task && $task->user_id!==auth('sanctum')->id()){
            return  ApiResponse::errorResponse('Request forbidden',Response::HTTP_FORBIDDEN);
        }
        $goal = $request->route('goal');
        if(auth('sanctum')->check() && $goal instanceof  Goal && $goal->user_id!==auth('sanctum')->id()){
            return  ApiResponse::errorResponse('Request forbidden',Response::HTTP_FORBIDDEN);
        }
        return $next($request);
    }
}
