<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TestAnswer extends Model
{
    protected $fillable = ['answer_id', 'test_question_id', 'is_selected'];

    protected $appends = ['is_corrected', 'text'];
    protected $hidden = ['created_at', 'updated_at', 'answer_id'];
    protected $casts = [
        'is_selected' => 'boolean'
    ];

    public function answer() {
        return $this->belongsTo('App\Answer', 'answer_id');
    }

    public function testQuestion() {
        return $this->belongsTo('App\TestQuestion', 'test_question_id');
    }

    public function getIsCorrectedAttribute() {
        $is_submited = $this->testQuestion()->getResults()->is_submited;
        if ($is_submited) {
            return boolval($this->answer()->getResults()->is_correct);
        } else {
            return NULL;
        }
    }

    public function getTextAttribute() {
        return $this->answer()->getResults()->text;
    }
}
