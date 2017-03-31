<?php

namespace Cosapi\Http\Controllers;

use Cosapi\Models\Anexo;
use Cosapi\Models\User;
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
    protected $UserPassword;
    protected $UserAnexo;
    protected $QueueAdd;

    public function __construct(){

        Session::put('UserId'       ,Auth::user()->id   );
        Session::put('UserRole'     ,Auth::user()->role   );
        Session::put('UserName'     ,Auth::user()->primer_nombre.' '.Auth::user()->apellido_paterno );
        Session::put('UserSystem'   ,Auth::user()->username);

        $Users = User::select('change_password')->where('id','=',Auth::user()->id )->get()->toArray();
        Session::put('UserPassword'     ,$Users[0]['change_password']);

        $Anexos = Anexo::select('name')->where('user_id','=',Auth::user()->id )->get()->toArray();
        if(count($Anexos) != 0){
            $name_anexo = $Anexos[0]['name'];
            Session::put('UserAnexo'    ,$name_anexo);
        }else{
            Session::put('UserAnexo'     ,'Sin Anexo'   );
        }


        if (!Session::has('QueueAdd')) {
            Session::put('QueueAdd'     ,'false'   );
        }

        $this->UserId       = Session::get('UserId')        ;
        $this->UserRole     = Session::get('UserRole')      ;
        $this->UserName     = Session::get('UserName')      ;
        $this->UserSystem   = Session::get('UserSystem')    ;
        $this->UserPassword = Session::get('UserPassword')  ;
        $this->UserAnexo    = Session::get('UserAnexo')     ;
        $this->QueueAdd     = Session::get('QueueAdd')     ;

    }

	/**
	 * [index Función que carga la base del AdminLTE]
	 * @return [view] [Returna la vista base del Admin LTE]
	 */
    public function index()
    {
        return view('/front-admin')->with(array(
            'anexo'     =>  $this->UserAnexo,
            'password'  =>  $this->UserPassword,
            'role'      =>  $this->UserRole
        ));
    }

    public function working()
    {
        return view('/layout/recursos/working');
    }

    public function setQueueAdd(Request $request)
    {
        if($request->ajax()){
            if ($request->QueueAdd){
                Session::put('QueueAdd'     ,$request->QueueAdd   );
                $this->QueueAdd     = Session::get('QueueAdd')     ;

                return $request->QueueAdd;
            }
        }
    }
}
