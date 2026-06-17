<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//    return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
});

Route::prefix('/user')->group(function () {
    Route::post('/', [UserController::class, 'store']);
});
