<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'email' => 'xcp@gmail.com',
            'role' => 'admin',
            'verified' => true,
            // 'level' => 1,
            'password' => bcrypt('12345678'),
            'created_at' => '2020-11-17T18:09:10.000000Z',
            'updated_at' => '2020-11-17T18:11:26.000000Z'
        ]);
        User::create([
            'email' => 'ht@gmail.com',
            'verified' => true,
            // 'level' => 1,
            'password' => bcrypt('12345678'),
            'created_at' => '2020-11-17T18:09:10.000000Z',
            'updated_at' => '2020-11-17T18:11:26.000000Z'
        ]);


        factory(User::class, 10)->create();
    }
}
