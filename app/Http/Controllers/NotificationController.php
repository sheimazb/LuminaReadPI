<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        // Retrieve all notifications
        $notifications = Notification::all();

        // Return a JSON response
        return response()->json($notifications);
    }

    public function show($id)
    {
        // Find notification by ID
        $notification = Notification::findOrFail($id);

        // Return a JSON response
        return response()->json($notification);
    }

    public function markNotificationAsSeen($notificationId)
    {
        // Find notification by ID
        $notification = Notification::findOrFail($notificationId);
    
        // Update notification's seen status to true
        $notification->seen = true;
        $notification->save();
    
        // Return a JSON response indicating success
        return response()->json(['message' => 'Notification marked as seen successfully']);
    }
    

    public function getUserNotifications($userId)
    {
        // Find user by ID
        $user = User::findOrFail($userId);

        // Retrieve notifications for the user
        $notifications = $user->notifications;

        // Return user's notifications as JSON response
        return response()->json($notifications);
    }

    public function addNotification(Request $request, $userId)
    {
        // Validate the request data
        $request->validate([
            'content' => 'required|string',
            'seen' => 'required|boolean',
        ]);

        // Find user by ID
        $user = User::findOrFail($userId);

        // Create a new notification
        $notification = new Notification();
        $notification->content = $request->input('content');
        $notification->seen = $request->input('seen');

        // Save the notification to the user
        $user->notifications()->save($notification);

        // Return a JSON response indicating success
        return response()->json(['message' => 'Notification added to user successfully']);
    }
}
