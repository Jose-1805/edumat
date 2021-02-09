$(function () {
    cargarTablaEstudiantes();
    
    $('#btn-guardar-estudiante').click(function () {
        guardarEstudiante();
    })

    $('#btn-guardar-editar-estudiante').click(function () {
        editarEstudiante();
    })

    $('body').on('click','.btn-editar-estudiante',function () {
        var id = $(this).data('estudiante');
        var params = {_token:$('#general_token').val(),id:id};
        var url = $('#general_url').val()+'/estudiante/datos-form-editar';
        abrirBlockUiCargando('Cargando ');
        $.post(url,params)
            .done(function (data) {
                cerrarBlockUiCargando();
                $('#contenedor-form-editar-estudiante').html(data);
                $('#modal_editar_estudiante').modal('show');
            })
    })
})

function cargarTablaEstudiantes(){
    var tabla_estudiantes = $('#tabla-estudiantes').dataTable({ "destroy": true });
    tabla_estudiantes.fnDestroy();
    $.fn.dataTable.ext.errMode = 'none';
    $('#tabla-estudiantes').on('error.dt', function(e, settings, techNote, message) {
        console.log( 'DATATABLES ERROR: ', message);
    })

    $('#tabla-estudiantes').on( 'init.dt', function ( e, settings ) {
        $(this).parent().addClass($(this).data('class')+'-wrapper');
    } );

    tabla_estudiantes = $('#tabla-estudiantes').DataTable({
        lenguage: idioma_tablas,
        processing: true,
        serverSide: true,
        ajax: $("#general_url").val()+"/estudiante/lista",
        columns: [
            {data: 'identificacion', name: 'identificacion',"className": "text-center"},
            {data: 'nombre', name: 'nombre'},
            {data: 'nickname', name: 'nickname',"className": "text-center"},
            {data: 'genero', name: 'genero'},
            {data: 'curso', name: 'curso',"className": "text-center"},
            {data: 'jornada', name: 'jornada',"className": "text-center"},
            {data: 'estado', name: 'estado',"className": "text-center"},
            {data: 'opciones', name: 'opciones',orderable: false, searchable: false,"className": "text-center"},
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            $(nRow).attr('id','row_'+aData.id);
            /*$(nRow).addClass('animated');
            $(nRow).css({'opacity':'0'});
            setTimeout(function () {
                $(nRow).css({'opacity':'1'});
                $(nRow).addClass('fadeInUpBig');
            },iDisplayIndex*250);*/
            $(nRow).children('td').addClass('padding-top-20');
            $(nRow).children('td').addClass('padding-bottom-20');
            $(nRow).children('td').addClass('mayuscula');
            setTimeout(function () {
            },300);
        },
    });
}

function guardarEstudiante() {
    var params = $('#form_nuevo_estudiante').serialize();
    var url = $('#general_url').val()+'/estudiante/guardar';
    
    abrirBlockUiCargando();
    
    $.post(url,params)
        .done(function (data) {
            cerrarBlockUiCargando();
            if(data.success){
                $('#form_nuevo_estudiante')[0].reset();
                $('#modal_nuevo_estudiante').modal('hide');
                cerrarBlockUiCargando();
                cargarTablaEstudiantes();
            }
        })
        .fail(function (jqXHR,stste,error) {
            cerrarBlockUiCargando();
            abrirMensajesValidacion('form_nuevo_estudiante','danger',JSON.parse(jqXHR.responseText).errors);
        })
}

function editarEstudiante() {
    var params = $('#form_editar_estudiante').serialize();
    var url = $('#general_url').val()+'/estudiante/editar';

    abrirBlockUiCargando();

    $.post(url,params)
        .done(function (data) {
            cerrarBlockUiCargando();
            if(data.success){
                $('#modal_editar_estudiante').modal('hide');
                cerrarBlockUiCargando();
                cargarTablaEstudiantes();
            }
        })
        .fail(function (jqXHR,stste,error) {
            cerrarBlockUiCargando();
            abrirMensajesValidacion('form_editar_estudiante','danger',JSON.parse(jqXHR.responseText).errors);
        })
}