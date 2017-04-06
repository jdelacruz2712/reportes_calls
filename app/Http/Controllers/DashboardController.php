<?php

namespace Cosapi\Http\Controllers;
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

  public function getAnswered(Request $request){
    if($request->type){

      try {
        $event = $this->get_events($request->type);
        $time = 'false';
        if($request->time){ $time = 'true'; }
        $answered = Queue_Log::select()
                             ->whereIn('event',$event)
                             ->filtro_time($time,$request->type)
                             ->count();


       return response()->json(['message' => $answered], 200);
      } catch (\Exception $e) {

        return response()->json(['message' => $e->getMessage()], 500);
      }
    }
  }
}
