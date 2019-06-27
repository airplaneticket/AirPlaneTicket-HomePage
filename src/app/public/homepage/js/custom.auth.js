jQuery(document).ready(function($) {

    ////////////////////////////////
    ///-------INITIAL---------/////
    ////////////////////////////////
    var isChecked = $('#khuhoi').is(':checked')

    $('#flight-list-back').addClass('flight-list-back');
    $('#flight-list-back .flight-pay').addClass('display-none');
    $('#flight-list-back .flight-kind').addClass('display-none');
    $('#flight-list-back .flight-detail').addClass('display-none');

    ////////////////////////////////
    ///-------FUNCTION---------/////
    ////////////////////////////////
    $('#khuhoi').on('change', function() {
        $('.timeKhuHoi').css('display', 'inline');
    })
    $('.search-btn').on('click', function() {
        $('.search-container').slideToggle();
    });

    $('#flight-list-back').on('click', function() {

        $('#flight-list-back .flight-pay').removeClass('display-none');
        $('#flight-list-back .flight-kind').removeClass('display-none');
        $('#flight-list-back .flight-detail').removeClass('display-none');

        $('#flight-list-back').addClass('flight-list-go col-8')
        $('#flight-list-go').addClass('flight-list-back col-4')

        $('#flight-list-back').removeClass('flight-list-back col-4')
        $('#flight-list-go').removeClass('flight-list-go col-8')

        $('.flight-list-back .flight-pay').addClass('display-none');
        $('.flight-list-back .flight-kind').addClass('display-none');
        $('.flight-list-back .flight-detail').addClass('display-none');
    })

    $('#flight-list-go').on('click', function() {

        $('.flight-list-back .flight-pay').removeClass('display-none');
        $('.flight-list-back .flight-kind').removeClass('display-none');
        $('.flight-list-back .flight-detail').removeClass('display-none');

        $('#flight-list-back').addClass('flight-list-go col-4')
        $('#flight-list-go').addClass('flight-list-back col-8')

        $('#flight-list-back').removeClass('flight-list-go col-8')
        $('#flight-list-go').removeClass('flight-list-back col-4')

        $('#flight-list-back .flight-pay').addClass('display-none');
        $('#flight-list-back .flight-kind').addClass('display-none');
        $('#flight-list-back .flight-detail').addClass('display-none');
        $('#flight-list-back').addClass('flight-list-back');
    })

    $('.form_date').datetimepicker({
        language: 'fr',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
    });
    $('#motchieu').on('change', function() {
        $('.timeKhuHoi').css('display', 'none');
    })

})