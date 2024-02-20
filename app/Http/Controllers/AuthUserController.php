<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;

class AuthUserController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
            ]);

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json(['user' => $user]);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception], 500);
        }
    }
    // Fonction de connexion
    public function login(Request $request)
    {
        // Validation des données
        $credentials = $request->only('email', 'password');

        // Tentative de connexion
        if (Auth::attempt($credentials)) {
            // Authentification réussie, vous pouvez simplement renvoyer un message de succès ou l'utilisateur
            return response()->json(['message' => 'Authentification réussie']);
        } else {
            // Erreur d'authentification
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
