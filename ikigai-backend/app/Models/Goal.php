<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Goal extends BaseModel
{
    use HasFactory;
    protected $guarded=['created_at','updated_at'];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',

    ];
    public function User(){
        return $this->belongsTo(User::class);
    }
}
