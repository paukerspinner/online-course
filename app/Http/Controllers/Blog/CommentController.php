<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api')->only(['destroy']);
    }

    public function destroy($id)
    {
        $cmt = Comment::find($id);
        if (auth()->user()->role == 'admin' || $cmt->user_id == auth()->user()->id) {
            $cmt->delete();
        }
    }
}
