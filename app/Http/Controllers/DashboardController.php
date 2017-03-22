<?php

namespace Cosapi\Http\Controllers;
use Illuminate\Http\Request;
use Cosapi\Http\Requests;
class DashboardController extends CosapiController
{


  /**
   * [dashboard_01 Función que llama a la vista del Dashboard 1]
   * @return [view] [returna vista HTML del Dashboard 1]
   */
  public function dashboard_01()
  {
    return view('elements/dashboard/dashboard_01');
  }


}