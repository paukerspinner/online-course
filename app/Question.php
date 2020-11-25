<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['id', 'text', 'type', 'level', 'section_id'];

    protected $with = ['answers'];

    function answers() {
        return $this->hasMany('App\Answer', 'question_id');
    }
}
