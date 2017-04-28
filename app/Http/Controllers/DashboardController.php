<?php

namespace Cosapi\Http\Controllers;
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
          $metrica['symbol'] = $kpis[0]['symbol'];
          $metrica['time']    = $kpis[0]['time'];
        }

        $answered             = Queue_Log::select()
                                            ->whereIn('event',$event)
                                            ->where(DB::raw('DATE(datetime)'),date('Y-m-d'))
                                            ->filtro_time($metrica)
                                            ->count();
        
        return response()->json([
            'message' => $answered,
            'symbol' => $metrica['symbol'],
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
}
