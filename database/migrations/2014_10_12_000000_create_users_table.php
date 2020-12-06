<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name', 255);
            $table->string('surname', 255);
            $table->string('patronymic', 255)->nullable();
            $table->string('role', 255)->default('student');
            $table->boolean('verified')->default(false);
            $table->tinyInteger('level')->default(2);   // default value is max level
            $table->boolean('completed_course')->default(false);
            $table->string('password');
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
        Schema::dropIfExists('users');
    }
}
