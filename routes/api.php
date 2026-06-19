<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OrganizerController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//    return $request->user();
// })->middleware('auth:sanctum');

Route::prefix('/master-data')->group(function () {
    Route::prefix('/organizer')->group(function () {
        Route::get('/', [OrganizerController::class, 'index']);
        Route::get('/{id}', [OrganizerController::class, 'show']);
        Route::post('/', [OrganizerController::class, 'store']);
        Route::put('/{id}', [OrganizerController::class, 'update']);
        Route::delete('/{id}', [OrganizerController::class, 'destroy']);
    });
});

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::prefix('/user')->group(function () {
    Route::post('/', [UserController::class, 'store']);
});
