<?php

use Illuminate\Database\Seeder;

class CallContextsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('call_contexts')->insert(array('id' => '1','name' => 'Agentes',     'nombre_asterisk' => 'nivel-agentes',     'estado_id' => '1' ));
        \DB::table('call_contexts')->insert(array('id' => '2','name' => 'Backoffice',  'nombre_asterisk' => 'nivel-backoffice',  'estado_id' => '1' ));
        \DB::table('call_contexts')->insert(array('id' => '3','name' => 'Calidad',     'nombre_asterisk' => 'nivel-calidad',     'estado_id' => '1' ));
        \DB::table('call_contexts')->insert(array('id' => '4','name' => 'Supervision', 'nombre_asterisk' => 'nivel-supervision', 'estado_id' => '1' ));
    }
}
