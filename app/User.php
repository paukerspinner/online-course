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
       'email', 'role', 'verified', 'password', 'level'
    ];

    protected $casts = [
        'completed_course' => 'boolean',
        'verified' => 'boolean'
    ];
    protected $appends = ['rating', 'completed_course'];

    protected $hidden = [
        'password',
    ];

    public function notificationUsers() {
        return $this->hasMany('App\NotificationUser', 'user_id');
    }

    public function verification() {
        return $this->hasOne('App\Verification', 'user_id');
    }

    public function tests() {
        return $this->hasMany('App\Test', 'user_id');
    }

    public function profile() {
        return $this->hasOne('App\Profile', 'user_id');
    }

    public function getRatingAttribute() {
        $rating = 0;
        foreach ($this->transcript as $section_result) {
            $rating += $section_result->rating;
        }
        return round($rating, 0);
    }

    public function getCompletedCourseAttribute() {
        $transcript = $this->transcript;
        return end($transcript)->rating * 100 / 20 >= Config::get('constants.GRADE_PASS');
    }

    public function getGradeAttribute() {
        $completed_course = $this->completed_course;
        if ($completed_course) {
            if ($this->rating > Test::GRADE_EXCELLENT) return 'excellent';
            if ($this->rating > Test::GRADE_GOOD) return 'good';
            if ($this->rating >= Test::GRADE_PASS) return 'average';
        } else {
            return null;
        }
    }

    public function getTranscriptAttribute() {
        $transcript = [];
        $tests = $this->tests()->get();
        $rated_tests = [];
        $all_sections = Section::all()->where('is_entrance', false)->where('is_additional', false);
        foreach ($all_sections as $section) {
            $last_test = $tests->where('section_id', $section->id)->where('grade', '!=', null)->last();
            if ($last_test !== null) {
                $rating = TestService::getBallOfTest($last_test);
                $test_rating = (object)([
                    'section_id' => $section->id,
                    'section_label' => $section->title,
                    'rating' => round($rating, 0)
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
