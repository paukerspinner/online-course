<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\UserService;
use App\User;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
        $this->middleware('role:admin')->except(['requestUpLevel', 'myself']);
    }

    public function index(Request $request)
    {
        $filter_request = $request->all();
        return response()->json([
            'users' => UserService::getUsers($filter_request)
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
        //
    }

    public function requestUpLevel() {
        $is_success_upgrade = UserService::requestUpLevel();
        if ($is_success_upgrade) {
            return response()->json([
                'message' => 'Your request have been successfully processed'
            ], 200);
        } else {
            return response()->json([
                'message_error' => 'Your request have been fail processed. Your level was maximum'
            ], 403);
        }
    }

    public function myself() {
        return $this->show(auth()->user()->id);
    }
}
