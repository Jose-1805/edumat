<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuardarEstudiante;
use App\Models\Competencia;
use App\Models\Prueba;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RankingController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    public function lista(Request $request){
        if($request->operacion == 'todas') {
            $ranking = Prueba::select('pruebas.puntos_totales as puntos', 'users.id as estudiante_id', DB::raw('CONCAT(users.nombres," ",users.apellidos) as estudiante'),
                DB::raw('(SELECT SUM(c.duracion_segundos) as total FROM competencias AS c WHERE c.prueba_id = pruebas.id) as segundos')
            )
                ->join('users', 'pruebas.user_id', '=', 'users.id')
                ->whereRaw('pruebas.id = (SELECT p.id FROM pruebas AS p WHERE p.user_id = users.id AND p.estado = "finalizada" ORDER BY p.id DESC LIMIT 1)')
                ->orderBy('pruebas.puntos_totales', 'DESC')
                ->orderBy('segundos', 'ASC');
        }else{
            $ranking = Competencia::select('competencias.puntaje as puntos','competencias.duracion_segundos as segundos', 'users.id as estudiante_id', DB::raw('CONCAT(users.nombres," ",users.apellidos) as estudiante'))
                ->join('pruebas', 'competencias.prueba_id', '=', 'pruebas.id')
                ->join('users', 'pruebas.user_id', '=', 'users.id')
                ->where('competencias.nivel',$request->operacion)
                ->whereRaw('competencias.id = (SELECT c.id FROM competencias AS c JOIN pruebas as p on p.id = c.prueba_id WHERE p.user_id = users.id AND c.estado = "terminada" AND c.nivel = "'.$request->operacion.'" ORDER BY c.id DESC LIMIT 1)')
                ->orderBy('competencias.puntaje', 'DESC')
                ->orderBy('competencias.duracion_segundos', 'ASC');
        }

        if($request->curso != 'todos'){
            $ranking = $ranking->where('users.curso',$request->curso);
        }

        if($request->jornada != 'todas'){
            $ranking = $ranking->where('users.jornada',$request->jornada);
        }

        $ranking = $ranking->get();

        $ranking_lista = [];
        foreach ($ranking as $item){
            $item->puntos = $item->puntos . ' Puntos / '.Prueba::strSegundos($item->segundos);
            $ranking_lista[] = $item;
        }

        $ranking = collect($ranking_lista);

        $data = [
            'ranking'=>$ranking,
            'html'=>view('ranking.lista')->with('ranking',$ranking)->render()
        ];

        return $data;
    }

}
