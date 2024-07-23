<?php

use App\Http\Controllers\PortalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [PortalController::class, 'dashboard'])->name('dashboard');

    Route::post('/upload-file', [PortalController::class, 'upload'])->name('upload.file');
    Route::get('/media/{id}', [PortalController::class, 'dashboard'])->name('media.select');

    Route::put('/update-title/{id}', [PortalController::class, 'update'])->name('update.title');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
