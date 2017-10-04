<?php

namespace Cosapi\Http\Controllers;

use Illuminate\Http\Request;

use Cosapi\Http\Requests;
use Cosapi\Http\Controllers\Controller;

class BroadcastMessageController extends CosapiController
{
    public function index(Request $request)
    {
        if ($request->ajax()) {
            if ($request->fecha_evento) {
                return $this->list_queues();
            } else {
                return view('elements/index')->with(array(
                    'routeReport'           => 'elements.broadcast.broadcast_message',
                    'titleReport'           => 'Broadcast Message',
                    'boxReport'             => false,
                    'dateHourFilter'        => false,
                    'dateFilter'            => false,
                    'viewDateSearch'        => false,
                    'viewDateSingleSearch'  => false,
                    'viewHourSearch'        => false,
                    'viewButtonSearch'      => false,
                    'viewButtonExport'      => false,
                    'exportReport'          => false,
                    'nameRouteController'   => 'broadcast_message'
                ));
            }
        }
    }

    public function list_queues()
    {
        return 'Mensaje de Prueba';
    }
}
