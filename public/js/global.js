/**
 *
 * BLOCK UI PARAMS
 */
$.blockUI.defaults = {
    // message displayed when blocking (use null for no message)
    message:  '<h1>Please wait...</h1>',

    title: null,        // title string; only used when theme == true
    draggable: true,    // only used when theme == true (requires jquery-ui.js to be loaded)

    theme: false, // set to true to use with jQuery UI themes

    // styles for the message when blocking; if you wish to disable
    // these and use an external stylesheet then do this in your code:
    // $.blockUI.defaults.css = {};
    css: {
        padding:        0,
        margin:         0,
        width:          '30%',
        top:            '40%',
        left:           '35%',
        textAlign:      'center',
        color:          '#000',
        border:         'none',//'3px solid #aaa',
        backgroundColor:'transparent',//'#fff',
        cursor:         'wait'
    },

    // minimal style set used when themes are used
    themedCSS: {
        width:  '30%',
        top:    '40%',
        left:   '35%'
    },

    // styles for the overlay
    overlayCSS:  {
        backgroundColor: '#000',
        opacity:         0.75,
        cursor:          'wait'
    },

    // style to replace wait cursor before unblocking to correct issue
    // of lingering wait cursor
    cursorReset: 'default',

    // styles applied when using $.growlUI
    growlCSS: {
        width:    '350px',
        top:      '10px',
        left:     '',
        right:    '10px',
        border:   'none',
        padding:  '5px',
        opacity:   0.6,
        cursor:    null,
        color:    '#fff',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius':    '10px'
    },

    // IE issues: 'about:blank' fails on HTTPS and javascript:false is s-l-o-w
    // (hat tip to Jorge H. N. de Vasconcelos)
    iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank',

    // force usage of iframe in non-IE browsers (handy for blocking applets)
    forceIframe: false,

    // z-index for the blocking overlay
    baseZ: 10000,

    // set these to true to have the message automatically centered
    centerX: true, // <-- only effects element blocking (page block controlled via css above)
    centerY: true,

    // allow body element to be stetched in ie6; this makes blocking look better
    // on "short" pages.  disable if you wish to prevent changes to the body height
    allowBodyStretch: true,

    // enable if you want key and mouse events to be disabled for content that is blocked
    bindEvents: true,

    // be default blockUI will supress tab navigation from leaving blocking content
    // (if bindEvents is true)
    constrainTabKey: true,

    // fadeIn time in millis; set to 0 to disable fadeIn on block
    fadeIn:  200,

    // fadeOut time in millis; set to 0 to disable fadeOut on unblock
    fadeOut:  400,

    // time in millis to wait before auto-unblocking; set to 0 to disable auto-unblock
    timeout: 0,

    // disable if you don't want to show the overlay
    showOverlay: true,

    // if true, focus will be placed in the first available input field when
    // page blocking
    focusInput: true,

    // suppresses the use of overlay styles on FF/Linux (due to performance issues with opacity)
    // no longer needed in 2012
    // applyPlatformOpacityRules: true,

    // callback method invoked when fadeIn has completed and blocking message is visible
    onBlock: null,

    // callback method invoked when unblocking has completed; the callback is
    // passed the element that has been unblocked (which is the window object for page
    // blocks) and the options that were passed to the unblock call:
    //   onUnblock(element, options)
    onUnblock: null,

    // don't ask; if you really must know: http://groups.google.com/group/jquery-en/browse_thread/thread/36640a8730503595/2f6a79a77a78e493#2f6a79a77a78e493
    quirksmodeOffsetHack: 4,

    // class name of the message block
    blockMsgClass: 'blockMsg',

    // if it is already blocked, then ignore it (don't unblock and reblock)
    ignoreIfBlocked: false
};

var idioma_tablas = {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
};

