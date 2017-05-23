<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCallTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('call_types', function (Blueprint $table) {
            $table->tinyinteger('id',true,true);
            $table->string('name',50);
            $table->string('nombre_asterisk',50);
            $table->unsignedTinyinteger('estado_id');
           
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
        Schema::drop('call_types');
    }
}
