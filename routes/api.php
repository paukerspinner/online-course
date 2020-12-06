<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function() {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('verify', 'AuthController@verify');
    Route::get('resendCode', 'AuthController@resendCode');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

    Route::get('users/up-level', 'UserController@requestUpLevel');
    Route::get('users/myself', 'UserController@myself');
    Route::apiResource('users', 'UserController');

    Route::apiResource('users/{id}/tests', 'UserTestController');

    Route::apiResource('questions', 'QuestionController');
    
    Route::get('tests/make-test', 'TestController@makeTest');
    Route::get('tests/pending-test', 'TestController@showPendingTest');
    Route::get('tests/my-tests', 'TestController@myIndex');
    Route::get('tests/finish-test', 'TestController@finishPendingTest');
    Route::apiResource('tests', 'TestController');

    Route::apiResource('test-answers', 'TestAnswerController');

    Route::apiResource('/sections', 'SectionController');

    Route::get('/materials/recommended-materials', 'MaterialController@getRecommendedMaterials');
    Route::post('/materials/update', 'MaterialController@update');
    Route::apiResource('/materials', 'MaterialController');

    Route::apiResource('/blogs', 'BlogController');
});