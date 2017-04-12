<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Collector\Collector;
use Cosapi\Http\Requests;
use Cosapi\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use DB;
use Excel;

class UserController extends CosapiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            if ($request->fecha_evento) {
                return $this->list_users();
            } else {
                return view('elements/index')->with(array(
                    'routeReport' => 'elements.list_users.list_user',
                    'titleReport' => 'List Users',
                    'viewButtonSearch' => false,
                    'viewHourSearch' => false,
                    'viewDateSearch' => false,
                    'exportReport' => 'export_list_user',
                    'nameRouteController' => 'list_users'
                ));
            }
        }
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

    public function changeStatus(Request $request){
        if ($request->ajax()){
            if ($request->userID){

                $resultado = DB::table('users')
                    ->where('id',$request->userID)
                    ->update([
                        'estado_id'    => $request->estadoID,
                    ]);

                return (string)$resultado;
            }
        }
    }

    public function createUser(Request $request){
        if ($request->ajax()){
            if ($request->primerNombre){

                $resultado = DB::table('users')->insert([
                        'primer_nombre'    => $request->primerNombre,
                        'segundo_nombre'   => $request->segundoNombre,
                        'apellido_paterno' => $request->apellidoPaterno,
                        'apellido_materno' => $request->apellidoMaterno,
                        'username'         => $request->userName,
                        'email'            => $request->email,
                        'password'         => Hash::make($request->nuevaContraseña),
                        'role'             => $request->role,
                        'estado_id'        => 1
                    ]);

                return (string)$resultado;
            }
        }
    }

    public function export(Request $request){
        $export_outgoing  = call_user_func_array([$this,'export_'.$request->format_export], [$request->days]);
        return $export_outgoing;
    }

    public function list_users(){
        $query_user_list        = $this->user_list_query();
        $builderview            = $this->builderview($query_user_list);
        $outgoingcollection     = $this->outgoingcollection($builderview);
        $list_users             = $this->FormatDatatable($outgoingcollection);
        return $list_users;
    }

    protected function user_list_query(){
        $user_list_query            = User::select()
            ->get();
        return $user_list_query;
    }

    protected function builderview($user_list_query,$type=''){
        $posicion = 0;
        foreach ($user_list_query as $query) {
            $estado = ($query['estado_id'] == 1) ? "Activo":"Inactivo";
            $builderview[$posicion]['Id']                       = $query['id'];
            $builderview[$posicion]['First Name']               = $query['primer_nombre'];
            $builderview[$posicion]['Second Name']              = $query['segundo_nombre'];
            $builderview[$posicion]['Last Name']                = $query['apellido_paterno'];
            $builderview[$posicion]['Second Last Name']         = $query['apellido_materno'];
            $builderview[$posicion]['Role']                     = $query['role'];
            $builderview[$posicion]['Username']                 = $query['username'];
            $builderview[$posicion]['Estado']                   = $estado;
            $posicion ++;
        }

        if(!isset($builderview)){
            $builderview = [];
        }

        return $builderview;
    }

    protected function outgoingcollection($builderview){
        $outgoingcollection                 = new Collector();
        foreach ($builderview as $view) {

            $outgoingcollection->push([
                'Id'                    => $view['Id'],
                'First Name'            => $view['First Name'],
                'Second Name'           => $view['Second Name'],
                'Last Name'             => $view['Last Name'],
                'Second Last Name'      => $view['Second Last Name'],
                'Username'              => $view['Username'],
                'Role'                  => $view['Role'],
                'Estado'                => $view['Estado'],
                'Change Rol'            => '<a class="btn btn-success btn-xs" onclick="changeRol('. $view['Id'] .')"><i class="fa fa-user"></i></a>',
                'Change Password'       => '<a class="btn btn-danger btn-xs" onclick="changePassword('. $view['Id'] .',true)"><i class="fa fa-key"></i></a>',
                'Change Status'         => '<a class="btn btn-info btn-xs" onclick="changeStatus('. $view['Id'] .', \''. $view['Estado'] .'\')"><i class="fa fa-refresh"></i></a>'
            ]);

        }
        return $outgoingcollection;
    }

    protected function BuilderExport($array,$namefile,$format,$location){
        Excel::create($namefile, function($excel) use($array,$namefile) {

            $excel->sheet($namefile, function($sheet) use($array) {
                $sheet->fromArray($array);
            });

        })->store($format,$location);
    }

    protected function export_csv(){

        $builderview = $this->builderview($this->user_list_query(),'export');
        $this->BuilderExport($builderview,'list_users','csv','exports');

        $data = [
            'succes'    => true,
            'path'      => ['http://'.$_SERVER['HTTP_HOST'].'/exports/list_users.csv']
        ];

        return $data;
    }

    protected function export_excel(){

        $builderview = $this->builderview($this->user_list_query(),'export');
        $this->BuilderExport($builderview,'list_users','xlsx','exports');

        $data = [
            'succes'    => true,
            'path'      => ['http://'.$_SERVER['HTTP_HOST'].'/exports/list_users.xlsx']
        ];

        return $data;
    }
}
