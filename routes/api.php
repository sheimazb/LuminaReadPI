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

Route::get('/books', [\App\Http\Controllers\BooksController::class, 'index']);
Route::get('/blog', [\App\Http\Controllers\BlogsController::class, 'index']);
Route::post('/storeBlog', [\App\Http\Controllers\BlogsController::class]);


Route::post('/save', [\App\Http\Controllers\BooksController::class, 'store']);

Route::put('/update/{id}', [\App\Http\Controllers\BooksController::class, 'update']);

Route::delete('/delete/{id}', [\App\Http\Controllers\BooksController::class, 'destroy']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function () {

    // all routes to protected resources are registered here
    Route::get('users/list', function(){
        $users = App\Models\User::all();

        $response = ['success'=>true, 'data'=>$users];

        return response()->json($response, 201);
    });
    Route::post('/add-pack', [\App\Http\Controllers\PacksController::class, 'AddPack']);
});
Route::group(['middleware' => 'api-header'], function () {
    Route::post('/login',  [\App\Http\Controllers\AuthUserController::class, 'login']);
    Route::post('/register', [\App\Http\Controllers\AuthUserController::class, 'register']);

});
//Authentication user

    //Add Pack
    Route::get('/AllPack',  [\App\Http\Controllers\PacksController::class, 'AllPack']);
    //Add Novella 
    Route::post('/add-novella', [\App\Http\Controllers\NovellaController::class, 'store']);
    Route::get('/list-novella', [\App\Http\Controllers\NovellaController::class, 'index']);
// Add Text
Route::post('/AddText', [\App\Http\Controllers\TextController::class, 'AddText']);
Route::get('/text/{code}', [\App\Http\Controllers\TextController::class, 'getTextByCode']); 
Route::put('/updateText/{code}', [\App\Http\Controllers\TextController::class, 'updateText']);
// test image
Route::post('/upload ', [\App\Http\Controllers\PacksController::class,'upload']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