$(function () {
    //evita que se cierren las alertas como lo hace bootstrap (quitando la clase de la alert) y oculta con la clase d-none la alerta
    $('body').on('click','.alert .close',function () {
        $(this).parent().addClass('d-none');
    })

    $('body').on('focus','.input-validado *',function () {
        var parent = $(this).parent();
        var completo = false;
        while (!completo){
            if($(parent).hasClass('input-validado')){
                completo = true;
                $(parent).removeClass('input-validado');
                $(parent).removeClass('input-validado-danger');
                $(parent).find('.contenedor-mensaje-validacion').remove();
            }else{
                parent = $(parent).parent();
            }
        }
    })

    $('body').on('focusout','.input-validado *',function () {
        var parent = $(this).parent();
        var completo = false;
        while (!completo){
            if($(parent).hasClass('input-validado')){
                completo = true;
                $(parent).removeClass('input-validado');
                $(parent).removeClass('input-validado-danger');
                $(parent).find('.contenedor-mensaje-validacion').remove();
            }else{
                parent = $(parent).parent();
            }
        }
    })
})

/**
 * Funcion para mostrar las alertas del sistema
 * @param id_contenedor => contenedor de las alertas
 * @param tipo => info - success - warning - danger
 * @param data => array con la información
 * @param duracion => duracion en segundos
 * @param id_contenedor_scroll => id del contenedor que posee el scroll que debe quedar en top = 0
 */
function abrirAlerta(id_contenedor,tipo, data, duracion = null,id_contenedor_scroll = false){
    var html = "";
    $.each(data, function(key,value){
        html += "• "+value+"<br/>";
    });
    $("#"+id_contenedor+" .alert").addClass("d-none");
    $("#"+id_contenedor+" .alert-"+tipo+" .mensaje").html(html);
    $("#"+id_contenedor+" .alert-"+tipo).removeClass("d-none");

    if(duracion != null && $.isNumeric(duracion)){
        setTimeout(function () {
            $("#"+id_contenedor+" .alert-"+tipo).addClass("d-none");
        },(duracion*1000));
    }

    if(id_contenedor_scroll != false) {
        //$("#" + id_contenedor_scroll).stop().animate({scrollTop: 0}, '5000', 'swing');
        //$("#" + id_contenedor_scroll).scrollTop(0);
        $('html, body').stop().animate({scrollTop: 0}, '500', 'swing');
    }
}

/**
 * Funcion para mostrar las alertas del sistema
 * @param id_contenedor => contenedor de las alertas
 * @param tipo => info - success - warning - danger
 * @param data => array con la información
 * @param duracion => duracion en segundos
 * @param id_contenedor_scroll => id del contenedor que posee el scroll que debe quedar en top = 0
 */
function abrirMensajesValidacion(id_contenedor,tipo, data){
    $.each(data, function(key,value){
        var html = "";
        $.each(value,function (key_,value_) {
            if(value_)
                html += "• "+value_+"<br/>";
        })
        var parent = $('#'+id_contenedor).find('#'+key).parent();
        html = "<div class='contenedor-mensaje-validacion font-small text-"+tipo+"' style='margin-top: -10px;'>"+html+"</div>";
        $(parent).find('.contenedor-mensaje-validacion').remove();
        $(parent).append(html)
        $(parent).addClass('input-validado');
        $(parent).removeClass('input-validado-success');
        $(parent).removeClass('input-validado-danger');
        $(parent).addClass('input-validado-'+tipo);
    });

    //$('html, body').stop().animate({scrollTop: 0}, '500', 'swing');
}

/**
 * Abre dialog de bloqueo de pantalla
 * Debe incluir framework de diseñño MATERIALIZECSS o las clases de color contenidas en él
 *
 * @param mensaje => mensaje a mostrar, si se pasa el valor undefined muestra el mensaje por defecto
 * @param load => si debe mostrar icono de carga o no
 */
function abrirBlockUiCargando(mensaje = "Cargando",load = true) {
    //var html = '<img src="'+$('#general_url').val()+'/imagenes/logos/logoarchinet.png" style="width: 100px !important;" /><h4 class="white-text">'+mensaje;
    var html = '<h4 class="white-text">'+mensaje;
    if(load)
        html += ' <i class="fas fa-spin fa-spinner white-text"></i>';
    html += '</h4>';
    $.blockUI({ message: html });
}

function cerrarBlockUiCargando() {
    $.unblockUI();
}