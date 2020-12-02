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
        $test = TestService::makeTest();

        return response()->json([
            'test' => $test
        ], 200);
    }

    public function myIndex() {
        $tests = TestService::getMyTests();
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
        $test_questions = TestService::getTestQuestions($test->id);
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
