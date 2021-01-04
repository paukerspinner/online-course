<?php

namespace App\Http\Controllers\Notification;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\NotificationUserCollection;
use App\Http\Resources\Notification\NotificationUserResource;
use App\NotificationUser;

class MyNotificationController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->has('limit') ? $request->get('limit') : -1;
        $is_read = $request->has('is_read') ? $request->get('is_read') : null;

        $filter_where = [];
        if ($request->has('is_read')) {
            $filter_where[] = ['is_read', $request->get('is_read')];
        }
        
        $my_notifications = auth()->user()->notificationUsers()->where($filter_where)->take($limit)->orderBy('id', 'DESC')->get();

        $my_notifications = new NotificationUserCollection($my_notifications);
        return response()->json([
            'my_notifications' => $my_notifications
        ], 200);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $notification_user = new NotificationUserResource(NotificationUser::find($id));
        return response()->json([
            'notification_user' => $notification_user
        ], 200);
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
        $notification_user = NotificationUser::find($id);
        if ($notification_user->user_id == auth()->user()->id) {
            $notification_user->update($request->all());
            return response()->json(null, 200);
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
