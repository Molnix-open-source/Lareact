<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class LanguageMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $language = 'en';

        if ($request->hasCookie('language')) {
            $language = $request->cookie('language');
        } elseif ($request->hasHeader('Accept-Language')) {
            $language = $request->header('Accept-Language');
        }

        if (!in_array($language, array_map('basename', File::directories(lang_path())))) {
            $language = config('app.fallback_locale');
        }

        App::setLocale($language);
        return $next($request);
    }
}
