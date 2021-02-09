var estudiante_grafica = null;
$(function () {
    cargarTablaEstudiantes();

    $('#operacion').change(function () {
        generarGrafica();
    })

    $('body').on('click','.btn-grafica-usuario',function () {
        estudiante_grafica = $(this).data('estudiante');
        generarGrafica();
    })

    $('#btn-grafica-general').click(function () {
        estudiante_grafica = null;
        generarGrafica();
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
        ajax: $("#general_url").val()+"/estadisticas/lista-estudiantes",
        columns: [
            {data: 'identificacion', name: 'identificacion',"className": "text-center"},
            {data: 'nombre', name: 'nombre'},
            {data: 'curso', name: 'curso',"className": "text-center"},
            {data: 'jornada', name: 'jornada',"className": "text-center"},
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

function generarGrafica() {
    abrirBlockUiCargando('Generando gráfica');

    var params = {_token:$('#general_token').val(),operacion:$('#operacion').val(),estudiante:estudiante_grafica};
    var url = $('#general_url').val()+'/estadisticas/datos-grafica';

    $.post(url,params)
        .done(function (data) {
            if(data.datos_grafica.length){
                if(estudiante_grafica) {
                    $('#nombre-grafica').html('Gráfica de '+data.estudiante.nickname);
                    dibujarGrafica(data.datos_grafica, 'Fecha');
                }else {
                    $('#nombre-grafica').html('Gráfica general');
                    dibujarGrafica(data.datos_grafica, 'Curso');
                }
            }else{
                var html = '<p class="alert alert-info">El estudiante no ha terminado la prueba.</p>';
                $('#chart_div').html(html);
            }
            cerrarBlockUiCargando();
        })
}

function dibujarGrafica(datos_grafica,tipo) {

    var datos = [];
    /*var datos_grafica = [
     {tipo:'4A', tiempo:120, puntaje:20},
     {tipo:'4B', tiempo:600, puntaje:28},
     {tipo:'4C', tiempo:30, puntaje:20},
     ];*/

    //console.log(datos_grafica);
    datos[0] = [tipo,'Tiempo (min)', 'Puntaje'];

    var index = 1;
    $.each(datos_grafica,function (i,el) {
        datos[index++] = [el.tipo, el.tiempo/60, el.puntaje];
    })

    index--;
    //si la grafica tiene más de dos items incrementamos el ancho 30px por item
    var ancho = 300;
    if(index > 2)ancho += ((index - 2) * 30);

    var data = google.visualization.arrayToDataTable(datos);

    var options = {
        chart: {
            title: '',
            subtitle: '',
        },
        colors: ['#00bbc9', '#1ab300'],
        height:400,
        width:ancho
    };
    var chart = new google.charts.Bar(document.getElementById('chart_div'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
}