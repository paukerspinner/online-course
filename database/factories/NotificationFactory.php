<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Notification;
use Faker\Generator as Faker;

$factory->define(Notification::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence(),
        'content' => "<p>".$faker->paragraph(3)."</p>"
    ];
});
