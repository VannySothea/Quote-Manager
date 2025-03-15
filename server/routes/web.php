<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\QuoteController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/about', function() {
    return view('about');
});

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verifyOtp']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/quotes/random', [QuoteController::class, 'getRandomQuote']);

// Authenticated Routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Quote Routes
    Route::post('/quotes', [QuoteController::class, 'saveQuote']);
    Route::get('/quotes', [QuoteController::class, 'getSavedQuotes']);
    Route::delete('/quotes/{id}', [QuoteController::class, 'deleteQuote']);
});