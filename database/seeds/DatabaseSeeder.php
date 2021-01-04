<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(ProfileSeeder::class);
        $this->call(SectionSeeder::class);
        $this->call(QuestionSeeder::class);
        $this->call(AnswerSeeder::class);
        $this->call(TestSeeder::class);
        $this->call(MaterialSeeder::class);

        $this->call(BlogSeeder::class);
        $this->call(CommentSeeder::class);

        $this->call(NotificationSeeder::class);
        $this->call(NotificationUserSeeder::class);
    }
}
