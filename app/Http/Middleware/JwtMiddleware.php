<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $user = JWTAuth::toUser($request->input('token'));

        } catch (\Exception $e) {
            if ($e instanceof TokenInvalidException) {
                return $next($request);
                return response()->json(['error'=>'Token is Invalid']);
            } else if ($e instanceof TokenExpiredException){
                return $next($request);
                return response()->json(['error'=>'Token is Expired']);
            } else {
                return $next($request);
                return response()->json(['error'=>'Something is wrong']);
            }
        }

        return $next($request);
    }
}
