<?php

use Illuminate\Database\Seeder;
use App\Blog;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // for ($i=0; $i < 3; $i++) { 
        //     Blog::create([
        //         'user_id' => 1,
        //         'title' => "Question about first module $i",
        //         'content' => "<p> $i Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt repellendus voluptatibus, numquam dolorem quod dolorum iusto at, quo asperiores distinctio nulla ea nostrum amet voluptas sequi libero similique neque explicabo? </p>"            
        //     ]);
        // }
        factory(Blog::class, 20)->create();
    }
}
