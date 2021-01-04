<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Blog;
use App\Http\Resources\Blog\BlogResource;
use App\Http\Resources\Blog\BlogCollection;

class BlogController extends Controller
{
    public function __contruct() {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $blogs = Blog::orderBy('id', 'DESC')->get();
        $blogs_res = new BlogCollection($blogs);
        return response()->json([
            'blogs' => $blogs_res
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $blog = Blog::create([
            'title' => $data["title"],
            'content' => $data["content"],
            'user_id' => auth()->user()->id
        ]);
        return response()->json([
            'message' => 'You have posted a new blog'
        ], 200);
    }

    public function show($id)
    {
        $blog = new BlogResource(Blog::find($id));
        return response()->json([
            'blog' => $blog
        ], 200);
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);
        if (auth()->user()->role == 'admin' || $blog->user_id == auth()->user()->id) {
            $blog->delete();
        }
    }
}
