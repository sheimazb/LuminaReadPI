<?php

namespace App\Http\Controllers;

use App\Models\Novella;
use App\Models\Pack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
                $novella->img = $imageName;
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
    public function show(string $id)
    {
        try {
            $novella = Novella::findOrFail($id);
            return response()->json(['novella' => $novella]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
