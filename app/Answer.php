<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['question_id', 'text', 'is_correct'];

    protected $hidden = ['created_at', 'updated_at'];
    protected $casts = [
        'is_correct' => 'boolean'
    ];
    
}
