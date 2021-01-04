<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['id', 'title'];
    protected $hidden = ['created_at', 'updated_at'];
    protected $appends = ['is_exam', 'is_entrance', 'is_module'];

    public function getIsExamAttribute() {
        return $this->type == 'exam';
    }

    public function getIsEntranceAttribute() {
        return $this->type == 'entrance';
    }

    public function getIsModuleAttribute() {
        return $this->type == 'module';
    }

    public function getIsAdditionalAttribute() {
        return $this->type == 'additional';
    }
}
