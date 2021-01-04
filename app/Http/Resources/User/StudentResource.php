<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $profile = $this->profile;
        return [
            'id' => $this->id,
            'email' => $this->email,
            'role' => $this->role,
            'name' => $profile->name,
            'surname' => $profile->surname,
            'patronymic' => $profile->patronymic,
            'rating' => $this->rating,
            'grade' => $this->grade
        ];
    }
}
