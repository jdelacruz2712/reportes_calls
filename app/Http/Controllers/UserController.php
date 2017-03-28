<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

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

    public function modifyRole(Request $request){
        if ($request->ajax()){
            if ($request->nameRole){
                $resultado = $request->user()->fill([
                    'role'          => $request->nameRole,
                ])->save();
                if($resultado == true){
                    Session::put('UserRole'   ,Auth::user()->role   );
                }
                return (string)$resultado;
            }
        }
    }
}
