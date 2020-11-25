<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\TestService;

class TestController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $tests = TestService::getTests();
        return response()->json($tests, 200);
    }

    public function store(Request $request)
    {
        try {
            $request_data = $request->json()->all();
            $test = TestService::addNewTest($request_data);
            return response()->json([
                'message' => 'You have created a new test',
                'test' => $test
            ], 200);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }


    // Make a new test or get the running test
    public function makeTest() {
        $test = TestService::makeTest();
        $time_remainning = TestService::calculateTimeRemainning($test);

        if ($time_remainning <= 0) {
            TestService::calculateScore($test->id);
            return response()->json([
                'error_message' => 'Your test was time out'
            ], 403);
        }
        return response()->json([
            'time_remainning' => $time_remainning,
            'questions' => $test->questions
        ], 200);
    }

    public function submitAnswers(Request $request) {
        $selectedAnswers = $request->json()->get("answers");
        TestService::checkAnswers($selectedAnswers);
        return response()->json($selectedAnswers, 200);
    }
}
