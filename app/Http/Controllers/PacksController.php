<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pack;


class PacksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Valider les données de la requête
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'category' => 'required|string',
            'img' => 'required|string',
            'langue' => 'required|string',
            'price' => 'required|string',
        ]);
        $userId = 1;
        // Créer un nouveau pack
        $pack = new Pack([
            'user_id' => $userId,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'category' => $request->input('category'),
            'img' => $request->input('img'),
            'langue' => $request->input('langue'),
            'price' => $request->input('price'),
        ]);

        // Enregistrer le pack dans la base de données
        $pack->save();

        // Retourner une réponse appropriée
        return response()->json(['message' => 'Pack created successfully', 'pack' => $pack], 201);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
