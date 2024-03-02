<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pack;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class PacksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function AllPack(Request $request)
    {
        $query = Pack::query()->with('usser'); // Charger la relation utilisateur
    
        if ($request->has('category')) {
            $category = $request->input('category');
            $query->where('category', $category);
        }
    
        if ($request->has('searchByTitle')) {
            $search = $request->input('searchByTitle');
            $query->where('title', 'like', "$search%");
        }
    
        if ($request->has('searchByDescription')) { // Correction: changer 'searchByTitle' à 'searchByDescription'
            $search = $request->input('searchByDescription');
            $query->where('description', 'like', "$search%");
        }
    
        if ($request->has('price')) {
            $price = $request->input('price');
            $query->where('price', $price);
        }
    
        $packs = $query->get();
    
        return response()->json(['packs' => $packs]);
    }
    
    
    /**
     * Store a newly created resource in storage.
     */
    // Fonction pour ajouter un pack
    public function AddPack(Request $request)
{
    try {
     // Check if user is authenticated
     if (!Auth::check()) {
        return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
    }

    // Get the authenticated user's ID
    $userId = Auth::id();
        $pack = new Pack();
        $pack->user_id = $userId;
        $pack->title = $request->title;
        $pack->description = $request->description;
        $pack->category = $request->category;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $data = "public/images/packs"; // chemin de destination pour stocker les images
            $image->move(public_path($data), $imageName);
            $pack->img = url($data . '/' . $imageName); // Renvoyer l'URL complète de l'image
        }

        $pack->langue = $request->langue;
        $pack->price = $request->price;
        $pack->save();

        return response()->json(['pack' => $pack], 200);
    } catch (Exception $exception) {
        return response()->json(['message' => $exception->getMessage()], 500);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
    public function upload(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $data = "/images";
            $image->move(public_path($data), $imageName);
            return response()->json(['image_path' => 'public/images/' . $imageName], 200);
        } else {
            return response()->json(['error' => 'Aucune image n\'a été envoyée.'], 400);
        }
    }

    /**
     * test filter pack
     * 
     */
    public function filterByCategory(Request $request)
    {
        // Vérifier si des catégories sont spécifiées dans la requête
        if ($request->has('categories')) {
            $categories = $request->input('categories');

            // Filtrer les packs selon les catégories spécifiées
            $packs = Pack::whereHas('categories', function ($query) use ($categories) {
                $query->whereIn('id', $categories);
            })->get();

            // Retourner les packs filtrés en réponse
            return response()->json(['packs' => $packs], 200);
        } else {
            // Si aucune catégorie spécifiée, retourner une réponse avec un message d'erreur
            return response()->json(['error' => 'Veuillez spécifier au moins une catégorie.'], 400);
        }
    }
    public function getPacksByUserId(Request $request)
    {
        try {
            $userId = Auth::id();
            $query = Pack::where('user_id', $userId);
    
            // Check if search query is provided
            if ($request->has('search')) {
                $search = $request->input('search');
                $query->where('title', 'like', "$search%");
            }
    
            $packs = $query->get();
    
            return response()->json(['packs' => $packs]);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
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
