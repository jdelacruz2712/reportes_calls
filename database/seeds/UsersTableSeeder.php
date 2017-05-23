<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       DB::table('users')->insert([
            'primer_nombre'     =>  'Cosapitest',
            'segundo_nombre'    =>  'Cosapitest',
            'apellido_paterno'  =>  'Cosapitest',
            'apellido_materno'  =>  'Cosapitest',
            'username'          =>  'cosapitest',
            'estado_id'         =>  '1',
            'email'             =>  'cosapitest@cosapidata.com.pe',
            'password'          =>  Hash::make('C0s4pi+est+'),
            'role'              =>  'admin'
        ]);
    }
}
