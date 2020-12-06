<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['user_id', 'title', 'content'];
    protected $appends = ['author_name'];


    public function author() {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function getAuthorNameAttribute() {
        $author = $this->author()->getResults();
        return join(' ',[$author->name, $author->surname]);
    }
}
