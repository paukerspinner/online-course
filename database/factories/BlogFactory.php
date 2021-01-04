<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use App\Blog;
use App\User;

$factory->define(Blog::class, function (Faker $faker) {
    $user_count = count(User::all());
    $paragraphs = '';
    for ($i=0; $i < 3; $i++) { 
        $paragraphs .= "<p>".$faker->paragraph()."</p>";
    }
    return [
        'user_id' => rand(1, $user_count),
        'title' => $faker->catchPhrase,
        'content' => "<p>".$paragraphs."</p>",
    ];
});
