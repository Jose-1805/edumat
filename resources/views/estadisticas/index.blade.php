@extends('layouts.app')

@php(
    $operaciones = [
        'todas'=>'Todas',
        'suma'=>'Suma',
        'resta'=>'Resta',
        'multiplicación'=>'Multiplicación',
        'división'=>'División',
    ]
)

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-10 offset-md-1 margin-top-40">
                <div class="row">
                    <div class="col-12 col-md-7 col-lg-8 no-padding" style="overflow-x: auto;">
                        <div class="col-12 filtros-tabla filtros-tabla-info text-left">
                            <h3 class="white-text mayuscula">Estadísticas</h3>
                            <a class="btn btn-white right" id="btn-grafica-general" style="margin-top: -43px;" data-toggle="tooltip" data-placement="bottom" title="Gráfica general"><i class="fas fa-chart-bar text-info"></i></a>
                        </div>

                        <table class="table dataTable tabla-rediseno tabla-info table-responsive-sm table-responsive-md table-responsive-lg" data-class="tabla-info" id="tabla-estudiantes">
                            <thead>
                                <th>IDENTIFICACIÓN</th>
                                <th>NOMBRE</th>
                                <th>CURSO</th>
                                <th>JORNADA</th>
                                <th>OPCIONES</th>
                            </thead>
                        </table>
                    </div>

                    <div class="col-12 col-md-5 col-lg-4 padding-top-none">
                        <div class="card margin-top-none">
                            <div class="card-header bg-info">
                                <h5 class="card-title white-text text-center" id="nombre-grafica">Gráfica general</h5>
                            </div>
                            <div class="card-body" style="overflow-x: auto;">
                                <div class="md-form">
                                    {!! Form::label('operacion','Operación',['class'=>'active']) !!}
                                    {!! Form::select('operacion',$operaciones,null,['id'=>'operacion','class'=>'form-control']) !!}
                                </div>
                                <div id="chart_div"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
    <script src="{{asset('/js/estadisticas/estadisticas.js')}}"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(generarGrafica);
        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.

    </script>
@endsection
