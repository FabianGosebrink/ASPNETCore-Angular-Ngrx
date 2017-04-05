// Make Hamburgermenu dissappear after cliking on it on mobile devices
$(document).ready(function () {
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
            $(this).collapse('hide');
        }
    });
});