<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class TranscriptResource extends JsonResource
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
            'user_id' => $this->id,
            'fullname' => join(' ', [$profile->surname, $profile->name, $profile->patronymic]),
            'data' => $this->transcript
        ];
    }
}
