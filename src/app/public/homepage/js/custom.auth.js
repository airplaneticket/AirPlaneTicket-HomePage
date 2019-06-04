jQuery(document).ready(function($){
    var isChecked = $('#khuhoi').is(':checked')
    $('#khuhoi').on('change', function() {
        $('.timeKhuHoi').css('display','inline');
    })

    $('.search-btn').on('click', function () {
        $('.search-container').slideToggle();
    });

    //Demo airticket
    $('#item1 .flight-detail-btn').on('click', function () {
        $('#item1 .flight-detail-info').toggle();
        $('#item1 .flight-detail-btn strong').toggleClass('flight-detail-btn-active');
    });

    
    $('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0
    });
    $('#motchieu').on('change', function() {
        $('.timeKhuHoi').css('display','none');
    })
})


