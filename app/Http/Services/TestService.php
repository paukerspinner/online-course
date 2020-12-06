<?php

namespace App\Http\Services;
use App\Question;
use App\Test;
use App\TestQuestion;
use App\TestAnswer;
use App\User;
use Carbon\Carbon;
use App\Answer;
use App\Http\Services\UserService;
use App\Http\Services\TestQuestionService;
use Config;

class TestService
{
    public static function getTests() {
        return Test::all();
    }

    public static function getCompletedTestsOfUser($user) {
        return $user->tests()->where('grade', '!=', null)->orderBy('updated_at', 'DESC')->get();

        return Test::where([
            ['user_id', auth()->user()->id],
            ['grade', '!=', null]
        ])->orderBy('updated_at', 'DESC')->get();
    }

    public static function makeTest() {
        $current_section_id = (new static)::getCurrentSectionId();
        $current_test = (new static)::getPendingTest();
        if (!is_null($current_test)) {
            return $current_test;
        }

        $new_test = Test::create([
            'user_id' => auth()->user()->id,
            'section_id' => $current_section_id,
            'level' => auth()->user()->level
        ]);

        if ($new_test->is_exam) {
            TestQuestionService::createTestQuestionForExam($new_test);
        } else {
            TestQuestionService::createTestQuestionsForTest($new_test);
        }

        return $new_test;
    }

    public static function finishPendingTest() {
        $pending_test = (new static)::getPendingTest();
        $grade = (new static)::calculateScore($pending_test->id);
        UserService::updateLevel($grade);
        $pending_test->update([
            'grade' => $grade,
            'finished_at' => Carbon::now()
        ]);
        if ($pending_test->is_exam && $pending_test->grade >= Config::get('constants.GRADD_PASS')) {
            auth()->user()->update(['completed_course' => true]);
        }
        return $pending_test;
    }

    public static function calculateTimeRemainning($test_id) {
        $test = Test::find($test_id);
        $current_time = Carbon::now();
        $started_time = Carbon::parse($test->started_at);
        $passed_time = $current_time->diffInSeconds($started_time);
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

    public static function getPendingTest() {
        $current_section_id = (new static)::getCurrentSectionId();
        $current_test = Test::where([
            ['section_id', $current_section_id],
            ['user_id', auth()->user()->id],
            ['grade', NULL]
        ])->get()->first();
        return $current_test;
    }

    public static function setTestStarting($test_id) {
        $test = Test::find($test_id);
        $test->update([
            'started_at' => Carbon::now()
        ]);
    }

    public static function getCurrentSectionId() {
        $test = auth()->user()->tests()->get()->last();
        if ($test == null) { return 1; }
        if ($test->grade == null || $test->grade < Config::get('constants.GRADE_PASS')) {
            return $test->section_id;
        } else {
            return $test->section_id + 1;
        }
    }

    public static function getFactorGradeOfLevel($test_level) {
        switch($test_level) {
            case Config::get('constants.EASY_LEVEL'):
                return Config::get('constants.GRADE_FACTOR_EASY_LEVEL');
            case Config::get('constants.MEDIUM_LEVEL'):
                return Config::get('constants.GRADE_FACTOR_MEDIUM_LEVEL');
            default:
                return 1;
        }
    }
}
