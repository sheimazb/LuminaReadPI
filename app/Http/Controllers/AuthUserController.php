<?php

namespace App\Http\Controllers;

use App\Mail\MailVerification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Mail;

class AuthUserController extends Controller
{
    private function getToken($email, $password)
    {
        $token = null;

        try {
            if (!$token = JWTAuth::attempt(['email' => $email, 'password' => $password])) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token' => $token
                ]);
            }
        } catch (JWTException $e) {
            return response()->json([
                'response' => 'error',
                'message' => "Token creation failed $e",
            ]);
        }

        return $token;
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
    
        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Utilisateur non trouvé'], 404);
        }
    
        if (!$user->verified) {
            return response()->json(['success' => false, 'message' => 'Veuillez vérifier votre adresse e-mail pour accéder à votre compte'], 401);
        }
    
        if (Hash::check($request->password, $user->password)) {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
    
            $response = ['success' => true, 'data' => ['id' => $user->id, 'auth_token' => $user->auth_token, 'name' => $user->name, 'email' => $user->email]];
        } else {
            $response = ['success' => false, 'message' => 'Mot de passe incorrect'];
        }
    
        return response()->json($response, 201);
    }
    

    public function register(Request $request)
    {
        $payload = [
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'name' => $request->name,
            'auth_token' => ''
        ];
        $user = User::create($payload);
        if ($user instanceof User) {
            $token = $this->getToken($request->email, $request->password);
            if (!is_string($token)) {
                return response()->json(['success' => false, 'message' => 'Échec de la génération du token'], 201);
            }
            $user->auth_token = $token;
            $user->save(); // Sauvegarder le token avant d'envoyer l'email
            $this->sendMail($user->id);
            $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->id, 'email' => $request->email, 'auth_token' => $token]];
        } else {
            $response = ['success' => false, 'message' => 'Impossible d\'enregistrer l\'utilisateur'];
        }
        return response()->json($response, 201);
    }

    public function sendMail($id)
    {
        $user = User::find($id);
        if ($user instanceof User) {
            $token = $user->auth_token;
            Mail::send('email.email', ['token' => $token], function ($message) use ($user) {
                $message->to($user->email);
                $message->subject('Email Verification Mail');
            });
        }
    }

    public function verify($token)
    {
        $user = User::where('auth_token', $token)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Utilisateur non trouvé'], 404);
        }

        if (!$user->verified) {
            $user->verified = 1;
            $user->save();
            // Rediriger vers la page de connexion
            return redirect()->away('http://localhost:3000/Auth/login'); // Remplacez par l'URL de votre page de connexion
        } else {
            // Si l'e-mail est déjà vérifié, vous pouvez rediriger vers une autre page, ou simplement afficher un message
            return response()->json(['success' => true, 'message' => 'Votre adresse e-mail est déjà vérifiée. Vous pouvez maintenant vous connecter.']);
        }
    }

    public function getUser()
    {
        try {
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function editUser(Request $request)
    {
        $userId = Auth::id();
        $user = User::findOrFail($userId);
        $user->description = $request->description;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $data = "public/images/user"; // chemin de destination pour stocker les images
            $image->move(public_path($data), $imageName);
            $user->img = url($data . '/' . $imageName); // Générer l'URL complète de l'image
        }

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
        }
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        $user->update();
        return response()->json(['success' => true, 'message' => 'User updated successfully', 'user' => $user]);
    }

    public function getUsersById($userId)
    {
        try {
            $user = User::find($userId);
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        } catch (Exception $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
