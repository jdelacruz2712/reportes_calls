<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnexosTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anexos', function (Blueprint $table)
        {
            $table->increments('id')->unsigned();
            $table->string('name', 5);
            $table->unsignedInteger('user_id');
            $table->unsignedTinyInteger('estado_id');
            $table->unsignedTinyInteger('call_context_id')->default('1');
            $table->timestamps();
            $table->unique(['name']);
            $table->unique(['name','user_id']);
            
            /*relacion con tabla estados*/
            $table->foreign('estado_id')
                  ->references('id') 
                  ->on('estados'); 

            /*relacion con tabla call_contexts*/
            $table->foreign('call_context_id')
                  ->references('id') 
                  ->on('call_contexts'); 

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('anexos');
    }
}
