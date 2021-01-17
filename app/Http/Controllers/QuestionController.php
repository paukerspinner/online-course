<?php

namespace App\Http\Controllers;

use App\Question;

use Illuminate\Http\Request;
use App\Http\Services\QuestionService;
use App\Http\Resources\Question\QuestionAnswerCollection;
use App\Http\Resources\Question\QuestionAnswerResource;

class QuestionController extends Controller
{
    public function __construct() {
        $this->middleware('role:admin');
    }

    public function index()
    {
        $questions = Question::orderBy('section_id')->orderBy('level')->get();
        $questions_res = new QuestionAnswerCollection($questions);
        return response()->json([
            'questions' => $questions_res
        ], 200);
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
        $question = Question::find($id)->delete();
        return response()->json([
            'message' => 'You have deleted a question'
        ], 200);
    }
}
