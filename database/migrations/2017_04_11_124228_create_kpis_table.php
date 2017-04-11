<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKpisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kpis', function (Blueprint $table){

            $table->integer('id');
            $table->string('name',50);
            $table->string('text',50);
            $table->string('symbol',5);
            $table->string('time',5);
            $table->string('color',50);
            $table->string('icon',50);
            $table->integer('estado_id',10)->unsigned();

            // creando relaciones:
            $table->foreign('estado_id')
                ->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kpis');
    }
}
