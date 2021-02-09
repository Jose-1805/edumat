{!! Form::model($estudiante,['id'=>'form_editar_estudiante']) !!}
    {!! Form::hidden('estudiante',$estudiante->id) !!}
    @include('estudiante.campos_form')
{!! Form::close() !!}