<?php

namespace App\Http\Middleware;
use Closure;

class Role
{
    public function handle($request, Closure $next, ...$roles)
    {
        $user = auth()->user();
        if ($user && in_array($user->role, $roles)) {
            return $next($request);
        }
        return response()->json([
            'message_error' => 'You do not have permission'
        ], 403);
    }
}
