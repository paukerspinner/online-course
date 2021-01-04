<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\User\TranscriptResource;

class TranscriptController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function show($user_id)
    {
        if (auth()->user()->id == $user_id || auth()->user()->role == 'admin') {
            $user = User::find($user_id);
            return response()->json([
                'transcript' => new TranscriptResource($user)
            ], 200);
        } else {
            return response()->json([], 403);
        }
    }

    public function mine() {
        $user_id = auth()->user()->id;
        return $this->show($user_id);
    }
}
