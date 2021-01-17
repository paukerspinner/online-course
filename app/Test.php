<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Config;

class Test extends Model
{
    const PASS_GRADE_EASY_LEVEL = 6;
    const GOOD_GRADE_EASY_LEVEL = 7;
    const EXCELLENT_GRADE_EASY_LEVEL = 8;
    const PASS_GRADE_MEDIUM_LEVEL = 7;
    const GOOD_GRADE_MEDIUM_LEVEL = 8;
    const EXCELLENT_GRADE_MEDIUM_LEVEL = 9;
    const PASS_GRADE_HARD_LEVEL = 8;
    const GOOD_GRADE_HARD_LEVEL = 9;
    const EXCELLENT_GRADE_HARD_LEVEL = 10;

    const GRADE_PASS = 60;
    const GRADE_GOOD = 74;
    const GRADE_EXCELLENT = 90;

    const QUES_NUM_PER_MOD_FOR_EXAM = 5;
    const QUES_NUM_FOR_MOD = 10;

    protected $fillable = ['user_id', 'section_id', 'level', 'grade', 'started_at', 'finished_at'];
    protected $hidden = ['created_at'];
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

    public function getIsExamAttribute() {
        return $this->section->is_exam;
    }

    public function getIsEntranceAttribute() {
        return $this->section->is_entrance;
    }

    public function getIsModuleAttribute() {
        return $this->section->is_module;
    }

    public function getCompletionTimeAttribute() {
        if ($this->is_exam) {
            return 60*60;
        } else {
            return 15*60;
        }
    }
}
