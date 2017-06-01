<?php

namespace Cosapi\Http\Controllers;
use Cosapi\Models\AgentOnline;
use Cosapi\Models\Anexo;
use Cosapi\Models\Cdr;
use Cosapi\Models\Kpis;
use Cosapi\Models\Queue_Log;
use Illuminate\Http\Request;
use Cosapi\Http\Requests;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;

class DashboardController extends IncomingCallsController
{
  /**
   * [dashboard_01 Función que llama a la vista del Dashboard 1]
   * @return [view] [returna vista HTML del Dashboard 1]
   */
  public function dashboard_01()
  {
    return view('elements/dashboard/dashboard_01');
  }

  public function getEventKpi(Request $request){
    if($request->type){
      try {
        $event    = $this->get_events($request->type);
        $action   = 'false';
        $metrica  = array(
            'action'  => $action,
            'symbol' => '',
            'time'    => ''
        );

        if($request->time){
          $action             = 'true';
          $kpis               = Kpis::select()->where('name',$request->type.'_time')->get()->toArray();
          $metrica['action']  = $action;
          $metrica['symbol']  = $kpis[0]['symbol'];
          $metrica['time']    = $kpis[0]['time'];
        }

        $answered             = Queue_Log::select()
                                ->whereIn('event',$event)
                                ->where(DB::raw('DATE(datetime)'),date('Y-m-d'))
                                ->filtro_time($metrica)
                                ->count();

        return response()->json([
            'message' => $answered,
            'symbol'  => $metrica['symbol'],
            'time'    => $metrica['time']
        ], 200);

      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
      }
    }
  }

  public function getQuantityCalls(Request $request){

    if($request->type){
      try {
        $query_calls = $this->query_calls(date('Y-m-d').' - '.date('Y-m-d'),$request->type,$request->time);
        $QuantityCalls = count($query_calls);
        return response()->json(['message' => $QuantityCalls], 200);
      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
      }
    }
  }

  public function panelAgentStatusSummary (Request $request){
    try{
      $AgentOnline = AgentOnline::select(DB::raw('event_id, event_name, count(1) as quantity'))->groupBy('event_name')->get()->toArray();
      return response()->json(['message' => $AgentOnline], 200);
    }catch (\Exception $e){
      return response()->json(['message' => $e->getMessage()], 500);
    }
  }

  public function panelGroupStatistics(Request $request){
    try{
      $Answer = 0;
      $Unanswer = 0;
      $totalReceived = 0;
      $timeInQueue = 0;

      $totalCallDurationInbound = 0;
      $avgWait = 0;
      $avgCallDuration = 0;
      $percentageAnswer = 0;
      $percentageUnanswer = 0;

      $Queue_Log = Queue_Log::select(DB::raw('event, SUM(ABS(info1)) as timeInQueue, SUM(ABS(info2)) AS timeCallDuration, count(1) AS quantityEvent '))
                                  ->where(DB::raw('DATE(datetime)'),date('Y-m-d'))
                                  ->groupBy('event')
                                  ->get()
                                  ->toArray();

      $days                   = explode(' - ', date('Y-m-d').' - '.date('Y-m-d'));
      $range_annexed          = Anexo::select('name')->where('estado_id','1')->get()->toArray();
      $tamano_anexo           = $this->lengthAnnexed();
      $OutgoingCallsController   = Cdr::Select(DB::raw('SUM(billsec) AS billsec'))
                                    ->whereIn(DB::raw('LENGTH(src)'),$tamano_anexo)
                                    ->where('dst','not like','*%')
                                    ->where('disposition','=','ANSWERED')
                                    ->where('lastapp','=','Dial')
                                    ->whereIn('src',$range_annexed)
                                    ->filtro_days($days)
                                    ->get()
                                    ->toArray();

      for($i = 0; $i < count($Queue_Log); $i++){
        if($Queue_Log[$i]['event'] != 'ABANDON') {
          $Answer += $Queue_Log[$i]['quantityEvent'];
          $totalCallDurationInbound += $Queue_Log[$i]['timeCallDuration'];
        }
        else $Unanswer += $Queue_Log[$i]['quantityEvent'];
        $timeInQueue += $Queue_Log[$i]['timeInQueue'];
        $totalReceived += $Queue_Log[$i]['quantityEvent'];
      }
      $avgWait = $timeInQueue/($Answer + $Unanswer);
      $avgCallDuratioInbound = $totalCallDurationInbound/($Answer);
      $percentageAnswer = ($Answer * 100) / $totalReceived;
      $percentageUnanswer = ($Unanswer * 100) / $totalReceived;

      return response()->json([
          'avgWait' => conversorSegundosHoras(intval($avgWait),false),
          'avgCallDuration' => conversorSegundosHoras(intval($avgCallDuratioInbound),false),
          'percentageAnswer' => convertDecimales($percentageAnswer,2),
          'percentageUnanswer' => convertDecimales($percentageUnanswer,2),
          'totalCallDurationInbound' => conversorSegundosHoras(intval($totalCallDurationInbound),false),
          'totalCallDurationOutbound' => conversorSegundosHoras(intval($OutgoingCallsController[0]['billsec']),false)
      ], 200);
    }catch (\Exception $e){
      return response()->json(['message' => $e->getMessage()], 500);
    }
  }
}
