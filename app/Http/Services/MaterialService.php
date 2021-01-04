<?php

namespace App\Http\Services;
use App\Test;
use App\Material;
use App\TestQuestion;

use App\Http\Services\TestService;
use App\Http\Services\StorageService;
use Config;

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
        if(array_key_exists('file', $material_data)) {
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
        if ($level !== null) {
            if ($current_section == 11) {
                $exam = auth()->user()->tests()->get()->last();
                if ($exam->grade > Test::GRADE_EXCELLENT) {
                    return Material::where('section_id', 11)->where('level', Config::get('constants.HARD_LEVEL'))->get();
                } else if ($exam->grade > Test::GRADE_GOOD) {
                    return Material::where('section_id', 11)->where('level', Config::get('constants.MEDIUM_LEVEL'))->get();
                } else if ($exam->grade > Test::GRADE_PASS) {
                    return Material::where('section_id', 11)->where('level', Config::get('constants.EASY_LEVEL'))->get();
                }
            } else {
                $materials = Material::where('section_id', $current_section)->where('level', $level)->get();
            }
        } else {
            $last_entrance_test = TestService::getLastTest($current_section);
            if ($last_entrance_test && $last_entrance_test->grade < Config::get('constants.GRADE_PASS')) {
                $materials = Material::where('section_id', $current_section)->get();
            } else {
                $materials = [];
            }
        }

        return $materials;
    }

    public static function getFailModulesInExam() {
        $current_section = TestService::getCurrentSectionId();
        $last_exam = auth()->user()->tests()->get()->where('grade', '!==', null)->last();
        if ($last_exam && $last_exam->is_exam) {
            $fail_modules = TestService::getFailSectionsOfExam($last_exam->id);
            return $fail_modules;
        } else {
            return [];
        }
    }
}
