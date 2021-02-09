<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AuthEstudiante
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
        if(Auth::user()->rol != 'estudiante'){
            if($request->ajax())
                return response(['Unauthorized.'],401);
            else
                return redirect('/');
        }
        return $next($request);
    }
}
