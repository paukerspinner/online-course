<?php

namespace App\Http\Services;
use App\User;
use App\Test;
use Config;

class UserService
{
    public static function getUsers($filter_request) {
        $conditions_filter = [];
        foreach ($filter_request as $key => $value) {
            $conditions_filter[] = [$key, $value];
        }
        return User::where($conditions_filter)->get();
    }

    public static function updateLevel($grade) {
        $new_level = auth()->user()->level;

        // If student fails more 1 time at the same level (except LEVEL_PASS), decrease his level
        if ($grade < Config::get('constants.GRADE_PASS')) {
            $last_test = Test::where('user_id', auth()->user()->id)->get()->last();
            $test_same_level = Test::where([
                ['user_id', auth()->user()->id],
                ['section_id', $last_test->section_id],
                ['level', $last_test->level]
            ])->get();
            if (count($test_same_level) > 1) {
                switch($last_test->level) {
                    case Config::get('constants.HARD_LEVEL'):
                        $new_level = Config::get('constants.MEDIUM_LEVEL');
                        break;
                    case Config::get('constants.MEDIUM_LEVEL'):
                        $new_level = Config::get('constants.EASY_LEVEL');
                        break;
                }
            }
        } else {
            $new_level = Config::get('constants.EASY_LEVEL');
            if ($grade >= Config::get('constants.GRADE_GOOD')) {
                $new_level = Config::get('constants.MEDIUM_LEVEL');
            }
            if ($grade >= Config::get('constants.GRADE_HARD')) {
                $new_level = Config::get('constants.HARD_LEVEL');
            }
        }
        auth()->user()->update([
            'level' => $new_level
        ]);
    }

    public static function requestUpLevel() {
        $me = auth()->user();
        if ($me->level == Config::get('constants.HARD_LEVEL')) {
            return false;   // return false if dont have any upper level
        } else {
            $me->update([
                'level' => $me->level + 1
            ]);
            return true;  // if successfully ugrade level
        }
    }
}
