<?php

namespace Cosapi\Listeners;

use Cosapi\Events\LoginUsers;

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
        $event->register_event('11',$event->obtener_userid(),'','','',null);
    }
}