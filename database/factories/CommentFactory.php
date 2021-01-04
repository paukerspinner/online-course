<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Comment;
use Faker\Generator as Faker;
use App\Blog;
use App\User;

$factory->define(Comment::class, function (Faker $faker) {
    $blog_count = count(Blog::all());
    $user_count = count(User::all());
    return [
        'blog_id' => rand(1, $blog_count),
        'user_id' => rand(1, $user_count),
        'content' => "<p>".$faker->paragraph(rand(1, 2))."</p>"
    ];
});
