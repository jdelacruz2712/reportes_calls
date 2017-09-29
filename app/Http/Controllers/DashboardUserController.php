<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Cosapi\Http\Controllers\Controller;

class DashboardUserController extends CosapiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('elements/dashboard_user/index')->with(array(
            'routeDashboardUser'  =>  'elements.dashboard_user.utilities.routeDashboardUser'
        ));
    }

    public function dataInformationCall(Request $request){
        if($request->idCall == 2){
            $arrayUser = [
                'nameComplete'          => 'Jorge Alan Cornejo Salazar',
                'TypeDocument'          => 'DNI',
                'numberDocument'        => '15878966',
                'nameSede'              => 'Sapia - Surquillo',
                'nameArea'              => 'Centro de Servicio',
                'phoneNumber'           => ['123456','205'],
                'personalContact'       => []
            ];
            return response()->json($arrayUser);
        }else if($request->idCall == 3){
            $arrayUser = [
                'nameComplete'          => 'Nombre Empresa',
                'TypeDocument'          => 'RUC',
                'numberDocument'        => '2055856974584',
                'nameSede'              => 'Claro',
                'nameArea'              => 'Empresas',
                'phoneNumber'           => ['123456','205'],
                'personalContact'       => ['Prueba Contacto 1','Prueba Contacto 2']
            ];
            return response()->json($arrayUser);
        }else{
            $arrayUser = [
                'nameComplete'          => '',
                'TypeDocument'          => '',
                'numberDocument'        => '',
                'nameSede'              => '',
                'nameArea'              => ''
            ];
            return response()->json($arrayUser);
        }
    }

    public function saveCallUserInformation(Request $request){
        $arrayUser = [
            'nameComplete'          => $request->nameComplete,
            'TypeDocument'          => $request->TypeDocument,
            'numberDocument'        => $request->numberDocument,
            'nameSede'              => $request->nameSede,
            'nameArea'              => $request->nameArea,
            'phoneNumber'           => [],
            'personalContact'       => [],
            'message'               => 'Success'
        ];
        return response()->json($arrayUser);
    }

    public function saveCallPhone(Request $request){
        $arrayPhone = [
            'phoneNumber'           => $request->phoneNumber,
            'message'               => 'Success'
        ];
        return response()->json($arrayPhone);
    }

    public function savePersonalContact(Request $request){
        $arrayPersonal = [
            'personalContact'           => $request->personalContact,
            'message'                   => 'Success'
        ];
        return response()->json($arrayPersonal);
    }
}
