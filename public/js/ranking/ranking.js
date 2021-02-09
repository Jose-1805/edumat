var ranking = null;
$(function () {
    //moverElemento(3,2);
    cargarRanking();

    $('.filtro-ranking').change(function () {
        cargarRanking();
    })
})

function moverElemento(posicion_actual,posicion_final) {
    var elemento_mover = $('.item-ranking').eq((posicion_actual-1));
    var elemento_en_posicion = $('.item-ranking').eq((posicion_final-1));
    if(elemento_mover.length && elemento_en_posicion.length) {
        $(elemento_mover).addClass('item-ranking-move');
        $(elemento_mover).addClass('z-depth-3');

        var translateY = $(elemento_en_posicion).position().top - $(elemento_mover).position().top;

        $(elemento_mover).css({
            transform: 'translateY('+translateY+'px)',
        })
        setTimeout(function () {
            $(elemento_mover).removeClass('item-ranking-move');
            $(elemento_mover).removeClass('z-depth-3');
            $(elemento_mover).css({
                transform: 'translateY(0px)',
            })
            if(posicion_final == 1){
                $(elemento_mover).parent().prepend(elemento_mover);
            }else {
                if(posicion_actual > posicion_final)
                    $(elemento_mover).parent().children('li').eq(posicion_final - 2).after(elemento_mover);
                else
                    $(elemento_mover).parent().children('li').eq(posicion_final - 1).after(elemento_mover);
            }
        }, 1250);
    }
}

function actualizarRanking() {
    var url = $('#general_url').val()+'/ranking';
    var params = {
        _token:$('#general_token').val(),
        operacion:$('#operacion').val(),
        curso:$('#curso').val(),
        jornada:$('#jornada').val()
    };
    $.post(url,params)
        .done(function (data) {
            //el resultado de ranking es diferente al actual
            var ranking_nuevo = data.ranking;
            var str_ranking_nuevo = JSON.stringify(ranking_nuevo);
            var str_ranking = JSON.stringify(ranking);

            if(str_ranking != str_ranking_nuevo) {
                //si cambia la cantidad de registros
                //se actualiza toda la lista
                console.log(ranking.length);
                console.log(ranking_nuevo.length);
                if(ranking_nuevo.length != ranking.length){
                    console.log('Actualizacion total de ranking');
                    ranking = ranking_nuevo;
                    $('#contenedor-ranking').html(data.html);
                    var tiempo = 100;

                    $('.item-ranking').each(function (i, el) {
                        setTimeout(function () {
                            $(el).removeClass('d-none');
                            $(el).addClass('fadeInUpBig');
                            setTimeout(function () {
                                $(el).removeClass('fadeInUpBig');
                            }, 1000);
                        }, tiempo);

                        tiempo += 300;
                    })
                }else{
                    //si es la misma cantidad de registros se actualizan las posiciones
                    //y la informacion
                    console.log('Actualizacion de posiciones en ranking');
                    $.each(ranking_nuevo,function (i,el) {
                        var item = $('#est_'+el.estudiante_id);

                        var posicion_actual = $('.item-ranking').index(item)+1;
                        var nueva_posicion = i+1;

                        $(item).children('.badge').eq(0).html(nueva_posicion);
                        $(item).children('.puntaje').eq(0).html(el.puntos);

                        if(posicion_actual != nueva_posicion){
                            moverElemento(posicion_actual,nueva_posicion);
                        }
                    })
                    ranking = ranking_nuevo;
                }
            }else{
                console.log('Ranking sin actualizaciones');
            }
        })
}

function cargarRanking(){
    var url = $('#general_url').val()+'/ranking';
    var params = {
        _token:$('#general_token').val(),
        operacion:$('#operacion').val(),
        curso:$('#curso').val(),
        jornada:$('#jornada').val()
    };
    abrirBlockUiCargando('Cargando ranking');
    $.post(url,params)
        .done(function (data) {
            ranking = data.ranking;
            cerrarBlockUiCargando();
            $('#contenedor-ranking').html(data.html);
            var tiempo = 100;
            $('.item-ranking').each(function (i,el) {
                setTimeout(function () {
                    $(el).removeClass('d-none');
                    $(el).addClass('fadeInUpBig');
                    setTimeout(function () {
                        $(el).removeClass('fadeInUpBig');
                    },1000);
                },tiempo);

                tiempo += 300;
            })
        })
}