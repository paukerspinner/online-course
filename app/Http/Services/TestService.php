<?php

namespace App\Http\Services;
use App\Question;
use App\Test;
use App\TestQuestion;
use App\TestAnswer;
use App\User;
use Carbon\Carbon;
use App\Answer;
use App\Section;
use App\Http\Services\UserService;
use App\Http\Services\TestQuestionService;
use Config;
use Exception;

class TestService
{
    public static function getTests() {
        return Test::all();
    }

    public static function getCompletedTestsOfUser($user) {
        return $user->tests()->where('grade', '!=', null)->orderBy('updated_at', 'DESC')->get();
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
        try {
            if ($new_test->is_entrance) {
                TestQuestionService::createTestQuestionForEntrance($new_test);
            } else if ($new_test->is_exam) {
                TestQuestionService::createTestQuestionForExam($new_test);
            } else {
                TestQuestionService::createTestQuestionsForTest($new_test);
            }
        } catch (Exception $e) {
            $new_test->delete();
            return null;
        }
        return $new_test;
    }

    public static function finishPendingTest() {
        $pending_test = (new static)::getPendingTest();
        $grade = (new static)::calculateScore($pending_test->id);
        if ($pending_test->section_id == 1) {
            UserService::setLevel($grade);
        } else {
            UserService::updateLevel($grade);
        }
        $pending_test->update([
            'grade' => $grade,
            'finished_at' => Carbon::now()
        ]);
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

    public static function getBallOfTest($test) {
        $score = 0;
        if ($test->is_exam) {
            $score = $test->grade * 0.2;
        } else {
            switch($test->level) {
                case Config::get('constants.EASY_LEVEL'):
                    if ($test->grade > Config::get('constants.GRADE_EXCELLENT')) {
                        $score = Test::EXCELLENT_GRADE_EASY_LEVEL;
                    } else if ($test->grade > Config::get('constants.GRADE_GOOD')) {
                        $score = Test::GOOD_GRADE_EASY_LEVEL;
                    } else if ($test->grade >= Config::get('constants.GRADE_PASS')) {
                        $score = Test::PASS_GRADE_EASY_LEVEL;
                    }
                    break;
                case Config::get('constants.MEDIUM_LEVEL'):
                    if ($test->grade > Config::get('constants.GRADE_EXCELLENT')) {
                        $score = Test::EXCELLENT_GRADE_MEDIUM_LEVEL;
                    } else if ($test->grade > Config::get('constants.GRADE_GOOD')) {
                        $score = Test::GOOD_GRADE_MEDIUM_LEVEL;
                    } else if ($test->grade >= Config::get('constants.GRADE_PASS')) {
                        $score = Test::PASS_GRADE_MEDIUM_LEVEL;
                    }
                    break;
                case Config::get('constants.HARD_LEVEL'):
                    if ($test->grade > Config::get('constants.GRADE_EXCELLENT')) {
                        $score = Test::EXCELLENT_GRADE_HARD_LEVEL;
                    } else if ($test->grade > Config::get('constants.GRADE_GOOD')) {
                        $score = Test::GOOD_GRADE_HARD_LEVEL;
                    } else if ($test->grade >= Config::get('constants.GRADE_PASS')) {
                        $score = Test::PASS_GRADE_HARD_LEVEL;
                    }
                    break;
            }
        }
        return $score;
    }

    public static function getFailSectionsOfExam($exam_test_id) {      // trong bài exam, đưa ra những module đạt kết quả không tốt ( < 60% )
        $exam_test = Test::find($exam_test_id);
        $fail_sections = [];
        $all_modules = Section::all()->where('is_module', true);
        foreach ($all_modules as $module) {
            $all_test_questions = $exam_test->testQuestions()->get()->where('section_id', $module->id);
            $is_correct_count = 0;
            $all_count = count($all_test_questions);
            foreach ($all_test_questions as $test_question) {
                if ($test_question->is_correct) {
                    $is_correct_count += 1;
                }
            }
            if ($is_correct_count * 100 / $all_count < Test::GRADE_PASS) {
                $fail_sections[] = $module;
            }
        }
        return $fail_sections;
    }

    // public static function getFactorGradeOfLevel($test_level) {
    //     switch($test_level) {
    //         case Config::get('constants.EASY_LEVEL'):
    //             return Config::get('constants.GRADE_FACTOR_EASY_LEVEL');
    //         case Config::get('constants.MEDIUM_LEVEL'):
    //             return Config::get('constants.GRADE_FACTOR_MEDIUM_LEVEL');
    //         default:
    //             return 1;
    //     }
    // }

    public static function getLastTest($section_id) {
        return auth()->user()->tests()->where('section_id', $section_id)->where('grade', '!=', null)->get()->last();
    }
}
