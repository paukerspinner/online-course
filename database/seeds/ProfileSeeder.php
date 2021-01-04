<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Profile;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        $users = User::all();
        foreach ($users as $user) {
            Profile::create([
                'user_id' => $user->id,
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'patronymic' => $faker->lastName,
                'is_male' => rand(0, 1) ? rand(0, 1) : null,
                'date_of_birth' => rand(0, 1) ? $faker->date : null
            ]);
        }
    }
}
