<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class AuthorResource extends JsonResource
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
            'name' => implode(' ', [$profile->name, $profile->surname]),
        ];
    }
}