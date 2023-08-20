<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function aiAgentProfile($json_decode = true)
    {
        if (!$this->user_ai_agent_profile) {
            return null;
        }
        return $json_decode ? json_decode($this->user_ai_agent_profile, true) : $this->user_ai_agent_profile;
    }
}
