<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('guest')
    ->name('register');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest')
    ->name('login');

Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
    ->middleware('guest')
    ->name('password.forget');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])
    ->middleware('guest')
    ->name('password.reset');

Route::post('send-email-verification', [AuthController::class, 'sendEmailVerification'])
    ->middleware(['throttle:6,1'])
    ->name('email.verification');


Route::get('/check', function (Request $request) {

    if ($request->user()) {
        return response()->json(['error' => 'already_logged_in'], 403);
    }
    return response()->noContent();
})
    ->name('auth.check');

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum')
    ->name('logout');
