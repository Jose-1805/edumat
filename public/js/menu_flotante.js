$(function () {
    iniciarMenuFlotante();
})

function iniciarMenuFlotante() {
    $('#menu_flotante .item_menu_flotante').each(function (i,el) {
        setTimeout(function () {
            $(el).removeClass('d-none');
            $(el).addClass('fadeInLeftBig');
        },((i+2)*300));
    })
}