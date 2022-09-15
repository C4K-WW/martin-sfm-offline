$(function() {

    // $('h2').hide().slideDown();


    var $diva = $('h2');
    $diva.hide().each(function(index) {
        $(this).delay(3700 * index).fadeIn(3700);
    });

    var $div = $('div.form');
    $div.hide().each(function(index) {
        $(this).delay(3700 * index).fadeIn(3700);
    });

    var $hid = $('div.stats');

    $hid.on('click', function() {
        $(this).fadeIn(700);
    });

});