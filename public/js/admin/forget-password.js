$(document).ready(function () {
    $('#passwort-reset-error-message-box').hide();
    $("#forget-password-email").focus();
    $('#forget-password-button').prop("disabled", true);

    $('#forget-password-email').keyup(function (e) {
        if ($(this).val()) {
            $('#forget-password-button').prop("disabled", false);
            if (e.keyCode === 13) {
                checkPasswordReset();
            }
        }
    });

    $('#forget-password-button').click(function (e) {
        checkPasswordReset();
    });

    function checkPasswordReset() {
        var email = $('#forget-password-email').val();
        $.ajax({
            url: "forgetPassword", // Ensure the correct endpoint is specified here
            type: 'POST',
            data: {email: email},
            success: function (response) {

                $('#passwort-reset-error-message-box').show();
                $('#forget-password-button').prop("disabled", true);
                setTimeout(function () {
                    window.location = "/admin/loginForm";
                } , 3000);
            },
            error: function (xhr, status, error) {
                console.log("Error: " + error);
                console.log("Status: " + status);
                console.log("xhr: " + xhr.responseText);

                $('#passwort-reset-error-message-box').show();
            }
        });
    }
});
