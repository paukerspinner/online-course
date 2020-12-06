<?php

use Illuminate\Database\Seeder;
use App\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Comment::create([
            'blog_id' => 1,
            'user_id' => 1,
            'content' => "<p>1 sdfsdfsd sdf sdf sd sdfs sdf</p>"
        ]);
        Comment::create([
            'blog_id' => 1,
            'user_id' => 2,
            'content' => "<p>2 sdfsdfsd sdf sdf sd sdfs sdf</p>"
        ]);
    }
}
