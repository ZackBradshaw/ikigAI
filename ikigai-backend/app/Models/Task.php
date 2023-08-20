<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JetBrains\PhpStorm\NoReturn;

class Task extends Model
{
    use HasFactory;
    protected $guarded=['created_at','updated_at'];
    const CATEGORIES=['passion' ,'vocation' ,'mission','profession'];
    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',

    ];
    public function User(){
        return $this->belongsTo(User::class);
    }

    public function belongsToAuthUser(): bool
    {
        return $this->user_id===auth('sanctum')->id();
    }

    public function madeByUser(){
        return $this->created_by_user;
    }
}
