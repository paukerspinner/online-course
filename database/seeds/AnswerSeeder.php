<?php

use Illuminate\Database\Seeder;
use App\Answer;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Question 1
        for ($i = 0; $i < 30*9; $i++) {
            for ($j = 0; $j < 4; $j++) {
                $id = $i * 4 + $j + 1;
                $question_id = $i + 1;
                Answer::Create([
                    'question_id' => $question_id,
                    'text' => "Answer number $j of question $question_id",
                    'is_correct' => $j == 0
                ]);
            }
        }
    }
}
