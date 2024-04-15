<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::orderByDesc('created_at')->get();
        return response()->json($messages);
    }

    // Créer un nouveau message
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|string|max:255',
            'sender_id' => 'required|integer',
            'recipient_id' => 'required|integer',
        ]);

        $message = Message::create($validatedData);

        // Diffuser l'événement de nouveau message via Pusher
        event(new NewMessageEvent($message));

        return response()->json($message, 201);
    }
}
