<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Config;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
       'email', 'name', 'surname', 'patronymic', 'role', 'verified', 'password', 'level'
    ];

    protected $hidden = [
        'password',
    ];

    public function verification() {
        return $this->hasOne('App\Verification', 'user_id');
    }

    public function tests() {
        return $this->hasMany('App\Test', 'user_id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
