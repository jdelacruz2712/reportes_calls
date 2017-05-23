<?php

use Illuminate\Database\Seeder;

class CallTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('call_types')->insert(array('id' => '1','name' => 'Fijo Local',          'nombre_asterisk' => 'salidas-local',            'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '2','name' => 'Fijo Nacional',       'nombre_asterisk' => 'salidas-nacional',         'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '3','name' => 'Fijo Internacional',  'nombre_asterisk' => 'salidas-internacionales',  'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '4','name' => 'Celulares',           'nombre_asterisk' => 'salidas-celulares',        'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '5','name' => '0800',                'nombre_asterisk' => 'salidas-0800',             'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '6','name' => 'Internos',            'nombre_asterisk' => 'anexos-internos',          'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '7','name' => 'Externos',            'nombre_asterisk' => 'anexos-externos',          'estado_id' => '1' ));
        \DB::table('call_types')->insert(array('id' => '8','name' => 'Monitoreo de Anexos', 'nombre_asterisk' => 'monitorear_anexos',        'estado_id' => '1' ));
    }
}
