<?php

namespace Cosapi\Http\Controllers;
use Cosapi\Models\Kpis;
use Cosapi\Models\Queue_Log;
use Illuminate\Http\Request;
use Cosapi\Http\Requests;
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
            'simbolo' => '',
            'time'    => ''
        );

        if($request->time){
          $action             = 'true';
          $kpis               = Kpis::select()->where('name',$request->type)->get()->toArray();
          $metrica['action']  = $action;
          $metrica['simbolo'] = $kpis[0]['simbolo'];
          $metrica['time']    = $kpis[0]['time'];
        }

        $answered             = Queue_Log::select()
                                            ->whereIn('event',$event)
                                            ->filtro_time($metrica)
                                            ->count();

        return response()->json([
            'message' => $answered,
            'simbolo' => $metrica['simbolo'],
            'time'    => $metrica['time']
        ], 200);

      } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);

      }
    }
  }
}
