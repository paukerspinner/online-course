<?php

namespace App\Http\Services;
use App\Material;

use App\Http\Services\TestService;
use App\Http\Services\StorageService;

class MaterialService
{
    public static function storeMaterial($material_data) {
        // Form Data suports only 2 types: text or file)
        $path = StorageService::saveMaterialFile($material_data['file']);
        $material = Material::create([
            'section_id' => intval($material_data['section_id']),
            'title' => $material_data['title'],
            'level' => intval($material_data['level']),
            'path' => $path
        ]);
        return $material;
    }

    public static function updateMaterial($material_data) {
        // Form Data suports only 2 types: text or file)
        $id = $material_data['id'];
        $material = Material::find($id);
        $material->update([
            'section_id' => intval($material_data['section_id']),
            'title' => $material_data['title'],
            'level' => intval($material_data['level']),
        ]);
        if($material['file'] != null) {
            $path = StorageService::saveMaterialFile($material_data['file']);
            $material->update([
                'path' => $path
            ]);
        }
        return $material;
    }

    public static function getRecommendedMaterials() {
        $level = auth()->user()->level;
        $current_section = TestService::getCurrentSectionId();
        $materials = Material::where('section_id', $current_section)->where('level', $level)->get();
        return $materials;
    }
}
