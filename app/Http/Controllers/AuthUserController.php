<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

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
                'message' => 'Token creation failed $e',
            ]);
        }

        return $token;
    }

    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->get()->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();

            $response = ['success' => true, 'data' => ['id' => $user->id, 'auth_token' => $user->auth_token, 'name' => $user->name, 'email' => $user->email]];
        } else
            $response = ['success' => false, 'data' => 'Record doesnt exists'];

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

        $user = new User($payload);
        if ($user->save()) {
            $token = self::getToken($request->email, $request->password);
            if (!is_string($token))  return response()->json(['success' => false, 'data' => 'Token generation failed'], 201);
            $user = User::where('email', $request->email)->get()->first();
            $user->auth_token = $token;
            $user->save();
            $response = ['success' => true, 'data' => ['name' => $user->name, 'id' => $user->id, 'email' => $request->email, 'auth_token' => $token]];
        } else
            $response = ['success' => false, 'data' => 'Couldnt register user'];
        return response()->json($response, 201);
    }

    public function getUser(int $id)
    {
        $authHeader = request()->header('Authorization');
        if (!str_starts_with($authHeader, 'Bearer ')) {
            return response()->json(['message' => 'Invalid token'], 401);
        }
    
        try {
            $user = User::where('id', $id)->firstOrFail();
        } catch (\Exception $e) {
            // Handle exception when record not found (i.e., throw custom error or redirect)
            abort(404);
        }
    
        return response()->json([
            'success' => true,
            'user' => $user
        ]);
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
            $user->img = $imageName;
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
}
