<?php

use Illuminate\Database\Seeder;
use App\Section;

class SectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i < 9; $i++) {
            Section::create([
                'id' => $i,
                'title' => "Module $i",
                'is_exam' => false
            ]);
        }
        Section::create([
            'id' => 9,
            'title' => "Final exam",
            'is_exam' => true
        ]);
    }
}
