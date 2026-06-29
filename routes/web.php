<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return auth()->check()
        ? to_route('dashboard.home')
        : to_route('login'); // Or your login page
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/home/index');
        })->name('dashboard.home');

        Route::prefix('/reports')->group(function () {
            Route::get('/', function () {
                return Inertia::render('dashboard/reports/trainings/index');
            })->name('dashboard.reports.trainings');

            Route::get('/{id}', function ($id) {
                return Inertia::render('dashboard/reports/training-detail/index', [
                    'id' => $id,
                ]);
            })->name('dashboard.reports.training-detail');
        });

        Route::prefix('/data-master')->group(function () {
            Route::get('/penyelenggara-pelatihan', function () {
                return Inertia::render('dashboard/master-data/organizers/index');
            })->name('dashboard.master.organizer');

            Route::get('/pelatihan', function () {
                return Inertia::render('dashboard/master-data/trainings/index');
            })->name('dashboard.master.training');
        });
    });
});

require __DIR__.'/settings.php';
