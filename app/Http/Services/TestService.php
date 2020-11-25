<?php

namespace App\Http\Services;
use App\Question;
use App\Test;
use App\TestQuestion;
use App\User;
use Carbon\Carbon;
use App\Answer;
use Config;

class TestService
{
    public static function getTests() {
        return Test::all();
    }

    public static function addNewTest($test_fields) {
        $new_test = Test::create([
            'title' => $test_fields['title'],
            'level' => $test_fields['level']
        ]);
    }

    public static function makeTest() {
        $current_section_id = (new static)::getCurrentSectionId();
        $current_test = Test::where([
            ['section_id', $current_section_id],
            ['user_id', auth()->user()->id],
            ['grade', NULL]
        ])->get()->first();
        if (!is_null($current_test)) {
            return $current_test;
        }

        $new_test = Test::create([
            'user_id' => auth()->user()->id,
            'section_id' => $current_section_id,
            'level' => auth()->user()->level
        ]);
        try {
            $question_bank = Question::where([['level', $new_test->level], ['section_id', $new_test->section_id]])->get()->map->only('id')->all();
            
            $selectedQuestions = (new static)::getRandomQuestionsFromBank($question_bank, Config::get('constants.QUESTION_NUMBER'));
            foreach ($selectedQuestions as $question) {
                TestQuestion::create([
                    'test_id' => $new_test->id,
                    'question_id' => $question['id']
                ]);
            }
        } catch (Exception $e) {
            Test::find($new_test->id)->delete();
        }

        return $new_test;
    }

    public static function calculateTimeRemainning($test) {
        $current_time = Carbon::now();
        $created_time = Carbon::parse($test->created_at);
        $passed_time = $current_time->diffInMinutes($created_time);
        return $test->completion_time - $passed_time;
    }

    public static function calculateScore($test_id) {
        $test_questions = TestQuestion::where('test_id', $test_id)->get();
        $question_number = count($test_questions);
        $correct_answers_number = count($test_questions->where('is_correct', true));
        $score = $correct_answers_number / $question_number * 100;
        $round_score = intval(round($score));
        Test::find($test_id)->update(['grade' => $round_score]);
        return ($round_score);
    }

    public static function checkAnswers($selectedAnswers) {
        $correct_answers = Answer::where([
            ['question_id', $selectedAnswers['question_id']],
            ['is_correct', true]
        ])->get();
        dd($correct_answers);
    }

    protected static function getCurrentSectionId() {
        $tests = auth()->user()->tests;
        $last_passed_section_id = 0;
        foreach($tests as $test) {
            if ($test->grade == null || $test->grade < Config::get('constants.GRADE_PASS')) {
                return $last_passed_section_id + 1;       // Return and finish function
            }
            $last_passed_section_id = $test->section_id;
        }
        return $last_passed_section_id + 1;
    }

    protected static function getRandomQuestionsFromBank($question_bank, $required_number) {
        $question_bank_size = count($question_bank);
        $selectedQuestions = [];
        for ($i = 0; $i < $required_number; $i++) {
            shuffle($question_bank);
            $selectedQuestions[] = array_pop($question_bank);
        }
        return $selectedQuestions;
    }
}
