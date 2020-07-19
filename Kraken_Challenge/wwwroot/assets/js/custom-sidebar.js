//$('body').on('click', 'a', function () {
//    console.log('a clicked');
//    var link = $(this).attr("data-link");
//    window.location.href = link;
//})

$(function () {
    var url = window.location.href;
    parts = url.split("/"),
    last_part = parts[parts.length - 2] + '/' + parts[parts.length - 1];

    var activeUrlOption = $('.dashboard-menu ul li').find('a[href*="'+last_part+'"]');
    activeUrlOption.parent().addClass('active');
})

$('body').on('click', '#btn-logout', function () {
    console.log('logout clicked');
    $.ajax({
        url: "/Account/Logout",
        type: 'GET',
        dataType: 'json', // added data type
        success: function (res) {
            console.log(res);
            window.location.href = res;
        }
    });
})