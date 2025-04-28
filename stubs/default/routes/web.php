<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;




Route::get('verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::get('auth/reset-password/{token}', function () {
    return view('app');
})
    ->name('password.reset');

Route::fallback(function () {
    return view('app');
});
