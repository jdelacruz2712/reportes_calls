<?php

namespace Cosapi\Http\Controllers;


use Cosapi\Models\User;
use Illuminate\Http\Request;
use Cosapi\Http\Requests;
use DB;

class ListUsersController extends Controller
{

    public function index(Request $request)
    {
        $agents = $this->query_user();
        if($request->ajax()) {
            return view('elements/index')->with(array(
                'routeReport' => 'elements.list_users.list_user',
                'titleReport' => 'List Users',
                'viewButtonSearch' => false,
                'viewHourSearch' => false,
                'exportReport' => 'export_list_user',
                'nameRouteController' => 'list_table',
                'Users' => $agents['Users']
            ));
        }

        return view('elements/index')->with(array(
            'routeReport' => 'elements.list_users.list_user',
            'titleReport' => 'List Users',
            'viewButtonSearch' => false,
            'viewHourSearch' => false,
            'exportReport' => 'export_list_user',
            'nameRouteController' => 'list_table',
            'Users' => $agents['Users']
        ));


    }

    protected function query_user(){
        $Users                  = User::paginate(10);
        $agents['Users']  = $Users;
        return $agents;
    }

    protected function query_list_user(){
        $query_list_user            = User::select()
                                        ->get();
        return $query_list_user;
    }

    protected function BuilderExport($array,$namefile,$format,$location){
        Excel::create($namefile, function($excel) use($array,$namefile) {

            $excel->sheet($namefile, function($sheet) use($array) {
                $sheet->fromArray($array);
            });

        })->store($format,$location);
    }

    public function export(Request $request){
        $export_outgoing  = call_user_func_array([$this,'export_'.$request->format_export], [$request->days]);
        return $export_outgoing;
    }

    protected function builderview($query_list_user,$type=''){
        $posicion = 0;
        foreach ($query_list_user as $query) {
            $builderview[$posicion]['user_id']              = $query['id'];
            $builderview[$posicion]['primer_nombre']        = $query['primer_nombre'];
            $builderview[$posicion]['segundo_nombre']       = $query['segundo_nombre'];
            $builderview[$posicion]['apellido_paterno']     = $query['apellido_paterno'];
            $builderview[$posicion]['apellido_materno']     = $query['apellido_materno'];
            $builderview[$posicion]['role']                 = $query['role'];
            $posicion ++;
        }

        if(!isset($builderview)){
            $builderview = [];
        }
        return $builderview;
    }

    protected function export_csv(){

        $builderview = $this->builderview($this->query_list_user(),'export');
        $this->BuilderExport($builderview,'list_table','csv','exports');

        $data = [
            'succes'    => true,
            'path'      => ['http://'.$_SERVER['HTTP_HOST'].'/exports/list_table.csv']
        ];

        return $data;
    }

    protected function export_excel(){

        $builderview = $this->builderview($this->query_list_user(),'export');
        $this->BuilderExport($builderview,'list_table','xlsx','exports');

        $data = [
            'succes'    => true,
            'path'      => ['http://'.$_SERVER['HTTP_HOST'].'/exports/list_table.xlsx']
        ];

        return $data;
    }

}
