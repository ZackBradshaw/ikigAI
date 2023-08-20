<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('test-test',function (){
    \Illuminate\Support\Facades\Schema::table('goals', function (\Illuminate\Database\Schema\Blueprint $table) {

        $table->boolean('created_by_user')->default(false)->after('user_id');
    });
//    \Illuminate\Support\Facades\Schema::table('users', function (\Illuminate\Database\Schema\Blueprint $table) {
//
//        $table->string('session_id')->nullable()->after('status');
//    });
    dd(1);
    $a=\App\Models\Task::where('user_id',3)->whereNull('category')->get();
    dd($a);
    \Illuminate\Support\Facades\Schema::table('tasks', function (\Illuminate\Database\Schema\Blueprint $table) {

        $table->boolean('created_by_user')->default(false)->after('completed');
    });
//    \Illuminate\Support\Facades\Schema::table('users', function (\Illuminate\Database\Schema\Blueprint $table) {
//        $table->enum('status',\App\Models\User::STATUSES)->after('password');
//    });
    return 'k';
});
