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
        Section::create([
            'id' => 1,
            'title' => "Entrance Test",
            'type' => 'entrance'
        ]);
        for($i = 2; $i < 10; $i++) {
            Section::create([
                'id' => $i,
                'title' => "Module ".($i-1),
                'type' => 'module'
            ]);
        }
        Section::create([
            'id' => 10,
            'title' => "Final exam",
            'type' => 'exam'
        ]);
        Section::create([
            'id' => 11,
            'title' => "Additional section",
            'type' => 'additional'
        ]);
    }
}
