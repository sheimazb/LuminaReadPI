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
            $token = $user->createToken('auth_token')->plainTextToken;

            $cookie = cookie('token', $token, 60 * 24); // 1 day
            return response()->json(['user' => $user])->withCookie($cookie);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);

        }
    }
    // Fonction de connexion
    public function login(Request $request)
{
    // Validation des données
    $credentials = $request->only('email', 'password');

    // Tentative de connexion
    if (Auth::attempt($credentials)) {
        // Récupérer l'utilisateur authentifié
        $user = Auth::user();
        
        // Créer un jeton pour l'utilisateur
        $token = $user->createToken('auth_token')->plainTextToken;

        // Créer un cookie pour stocker le jeton
        $cookie = cookie('token', $token, 60 * 24); // 1 day

        // Retourner une réponse JSON avec un message de succès et le cookie
        return response()->json(['message' => 'Authentification réussie'])->withCookie($cookie);
    } else {
        // Erreur d'authentification
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

}
