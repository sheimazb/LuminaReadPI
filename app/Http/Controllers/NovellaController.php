<?php

namespace App\Http\Controllers;

use App\Models\Novella;
use App\Models\Pack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Exception;

class NovellaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $novella = Novella::all();
            return response()->json(['novella' => $novella]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $pack_id)
    {
        try {
            if (!Auth::check()) {
                return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
            }
            $pack = Pack::findOrFail($pack_id);
            $novella = new Novella();
            $novella->pack_id = $pack->id;
            $novella->title = $request->title;
            $novella->description = $request->description;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $data = "public/images/novellas"; // chemin de destination pour stocker les images
                $image->move(public_path($data), $imageName);
                $novella->img = url($data . '/' . $imageName); // Renvoyer l'URL complète de l'image
            }
            $novella->content = $request->content;
            $novella->progress = $request->progress;
            // Sauvegarder la novella associée au pack
            $pack->novellas()->save($novella);

            return response()->json(['novella' => $novella]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            // Find the Pack by ID
            $pack = Pack::findOrFail($id);
            
            // Query Novellas by Pack ID
            $novellas = Novella::where('pack_id', $pack->id)->get();
            
            // Return the Novellas as JSON response
            return response()->json(['novellas' => $novellas]);
        } catch (ModelNotFoundException $e) {
            // Handle the case where the Pack is not found and return a JSON response with error message
            return response()->json(['message' => 'Pack not found'], 404);
        }
    }
    
    public function FindNovellaByID($id){
        try {
            $novella = Novella::find($id);
            if ($novella) {
                return response()->json($novella, 200);
            } else {
                return response()->json(['message' => 'Novella not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
