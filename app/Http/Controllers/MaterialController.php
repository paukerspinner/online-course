<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\MaterialService;
use App\Material;

class MaterialController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return response()->json([
            'materials' => Material::all()
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
        return response()->json([
            'material' => $material
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
        //
    }

    public function getRecommendedMaterials() {
        $materials = MaterialService::getRecommendedMaterials();
        return response()->json([
            'materials' => $materials
        ], 200);
    }
}
