<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['blog_id', 'user_id', 'content'];

    public function author() {
        return $this->belongsTo('App\User', 'user_id');
    }
}
