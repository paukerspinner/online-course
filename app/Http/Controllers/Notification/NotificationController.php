<?php

namespace App\Http\Controllers\Notification;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Notification;
use App\NotificationUser;
use App\User;

class NotificationController extends Controller
{
    public function __construct() {
        $this->middleware('role:admin');
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
     * Store a newly created notification in storage and Automatic send this notification to any everyone
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $notification = Notification::create([
            'title' => $data['title'],
            'content' => $data['content']
        ]);
        return response()->json([
            'notification' => $notification
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $notification = Notification::find($id);
        $notification->delete();
        return response()->json([
            'message' => 'You have successfully deleted a notification.'
        ], 200);
    }

    public function sendAll(Request $request) {
        $notification = $this->store($request)->getData()->notification;

        $users = User::all();
        foreach ($users as $user) {
            NotificationUser::create([
                'user_id' => $user->id,
                'notification_id' => $notification->id
            ]);
        }

        return response()->json([
            'message' => 'You have create a notification and sent to everyone'
        ], 200);
    }
}
