<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\TestService;
use App\User;

class UserTestController extends Controller
{
    public function __construct() {
        $this->middleware('role:admin');
    }

    public function index($id)
    {
        $user = User::find($id);
        $completed_test = TestService::getCompletedTestsOfUser($user);
        return response()->json([
            'tests' => $completed_test
        ], 200);
    }

    public function store(Request $request)
    {
        //
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
}
