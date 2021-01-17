<?php

namespace App\Http\Services;
use App\Test;
use App\TestQuestion;
use App\TestAnswer;
use App\Question;
use App\Section;
use App\Http\Services\TestAnswerService;
use Config;
use Exception;

class TestQuestionService
{
    public static function createTestQuestionsForTest($test) {
        $question_bank = Question::where([
            ['level', $test->level],
            ['section_id', $test->section_id]
        ])->get()->map->only('id')->all();
        $selected_questions = (new static)::getRandomQuestionsFromBank($question_bank, Test::QUES_NUM_FOR_MOD);
        
        foreach($selected_questions as $selected_question) {
            $test_question = TestQuestion::create([
                'test_id' => $test->id,
                'question_id' => $selected_question['id']
            ]);
            TestAnswerService::createTestAnswerForTestQuestion($test_question);
        }
    }

    public static function createTestQuestionForEntrance($test) {
        $question_bank = Question::where([
            ['section_id', $test->section_id]
        ])->get()->map->only('id')->all();
        $selected_questions = (new static)::getRandomQuestionsFromBank($question_bank, Test::QUES_NUM_FOR_MOD);
        foreach($selected_questions as $selected_question) {
            $test_question = TestQuestion::create([
                'test_id' => $test->id,
                'question_id' => $selected_question['id']
            ]);
            TestAnswerService::createTestAnswerForTestQuestion($test_question);
        }
    }

    protected static function getRandomQuestionsFromBank($question_bank, $required_number) {
        shuffle($question_bank);
        $selected_questions = array_slice($question_bank, 0, $required_number);
        return $selected_questions;
    }

    public static function getTestQuestionOfTest($test) {
        return $test->testQuestions()->get();
    }

    public static function createTestQuestionForExam($test) {
        $all_modules = Section::all()->where('is_module', true);
        foreach ($all_modules as $module) {
            $section_id = $module->id;
            $level = auth()->user()->tests()->where('section_id', $section_id)->get()->last()->level;
            $question_bank = Question::where('section_id', $section_id)->where('level', $level)->get()->map->only('id')->all();
            $selected_questions = (new static)::getRandomQuestionsFromBank($question_bank, Test::QUES_NUM_PER_MOD_FOR_EXAM);
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
