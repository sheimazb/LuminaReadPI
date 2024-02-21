<?php

namespace App\Http\Controllers;

use App\Models\Novella;
use App\Models\Pack;
use Illuminate\Http\Request;
use Exception;

class NovellaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $novella = Novella::all();
            return response()->json(['novella' => $novella]);
        }catch(Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $pack_id)
    {
        try {
            $pack = Pack::findOrFail($pack_id);
    
            $novella = new Novella();
            $novella->title = $request->title;
            $novella->description = $request->description;
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
