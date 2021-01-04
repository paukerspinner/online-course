<?php

namespace App\Http\Services;
use App\Question;
use App\Answer;

class QuestionService
{
    public static function addNewQuestion($question_fields) {
        $new_question = Question::create([
            'text' => $question_fields['text'],
            'level' => $question_fields['level'],
            'type' => $question_fields['type'],
            'section_id' => $question_fields['section_id']
        ]);
        return $new_question;
    }

    public static function addAnswersForQuestion($answers, $question_id) {
        foreach ($answers as $key => $answer) {
            $new_answer = Answer::create([
                'question_id' => $question_id,
                'text' => $answer['text'],
                'is_correct' => $answer['is_correct']
            ]);
        }
    }

    public static function updateQuestion($question_fields, $question_id) {
        $question = Question::find($question_id);
        $question->update([
            'text' => $question_fields['text'],
            'level' => $question_fields['level'],
            'type' => $question_fields['type'],
            'section_id' => $question_fields['section_id']
        ]);
        return $question;
    }

    public static function updateAnswersForQuestion($answers, $question_id) {
        foreach ($answers as $key => $answer) {
            Answer::find($answer['id'])->update([
                'question_id' => $question_id,
                'text' => $answer['text'],
                'is_correct' => $answer['is_correct']
            ]);
        }
    }
    
    public static function getQuestions() {
        return Question::orderBy('section_id')->get();
    }

    public static function getQuestion($id) {
        return Question::find($id);
    }
}
