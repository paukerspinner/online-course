<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['id', 'title', 'is_exam'];
    protected $hidden = ['created_at', 'updated_at'];
}
