<?php

namespace Cosapi\Http\Controllers;

use Cosapi\Models\Anexo;
use Cosapi\Models\Queue;
use Cosapi\Models\User;
use Illuminate\Http\Request;
use Cosapi\Facades\phpAMI;
use Cosapi\Http\Requests;
use Cosapi\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use Cosapi\Models\DetalleEventos;

use Datatables;
use Excel;
use Carbon\Carbon;

class CosapiController extends Controller
{

    /**
     * [MostrarFechaActual Función que permite obtener la Fecha Actual]
     */
    protected  function MostrarFechaActual(){
        $date = Carbon::now();
        $date = $date->format('Y-m-d');
        return $date;
    }

    /**
     * [MostrarSoloHora Función que permite extraer la hora de la fecha completa '2016-10-25 12:55:42' => '12:55:42']
     * @param [datetime] $fecha [Fecha en formato Datetime, Ejem: '2016-10-02 15:45:44']
     */
    protected  function MostrarSoloHora($fecha){
        $date='00:00:00';
        if( ! empty($fecha)){
            $date = Carbon::parse($fecha);
            $date = $date->toTimeString();
        }
        return $date;
    }

    /**
     * [MostrarSoloFecha Función que permite extraer la fecha de la fecha completa '2016-10-25 12:55:42' => '2016-10-25']
     * @param [datetime] $fecha [Fecha en formato Datetime, Ejem: '2016-10-02 15:45:44']
     */
    protected  function MostrarSoloFecha($fecha){
        if( ! empty($fecha)){
            $date = Carbon::parse($fecha);
            $date = $date->toDateString();
            return $date;
        }
    }

    /**
     * [FormatDatatable Función que retorna en formato Datatable]
     * @param [Collection] $collection [Collection con los datos a mostrar en los reportes]
     */
    protected function FormatDatatable($collection)
    {
        return Datatables::of($collection)
                        ->make(true);
    }

    /**
     * [BuilderExport Función que permite crear archivoz para exportar]
     * @param [Array]  $array    [Manda los datos a exportar]
     * @param [String] $namefile [Nombre del archivo a generar]
     * @param [String] $format   [Formato en que va a exportar Ejmple: CSV,Excel]
     * @param [Array]  $location [Ubicación del archivo exportado]
     */
    protected function BuilderExport($array,$namefile,$format,$location){
        Excel::create($namefile, function($excel) use($array,$namefile) {

            $excel->sheet($namefile, function($sheet) use($array) {
                $sheet->fromArray($array);
            });

        })->store($format,$location);
    }


    /**
     * [conexion_ami Función que permite abrir conexion ami, hacia el asterisk a traves del puerto del manager.conf (Archivo Asterisk)]
     * @return [boolean] [Mensaje de resultado de la conexion]
     */
    protected function conexion_ami()
    {
        $login = phpAMI::login(getenv('ASTERISK_HOST'));

        if ($login == false) {
            echo 'Error - Problemas de Socket a Nivel de Asterisk';
        } else {
            if ($login['Response'] == 'Success') {

                return true;

            } else {
                echo 'Error - Problemas en el usuario y password de la Conexion Manager ';
            }
        }
    }


    /**
     * [desconexion_ami Función para desconectar sesión del AMI]
     *
     */
    protected function desconexion_ami()
    {
        phpAMI::logoff();
    }

    /**
     * [get_ultimo_evento Función que permite obtener el último eventodel usuario]
     * @param  [int]   $user_id [Id del usuario]
     * @return [Array]          [Array con el ultimo evento realizado por el agente]
     */
    protected function get_ultimo_evento ($user_id)
    {

        $ultimo_evento   = DetalleEventos::Select('evento_id')
                         ->where('user_id','=',$user_id)
                         ->orderby ('fecha_evento', 'desc')
                         ->first();

        return $ultimo_evento;
    }


    /**
     * [registrar_eventos description]
     * @param  [string] $evento_id     [El id del evento de pausa que acciono el agente via web.]
     * @param  [string] $user_id       [Capturar el ID del usuario conectado]
     * @param  [string] $anexo         [El anexo del agente]
     * @param  [string] $fecha_evento  [La fecha de la realización del evento (Nivel de Ocupacion)]
     * @param  [string] $fecha_really  [La fecha real de realización del evento]
     * @param  [string] $observaciones [Obersvación del evento]
     */
    public function registrar_eventos($evento_id,$user_id,$anexo = '',$fecha_evento = '',$fecha_really = '',$observaciones = '')
    {
        /** Guarda Eventos  */
        if($fecha_evento == ''){ $fecha_evento = Carbon::now(); }else{ $fecha_evento = $fecha_evento; }
        if($fecha_really == ''){ $fecha_really = Carbon::now(); }else{ $fecha_really = $fecha_really; }

        \DB::table('detalle_eventos')->insert(array(
            'evento_id'     => $evento_id,
            'user_id'       => $user_id,
            'fecha_evento'  => $fecha_evento,
            'date_really'   => Carbon::now(),
            'anexo'         => $anexo,
            'observaciones' => $observaciones
        ));

    }

    /**
     * [Función que devuelte la lista de vdn de las Colas]
     * @return Array $list_queues
     */
    protected function list_vdn(){
        $list_queues                                = [];
        $query_queues                               = Queue::select()->get()->toArray();
        foreach($query_queues as $queues){
            $list_queues[$queues['name']]['vdn']    = $queues['vdn'];
        }
        return $list_queues;
    }

    /**
     * [Funcion que retorna las Colas que pueden visualzarce ]
     * @return array $queues_proyect [Array con la colas]
     */
    protected function queues_proyect(){
        $queues_proyect     = [];
        $posicion           = 0;
        $query_queues       = Queue::select()->get()->toArray();
        foreach($query_queues as $queues){
            $queues_proyect[$posicion] = $queues['name'];
            $posicion++;
        }
        return $queues_proyect;
    }

