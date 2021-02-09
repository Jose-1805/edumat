<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware'=>'guest'],function (){
    Route::get('/', function () {
        return view('welcome');
    });
});

Route::post('ranking', 'RankingController@lista');

Auth::routes();

Route::group(['middleware'=>'auth'],function (){
    Route::get('/home', 'HomeController@index')->name('home');

    Route::group(['prefix'=>'estudiante'], function () {
        Route::get('/','EstudianteController@index');
        Route::get('/lista','EstudianteController@lista');
        Route::post('/guardar','EstudianteController@guardar');
        Route::post('/datos-form-editar','EstudianteController@datosFormEditar');
        Route::post('/editar','EstudianteController@Editar');
    });

    Route::group(['prefix'=>'juego'], function () {
        Route::get('/','JuegoController@index');
        Route::post('/guardar-dato-competencia','JuegoController@guardarDatoCompetencia');
    });

    Route::group(['prefix'=>'estadisticas'], function () {
        Route::get('/','EstadisticasController@index');
        Route::get('/lista-estudiantes','EstadisticasController@listaEstudiantes');
        Route::post('/datos-grafica','EstadisticasController@datosGrafica');
    });
});