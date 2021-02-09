var params_sortable = {
    group: "name",
    sort: false,
    animation:500,
    ghostClass: "d-none",
    onAdd: function (evt) {
        var elemento_inicio = $(evt.from);
        var elemento_destino = $(evt.to);
        var index = evt.newIndex;
        elemento_inicio.append($(elemento_destino).children());
        elemento_destino.append($(elemento_inicio).children().eq(index));
    },
    onEnd: function (evt) {'{{$prueba->nivel_actual}}'
        $(evt.item).addClass('bounceIn');
        setTimeout(function () {
            $(evt.item).removeClass('bounceIn');
        },1000);
        var item_contenedor = evt.from;
        if($(item_contenedor).hasClass('item-comprobar-resultado')){
            $('.contenedor-items-operacion').eq(0).children('.bloqueador-opciones').addClass('d-none');
        }
        if($(item_contenedor).hasClass('item-operacion')){
            $('.contenedor-items-comprobar-resultado').eq(0).children('.bloqueador-opciones').addClass('d-none');
        }
    },
    onStart: function (evt) {
        var item_contenedor = evt.from;
        if($(item_contenedor).hasClass('item-comprobar-resultado')){
            $('.contenedor-items-operacion').eq(0).children('.bloqueador-opciones').removeClass('d-none');
        }

        if($(item_contenedor).hasClass('item-operacion')){
            $('.contenedor-items-comprobar-resultado').eq(0).children('.bloqueador-opciones').removeClass('d-none');
        }
    }
};
var hora_inicio = null;
var hora_fin = null;
$(function () {
    //se asigna la animacion para que siempre se muevan los elementos
    var tiempo = 200;
    $('.elemento-operacion').each(function (i,el) {
        setTimeout(function () {
            $(el).addClass('animacion_elemento_operacion');
        },tiempo);
        tiempo += 200;
    })

    $('#btn-iniciar-operacion').click(function () {
        $('#modal_inicio_prueba').modal('hide');
        hora_inicio = new Date();
    })

    $('#btn-verificar').click(function () {
        hora_fin = new Date();
        validarOperacion();
    })
    
    $('#btn-comprobar').click(function () {
        $('#contenedor-global-operacion').addClass('d-none');
        $('#contenedor-global-comprobacion').removeClass('d-none');
        $(this).addClass('d-none');
        $('#btn-verificar').removeClass('d-none');
        $('#btn-operacion').removeClass('d-none');
    })

    $('#btn-operacion').click(function () {
        $('#contenedor-global-comprobacion').addClass('d-none');
        $('#contenedor-global-operacion').removeClass('d-none');
        $(this).addClass('d-none');
        $('#btn-verificar').addClass('d-none');
        $('#btn-comprobar').removeClass('d-none');
    })
})

function generarOperacion(operacion) {
    if(operacion == 'suma') {
        generarSuma();
    }else if(operacion == 'resta') {
        generarResta();
    }else if(operacion == 'multiplicación') {
        generarMultiplicacion();
    }else if(operacion == 'división'){
        generarDivision();
    }
}

function inicializarOperacion(operacion,numero) {
    $('#operacion_actual_head').html(numero);
    if(operacion == 'suma') {
        inicializarSuma();
    }else if(operacion == 'resta') {
        inicializarResta();
    }else if(operacion == 'multiplicación') {
        inicializarMultiplicacion();
    }else if(operacion == 'división'){
        inicializarDivision();
        $('#contenedor-global-comprobacion').addClass('d-none');
        $('#contenedor-global-operacion').removeClass('d-none');
        $('#btn-operacion').addClass('d-none');
        $('#btn-verificar').addClass('d-none');
        $('#btn-comprobar').removeClass('d-none');
    }



    generarOperacion(operacion);
    $('#numero_operacion').text('#'+numero);
    $('#modulo_actual').text(operacion);
    $('#modal_inicio_prueba').modal('show');
}

/**
 * SE GENERAN LOS DATOS DE LAS OPERACIONES
 * Y SE IMPRIMEN EN LA PANTALLA
 */

function generarSuma() {
    $('.elemento-operacion').text('');
    $('.elemento-operacion').attr('data-posiciones','-');
    //genera el primer sumando
    var primer_sumando = parseInt(Math.random() * 99 + 1);
    //genera el segundo sumando
    var segundo_sumando = parseInt(Math.random() * 99 + 1);

    var casillas_llenas = [];

    //ubica el primer sumando
    var posicion = parseInt(Math.random() * 6 + 1);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text(primer_sumando);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','3,1');
    casillas_llenas[posicion] = true;

    //ubica el segundo sumando
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text(segundo_sumando);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','3,1');
    casillas_llenas[posicion] = true;

    //ubica el resultado
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text(primer_sumando + segundo_sumando);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','5');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text('=');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','4');
    casillas_llenas[posicion] = true;

    //ubica el signo mas
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text('+');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','2');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').addClass('bg-warning');
}

