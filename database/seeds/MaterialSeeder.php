<?php

use Illuminate\Database\Seeder;
use App\Material;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i < 10; $i++) {
            Material::create([
                'section_id' => $i,
                'title' => "Material module $i - easy level",
                'level' => 0,
                'path' => 'files/default.pdf'
            ]);
            Material::create([
                'section_id' => $i,
                'title' => "Material module $i - medium level",
                'level' => 1,
                'path' => 'files/default.pdf'
            ]);
            Material::create([
                'section_id' => $i,
                'title' => "Material module $i - hard level",
                'level' => 2,
                'path' => 'files/default.pdf'
            ]);
        }
    }
}
