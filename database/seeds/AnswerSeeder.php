<?php

use Illuminate\Database\Seeder;
use App\Answer;
use App\Question;

class AnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = Question::all();
        foreach ($questions as $question) {
            for ($i=0; $i < 4; $i++) { 
                Answer::create([
                    'question_id' => $question->id,
                    'text' => "Answer number $i",
                    'is_correct' => $i == 0
                ]);
            }
        }
        // for ($i = 0; $i < 30*9; $i++) {
        //     for ($j = 0; $j < 4; $j++) {
        //         $id = $i * 4 + $j + 1;
        //         $question_id = $i + 1;
        //         Answer::Create([
        //             'question_id' => $question_id,
        //             'text' => "Answer number $j of question $question_id",
        //             'is_correct' => $j == 0
        //         ]);
        //     }
        // }
    }
}
