<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuardarEstudiante;
use App\Models\Competencia;
use App\Models\Prueba;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EstadisticasController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('authDocente');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('estadisticas.index');
    }

    public function listaEstudiantes(Request $request){

        $users = \App\User::select(
                'users.*',
                DB::raw('CONCAT(users.nombres," ",users.apellidos) as nombre')
            )
            ->where('rol','estudiante')->get();
        $table = \Yajra\DataTables\DataTables::of($users);
        $table->editColumn('opciones',function ($r){
            return '<a href="#!" class="btn btn-success btn-grafica-usuario" data-estudiante="'.$r->id.'"><i class="fas fa-chart-bar"></i></a>';
        })->rawColumns(['opciones']);
        return $table->make(true);
    }

    public function datosGrafica(Request $request){
        $data_grafica = [];

        //todos los cursos, todas las operaciones
        if($request->operacion == 'todas' && !$request->estudiante) {
            $datos = Prueba::select('pruebas.puntos_totales', 'users.curso',
                DB::raw('(SELECT SUM(c.duracion_segundos) as total FROM competencias AS c WHERE c.prueba_id = pruebas.id) as segundos')
            )
                ->join('users', 'pruebas.user_id', '=', 'users.id')
                ->where('pruebas.estado', 'finalizada')
                ->whereRaw('pruebas.id = (SELECT p.id FROM pruebas AS p WHERE p.user_id = users.id AND p.estado = "finalizada" ORDER BY p.id DESC LIMIT 1)')
                ->get();

            $datos = $datos->groupBy('curso');
            foreach ($datos as $d) {
                $data_grafica[] = [
                    'tipo' => $d[0]['curso'],
                    'tiempo' => $d->avg('segundos'),
                    'puntaje' => $d->avg('puntos_totales'),
                ];
            }
        }

        //todos los cursos, una operacion
        if($request->operacion != 'todas' && !$request->estudiante) {

            $datos = Competencia::select('competencias.puntaje', 'competencias.duracion_segundos', 'users.curso')
                ->join('pruebas', 'competencias.prueba_id', '=', 'pruebas.id')
                ->join('users', 'pruebas.user_id', '=', 'users.id')
                ->where('competencias.estado', 'terminada')
                ->whereRaw('competencias.id = (SELECT c.id FROM competencias AS c JOIN pruebas as p on p.id = c.prueba_id WHERE p.user_id = users.id AND c.estado = "terminada" AND c.nivel = "'.$request->operacion.'" ORDER BY c.id DESC LIMIT 1)')
                ->get();

            $datos = $datos->groupBy('curso');
            foreach ($datos as $d) {
                $data_grafica[] = [
                    'tipo' => $d[0]['curso'],
                    'tiempo' => $d->avg('duracion_segundos'),
                    'puntaje' => $d->avg('puntaje'),
                ];
            }
        }

        //Un estudiante, todas las operaciones
        if($request->operacion == 'todas' && $request->estudiante) {
            $datos = Prueba::select('pruebas.puntos_totales', 'pruebas.created_at',
                DB::raw('(SELECT SUM(c.duracion_segundos) as total FROM competencias AS c WHERE c.prueba_id = pruebas.id) as segundos')
            )
                ->join('users', 'pruebas.user_id', '=', 'users.id')
                ->where('pruebas.estado', 'finalizada')
                ->where('users.id',$request->estudiante)
                ->get();

            foreach ($datos as $d) {
                $data_grafica[] = [
                    'tipo' => date('Y-m-d',strtotime($d->created_at)),
                    'tiempo' => $d->segundos,
                    'puntaje' => $d->puntos_totales,
                ];
            }
        }


        //Un estudiante, una operacion
        if($request->operacion != 'todas' && $request->estudiante) {

            $datos = Competencia::select('competencias.puntaje', 'competencias.duracion_segundos', 'pruebas.created_at')
                ->join('pruebas', 'competencias.prueba_id', '=', 'pruebas.id')
                ->join('users', 'pruebas.user_id', '=', 'users.id')
                ->where('competencias.estado', 'terminada')
                ->where('competencias.nivel', $request->operacion)
                //->whereRaw('competencias.id = (SELECT c.id FROM competencias AS c JOIN pruebas as p on p.id = c.prueba_id WHERE p.user_id = users.id AND c.estado = "terminada" AND c.nivel = "'.$request->operacion.'" ORDER BY c.id DESC LIMIT 1)')
                ->where('users.id',$request->estudiante)
                ->get();

            foreach ($datos as $d) {
                $data_grafica[] = [
                    'tipo' => date('Y-m-d',strtotime($d->created_at)),
                    'tiempo' => $d->duracion_segundos,
                    'puntaje' => $d->puntaje,
                ];
            }
        }

        $estudiante = null;
        if($request->estudiante)$estudiante = User::find($request->estudiante);


        return [
            'estudiante'=>$estudiante,
            'datos_grafica'=>$data_grafica
        ];
    }

}
