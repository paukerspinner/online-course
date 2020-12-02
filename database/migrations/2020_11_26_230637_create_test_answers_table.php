<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTestAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('test_answers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('answer_id');
            $table->unsignedBigInteger('test_question_id');
            $table->boolean('is_selected')->default(false);
            $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade');
            $table->foreign('test_question_id')->references('id')->on('test_questions')->onDelete('cascade');
            //$table->unique(['answer_id', 'test_question_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('test_answers');
    }
}
