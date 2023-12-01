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

    /**
     * Sends a request to the backend to initiate the password reset process.
     * Updates UI based on the backend response.
     */
    function checkPasswordReset() {
        var email = $('#forget-password-email').val();
        $.ajax({
            url: "forgetPassword", // Ensure the correct endpoint is specified here
            type: 'POST',
            data: {email: email},
            success: function (response) {
                localStorage.setItem("passwort-reset-error-message-box", "true");
                window.location = "/admin/loginForm";
            },
            error: function (xhr, status, error) {
                $('#passwort-reset-error-message-box').show();
            }
        });
    }
});
