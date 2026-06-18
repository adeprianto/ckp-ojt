<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('/dashboard')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/home/index');
        })->name('dashboard.home');

        Route::get('/reports', function () {
            return Inertia::render('dashboard/reports/index');
        })->name('dashboard.reports');

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

require __DIR__ . '/settings.php';
