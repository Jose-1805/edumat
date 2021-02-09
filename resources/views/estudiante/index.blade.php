@extends('layouts.app')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-10 offset-md-1 margin-top-40">

                <div class="row">
                    <div class="col-12 filtros-tabla filtros-tabla-primary text-right">
                        <h3 class="left white-text mayuscula">Lista de estudiantes</h3>
                        <a class="btn btn-white btn-sm" data-toggle="modal" data-target="#modal_nuevo_estudiante">
                            <i class="fa fa-plus-circle margin-right-10 text-primary font-medium"></i>
                            <span class="text-primary">Nuevo</span>
                        </a>
                    </div>

                    <table class="col-12 no-padding table dataTable tabla-rediseno tabla-primary table-responsive-sm table-responsive-md table-responsive-lg" data-class="tabla-primary" id="tabla-estudiantes">
                        <thead>
                            <th>IDENTIFICACIÓN</th>
                            <th>NOMBRE</th>
                            <th>NICKNAME</th>
                            <th>GENERO</th>
                            <th>CURSO</th>
                            <th>JORNADA</th>
                            <th>ESTADO</th>
                            <th>OPCIONES</th>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_nuevo_estudiante" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nuevo estudiante</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {!! Form::open(['id'=>'form_nuevo_estudiante']) !!}
                        @include('estudiante.campos_form')
                    {!! Form::close() !!}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-white" data-dismiss="modal"><span class="text-primary">Cerrar</span></button>
                    <button type="button" class="btn btn-primary" id="btn-guardar-estudiante">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_editar_estudiante" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar estudiante</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="contenedor-form-editar-estudiante">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-white" data-dismiss="modal"><span class="text-primary">Cerrar</span></button>
                    <button type="button" class="btn btn-primary" id="btn-guardar-editar-estudiante">Guardar</button>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script src="{{asset('/js/estudiante/estudiante.js')}}"></script>
@endsection
