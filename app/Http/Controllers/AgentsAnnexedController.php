<?php

namespace Cosapi\Http\Controllers;

use Cosapi\Models\Anexo;
use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Cosapi\Http\Controllers\Controller;

class AgentsAnnexedController extends CosapiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tabla_anexos = [];
        $indice = 0;
        $contador = 0;
        if ($request->ajax()){
            $list_annexed = Anexo::select()
                                    ->with('user')
                                    ->where('estado_id','=',1)
                                    ->get()
                                    ->toArray();
            foreach($list_annexed as $key => $annexed){
                if($contador > 5){
                    $contador = 0;
                    $indice++;
                }
                $list_annexed[$key]['image']        = 'phone-green.png';
                $list_annexed[$key]['btn']          = 'btn disabled';
                $list_annexed[$key]['StatusAnexo']  = 'Conectado';
                if($annexed['user'] == null){
                    $list_annexed[$key]['image']        = 'phone-yellow.png';
                    $list_annexed[$key]['btn']          = 'btn';
                    $list_annexed[$key]['StatusAnexo']  = 'Anexo Libre';
                }
                $tabla_anexos[$indice][$contador] = $list_annexed[$key];
                $contador++;
            }

            return view('elements/agents_annexed/index')->with(array('tabla_anexos' => $tabla_anexos));
        }
    }
}
