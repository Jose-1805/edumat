@php
    if(!isset($estudiante))$estudiante = new \App\User();
    $jornadas = [''=>'Seleccione','mañana'=>'Mañana','tarde'=>'Tarde'];
    $cursos = [
        ''=>'Seleccione',
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
@endphp
<div class="row">
    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('identificacion','Identificación (*)',['class'=>'active']) !!}
            {!! Form::text('identificacion',null,['id'=>'identificacion','class'=>'form-control','placeholder'=>'ej: 1061737122','maxlength'=>'15']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('nombres','Nombres (*)',['class'=>'active']) !!}
            {!! Form::text('nombres',null,['id'=>'nombres','class'=>'form-control','placeholder'=>'ej: Pepito','maxlength'=>'50']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('apellidos','Apellidos (*)',['class'=>'active']) !!}
            {!! Form::text('apellidos',null,['id'=>'apellidos','class'=>'form-control','placeholder'=>'ej: Perez','maxlength'=>'50']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('nickname','Nickname (*)',['class'=>'active']) !!}
            {!! Form::text('nickname',null,['id'=>'nickname','class'=>'form-control','placeholder'=>'ej: Pepito7122','maxlength'=>'50']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('genero','Genero (*)',['class'=>'active']) !!}
            {!! Form::select('genero',[''=>'Seleccione','masculino'=>'Masculino','femenino'=>'Femenino'],null,['id'=>'genero','class'=>'form-control']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('curso','Curso (*)',['class'=>'active']) !!}
            {!! Form::select('curso',$cursos,null,['id'=>'curso','class'=>'form-control']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('jornada','Jornada (*)',['class'=>'active']) !!}
            {!! Form::select('jornada',$jornadas,null,['id'=>'jornada','class'=>'form-control']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
        <div class="md-form">
            {!! Form::label('estado','Estado (*)',['class'=>'active']) !!}
            {!! Form::select('estado',[''=>'Seleccione','activo'=>'Activo','inactivo'=>'Inactivo'],null,['id'=>'estado','class'=>'form-control']) !!}
        </div>
    </div>
    <h5 class="col-12 border-bottom margin-top-30 mayuscula">Seguridad</h5>

    <div class="col-12 col-md-6">
        <div class="md-form">
            {!! Form::label('password','Contraseña (*)') !!}
            {!! Form::password('password',['id'=>'password','class'=>'form-control','maxlength'=>'30']) !!}
        </div>
    </div>

    <div class="col-12 col-md-6">
        <div class="md-form">
            {!! Form::label('password_confirmation','Confirmar contraseña (*)') !!}
            {!! Form::password('password_confirmation',['id'=>'password_confirmation','class'=>'form-control','maxlength'=>'30']) !!}
        </div>
    </div>
</div>