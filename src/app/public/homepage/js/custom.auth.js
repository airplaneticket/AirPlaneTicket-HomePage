jQuery(document).ready(function($){
    $('#item1').on('click', function () {
        $('#item1 .flight-detail-info').toggle();
    });

    //Chỗ này m kiểm tra khi mà gửi mail cho nó thì hiện dòng này lên callback ắ
    $('#modelRegisterSuccess').modal('show')
})


