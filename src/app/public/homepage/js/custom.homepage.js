jQuery(document).ready(function($) {
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

    $('#motchieu').attr('checked', true);
    var isChecked = $('#khuhoi').is(':checked')
    $('#khuhoi').on('change', function() {
        $('.timeKhuHoi').css('display', 'inline');
    })
    $('#motchieu').on('change', function() {
        $('.timeKhuHoi').css('display', 'none');
    })

})