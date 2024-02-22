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
    public function AllPack()
    {
        $pack = Pack::all();
        return response()->json(['pack' => $pack]);
    }

    /**
     * Store a newly created resource in storage.
     */
     // Fonction pour ajouter un pack
     public function AddPack(Request $request)
     {
         try {
             // Assurez-vous que l'utilisateur est authentifié
             if (!Auth::check()) {
                 return response()->json(['error' => 'Unauthorized'], 401);
             }
 
             // Obtenez l'utilisateur authentifié
             $user = Auth::user();
 
             // Créez un nouveau pack avec l'ID de l'utilisateur authentifié
             $pack = new Pack();
             $pack->user_id = $user->id;
             $pack->title = $request->title;
             $pack->description = $request->description;
             $pack->category = $request->category;
             $pack->img = $request->img;
             $pack->langue = $request->langue;
             $pack->price = $request->price;
             $pack->save();
 
             return response()->json(['pack' => $pack]);
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
        // Vérifie si une image a été envoyée
        if ($request->hasFile('image')) {
            // Récupère le fichier image
            $image = $request->file('image');
            
            // Génère un nom unique pour l'image
            $imageName = time() . '_' . $image->getClientOriginalName();
            
            // Stocke l'image dans le dossier de stockage 'images' (vous devez créer ce dossier dans le répertoire de stockage de Laravel)
            $image->storeAs('images', $imageName);
            
            // Retourne le chemin de l'image téléchargée
            return response()->json(['image_path' => 'storage/images/' . $imageName], 200);
        } else {
            // Retourne une réponse d'erreur si aucune image n'a été envoyée
            return response()->json(['error' => 'Aucune image n\'a été envoyée.'], 400);
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
