<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Notification;
use App\NotificationUser;

class NotificationUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $notifications = Notification::all();
        foreach ($users as $user) {
            foreach ($notifications as $notification) {
                NotificationUser::create([
                    'user_id' => $user->id,
                    'notification_id' => $notification->id,
                    'is_read' => false
                ]);
            }
        }
    }
}
