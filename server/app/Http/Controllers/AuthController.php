<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\OtpVerification;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;

use App\Mail\OtpVerificationMail;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],  // Ensure email is unique
            'password' => ['required']
        ]);

        // Check if the user with the provided email already exists
        $user = User::where('email', $data['email'])->first();

        if ($user) {
            // If the email exists and email_verified_at is null (not verified)
            if (is_null($user->email_verified_at)) {
                // Regenerate OTP if the user exists but not verified
                $otp = Str::random(6);
                $expires_at = now()->addMinutes(10);

                // Delete expired OTP record if it exists
                OtpVerification::where('user_id', $user->id)->where('expires_at', '<', now())->delete();

                // Create a new OTP record
                OtpVerification::create([
                    'user_id' => $user->id,
                    'otp' => $otp,
                    'expires_at' => $expires_at
                ]);

                // Send OTP Email
                Mail::to($user->email)->send(new OtpVerificationMail($user, $otp));

                return response()->json([
                    'message' => "OTP sent successfully. Please check your email for OTP",
                ]);
            }

            // If the email is verified, prevent registration
            return response()->json([
                'message' => 'This email is already registered and verified.',
                'user' => $user
            ], 400);
        }

        // If the user doesn't exist, create a new one
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        // Generate OTP
        $otp = Str::random(6);
        $expires_at = now()->addMinutes(10);

        // Store OTP in the OTP table
        OtpVerification::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'expires_at' => $expires_at
        ]);

        // Send OTP Email
        Mail::to($user->email)->send(new OtpVerificationMail($user, $otp));

        return response()->json([
            'message' => "User registered successfully, please check your email for OTP",
        ]);
    }


    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'otp' => 'required',
        ]);

        $otpRecord = OtpVerification::where('otp', $data['otp'])->first();

        if (!$otpRecord || $otpRecord->expires_at < now()) {
            return response()->json(['message' => 'Invalid or expired OTP'], 400);
        }

        $user = $otpRecord->user;
        $user->update(['email_verified_at' => now()]);

        // Delete the OTP record after successful verification
        $otpRecord->delete();

        return response()->json(['message' => 'Email verified successfully']);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required']
        ]);

        // Find the user with the provided email
        $user = User::where('email', $data['email'])->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => 'Invalid credentials']);
        }

        // Check if the email is verified
        if (is_null($user->email_verified_at)) {
            return response()->json(['message' => 'Your email is not verified. Please verify your email first.'], 403);
        }

        // Generate authentication token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke the current token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

}
