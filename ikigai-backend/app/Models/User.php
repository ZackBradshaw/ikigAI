<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i',
        'updated_at' => 'datetime:Y-m-d H:i',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'session_id'
    ];
    const STATUSES=['pending','accepted','declined','suspended'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function ChatMessages(){
        return $this->hasMany(ChatMessage::class);
    }



    public function Tasks(){
        return $this->hasMany(Task::class);
    }

    public function Survey(){
        return $this->hasOne(Survey::class);
    }

    public function Goals(){
        return $this->hasMany(Goal::class);
    }
    public function isAccepted(): bool
    {
        return $this->status==='accepted';
    }

    public function sessionId(){
        return $this->session_id;
    }


    public function addChatMessage($message,$response_data){
        return $this->ChatMessages()->create([
            'message'=>$message,
            'response'=>$response_data,
            'user_session_id'=>$this->sessionId()
        ]);
    }

    public function aiAgentProfile($json_decode=true){
     return $this->Survey?->aiAgentProfile($json_decode);
    }
}
