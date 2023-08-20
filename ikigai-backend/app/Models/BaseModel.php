<?php


namespace App\Models;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    public  function scopeLast($query){
        return $query->orderByDesc('id')->first();
    }
    public  function scopeLatest($query){
        return $query->orderByDesc('id');
    }



    public  function scopeFindAfter($query,$params){
        if(!is_array($params)){
            return $query->where('id',$params)->first();

        }
        return $query->where([$params])->first();
    }
    public function scopeActive($query){
        return $query->where('active',1);
    }

    public function scopeFindAfterName($query,$name){
        return $query->whereRaw('LOWER(name) = ?', [strtolower($name)]);
    }
    public function formatCreatedAt()
    {
        return $this->created_at ? Carbon::parse($this->created_at)->format('jS F, Y g:ia') : '-';
    }

    public function scopeLastMonth($query){
        return $query->where('created_at','>=',now()->startOfMonth());
    }
    public function madeByUser(){
        return $this->created_by_user;
    }
}
