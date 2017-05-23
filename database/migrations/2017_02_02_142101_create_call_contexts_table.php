<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCallContextsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('call_contexts', function (Blueprint $table) {
            $table->TinyInteger('id', true,true);
            $table->string('name',50);
            $table->string('nombre_asterisk',50);
            $table->unsignedTinyInteger('estado_id');
            
            //relación con tabla estado
           $table->foreign('estado_id')
                 ->references('id')
                 ->on('estados');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('call_contexts');
    }
}
