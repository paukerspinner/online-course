<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $fillable = ['section_id', 'title', 'level', 'path'];

    public function section() {
        return $this->belongsTo('App\Section', 'section_id');
    }
}
