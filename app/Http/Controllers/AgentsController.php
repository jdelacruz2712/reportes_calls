<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Cosapi\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class AgentsController extends CosapiController
{

    protected $UserId;
    protected $UserName;

    public function __construct(){
        if (!Session::has('UserId')) {
            Session::put('UserId',Auth::user()->id);
        }else{
            $this->UserId       = Session::get('UserId');
        }

        if (!Session::has('UserSystem')) {
            Session::put('UserSystem'   ,Auth::user()->username);
        }else{
            $this->UserSystem       = Session::get('UserSystem');
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * [Funcion que desconecta al agente del asterisk, eliminandolo de las colas a las cuales esta asignado]
     * @param Request $request  [Variable que contiene parametros enviados por metodo POST]
     * @param $hour             [Envia la hora a la cual el agente selecciona su hora de salida]
     */
    public function desconnect_agent(Request $request,$hour)
    {
        if($request->ajax()){
            $hour               = date('Y-m-d').' '.$hour;
            $ultimate_event_id  = $this->get_ultimo_evento($this->UserId);
            if ($ultimate_event_id['evento_id'] != 8 and  $ultimate_event_id['evento_id'] != 9 ){

                //Funcion que desconecta al agente del Asterisk
                $session_idanexo    = Session::get('IdAnexo');
                $result_desconnect  = $this->desconnect_agent_asterisk($session_idanexo,$this->UserSystem,'15',$this->UserId,281,$hour);
                echo $result_desconnect;

            }
            else{
                echo 'Error - Agent/'.$this->UserSystem.' Debes terminar tu llamada';
            }
        }
    }
}
