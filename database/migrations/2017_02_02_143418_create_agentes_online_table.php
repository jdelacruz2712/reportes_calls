<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgentOnlineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agent_online', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('number_annexed',10);
            $table->string('name_agent',35);
            $table->string('name_event',25);
            $table->string('name_queue_inbound',50);
            $table->string('phone_number_inbound',25);
            $table->time('star_call_inbound');
            $table->string('total_calls',4);
            $table->string('name_queue',25);
            $table->string('status_pause',1);
            $table->string('penalty_agent',1);
            $table->string('ringinuse_agent',20);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        schema::drop('agent_online');
    }
}
