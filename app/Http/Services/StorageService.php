<?php

namespace App\Http\Services;
use Carbon\Carbon;

class StorageService
{
    static $material_forder = 'files';

    public static function saveMaterialFile($material_file) {
        $time_now = Carbon::now();
        $saved_file = $material_file->move(self::$material_forder, $time_now.$material_file->getClientOriginalName());
        return $saved_file->getPathName();
    }

}
