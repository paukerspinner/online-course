<?php

namespace App\Http\Controllers;
use App\Http\Services\TestAnswerService;

use Illuminate\Http\Request;

use App\TestAnswer;

class TestAnswerController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return TestAnswer::all();
    }

    // Add all of 4 answers
    public function store(Request $request)
    {
        $submit_test_answers = $request->json()->get('test_answers');
        $test_question_id = $submit_test_answers[0]["test_question_id"];
        $exist_mark_submit = TestAnswerService::markIsSubmitedTestQuestion($test_question_id);

        if ($exist_mark_submit) {
            return response()->json([
                'message_error' => 'You have submited this question'
            ], 403);
        } else {
            $test_answers_with_corrected = TestAnswerService::updateTestAnswers($submit_test_answers);

            return response()->json([
                'test_answers_with_corrected' => $test_answers_with_corrected
            ], 200);
        }
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        
    }

    public function destroy($id)
    {
        //
    }
}
