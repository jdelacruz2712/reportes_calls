<?php

namespace Cosapi\Http\Controllers;

use Cosapi\Models\Anexo;
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

    public function __construct(){

        $type_password = 0;

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


        // Tipo de password modificado
        if(Auth::user()->password == '$2y$10$9TTAuZKJgHLvDfDlvt2fY.vWlj2EqwG6iGLJ.zuaxbqaA3.EBXPOW'){
            $type_password = 1; // Tipo de password por defecto
        }
        Session::put('UserPassword'   ,$type_password);


        $Anexos = Anexo::select('name')->where('user_id','=',Auth::user()->id )->get()->toArray();
        if(count($Anexos) != 0){
            $name_anexo = $Anexos[0]['name'];
            Session::put('UserAnexo'   ,$name_anexo);
        }else{
            Session::put('UserAnexo'   ,'Sin Anexo'   );
        }

        $this->UserId       = Session::get('UserId')        ;
        $this->UserRole     = Session::get('UserRole')      ;
        $this->UserName     = Session::get('UserName')      ;
        $this->UserSystem   = Session::get('UserSystem')    ;
        $this->UserPassword = Session::get('UserPassword')  ;
        $this->UserPassword = Session::get('UserPassword')  ;
        $this->UserAnexo    = Session::get('UserAnexo')     ;


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
        $name_anexo = 'Sin Anexo';
        if($this->UserRole != 'admin'){
            return redirect('logout');
        }

        return view('/front-admin')->with(array('anexo'=>$this->UserAnexo,'password' => $this->UserPassword));
    }

    public function agente()
    {
        $name_anexo = 'Sin Anexo';
        if($this->UserRole != 'user'){
            return redirect('logout');
        }

        return view('/agente')->with(array('anexo'=>$this->UserAnexo,'password' => $this->UserPassword));
    }

    public function working()
    {
        return view('/layout/recursos/working');
    }
}
