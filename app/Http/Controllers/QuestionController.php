<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\QuestionService;

class QuestionController extends Controller
{
    public function index()
    {
        $questions = QuestionService::getQuestions();
        return response()->json($questions);
    }

    public function store(Request $request)
    {
        try {
            $request_data = $request->json()->all();
            $question = QuestionService::addNewQuestion($request_data['question']);
            QuestionService::addAnswersForQuestion($request_data['answers'], $question->id);
            return response()->json([
                'message' => 'You have added a new question',
                'question' => $question
            ]);
        } catch(Exception $e) {
            return response()->json($e);
        }
    }

    public function show($id)
    {
        try {
            $question = QuestionService::getQuestion($id);
            return response()->json($question);
        } catch(Exception $e) {
            return response()->json($e);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $request_data = $request->json()->all();
            $question = QuestionService::updateQuestion($request_data['question'], $id);
            QuestionService::updateAnswersForQuestion($request_data['answers'], $id);
            return response()->json([
                'message' => 'You have updated the question'
            ]);
        } catch(Exception $e) {
            return response()->json($e);
        }
    }

    public function destroy($id)
    {
        //
    }
}
