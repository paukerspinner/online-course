<?php

use Illuminate\Database\Seeder;
use App\Question;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Question::create([
        //     'id' => 1,
        //     'text' => '<p><span style="color: rgb(133,135,150);background-color: rgb(255,255,255);font-size: 16px;font-family: Nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji;">This card uses Bootstraps default styling with no utility classes added. Global styles are the only things modifying the look and feel of this default card example.</span></p>
        //     <img src="https://www.denic.de/fileadmin/public/_processed_/0/f/csm_Titelbild_Web_EN_0c68fe7193.jpg" alt="undefined" style="height: auto;width: 300px"/>
        //     <p></p>',
        //     'type' => 0,
        //     'level' => 1
        // ]);

        // for ($i = 1; $i <= 9 * 30; $i++) {
        //     Question::create([
        //         'id' => $i,
        //         'section_id' => floor(($i-1)/30) + 1,
        //         'text' => "<p>Text question</p>",
        //         'type' => rand(0, 1),
        //         'level' => ($i-1)%30 >= 20 ? 2 : (($i-1)%30 >= 10 ? 1 : 0)
        //     ]);
        // }

        for ($i=0; $i < 20; $i++) {
            Question::create([
                'section_id' => 1,
                'text' => "<p>Text question</p>",
                'type' => rand(0, 1),
                'level' => 1
            ]);
        }

        for ($i=0; $i < 8; $i++) { 
            $section_id = $i + 2;
            for ($level=0; $level < 3; $level++) { 
                for ($j=0; $j < 20; $j++) { 
                    Question::create([
                        'section_id' => $section_id,
                        'text' => "<p>Text question</p>",
                        'type' => rand(0, 1),
                        'level' => $level
                    ]);
                }
            }
        }
    }
}