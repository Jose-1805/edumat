var key_codes = [
    8, //Borrar
    9,//TAB
    46, //suprimir
    35, //fin
    36, //inicio
    37,//izquierda
    39,//derecha
    13];//enter
$(function () {
    $('body').on('keydown','.alphanumeric',function (e) {
        var retorno = false;
        if(parseInt(key_codes.indexOf(e.keyCode))>=0) {
            retorno = true;
        }

        var regex = new RegExp(/[A-Za-z0-9]/);
        //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        var str = e.originalEvent.key;
        if (regex.test(str)) {
            retorno = true;
        }

        if($(this).hasClass('valid-restrict-field')){
            if(retorno){
                var id = $(this).attr('id');
                var data = '{"' + id + '":[""]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data);
            }else {
                var id = $(this).attr('id');
                var data = '{"' + id + '":["Sólo se permiten caracteres alfanuméricos (a-z/A-Z 0-9)"]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data);
            }
        }
        if(retorno)return true;

        e.preventDefault();
        return false;

    });
    $('body').on('keydown','.alphanumeric_space',function (e) {
        var retorno = false;
        if(parseInt(key_codes.indexOf(e.keyCode))>=0) {
            retorno = true;
        }

        var regex = new RegExp(/[A-Za-z0-9 ]/);
        //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        var str = e.originalEvent.key;
        if (regex.test(str)) {
            retorno = true;
        }

        if($(this).hasClass('valid-restrict-field')){
            if(retorno){
                var id = $(this).attr('id');
                var data = '{"' + id + '":[""]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data);
            }else {
                var id = $(this).attr('id');
                var data = '{"' + id + '":["Sólo se permiten caracteres alfanuméricos (a-z/A-Z 0-9)"]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data);
            }
        }
        if(retorno)return true;

        e.preventDefault();
        return false;

    });
    $('body').on('keydown','.alphabetical',function (e) {
        var retorno = false;
        if(parseInt(key_codes.indexOf(e.keyCode))>=0) {
            retorno = true;
        }

        var regex = new RegExp(/[A-Za-z]/);
        //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        var str = e.originalEvent.key;
        if (regex.test(str)) {
            retorno = true;
        }

        if($(this).hasClass('valid-restrict-field')){
            if(retorno){
                var id = $(this).attr('id');
                var data = '{"' + id + '":[""]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data);
            }else {
                var id = $(this).attr('id');
                var data = '{"' + id + '":["Sólo se permiten caracteres alfabéticos (a-z/A-Z)"]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data);
            }
        }
        if(retorno)return true;

        e.preventDefault();
        return false;

    });
    $('body').on('keydown','.alphabetical_space',function (e) {
        var retorno = false;
        if(parseInt(key_codes.indexOf(e.keyCode))>=0) {
            retorno = true;
        }

        var regex = new RegExp(/[A-Za-z ]/);
        //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        var str = e.originalEvent.key;
        if (regex.test(str)) {
            retorno = true;
        }

        if($(this).hasClass('valid-restrict-field')){
            if(retorno){
                var id = $(this).attr('id');
                var data = '{"' + id + '":[""]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data);
            }else {
                var id = $(this).attr('id');
                var data = '{"' + id + '":["Sólo se permiten caracteres alfabéticos (a-z/A-Z)"]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data);
            }
        }
        if(retorno)return true;

        e.preventDefault();
        return false;

    });
    $('body').on('keydown','.numeric',function (e) {
        var retorno = false;
        if(parseInt(key_codes.indexOf(e.keyCode))>=0) {
            retorno = true;
        }

        var regex = new RegExp(/[0-9]/);
        //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        var str = e.originalEvent.key;
        if (regex.test(str)) {
            retorno = true;
        }

        if($(this).hasClass('valid-restrict-field')){
            if(retorno){
                var id = $(this).attr('id');
                var data = '{"' + id + '":[""]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data);
            }else {
                var id = $(this).attr('id');
                var data = '{"' + id + '":["Sólo se permiten caracteres numéricos (0-9)"]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data);
            }
        }

        if(retorno)return retorno

        e.preventDefault();
        return false;
    });
    $('body').on('paste','.no-paste',function (e) {
        e.preventDefault();
    });
    $('body').on('keydown','.mail_sena',function (e) {
        var retorno = false;
        if(parseInt(key_codes.indexOf(e.keyCode))>=0) {
            retorno = true;
        }

        var regex = new RegExp(/[A-Za-z.@_-]/);
        //var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        var str = e.originalEvent.key;
        if (regex.test(str)) {
            retorno = true;
        }

        if($(this).hasClass('valid-restrict-field')){
            if(retorno){
                var id = $(this).attr('id');
                var data = '{"' + id + '":[""]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data);
            }else {
                var id = $(this).attr('id');
                var data = '{"' + id + '":["Dirección de correo no valida recuerde que debe ser una cuenta de correo institucional SENA"]}';
                data = JSON.parse(data);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data);
            }
        }
        if(retorno)return true;

        e.preventDefault();
        return false;
    });

    $('body').on('keyup','.mail_sena',function (e) {
        var correo = $(this).val();
        var data = correo.split('@');
        if(data.length == 2){
            if(data[1] == 'sena.edu.co'){
                var id = $(this).attr('id');
                var data_ = '{"' + id + '":[""]}';
                data_ = JSON.parse(data_);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"success",data_);
            }else{
                var id = $(this).attr('id');
                var data_ = '{"' + id + '":["Dirección de correo no valida recuerde que debe ser una cuenta de correo institucional SENA"]}';
                data_ = JSON.parse(data_);
                var parar = false;
                var id_contenedor = '';
                var element = $(this).parent().parent();
                while (!parar) {
                    if ($(element).attr('id')) {
                        parar = true;
                        id_contenedor = $(element).attr('id');
                    } else {
                        element = $(element).parent();
                    }
                }
                abrirMensajesValidacion(id_contenedor,"danger",data_);
            }
        }else {
            var id = $(this).attr('id');
            var data_ = '{"' + id + '":["Dirección de correo no valida recuerde que debe ser una cuenta de correo institucional SENA"]}';
            data_ = JSON.parse(data_);
            var parar = false;
            var id_contenedor = '';
            var element = $(this).parent().parent();
            while (!parar) {
                if ($(element).attr('id')) {
                    parar = true;
                    id_contenedor = $(element).attr('id');
                } else {
                    element = $(element).parent();
                }
            }
            abrirMensajesValidacion(id_contenedor,"danger",data_);
        }
    });
})