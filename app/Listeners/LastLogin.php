<?php

namespace Cosapi\Listeners;

use Cosapi\Events\LoginUsers;
use Cosapi\Models\User;
use Illuminate\Support\Facades\Auth;

class LastLogin
{

    private $auth;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Handle the event.
     *
     * @param  LoginUsers  $event
     * @return void
     */
    public function handle(LoginUsers $event)
    {
        $role       = Auth::user()->role;
        $username   = Auth::user()->username;
        $anexo      = 0;
        if($role == 'user'){
            $event->register_agent_dashboard($username,$anexo);
        }
        $event->register_event('11',$event->obtener_userid(),'','','',null);
    }
}