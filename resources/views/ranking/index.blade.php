@php
    $cursos = [
        'todos'=>'Todos',
        '1A'=>'1A',
        '1B'=>'1B',
        '1C'=>'1C',

        '2A'=>'2A',
        '2B'=>'2B',
        '2C'=>'2C',

        '3A'=>'3A',
        '3B'=>'3B',
        '3C'=>'3C',

        '4A'=>'4A',
        '4B'=>'4B',
        '4C'=>'4C',

        '5A'=>'5A',
        '5B'=>'5B',
        '5C'=>'5C',
    ];
    $jornadas = [
        'todas'=>'Todas',
        'mañana'=>'Mañana',
        'tarde'=>'Tarde'
    ];
    $operaciones = [
        'todas'=>'Todas',
        'suma'=>'Suma',
        'resta'=>'Resta',
        'multiplicación'=>'Multiplicación',
        'división'=>'División'
    ];
@endphp
<div class="row">
    <div class="col-12 filtros-tabla filtros-tabla-success">

        <h3 class="white-text mayuscula margin-bottom-30">Ranking</h3>

        <div class="row padding-bottom-20">
            <div class="col-12 col-md-3">
                {!! Form::label('operacion','OPERACIÓN',['class'=>'active text-white font-weight-500']) !!}
                {!! Form::select('operacion',$operaciones,null,['id'=>'operacion','class'=>'form-control filtro-ranking']) !!}
            </div>
            <div class="col-12 col-md-3">
                {!! Form::label('curso','CURSO',['class'=>'active text-white font-weight-500']) !!}
                {!! Form::select('curso',$cursos,null,['id'=>'curso','class'=>'form-control filtro-ranking']) !!}
            </div>
            <div class="col-12 col-md-3">
                {!! Form::label('jornada','JORNADA',['class'=>'active text-white font-weight-500']) !!}
                {!! Form::select('jornada',$jornadas,null,['id'=>'jornada','class'=>'form-control filtro-ranking']) !!}
            </div>
        </div>
    </div>

    <div id="contenedor-ranking" class="col-12 no-padding">

    </div>
</div>