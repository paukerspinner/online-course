<?php

namespace App\Http\Services;
use App\Question;
use App\Test;
use App\TestQuestion;
use App\User;
use Carbon\Carbon;
use App\Answer;
use App\TestAnswer;

use App\Http\Services\TestService;

class TestAnswerService
{
    public static function updateTestAnswers($submit_test_answers) {        
        $test_answers_with_corrected = [];
        foreach($submit_test_answers as $submit_test_answer) {
            $test_answer = TestAnswer::find($submit_test_answer['id'])->makevisible('is_corrected');
            $test_answer->update([
                'is_selected' => $submit_test_answer['is_selected']
            ]);
            $test_answers_with_corrected[] = $test_answer;
        }

        return $test_answers_with_corrected;
    }

    public static function markIsSubmitedTestQuestion($test_question_id) {
        $test_question = TestQuestion::find($test_question_id);
        $exist_mark_submit = boolval($test_question->is_submited);
        if ($exist_mark_submit == true) {
            return true;
        } else {
            $test_question->update([
                'is_submited' => true
            ]);
            return false;
        }
    }
}
