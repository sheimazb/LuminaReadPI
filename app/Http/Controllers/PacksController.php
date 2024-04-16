<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pack;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

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

        if ($request->has('langue')) {
            $langue = $request->input('langue');
            $query->where('langue', $langue);
        }
        
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "$search%");
        }

        /* if ($request->has('searchByDescription')) { // Correction: changer 'searchByTitle' à 'searchByDescription'
            $search = $request->input('searchByDescription');
            $query->where('description', 'like', "$search%");
        }*/

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
     *  get pack information by user id 
     * 
     */
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
     *  packs order 
     */
    public function order(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|integer',
            'packs_ids' => 'required|array',
            'packs_ids.*' => 'integer',
        ]);
    
        $order = Order::create([
            'user_id' => $data['user_id'],
            'packs_ids' => $data['packs_ids'],
        ]);
    
        // Mise à jour du statut des packs commandés
        foreach ($data['packs_ids'] as $pack_id) {
            Pack::where('id', $pack_id)->update(['packStatus' => 1]);
        }
    
       
        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    }
    

    public function getPackFromOrder($orderId)
    {
        $order = Order::findOrFail($orderId);
        $packIds = $order->packs_ids;

        $packNames = Pack::whereIn('id', $packIds)->pluck('title');

        return response()->json(['pack_names' => $packNames]);
    }
    /**
     * find pack by ID 
     */
    public function findPackById($id)
    {
        try {
            $pack = Pack::findOrFail($id);
            return response()->json(['pack' => $pack]);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }
}
