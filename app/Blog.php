<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['user_id', 'title', 'content'];

    public function comments() {
        return $this->hasMany('App\Comment', 'blog_id');
    }

    public function author() {
        return $this->belongsTo('App\User', 'user_id');
    }
}
