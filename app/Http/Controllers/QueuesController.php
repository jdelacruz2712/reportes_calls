<?php

namespace Cosapi\Http\Controllers;

use Cosapi\Collector\Collector;
use Cosapi\Models\Queue;
use Cosapi\Models\QueuePriority;
use Cosapi\Models\QueueStrategy;
use Cosapi\Models\User;
use Cosapi\Models\Users_Queues;
use Illuminate\Http\Request;
use Illuminate\Support\MessageBag;

use Cosapi\Http\Requests;
use Cosapi\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;

class QueuesController extends CosapiController
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            if ($request->fecha_evento) {
                return $this->list_queues();
            } else {
                return view('elements/index')->with(array(
                    'routeReport'           => 'elements.manage.manage_queues',
                    'titleReport'           => 'Manage Queues',
                    'boxReport'             => false,
                    'dateHourFilter'        => false,
                    'dateFilter'            => false,
                    'viewDateSearch'        => false,
                    'viewDateSingleSearch'  => false,
                    'viewHourSearch'        => false,
                    'viewButtonSearch'      => false,
                    'viewButtonExport'      => false,
                    'exportReport'          => 'export_list_user',
                    'nameRouteController'   => 'manage_queues'
                ));
            }
        }
    }



    public function list_queues(){
        $query_queues_list        = $this->queues_list_query();
        $builderview              = $this->builderview($query_queues_list);
        $outgoingcollection       = $this->outgoingcollection($builderview);
        $queues_list              = $this->FormatDatatable($outgoingcollection);
        return $queues_list;
    }

    protected function queues_list_query(){
        $queues_list_query = Queue::select()
                                ->with('estrategia')
                                ->with('prioridad')
                                ->get();
        return $queues_list_query;
    }

    protected function builderview($queues_list_query){
        $posicion = 0;
        foreach ($queues_list_query as $query) {
            $builderview[$posicion]['Id']                       = $query['id'];
            $builderview[$posicion]['Name']                     = $query['name'];
            $builderview[$posicion]['Vdn']                      = $query['vdn'];
            $builderview[$posicion]['Strategy']                 = $query['estrategia']['name'];
            $builderview[$posicion]['Priority']                 = $query['prioridad']['description'];
            $builderview[$posicion]['Status']                   = $query['estado_id'];
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
            $Status = ($view['Status'] == 1 ? 'Activo' : 'Desactivo');
            $outgoingcollection->push([
                'Id'                    => $view['Id'],
                'Name'                  => $view['Name'],
                'Vdn'                   => $view['Vdn'],
                'Strategy'              => $view['Strategy'],
                'Priority'              => $view['Priority'],
                'Status'                => $Status,
                'Actions'               => '<a class="btn btn-warning btn-xs" onclick="responseModal('."'div.dialogQueues','form_queues','".$view['Id']."'".')" data-toggle="modal" data-target="#modalQueues"><i class="fa fa-edit" aria-hidden="true"></i></a>
                                            <a class="btn btn-info btn-xs" onclick="responseModal('."'div.dialogQueuesLarge','form_assign_queue','".$view['Id']."'".')" data-toggle="modal" data-target="#modalQueues"><i class="fa fa-group" aria-hidden="true"></i> </a>
                                            <a class="btn btn-danger btn-xs" onclick="responseModal('."'div.dialogQueues','form_status_queue','".$view['Id']."'".')" data-toggle="modal" data-target="#modalQueues"><i class="fa fa-ban" aria-hidden="true"></i></a>'
            ]);

        }
        return $outgoingcollection;
    }

    public function formQueues(Request $request){
        $options    = $this->getOptions();
        if($request->valueID == null){
            return view('layout/recursos/forms/queues/form_queues')->with(array(
                'updateForm'             => false,
                'optionsStrategy'        => $options['Strategy'],
                'optionsPriority'        => $options['Priority'],
                'idQueue'                => '',
                'nameQueue'              => '',
                'numVdn'                 => '',
                'selectedStrategy'       => '',
                'selectedPriority'       => ''
            ));
        }else{
            $getQueue   = $this->getQueue($request->valueID);
            return view('layout/recursos/forms/queues/form_queues')->with(array(
                'updateForm'             => true,
                'optionsStrategy'        => $options['Strategy'],
                'optionsPriority'        => $options['Priority'],
                'idQueue'                => $request->valueID,
                'nameQueue'              => $getQueue[0]['name'],
                'numVdn'                 => $getQueue[0]['vdn'],
                'selectedStrategy'       => $getQueue[0]['queues_strategy_id'],
                'selectedPriority'       => $getQueue[0]['queues_priority_id']
            ));
        }
    }

    public function formChangeStatus(Request $request){
        $getQueue   = $this->getQueue($request->valueID);
        return view('layout/recursos/forms/queues/form_status')->with(array(
            'idQueue'    => $getQueue[0]['id'],
            'nameQueue'  => $getQueue[0]['name'],
            'Status'     => $getQueue[0]['estado_id']
        ));
    }

    public function formAssignQueue(Request $request){
        $getQueue        = $this->getQueue($request->valueID);
        $getQueueUsers   = $this->getUsersQueues($request->valueID);
        $options         = $this->getOptions();
        $UsersQueues     = $this->UsersQueues($options['Users'],$getQueueUsers);
        return view('layout/recursos/forms/queues/form_queues_user')->with(array(
            'idQueue'       => $getQueue[0]['id'],
            'nameQueue'     => $getQueue[0]['name'],
            'Users'         => $UsersQueues,
            'Priority'      => $options['Priority'],
            'list_users'    => 'all'
        ));
    }

    public function getOptions(){
        $strategy = QueueStrategy::Select()
            ->get()
            ->toArray();

        $priority = QueuePriority::Select()
            ->get()
            ->toArray();

        $users = $this->getUsers();
        $options['Strategy']  = $strategy;
        $options['Priority']  = $priority;
        $options['Users']     = $users;
        return $options;
    }

    public function getQueue($idQueue){
        $queue = Queue::Select()
            ->where('id', $idQueue)
            ->get()
            ->toArray();
        return $queue;
    }

    protected function getUsers() {
        $Users  = User::Select()
                    ->where('estado_id', '=', '1')
                    ->orderBy('primer_nombre')
                    ->orderBy('apellido_paterno')
                    ->orderBy('apellido_materno')
                    ->get()
                    ->toArray();
        return $Users;
    }

    protected function getUsersQueues($queueID) {
        $UsersQueue = Users_Queues::Select()
                        ->where('queue_id', $queueID)
                        ->get()
                        ->toArray();
        return $UsersQueue;
    }

    protected function UsersQueues($Users, $UsersQueue){
        $resultArray = $Users;
        foreach($Users as $keyUser => $valUser) {
            foreach($UsersQueue as $keyUserQueue => $valUserQueue) {
                if($valUser['id'] == $valUserQueue['user_id']) {
                    $resultArray[$keyUser] = $valUser + array('UserQueues' => $valUserQueue);
                }
            }
        }
        return $resultArray;
    }

    public function saveFormQueues(Requests\formQueuesRequest $request){

        if($request->queueID){
            $this->validate(request(), [
                'nameQueue'           => 'required|unique:queues,name',
                'numVdn'              => 'required',
                'selectedStrategy'    => 'required',
                'selectedPriority'    => 'required'
            ]);

            $queueQuery = Queue::updateOrCreate([
                'id'                    => $request->queueID
            ], [
                'name'                  => $request->nameQueue,
                'queues_strategy_id'    => $request->selectedStrategy,
                'queues_priority_id'    => $request->selectedPriority,
                'estado_id'             => '1'
            ]);
        }else{
            $this->validate(request(), [
                'nameQueue'           => 'required|unique:queues,name',
                'numVdn'              => 'required|unique:queues,vdn',
                'selectedStrategy'    => 'required',
                'selectedPriority'    => 'required'
            ]);

            $queueQuery = Queue::updateOrCreate([
                'id'                    => $request->queueID
            ], [
                'name'                  => $request->nameQueue,
                'vdn'                   => $request->numVdn,
                'queues_strategy_id'    => $request->selectedStrategy,
                'queues_priority_id'    => $request->selectedPriority,
                'estado_id'             => '1'
            ]);
        }

        if($queueQuery) return ['message' => 'Success'];
        return ['message' => 'Error'];
    }

    public function saveFormQueuesStatus(Request $request){
        $statusQueue = ($request->statusQueue == 1 ? 2 : 1);
        $queueQueryStatus = Queue::where('id', $request->queueID)
                                ->update([
                                    'estado_id' => $statusQueue
                                ]);
        if($queueQueryStatus) return ['message' => 'Success'];
        return ['message' => 'Error'];
    }

    public function saveFormUsersQueues(Request $request){
        Users_Queues::where('queue_id', $request->queueID)->delete();
        if($request->checkQueue){
            foreach($request->checkQueue as $keyUserQueue => $valUserQueue){
                $queueUserQuery = Users_Queues::updateOrCreate([
                    'user_id'       => $valUserQueue,
                    'queue_id'      => $request->queueID
                ], [
                    'user_id'       => $valUserQueue,
                    'queue_id'      => $request->queueID,
                    'priority'      => $request->selectPriority[$keyUserQueue]
                ]);
            }
            if($queueUserQuery) return ['message' => 'Success'];
            return ['message' => 'Error'];
        }
        return ['message' => 'Success'];
    }
}
