<?php

namespace App\Http\Resources\Question;

use Illuminate\Http\Resources\Json\ResourceCollection;

class QuestionAnswerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => QuestionAnswerResource::collection($this),
            'meta' => []
        ];
    }
}
