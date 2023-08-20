<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TasksController;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\Api\UserProfileController;
use App\Http\Controllers\Api\GoalsController;
use App\Http\Controllers\Api\ChatController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
//Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::middleware(['auth:sanctum','request-interface'])->group(function () {
    Route::get('/profile', [UserProfileController::class, 'profile']);
    Route::post('/update-ikigai', [UserProfileController::class, 'updateIkigai']);

    Route::group(['prefix' => '/tasks'], function () {
        Route::get('/', [TasksController::class, 'getTasks']);
        Route::post('/', [TasksController::class, 'store']);

        Route::post('/store-tasks', [TasksController::class, 'storeTasks']);
        Route::post('/{task}/update', [TasksController::class, 'update']);
        Route::delete('/{task}/delete', [TasksController::class, 'delete']);
        Route::post('/{task}/toggle-completed', [TasksController::class, 'toggleCompleted']);
        Route::get('/daily', [TasksController::class, 'daily']);

    });
    Route::group(['prefix' => '/goals'], function () {
        Route::get('/', [GoalsController::class, 'index']);
        Route::post('/', [GoalsController::class, 'store']);
        Route::post('/{goal}', [GoalsController::class, 'update']);
        Route::delete('/{goal}', [GoalsController::class, 'delete']);

    });
    Route::group(['prefix' => '/survey'], function () {
        Route::post('/', [SurveyController::class, 'store']);
    });

    Route::group(['prefix' => '/chat'], function () {
        Route::post('/', [ChatController::class, 'chat']);
    });
});
