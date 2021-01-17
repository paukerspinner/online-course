<?php

namespace App\Http\Services;
use App\Http\Services\TestService;

use App\User;
use App\Test;
use Config;

class UserService
{
    public static function setLevel($grade) {
        $level = null;
        if ($grade > Test::GRADE_EXCELLENT) {
            $level = Config::get('constants.HARD_LEVEL');
        } else if ($grade > Test::GRADE_GOOD) {
            $level = Config::get('constants.MEDIUM_LEVEL');
        } else if ($grade >= Test::GRADE_PASS) {
            $level = Config::get('constants.EASY_LEVEL');
        }
        auth()->user()->update([
            'level' => $level
        ]);
    }

    public static function updateLevel($grade) {
        $new_level = auth()->user()->level;

        // If student fails more 1 time at the same level (except LEVEL_PASS), decrease his level
        if ($grade < Test::GRADE_PASS) {
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
            if ($grade <= Test::GRADE_GOOD) {
                $new_level = Config::get('constants.EASY_LEVEL');
            } else if($grade <= Test::GRADE_EXCELLENT) {
                $new_level = Config::get('constants.MEDIUM_LEVEL');
            } else {
                $new_level = Config::get('constants.HARD_LEVEL');
            }
        }
        auth()->user()->update([
            'level' => $new_level
        ]);
    }

    public static function deletePendingTest() {
        $pending_test = TestService::getPendingTest();
        if ($pending_test) {
            $pending_test->delete();
        }
    }

    public static function upLevel() {
        (new static)::deletePendingTest();
        $me = auth()->user();
        $me->update([
            'level' => $me->level + 1
        ]);
    }

    public static function downLevel() {
        (new static)::deletePendingTest();
        $me = auth()->user();
        $me->update([
            'level' => $me->level - 1
        ]);
    }
}
