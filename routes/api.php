<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthUserController;
use App\Http\Controllers\BooksController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PacksController;
use App\Http\Controllers\NovellaController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\TextController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SseController;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;



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

// Public routes
Route::post('/login', [AuthUserController::class, 'login']);
Route::post('/register', [AuthUserController::class, 'register']);

// Protected routes
Route::middleware(['jwt.auth', 'api-header'])->group(function () {
    Route::get('/users/list', function () {
        $users = App\Models\User::all();
        return response()->json(['success' => true, 'data' => $users], 201);
    });

    Route::get('/users', [AuthUserController::class, 'getUser']);
    Route::post('/add-pack', [PacksController::class, 'AddPack']);
    Route::post('/add-novella/{pack_id}', [NovellaController::class, 'store']);
    Route::post('/editUser', [AuthUserController::class, 'editUser']);
    Route::get('/packk', [PacksController::class, 'getPacksByUserId']);
    Route::post('/pack/review/{id}', [ReviewController::class, 'reviewstore']);
    Route::post('/Addcomments', [CommentController::class, 'addComment']);

});

Route::middleware('api-header')->group(function () {
    Route::get('/books', [BooksController::class, 'index']);
    Route::get('/blog', [BlogsController::class, 'index']);
    Route::post('/storeBlog', [BlogsController::class, 'store']);

    Route::post('/save', [BooksController::class, 'store']);
    Route::put('/update/{id}', [BooksController::class, 'update']);
    Route::delete('/delete/{id}', [BooksController::class, 'destroy']);

    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
    Route::get('/novellas/{novella_id}/comments', [CommentController::class, 'getCommentsByNovellaId']);

    Route::post('/orders', [PacksController::class, 'order']);
    Route::get('/orders/{orderId}/packs/names', [PacksController::class, 'getPackFromOrder']);

    Route::get('/pack/{id}/novellas', [NovellaController::class, 'show']);

    Route::get('/AllPack', [PacksController::class, 'AllPack']);
//find pack by id
Route::get('/packsBy/{id}', [PacksController::class, 'findPackById']);

    Route::get('/list-novella', [NovellaController::class, 'index']);
    Route::get('/novellas/{id}', [NovellaController::class, 'FindNovellaByID']);

    Route::post('/AddText',    [TextController::class, 'AddText']);
    Route::post('/LogCode',    [TextController::class, 'getTextByPin']);
   
    Route::get('/text/{code}', [TextController::class, 'getTextByCode']);
    Route::put('/updateText/{code}', [TextController::class, 'updateText']);

    Route::post('/add-notification/{userId}', [NotificationController::class, 'addNotification']);
    Route::get('/notifications/{user_id}', [NotificationController::class, 'getUserNotifications']);
    Route::put('/notifications/{notificationId}/mark-as-seen', [NotificationController::class, 'markNotificationAsSeen']);
    // Test for the SSE For Notification Feature
    Route::get('/sse', [SseController::class, 'SEETEST']);

    Route::post('/upload', [PacksController::class, 'upload']);
});

// Protected route to retrieve authenticated user details
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