    /**
     * [Función que lista usuarios del sistema]
     * @param $id_usuario   [Array con id de los usuarios a mostrar información]
     * @return mixed        [Array con datos de los usuarios solicitados]
     */
    protected function query_user($id_usuario){
        $Users                  = User::select()
                                        ->filtro_usuarios($id_usuario)
                                        ->where('estado_id','=','1')
                                        ->orderBy('primer_nombre')
                                        ->orderBy('apellido_paterno')
                                        ->orderBy('apellido_paterno')
                                        ->get()
                                        ->toArray();
        return $Users;
    }

    /**
     * [Función que muestra la lista de usuarios cuyo nombre coinciden con el caracter ingresado]
     * @param string $nombre [Palabra a buscar que debe incluir en el nombre de la persona]
     * @return mixed         [Lista de usuarios que coinciden con la busqueda]
     */
    protected function query_user_search($nombre = ''){
        $Users                  = User::select('id','primer_nombre','apellido_paterno','apellido_materno')
                                        ->where(DB::raw('CONCAT(primer_nombre," ",apellido_paterno," ",apellido_materno)'), 'like', '%'.$nombre.'%')
                                        ->orderBy('primer_nombre')
                                        ->orderBy('apellido_paterno')
                                        ->orderBy('apellido_paterno')
                                        ->get();

        return $Users;
    }

    /**
     * [Función que lista datos de las colas]
     * @return array [Array con datos de cada cola registrada en el sistema]
     */
    protected function list_queue(){
        $list_prioridad     = [];
        $Colas              = Queue::select()->with('estrategia','prioridad')->get()->toArray();
        foreach($Colas as $Cola){
            $list_prioridad[$Cola['id']]['id']         = $Cola['id'];
            $list_prioridad[$Cola['id']]['name']       = $Cola['name'];
            $list_prioridad[$Cola['id']]['estrategia'] = $Cola['estrategia']['name'];
            $list_prioridad[$Cola['id']]['prioridad']  = $Cola['prioridad']['name'];
            $list_prioridad[$Cola['id']]['vdn']        = $Cola['vdn'];
        }
        return $list_prioridad;
    }

    /**
     * [Función para sincronizar archivo queue_editor al servidor asterisk]
     * @return array [valor con el resultado de la ejecuacion, devuelve cero si es correcto]
     */
    protected function rsync_queue_editor(){

        exec('rsync -avz --delete '.getenv('EXPORTS_ROUTE').'queues_editor '.getenv('ASTERISK_HOST').'::archivos_asterisk',$output,$return_var);

        return $return_var;
    }


    /**
     * [Función para actualizar configuracion de servidor asterisk]
     */
    protected function queueReload(){
       if ($this->conexion_ami()==true){
            $prueba=phpAMI::command('reload');
            $this->desconexion_ami();
        }
    }

    /**
     * @param $evento_id : El id del evento de pausa que acciono el agente via web.
     * @param $user_id   : Capturar el ID del usuario conectado.
     */
    public function register_event($evento_id,$user_id,$anexo = '',$fecha_evento = '',$observaciones = '',$date_really ='')
    {

        /** Guarda Eventos  */
        if($fecha_evento == '')     { $fecha_evento = Carbon::now(); }else{ $fecha_evento = $fecha_evento; }
        if($date_really  == null)   { $date_really  = null; }else{ $date_really  = Carbon::now(); }

        \DB::table('detalle_eventos')->insert(array(
            'evento_id'     => $evento_id,
            'user_id'       => $user_id,
            'fecha_evento'  => $fecha_evento,
            'date_really'   => $date_really,
            'anexo'         => $anexo,
            'observaciones' => $observaciones,
            'ip_cliente'    => $_SERVER['REMOTE_ADDR']
        ));

    }

    /**
     * [Function que devuelve datos de el primer logueo realizado por el usuario]
     * @return array
     */
    protected function UltimateEventLogin(){
        $users      = DetalleEventos::Select(DB::raw('count(*) as cant_event,id,date_really,fecha_evento'))
            ->where('user_id','=',$this->UserId)
            ->where('evento_id','=',11)
            ->where(DB::raw('DATE(fecha_evento)'),'=',date('Y-m-d'))
            ->orderBy('id', 'asc')
            ->get();
        foreach ($users as $user) {
            $cant_event     = $user->cant_event;
            $date_really    = $user->date_really;
            $fecha_evento   = $user->fecha_evento;
            $id             = $user->id;
        }

        return array($cant_event,$date_really, $fecha_evento, $id);
    }

    /**
     * [Funcion que permite desconectar al agente tanto del sistema como del asterisk]
     * @param $session_idanexo      [Id del anexo]
     * @param $useragente           [Usuario del agente]
     * @param $idevento             [Id del evento a ejecutar]
     * @param $userid               [Id del usuario]
     * @param $numberanexo          [Numero del anexo]
     * @param string $datetime      [Fecha y Hora a registrar como hora de desconeccion]
     * @param string $observations  [Comentarios sobre la desconeccion del agente del sistema]
     * @return string
     */
    protected function desconnect_agent_asterisk($session_idanexo,$useragente,$idevento,$userid,$numberanexo,$datetime='',$observations=''){


                /** Guardar Eventos  */
                $this->register_event($idevento,$userid,$numberanexo,$datetime,$observations);

                /** Liberar Anexo  */
                $Anexos = Anexo::find($session_idanexo);
                $Anexos->user_id = Null;
                $Anexos->save();

                return 'Success - Agent/'.$useragente.' Desconectado Correctamente ';



    }
}