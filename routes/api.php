<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/books',[\App\Http\Controllers\BooksController::class, 'index']);
Route::get('/blog',[\App\Http\Controllers\BlogsController::class, 'index']);
Route::post('/storeBlog',[\App\Http\Controllers\BlogsController::class]);


Route::post('/save',[\App\Http\Controllers\BooksController::class, 'store']);

Route::put('/update/{id}',[\App\Http\Controllers\BooksController::class, 'update']);

Route::delete('/delete/{id}',[\App\Http\Controllers\BooksController::class, 'destroy']);


//Authentication user
Route::post('/register', [\App\Http\Controllers\AuthUserController::class, 'register']);
Route::post('/login',  [\App\Http\Controllers\AuthUserController::class, 'login']);

//Add Pack
Route::post('/AddPack',  [\App\Http\Controllers\PacksController::class, 'store']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
