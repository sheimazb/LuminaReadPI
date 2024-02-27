<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Novella;
use App\Models\User;

class CommentController extends Controller
{
    public function Addcomments(Request $request)
    {
        $request->validate([
            'novella_id' => 'required|exists:novellas,id',
            'user_id' => 'required|exists:users,id', 
            'content' => 'required|string',
        ]);

        $comment = new Comment();
        $comment->novella_id = $request->novella_id;
        $comment->user_id = $request->user_id;
        $comment->content = $request->content;
        $comment->save();

        return response()->json(['message' => 'Comment created successfully'], 201);
    }
    
    public function getCommentsByNovellaId($novella_id)
    {
        // Check if the novella exists
        $novella = Novella::find($novella_id);
        if (!$novella) {
            return response()->json(['message' => 'Novella not found'], 404);
        }
    
        $comments = Comment::with('user:id,name')
                        ->where('novella_id', $novella_id)
                        ->orderBy('created_at', 'desc')
                        ->get();
    
        return response()->json(['comments' => $comments], 200);
    }
    

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->content = $request->content;
        $comment->save();

        return response()->json(['message' => 'Comment updated successfully'], 200);
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully'], 200);
    }
}
