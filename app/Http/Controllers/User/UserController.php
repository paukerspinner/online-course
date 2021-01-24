<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Services\UserService;
use App\Http\Services\TestService;
use App\User;
use Config;
use App\Http\Resources\User\UserCollection;
use App\Http\Resources\User\StudentCollection;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
        $this->middleware('role:admin')->except(['requestUpLevel', 'requestDownLevel', 'myself']);
    }

    public function index(Request $request)
    {
        $filter_request = $request->all();
        $conditions_filter = [];
        foreach ($filter_request as $key => $value) {
            $conditions_filter[] = [$key, $value];
        }
        $users = User::where($conditions_filter)->get();

        if ($request->has('role') && $filter_request['role'] == 'student') {
            $users_res = new StudentCollection($users);
        } else {
            $users_res = new UserCollection($users);
        }
        return response()->json([
            'users' => $users_res
        ], 200);
    }
    
    public function store(Request $request)
    {
        //
    }
    
    public function show($id)
    {
        $user = User::find($id)->setAppends(['transcript']);
        return response()->json([
            'user' => $user
        ], 200);
    }
    
    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json([
            'message' => 'You have successfully deleted a user',
            'user' => $user
        ], 200);
    }

    public function requestUpLevel() {
        $pending_test = TestService::getPendingTest();
        if ($pending_test && $pending_test->started_at) {
            return response()->json([
                'message_error' => 'You cannot change your level because the test is in progress.'
            ], 403);
        }

        if (auth()->user()->level == Config::get('constants.MAX_LEVEL')) {
            return response()->json([
                'message_error' => 'Your request have been fail processed. Your level was maximum'
            ], 403);
        } else {
            UserService::upLevel();
            return response()->json([
                'message' => 'Your request have been successfully processed'
            ], 200);
        }
    }

    public function requestDownLevel() {
        $pending_test = TestService::getPendingTest();
        if ($pending_test && $pending_test->started_at) {
            return response()->json([
                'message_error' => 'You cannot change your level because the test is in progress.'
            ], 403);
        }

        if (auth()->user()->level == Config::get('constants.MIN_LEVEL')) {
            return response()->json([
                'message_error' => 'Your request have been fail processed. Your level was minimum'
            ], 403);
        } else {
            UserService::downLevel();
            return response()->json([
                'message' => 'Your request have been successfully processed'
            ], 200);
        }
    }

    public function myself() {
        return $this->show(auth()->user()->id);
    }
}