function generarResta() {
    $('.elemento-operacion').text('');
    $('.elemento-operacion').attr('data-posiciones','-');
    //genera el primer sumando
    var minuendo = parseInt(Math.random() * 99 + 1);
    //no puede ser un número par
    //porque se pueden generar nùmeros con posiciones ambiguas
    //en un caso como el siguiente
    // 10 - 5 = 5 -> al tener dos veces el 5 el estudiante podría poner al revez los datos
    if(minuendo % 2 == 0) {
        if(minuendo == 2)minuendo = 3;
        else minuendo -= 1
    }
    //genera el segundo sumando
    var sustraendo = parseInt(Math.random() * (minuendo-1) + 1);

    var casillas_llenas = [];

    //ubica el primer sumando
    var posicion = parseInt(Math.random() * 6 + 1);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-success');
    $('#elemento_operacion_'+posicion+' p').text(minuendo);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','1');
    casillas_llenas[posicion] = true;

    //ubica el segundo sumando
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-success');
    $('#elemento_operacion_'+posicion+' p').text(sustraendo);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','3,5');
    casillas_llenas[posicion] = true;

    //ubica el resultado
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-success');
    $('#elemento_operacion_'+posicion+' p').text(minuendo - sustraendo);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','3,5');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-success');
    $('#elemento_operacion_'+posicion+' p').text('=');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','4');
    casillas_llenas[posicion] = true;

    //ubica el signo menos
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-success');
    $('#elemento_operacion_'+posicion+' p').text('-');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','2');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-success');
    $('#elemento_operacion_'+posicion+' p').addClass('bg-success');
}

function generarMultiplicacion() {
    $('.elemento-operacion').text('');
    $('.elemento-operacion').attr('data-posiciones','-');
    //genera el primer sumando
    var primer_operador = parseInt(Math.random() * 20 + 1);
    //genera el segundo sumando
    var segundo_operador = parseInt(Math.random() * 20 + 1);

    var casillas_llenas = [];

    //ubica el primer sumando
    var posicion = parseInt(Math.random() * 6 + 1);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-info');
    $('#elemento_operacion_'+posicion+' p').text(primer_operador);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','3,1');
    casillas_llenas[posicion] = true;

    //ubica el segundo sumando
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-info');
    $('#elemento_operacion_'+posicion+' p').text(segundo_operador);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','3,1');
    casillas_llenas[posicion] = true;

    //ubica el resultado
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-info');
    $('#elemento_operacion_'+posicion+' p').text(primer_operador * segundo_operador);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','5');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-info');
    $('#elemento_operacion_'+posicion+' p').text('=');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','4');
    casillas_llenas[posicion] = true;

    //ubica el signo multiplicación
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-info');
    $('#elemento_operacion_'+posicion+' p').text('X');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','2');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(1,6,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-info');
    $('#elemento_operacion_'+posicion+' p').addClass('bg-info');
}

