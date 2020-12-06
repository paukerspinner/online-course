<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Config;
use App\Http\Services\TestService;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
       'email', 'name', 'surname', 'patronymic', 'role', 'verified', 'password', 'level', 'completed_course'
    ];

    protected $casts = [
        'completed_course' => 'boolean',
        'verified' => 'boolean'
    ];
    protected $appends = ['rating'];

    protected $hidden = [
        'password',
    ];

    public function verification() {
        return $this->hasOne('App\Verification', 'user_id');
    }

    public function tests() {
        return $this->hasMany('App\Test', 'user_id');
    }

    public function getRatingAttribute() {
        $rating = 0;
        foreach ($this->transcript as $section_result) {
            $rating += $section_result->rating;
        }
        return round($rating, 2);
    }

    public function getTranscriptAttribute() {
        $transcript = [];
        $tests = $this->tests()->get();
        $rated_tests = [];
        $all_sections = Section::all();
        foreach ($all_sections as $section) {
            $last_test = $tests->where('section_id', $section->id)->where('grade', '!=', null)->last();
            if ($last_test != null) {
                $grade_factor = TestService::getFactorGradeOfLevel($last_test->level);
                $max_rating_of_test = $last_test->is_exam ? 20 : 10;
                $test_rating = (object)([
                    'section_id' => $section->id,
                    'section_label' => $section->title,
                    'rating' => $grade_factor * $last_test->grade / 100 * $max_rating_of_test
                ]);
            } else {
                $test_rating = (object)([
                    'section_id' => $section->id,
                    'section_label' => $section->title,
                    'rating' => 0
                ]);
            }
            $transcript[] = $test_rating;
        }
        return $transcript;
    }

    public function getRatedTests() {
        $tests = $this->tests()->get();
        $rated_tests = [];
        $all_sections = Section::all();
        foreach ($all_sections as $section) {
            $last_test = $tests->where('section_id', $section->id)->where('grade', '!=', null)->last();
            if ($last_test != null) {
                $rated_tests[] = $last_test;
            }
        }
        return $rated_tests;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
