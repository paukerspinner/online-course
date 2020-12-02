<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\UserService;

class UserController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    public function index()
    {
        //
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
}
