<?php

namespace App\Http\Services;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Mail;

use Carbon\Carbon;
use App\Mail\MailConfirmAccount;
use App\User;
use App\Verification;

class AuthService
{
    public static function registerUser($registration_data){
        $user = User::create([
            'email' => $registration_data['email'],
            'name' => $registration_data['name'],
            'surname' => $registration_data['surname'],
            'patronymic' => $registration_data['patronymic'],
            'password' => bcrypt($registration_data['password'])
        ]);

        $verification_code = self::sendVerificationCode($registration_data['email']);
        Verification::where('user_id', $user->id)->delete();
        $verification = Verification::create([
            'user_id' => $user->id,
            'verification_code' => $verification_code,
            'expiration' => Carbon::now('+00:05')
        ]);
        return $user;
    }

    public static function sendVerificationCode($received_email) {
        $new_verification_code = self::generateVerificationCode();
        // Mail::to($received_email)->send(new MailConfirmAccount($new_verification_code));
        return $new_verification_code;
    }

    public static function resendVerificationCode() {
        $user = User::find(auth()->user()->id);
        $received_email = $user->email;
        $new_verification_code = self::generateVerificationCode();
        Verification::where('user_id', $user->id)->delete();
        $verification = Verification::create([
            'user_id' => $user->id,
            'verification_code' => $new_verification_code,
            'expiration' => Carbon::now('+00:05')
        ]);
        Mail::to($received_email)->send(new MailConfirmAccount($new_verification_code));
    }

    public static function verifyAccount($verification_code) {
        $user = User::find(auth()->user()->id);
        $verification = $user->verification()->getResults();
        $current_time = Carbon::now();
        $expired_time = Carbon::parse($verification->expiration);
        if ($verification_code == $verification->verification_code && $expired_time->greaterThan($current_time)) {
            $user->update(['verified' => true]);
            return true;
        };
        return false;
    }

    protected static function generateVerificationCode($length = 6) {
        $verification_code = '';
        $alphabet = '0123456789';
        for ($i = 0; $i < $length; $i++) {
            $verification_code .= $alphabet[rand(0, 9)];
        }
        return $verification_code;
    }
}
