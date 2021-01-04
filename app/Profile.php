<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = ['user_id', 'name', 'surname', 'patronymic', 'is_male', 'date_of_birth'];

    public function user() {
        return $this->belongsTo('App\User', 'user_id');
    }
}
