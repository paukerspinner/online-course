<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

use App\Http\Requests\RegisterRequest;
use App\Http\Services\AuthService;
use App\User;

use App\Http\Resources\User\UserResource;

class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->middleware('role:admin')->only('resetPassword');
    }

    public function login(Request $request) {
        $credentials = $request->json()->all();
        if ($token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'access_token' => $token,
                'user' => new UserResource(auth()->user())
            ]);
        }
        return response()->json(['error_message' => 'Email or password is not correct'], 401);
    }

    public function register(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'email', 'unique:users'],
                'name' => ['required', 'string', 'max:255'],
                'surname' => ['required', 'string', 'max:255'],
                'patronymic' => ['required', 'string', 'max:255'],
                'password' => ['required', 'string', 'min:8'],
                'confirm' => ['required', 'same:password']
            ]);
            
            if($validator->fails()){
                return response()->json($validator->errors(), 400);
            }
            $registration_data = $request->all();
            $user = AuthService::registerUser($registration_data);
            
            $token = JWTAuth::fromUser($user);
            return response()->json([
                'token' => $token
            ], 201);
        } catch(Exception $error) {
            return response()->json(['error' => $error], 500);
        }
    }

    public function verify(Request $request) {
        $verification_code = $request->json()->get('verification_code');
        $success_verification = AuthService::verifyAccount($verification_code);
        if ($success_verification) {
            return response()->json([
                'message' => 'Successfully verify your account'
            ]);
        } else {
            return response()->json([
                'error_message' => 'Verification code is not correct or expired'
            ]);
        }
        
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function resendCode() {
        try {
            AuthService::resendVerificationCode();
            return response()->json([
                'message' => 'Code was sent, check your email (including junk, spam)'
            ]);
        } catch(Exception $error) {
            return response()->json(['error' => $error]);
        }
    }

    public function me() {
        return response()->json(new UserResource(auth()->user()));
    }

    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh() {
        return $this->respondWithToken($this->guard()->refresh());
    }

    public function changePassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8'],
            'confirm' => ['required', 'same:new_password']
        ]);
        
        if($validator->fails()){
            return response()->json([
                'error_message' => 'New password or password confirm is invalid, please try again!'
            ], 400);
            //return response()->json($validator->errors(), 400);
        }

        $password = $request->get('password');
        if (!auth()->validate(['email' => auth()->user()->email, 'password' => $password])) {
            return response()->json([
                'error_message' => 'Password is not correct!'
            ], 400);
        } else {
            $new_password = $request->get('new_password');
            auth()->user()->update([
                'password' => bcrypt($new_password)
            ]);
            auth()->logout();
            return response()->json([
                'message' => 'You have successfully changed your password'
            ], 200);
        }
    }

    public function resetPassword(Request $request) {
        $user_id = $request->input('user_id');
        $user = User::find($user_id);
        $new_password = AuthService::generatePassword();
        $user->update([
            'password' => bcrypt($new_password)
        ]);
        return response()->json([
            'password' => $new_password
        ], 200);
    }

    // protected function respondWithToken($token) {
    //     return response()->json([
    //         'access_token' => $token
    //     ]);
    // }

    public function guard() {
        return Auth::guard();
    }
}
