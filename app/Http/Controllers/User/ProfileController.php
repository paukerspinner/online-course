<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Profile;
use App\Http\Resources\User\ProfileResource;

class ProfileController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $user_id
     * @return \Illuminate\Http\Response
     */
    public function show($user_id)
    {
        $profile = User::find($user_id)->profile;
        $profile_res = new ProfileResource($profile);
        return response()->json([
            'profile' => $profile_res
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user_id)
    {
        if (auth()->user()->id == $user_id || auth()->user()->role == 'admin') {
            $profile = User::find($user_id)->profile;
            $profile->update([
                'name' => $request->get('name'),
                'surname' => $request->get('surname'),
                'patronymic' => $request->get('patronymic'),
                'is_male' => $request->get('is_male') != null ? intval($request->get('is_male')) : null,
                'date_of_birth' => $request->get('date_of_birth')
            ]);

            return response()->json([
                'profile' => $profile,
                'message' => 'You have updated your profile'
            ], 200);
        } else {
            return response()->json([
                'message_error' => 'Forbidden Error'
            ], 403);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
