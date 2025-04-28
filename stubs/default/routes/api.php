<?php

use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return new UserResource($request->user());
})->middleware('auth:sanctum');

require __DIR__ . '/auth.php';

Route::get('translations/{locale}', function ($locale) {
    $lang = collect(File::allFiles(lang_path($locale)))
        ->filter(fn($file) => $file->getExtension() === 'php')
        ->mapWithKeys(fn($file) => [$file->getFilenameWithoutExtension() => include $file->getRealPath()])
        ->dot()
        ->map(function ($string) {
            return preg_replace_callback('/:(\w+)/', fn($matches) => ('{{' . $matches[1] . '}}'), $string);
        })->toArray();
    return response()->json($lang);
})->whereIn('locale', array_map('basename', File::directories(lang_path())));

Route::fallback(function () {
    return response()->json(['message' => 'route not found'], 404);
});
