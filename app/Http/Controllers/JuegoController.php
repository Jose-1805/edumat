<?php

namespace App\Http\Controllers;

use App\Models\Competencia;
use App\Models\Prueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JuegoController extends Controller
{
    function __construct()
    {
        $this->middleware('authEstudiante');
    }

    public function index(Request $request){
        $prueba = Auth::user()->pruebas()->where('pruebas.estado','iniciada')->first();
        if(!$prueba){
            $prueba = new Prueba();
            $prueba->nivel_actual = 'suma';
            $prueba->user_id = Auth::user()->id;
            $prueba->save();
        }

        $competencia = $prueba->ultimaCompetencia();
        //si la prueba no tiene competencias registramos la de suma (primer nivel)
        if(!$competencia){
            $competencia = new Competencia();
            $competencia->nivel = 'suma';
            $competencia->prueba_id = $prueba->id;
            $competencia->save();
        }else{
            //si la competencia esta finalizada iniciamos la siguiente
            if($competencia->estado == 'terminada' && $competencia->nivel != 'división'){
                if($competencia->nivel == 'suma')$operacion = 'resta';
                if($competencia->nivel == 'resta')$operacion = 'multiplicación';
                if($competencia->nivel == 'multiplicación')$operacion = 'división';

                $competencia = new Competencia();
                $competencia->nivel = $operacion;
                $competencia->prueba_id = $prueba->id;
                $competencia->save();

                $prueba->nivel_actual = $operacion;
            }
        }

        return view('juego.index')
            ->with('prueba',$prueba)
            ->with('competencia',$competencia);
    }

    public function guardarDatoCompetencia(Request $request){
        $prueba = Auth::user()->pruebas()->where('pruebas.estado','iniciada')->first();
        if($prueba) {
            $competencia = $prueba->ultimaCompetencia();
            if($competencia){
                if($request->has('segundos') && $request->has('acierto')){
                    $competencia->duracion_segundos += intval($request->segundos);
                    if($request->acierto == 'true'){
                        $competencia->aciertos += 1;
                        $competencia->puntaje += config('params.puntuacion_por_operacion');
                        $prueba->puntos_totales += config('params.puntuacion_por_operacion');
                    }else{
                        $competencia->desaciertos += 1;
                    }

                    //verifica si la competencia ha terminado
                    if(($competencia->aciertos + $competencia->desaciertos) == config('params.operaciones_por_modulo')) {
                        $competencia->estado = 'terminada';
                        if($competencia->nivel == 'suma'){
                            $prueba->nivel_actual = 'resta';
                        }else if($competencia->nivel == 'resta'){
                            $prueba->nivel_actual = 'multiplicación';
                        }else if($competencia->nivel == 'multiplicación'){
                            $prueba->nivel_actual = 'división';
                        }else{
                            $prueba->estado = 'finalizada';
                        }
                    }

                    $competencia->save();
                    $prueba->save();
                    return [
                        'success'=>true,
                        'competencia'=>$competencia,
                        'prueba'=>$prueba
                    ];
                }
            }
        }
        return ['success'=>false];
    }
}
