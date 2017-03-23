<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Illuminate\Support\Facades\Hash;

class UserController extends CosapiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    public function modifyPassword(Request $request){
        if ($request->ajax()){
            if ($request->newPassword){
                $resultado = $request->user()->fill([
                    'password'          => Hash::make($request->newPassword),
                    'change_password'   => 1
                ])->save();

                return (string)$resultado;
            }
        }
    }
}
