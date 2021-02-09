<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuardarEstudiante;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EstudianteController extends Controller
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
        return view('estudiante.index');
    }

    public function lista(Request $request){

        $users = \App\User::select(
                'users.*',
                DB::raw('CONCAT(users.nombres," ",users.apellidos) as nombre')
            )
            ->where('rol','estudiante')->get();
        $table = \Yajra\DataTables\DataTables::of($users);
        $table->editColumn('opciones',function ($r){
            return '<a class="btn btn-primary btn-editar-estudiante" data-estudiante="'.$r->id.'"><i class="fas fa-edit"></i></a>';
        })->rawColumns(['opciones']);
        return $table->make(true);
    }

    public function guardar(GuardarEstudiante $request){
        $user = new User($request->all());
        $user->rol = 'estudiante';
        $user->password = Hash::make($request->password);
        $user->save();
        return ['success'=>true];
    }

    public function datosFormEditar(Request $request){
        if($request->id){
            $estudiante = User::find($request->id);
            if($estudiante){
                return view('estudiante.form_editar')->with('estudiante',$estudiante);
            }
        }
        return 'La información enviada es incorrecta';
    }


    public function editar(GuardarEstudiante $request){
        $user = User::find($request->estudiante);
        if($user) {
            $user->fill($request->all());
            if ($request->password)
                $user->password = Hash::make($request->password);

            $user->save();
            return ['success' => true];
        }
        return response(['error'=>['La información enviada es incorrecta']],422);
    }
}
