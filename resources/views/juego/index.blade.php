@extends('layouts.app')

@section('css')
    <link href="{{asset('css/juego.css')}}" rel="stylesheet">
    <link href="{{asset('css/starability-all.min.css')}}" rel="stylesheet">
@endsection

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div id="contenedor_juego" class="col-12 col-md-10 offset-md-1 margin-top-40 margin-bottom-30 border border-warning no-padding">
                <h4 id="titulo_modulo" class="mayuscula padding-10 bg-warning white-text font-weight-500 text-center">EDUMAT: MÓDULO DE {{$competencia->nivel}}<span class="right"><span id="operacion_actual_head"></span>/{{config('params.operaciones_por_modulo')}}</span></h4>
                <div class="row">
                    @if($competencia->nivel == 'división') @php($class_col = 'col-12')
                    @else @php($class_col = 'col-12 col-md-6 offset-md-3')
                    @endif
                    <div class="{{$class_col}}">
                        <div class="row" id="contenedor-operacion">
                            @if($competencia->nivel == 'suma')
                                @include('juego.operaciones.suma')
                            @elseif($competencia->nivel == 'resta')
                                @include('juego.operaciones.resta')
                            @elseif($competencia->nivel == 'multiplicación')
                                @include('juego.operaciones.multiplicacion')
                            @elseif($competencia->nivel == 'división')
                                @include('juego.operaciones.division')
                            @endif
                        </div>
                        <div class="row margin-top-30 margin-bottom-30">
                            @if($competencia->nivel == 'división')
                                <div class="col-12">
                                    <a href="#!" class="btn btn-primary btn-lg btn-block font-x-large" id="btn-comprobar">Pasar a comprobar <i class="fas fa-arrow-right font-x-large align-middle margin-left-10" style="line-height: 1px;"></i></a>
                                </div>
                                <div class="col-12">
                                    <a href="#!" class="d-none btn btn-primary btn-lg btn-block font-x-large" id="btn-operacion"><i class="fas fa-arrow-left font-x-large align-middle margin-right-10" style="line-height: 1px;"></i>Regresar a la operación</a>
                                </div>
                            @endif
                            <div class="col-12">
                                <a href="#!" class="@if($competencia->nivel == 'división') d-none @endif btn btn-success btn-lg btn-block font-x-large" id="btn-verificar">Verificar <i class="fas fa-check-circle font-x-large align-middle margin-left-10" style="line-height: 1px;"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('juego.modales')
@endsection

@section('js')
    <script src="{{ asset('js/sortable.js') }}"></script>
    <script src="{{asset('js/juego/juego.js')}}"></script>
    <script>
        $(function () {
            inicializarOperacion('{{$competencia->nivel}}',{{($competencia->aciertos+$competencia->desaciertos+1)}});
        })
    </script>
@endsection