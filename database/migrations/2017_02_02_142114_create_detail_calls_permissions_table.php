<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetailCallsPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_calls_permissions', function (Blueprint $table) {
            $table->tinyinteger('id',true,true);
            $table->unsignedTinyinteger('call_context_id');
            $table->unsignedTinyinteger('call_type_id');
            $table->unsignedTinyinteger('estado_id');
           
           //relación con tabla estado
           $table->foreign('estado_id')
                 ->references('id')
                 ->on('estados');

           //relación con tabla call_contexts
           $table->foreign('call_context_id')
                 ->references('id')
                 ->on('call_contexts');

           //relación con tabla call_types
           $table->foreign('call_type_id')
                 ->references('id')
                 ->on('call_types');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('detail_calls_permissions');
    }
}
