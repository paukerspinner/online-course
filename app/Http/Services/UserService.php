<?php

namespace App\Http\Services;
use App\User;
use Config;

class UserService
{
    public static function updateLevel($grade) {
        $new_level = Config::get('constants.USER_LEVEL_PASS');

        // if ($grade >= Config::get('constants.GRADE_PASS')) {
        //     $new_level = Config::get('constants.USER_LEVEL_PASS');
        // }

        if ($grade >= Config::get('constants.GRADE_GOOD')) {
            $new_level = Config::get('constants.USER_LEVEL_GOOD');
        }

        if ($grade >= Config::get('constants.GRADE_HARD')) {
            $new_level = Config::get('constants.USER_LEVEL_HARD');
        }

        auth()->user()->update([
            'level' => $new_level
        ]);
    }

    public static function requestUpLevel() {
        $me = auth()->user();
        if ($me->level == Config::get('constants.USER_LEVEL_HARD')) {
            return false;   // return false if dont have any upper level
        } else {
            $me->update([
                'level' => $me->level + 1
            ]);
            return true;  // if successfully ugrade level
        }
    }
}