function generarDivision() {

    var elemento_division = [];
    var encontrado = false;
    var dividendo = 2;
    while (!encontrado){
        dividendo = posicionLibre(1,9,[]);
        if(dividendo != 1 && dividendo != 3 && dividendo != 7)encontrado = true;
    }
    //dividendo
    elemento_division[0] = dividendo
    ;
    //se busca un divisor
    var divisor = 2;
    var encontrado = false;
    while (!encontrado){
        divisor = posicionLibre(1,9,[]);
        if(divisor != 1 && dividendo%divisor == 0)encontrado = true;
    }
    //divisor
    elemento_division[1] = divisor;
    elemento_division[2] = '-';
    elemento_division[3] = dividendo;
    //cociente
    elemento_division[4] = dividendo/divisor;
    //resto
    elemento_division[5] = 0;

    var casillas_llenas = [];

    $('.elemento-operacion').text('');
    $('.elemento-operacion').attr('data-posiciones','-');
    $('.elemento-operacion').addClass('bg-warning');

    $.each(elemento_division,function(i,el){
        if(i == 0) posicion = 1;
        else if(i == 1) posicion = 2;
        else posicion = posicionLibre(3, 7, casillas_llenas);

        $('#elemento_operacion_' + posicion + ' p').removeClass('bg-warning');
        $('#elemento_operacion_' + posicion + ' p').text(el);
        $('#elemento_operacion_' + posicion + ' p').attr('data-posiciones', i);
        casillas_llenas[posicion] = true;
    });

    var primer_operador = elemento_division[1];
    //genera el segundo sumando
    var segundo_operador = elemento_division[4];

    var casillas_llenas = [];



    //ubica el resultado
    posicion = 13;
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text(primer_operador * segundo_operador);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','12');
    casillas_llenas[posicion] = true;

    //ubica el primer sumando
    var posicion = posicionLibre(8,13,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text(primer_operador);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','8,10');
    casillas_llenas[posicion] = true;

    //ubica el segundo sumando
    posicion = posicionLibre(8,13,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text(segundo_operador);
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','8,10');
    casillas_llenas[posicion] = true;

    //ubica el signo de igual
    posicion = posicionLibre(8,13,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text('=');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','11');
    casillas_llenas[posicion] = true;

    //ubica el signo multiplicación
    posicion = posicionLibre(8,13,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').text('X');
    $('#elemento_operacion_'+posicion+' p').attr('data-posiciones','9');
    casillas_llenas[posicion] = true;

    //rellena el color del item vacio
    posicion = posicionLibre(8,13,casillas_llenas);
    $('#elemento_operacion_'+posicion+' p').removeClass('bg-warning');
    $('#elemento_operacion_'+posicion+' p').addClass('bg-warning');

}


/**
 * INICIALIZACION DE LOS ELEMENTOS QUE SE ARRASTRAN
 */
function inicializarSuma() {

    Sortable.create(document.getElementById('elemento_operacion_1'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_2'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_3'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_4'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_5'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_6'), params_sortable);
}

function inicializarResta() {
    $('#contenedor_juego').addClass('border-success');
    $('#titulo_modulo').addClass('bg-success');


    Sortable.create(document.getElementById('elemento_operacion_1'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_2'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_3'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_4'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_5'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_6'), params_sortable);
}

function inicializarMultiplicacion() {
    $('#contenedor_juego').addClass('border-info');
    $('#titulo_modulo').addClass('bg-info');


    Sortable.create(document.getElementById('elemento_operacion_1'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_2'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_3'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_4'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_5'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_6'), params_sortable);
}

function inicializarDivision() {
    $('#contenedor_juego').addClass('border-warning');
    $('#titulo_modulo').addClass('bg-warning');


    //Sortable.create(document.getElementById('elemento_operacion_1'), params_sortable);

    //Sortable.create(document.getElementById('elemento_operacion_2'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_3'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_4'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_5'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_6'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_7'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_8'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_9'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_10'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_11'), params_sortable);

    Sortable.create(document.getElementById('elemento_operacion_12'), params_sortable);

    //Sortable.create(document.getElementById('elemento_operacion_13'), params_sortable);
}

function posicionLibre(min,max,datos) {
    var posicionado = false;
    var posicion = Math.round(Math.random() * (max - min) + min);
    while (!posicionado){
        if(datos[posicion] == undefined)
            posicionado = true;
        else
            posicion = Math.round(Math.random() * (max - min) + min);
    }
    return posicion;
}


/**
 * Valida si se han posicionado correctamente los elementos de la operacion
 */
function validarOperacion() {
    var operacion_correcta = true;
    //recorre todos los elementos de la operación
    $('.elemento-operacion').each(function (index,el) {
        //posiciones donde puede estar el elemento
        var posiciones = $(el).attr('data-posiciones');
        if(posiciones){
            //si no es el elemento vacio
            if(posiciones != '-'){
                posiciones = posiciones.split(',');
                var bien_ubicado = false;

                //recorre todas las posiciones donde puede estar el elemento
                //y verifica si está bien ubicado
                for(i = 0;i < posiciones.length;i++){
                    if(posiciones[i] == index)bien_ubicado = true;
                }

                if(!bien_ubicado){
                    operacion_correcta = false;
                }
            }
        }else{
            operacion_correcta = false;
        }

        /*if(!operacion_correcta){
            console.log(el);
            alert('error en '+index)
        }*/
    })

    /*if(operacion_correcta)alert('Correcto');
    else alert('incorrecto');
    return operacion_correcta;*/

    var segundos = Math.floor((hora_fin.getTime()-hora_inicio.getTime())/1000);

    var params = {_token:$('#general_token').val(),segundos:segundos,acierto:operacion_correcta};
    var url = $('#general_url').val()+'/juego/guardar-dato-competencia';
    abrirBlockUiCargando('Verificando ');
    $.post(url,params)
        .done(function (data) {
            if(data.success){
                cerrarBlockUiCargando();
                if(operacion_correcta){
                    $('#modal_operacion_correcta').modal('show');
                }else{
                    $('#modal_operacion_incorrecta').modal('show');
                }

                var competencia = data.competencia;
                var prueba = data.prueba;

                $('body').on('click','.btn-continuar',function () {
                    if(competencia.estado == 'terminada'){
                        if(prueba.estado == 'finalizada'){
                            $('#contenedor-botones-finalizar-competencia').addClass('d-none');
                            $('#contenedor-botones-finalizar-prueba').removeClass('d-none');
                            $('#texto-prueba-finalizada').removeClass('d-none');
                        }
                        $('#modal_fin_prueba').modal('show');
                        dibujarEstrellasAciertos(competencia.aciertos);
                    }else{
                        $(this).parent().parent().parent().parent().modal('hide');
                        inicializarOperacion(competencia.nivel,(competencia.aciertos+competencia.desaciertos+1));
                    }
                })
            }
        })
}

function dibujarEstrellasAciertos(aciertos) {
    var tiempo = 100;
    $('.estrella_acierto').each(function (i,el) {
        if(i < aciertos){
            setTimeout(function () {
                $(el).prop('checked','checked');
            },tiempo);
            tiempo += 750;
        }
    })
}