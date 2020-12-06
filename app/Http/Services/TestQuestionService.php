<?php

namespace App\Http\Services;
use App\TestQuestion;
use App\TestAnswer;
use App\Question;
use App\Http\Services\TestAnswerService;
use Config;

class TestQuestionService
{
    public static function createTestQuestionsForTest($test) {
        $question_bank = Question::where([
            ['level', $test->level],
            ['section_id', $test->section_id]
        ])->get()->map->only('id')->all();
        $required_questions_size = Config::get('constants.QUESTION_NUMBER');
        $selected_questions = (new static)::getRandomQuestionsFromBank($question_bank, $required_questions_size);
        foreach($selected_questions as $selected_question) {
            $test_question = TestQuestion::create([
                'test_id' => $test->id,
                'question_id' => $selected_question['id']
            ]);
            TestAnswerService::createTestAnswerForTestQuestion($test_question);
        }
    }

    protected static function getRandomQuestionsFromBank($question_bank, $required_number) {
        $question_bank_size = count($question_bank);
        $selected_questions = [];
        for ($i = 0; $i < $required_number; $i++) {
            shuffle($question_bank);
            $selected_questions[] = array_pop($question_bank);
        }
        return $selected_questions;
    }

    public static function getTestQuestionOfTest($test) {
        return $test->testQuestions()->get();
    }

    public static function createTestQuestionForExam($test) {
        for ($section_id=1; $section_id < $test->section_id; $section_id++) { 
            $question_bank = Question::where('section_id', $section_id)->get()->map->only('id')->all();
            $selected_questions = (new static)::getRandomQuestionsFromBank($question_bank, 1);
            foreach($selected_questions as $selected_question) {
                $test_question = TestQuestion::create([
                    'test_id' => $test->id,
                    'question_id' => $selected_question['id']
                ]);
                TestAnswerService::createTestAnswerForTestQuestion($test_question);
            }

        }
    }
}
