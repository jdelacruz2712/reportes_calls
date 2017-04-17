<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUbigeosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ubigeos', function(Blueprint $table)
        {
            $table->string('ubigeo',6)->primary();
            $table->string('departamento',15);
            $table->string('provincia',25);
            $table->string('distrito',50);


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('ubigeos');
    }
}
