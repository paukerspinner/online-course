<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\MaterialService;
use App\Material;
use App\Http\Resources\Material\MaterialCollection;
use App\Http\Resources\Material\MaterialResource;

class MaterialController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
        $this->middleware('role:admin')->except(['index', 'show', 'getRecommendedMaterials', 'getFailModulesInExam']);
    }

    public function index()
    {
        $materials = Material::orderBy('section_id')->get();
        $materials_res = new MaterialCollection($materials);
        return response()->json([
            'materials' => $materials_res
        ], 200);
    }

    public function store(Request $request)
    {
        $material_data = $request->all(); // Form Data suports only 2 types: text or file)
        $material = MaterialService::storeMaterial($material_data);
        return response()->json([
            'message' => 'You have added a new material'
        ], 200);
    }

    public function show($id)
    {
        $material = Material::find($id);
        $material_res = new MaterialResource($material);
        return response()->json([
            'material' => $material_res
        ], 200);
    }

    public function update(Request $request)
    {
        $material_data = $request->all();   // Form Data suports only 2 types: text or file)
        $material = MaterialService::updateMaterial($material_data);
        return response()->json([
            'message' => 'You have updated a material',
            'material' => $material
        ], 200);
    }

    public function destroy($id)
    {
        $material = Material::find($id)->delete();
        return response()->json([
            'message' => 'You have deleted a material'
        ], 200);
    }

    public function getRecommendedMaterials() {
        $materials = MaterialService::getRecommendedMaterials();
        return response()->json([
            'materials' => $materials
        ], 200);
    }

    public function getFailModulesInExam() {
        $fail_modules = MaterialService::getFailModulesInExam();
        return response()->json([
            'fail_modules' => $fail_modules
        ], 200);
    }
}
