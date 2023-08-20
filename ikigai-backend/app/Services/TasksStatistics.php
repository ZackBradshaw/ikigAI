<?php

namespace App\Services;

use App\Models\Task;
use App\Models\User;

class TasksStatistics {


    private  $user;
    public function __construct()
    {
        $this->user=authUser();
    }

    public function calculateStatistics(): array
    {
        $tasks=$this->user->Tasks()->lastMonth()->get();;
        $goals=$this->user->Goals()->lastMonth()->get();

        $total_points=$goals->where('completed',1)->sum('points');
        $categories=Task::CATEGORIES;
        $category_data=[];
        foreach ($categories as $category){
            $category_tasks=$tasks->where('category',$category);
            $total=$goals->where('category',$category)->sum('points');
            $completed_total=$category_tasks->where('completed',1)->sum('points');

            $category_data[]=[
                'category'=>$category,
                'percent_completed'=>percentOfTotal($completed_total,$total)
            ];
        }
        return [
            'total_points'=>$total_points,
            'categories_percentage'=>$category_data
        ];
    }
}
