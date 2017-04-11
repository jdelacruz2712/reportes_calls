<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use DB;

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
                $resultado = DB::table('users')
                    ->where('id',$request->userId)
                    ->update([
                        'password'          => Hash::make($request->newPassword),
                        'change_password'   => 1
                    ]);

                return (string)$resultado;
            }
        }
    }

    public function modifyRole(Request $request){
        if ($request->ajax()){
            if ($request->nameRole){

                $resultado = DB::table('users')
                    ->where('id',$request->userId)
                    ->update([
                        'role'    => $request->nameRole,
                    ]);

                if($resultado == true && $this->UserId ==  $request->userId){
                    Session::put('UserRole'   ,Auth::user()->role   );
                }

                return (string)$resultado;
            }
        }
    }
}
