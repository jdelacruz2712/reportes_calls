<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;
use Cosapi\Http\Requests;
use Illuminate\Support\Facades\Auth;
use DB;
use Illuminate\Support\Facades\Session;

class AdminController extends Controller
{
    protected $UserId;
    protected $UserRole;
    protected $UserName;
    protected $UserSystem;

    public function __construct(){
        if (!Session::has('UserId')) {
            Session::put('UserId'   ,Auth::user()->id   );
        }

        if (!Session::has('UserRole')) {
            Session::put('UserRole'   ,Auth::user()->role   );
        }

        if (!Session::has('UserName')) {
            Session::put('UserName'   ,Auth::user()->primer_nombre.' '.Auth::user()->apellido_paterno );
        }

        if (!Session::has('UserSystem')) {
            Session::put('UserSystem'   ,Auth::user()->username);
        }

        $this->UserId       = Session::get('UserId');
        $this->UserRole     = Session::get('UserRole') ;
        $this->UserName     = Session::get('UserName') ;
        $this->UserSystem   = Session::get('UserSystem') ;

    }
	/**
	 * [index Función que carga la base del AdminLTE]
	 * @return [view] [Returna la vista base del Admin LTE]
	 */
    public function index()
    {
        if($this->UserRole == 'admin'){
            return redirect('supervisor');
        }else{
            return redirect('agente');
        }

    }

    public function supervisor()
    {
        if($this->UserRole != 'admin'){
            return redirect('logout');
        }
        return view('/front-admin');
    }

    public function agente()
    {
        if($this->UserRole != 'user'){
            return redirect('logout');
        }
        return view('/agente');
    }
}
