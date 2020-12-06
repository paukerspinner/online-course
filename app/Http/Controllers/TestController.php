<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\TestService;
use App\Http\Services\TestQuestionService;

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
        
    }

    public function show($id)
    {
        
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function makeTest()
    {
        if (auth()->user()->completed_course) {
            return response()->json([
                'message_error' => 'You have completed the course'
            ], 403);
        }
        $test = TestService::makeTest();

        return response()->json([
            'test' => $test
        ], 200);
    }

    public function myIndex() {
        $tests = TestService::getCompletedTestsOfUser(auth()->user());
        return response()->json([
            'tests' => $tests
        ], 200);
    }

    public function showPendingTest()
    {
        $test = TestService::getPendingTest();
        if ($test->started_at == null) {
            TestService::setTestStarting($test->id);
        }
        $test_questions = TestQuestionService::getTestQuestionOfTest($test);
        $time_remainning = TestService::calculateTimeRemainning($test->id);
        return response()->json([
            'test' => $test,
            'test_questions' => $test_questions,
            'time_remainning' => $time_remainning
        ], 200);
    }

    public function finishPendingTest() {
        $test = TestService::finishPendingTest();

        return response()->json([
            'message' => 'You finish this test at good level'
        ], 200);
    }
}
