<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Blog;
use App\Comment;
use App\Http\Resources\Blog\BlogResource;
use App\Http\Resources\Comment\CommentCollection;

class BlogCommentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($blog_id)
    {
        $blog_comments = new CommentCollection(Blog::find($blog_id)->comments);
        
        return response()->json([
            'comments' => $blog_comments
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request, $blog_id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $blog_id)
    {
        try {
            $data = $request->all();
            $comment = Comment::create([
                'blog_id' => $blog_id,
                'user_id' => auth()->user()->id,
                'content' => $data["comment"]
            ]);
            return response()->json([], 200);
        } catch (Exception $e) {
            return response()->json([
                'error_mess' => 'Something wrong, try again'
            ], 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }
}
