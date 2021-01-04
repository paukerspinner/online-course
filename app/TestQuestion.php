<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TestQuestion extends Model
{
    protected $fillable = ['test_id', 'question_id', 'is_submited'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $appends = ['text', 'type', 'section_id'];
    protected $with = ['testAnswers'];
    protected $casts = [
        'is_correct' => 'boolean',
        'is_submited' => 'boolean'
    ];

    public function question() {
        return $this->belongsTo('App\Question');
    }

    public function getSectionIdAttribute() {
        return $this->question()->getResults()->section_id;
    }

    public function getTextAttribute() {
        return $this->question()->getResults()->text;
    }

    public function getTypeAttribute() {
        return $this->question()->getResults()->type;
    }

    public function testAnswers() {
        return $this->hasMany('App\TestAnswer', 'test_question_id');
    }

    public function getIsCorrectAttribute() {
        if ($this->is_submited != true) return false;
        $test_answers = $this->testAnswers()->getResults();        
        foreach ($test_answers as $test_answer) {
            if ($test_answer->is_selected != $test_answer->is_corrected && $test_answer->is_corrected !== NULL) {
                return false;
            }
        }
        return true;
    }
}
