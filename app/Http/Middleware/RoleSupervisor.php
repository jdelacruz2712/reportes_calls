<?php

namespace Cosapi\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RoleSupervisor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check() && Auth::user()->role == 'supervisor') {
            return $next($request);
        }
        $request->session()->flash('alert-danger','Usted no cuenta con los permisos necesarios para este recurso');
        return redirect('/home');
    }
}
