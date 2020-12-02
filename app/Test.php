<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Config;

class Test extends Model
{
    protected $fillable = ['user_id', 'section_id', 'level', 'grade', 'started_at', 'finished_at'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $appends = ['completion_time'];

    public function testQuestions() {
        return $this->hasMany('App\TestQuestion', 'test_id');
    }

    public function questions() {
        return $this->belongsToMany('App\Question', 'test_questions', 'test_id', 'question_id');
    }

    public function section() {
        return $this->belongsTo('App\Section', 'section_id');
    }

    public function getCompletionTimeAttribute() {
        $is_exam = $this->section->is_exam;
        if ($is_exam) {
            return 60*60;
        } else {
            return 60*60;
        }
    }
}
