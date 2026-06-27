<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EmployeeController;
use App\Http\Controllers\API\OrganizerController;
use App\Http\Controllers\API\RegionController;
use App\Http\Controllers\API\TrainingController;
use App\Http\Controllers\API\TrainingRegionController;
use App\Http\Controllers\API\UnitController;
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

    Route::prefix('/training')->group(function () {
        Route::get('/', [TrainingController::class, 'index']);
        Route::get('/{id}', [TrainingController::class, 'show']);
        Route::post('/', [TrainingController::class, 'store']);
        Route::put('/{id}', [TrainingController::class, 'update']);
        Route::delete('/{id}', [TrainingController::class, 'destroy']);
    });

    Route::prefix('/region')->group(function () {
        Route::get('/', [RegionController::class, 'index']);
        Route::get('/{id}/unit', [UnitController::class, 'showByRegionId']);
    });

    Route::prefix('/unit')->group(function () {
        Route::get('/{id}/employee', [EmployeeController::class, 'showByUnitId']);
    });
});

Route::prefix('/training')->group(function () {
    Route::get('/overview', [TrainingController::class, 'indexTrainingOverview']);
    Route::get('/overview/{id}', [TrainingController::class, 'showTrainingOverview']);

    Route::get('/total-learning-hours/region', [TrainingController::class, 'showTotalLearningHoursByRegion']);

    Route::get('/total-participants/region', [TrainingController::class, 'showParticipantsByRegion']);

    Route::get('/realization/region', [TrainingController::class, 'showRealizationByRegion']);
    Route::get('/realization/region/month', [TrainingController::class, 'showRealizationByRegionByMonth']);

    Route::get('/realization/ptpn-group', [TrainingController::class, 'showRealizationByLppNonLpp']);
    Route::get('/realization/ptpn-group/month', [TrainingController::class, 'showRealizationByLppNonLppByMonth']);

    Route::get('/realization/organizer', [TrainingController::class, 'showRealizationByOrganizer']);

    Route::get('/realization/training', [TrainingController::class, 'showRealizationByTraining']);

    Route::get('/realization/learning-sector', [TrainingController::class, 'showRealizationByLearningSector']);

    Route::get('/realization/bod-level', [TrainingController::class, 'showRealizationByLevelBod']);

    Route::get('/realization/{id}', [TrainingController::class, 'showTrainingRealizationPerRegionPerMonth']);
    Route::post('/realization/{id}', [TrainingController::class, 'storeTrainingRealization']);
});

Route::prefix('/region')->group(function () {
    Route::get('/{id}/realization', [TrainingRegionController::class, 'showRealizationCost']);
    Route::get('/{id}/realization/ptpn-group', [TrainingRegionController::class, 'showRealizationByLppNonLpp']);
    Route::get('/{id}/realization/ptpn-group/month', [TrainingRegionController::class, 'showRealizationByLppNonLppByMonth']);
    Route::get('/{id}/realization/organizer', [TrainingRegionController::class, 'showRealizationByOrganizer']);
    Route::get('/{id}/realization/training', [TrainingRegionController::class, 'showRealizationByTraining']);
    Route::get('/{id}/realization/learning-sector', [TrainingRegionController::class, 'showRealizationByLearningSector']);
    Route::get('/{id}/realization/bod-level', [TrainingRegionController::class, 'showRealizationByLevelBod']);
    Route::get('/{id}/realization/unit', [TrainingRegionController::class, 'showRealizationByUnit']);
    Route::get('/{id}/total-participants/unit', [TrainingRegionController::class, 'showParticipantsByUnit']);
    Route::get('/{id}/total-learning-hours/unit', [TrainingRegionController::class, 'showLearningHoursByUnit']);
});

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::prefix('/user')->group(function () {
    Route::post('/', [UserController::class, 'store']);
});
