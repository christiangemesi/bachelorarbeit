$(document).ready(function () {
    $("#reset-password-email").focus();
    $('#reset-password-button').prop("disabled", true);

    $('#new-password-confirmed, #new-password-password').on('input', function () {
        const password = $('#new-password-password').val();
        const password_confirmation = $('#new-password-confirmed').val();

        if (password && password_confirmation) {
            $('#reset-password-button').prop("disabled", false);
        } else {
            $('#reset-password-button').prop("disabled", true);
        }
    });


    $('#reset-password-button').click(function (e) {
        e.preventDefault(); // Prevent default form submission
        sendToBackend();
    });

    /**
     * Sends reset password data to the backend for processing.
     * Updates UI based on the backend response.
     */
    function sendToBackend() {
        const email = $('#reset-password-email').val();
        const password = $('#new-password-password').val();
        const password_confirmation = $('#new-password-confirmed').val();
        const token = $('#reset-password-token').val();


        $.ajax({
            url: "/admin/resetPassword",
            type: 'POST',
            data: {email: email, password: password, password_confirmation: password_confirmation, token: token},
            success: function (response) {
                if (response === "failure_email") {
                    $('#email-reset-notExistent-message-box').show();
                    $('#reset-password-notMatch-message-box-2').hide();
                    $('#reset-password-8character-message-box').hide();
                    $('#passwort-reset-success-message-box').hide();
                } else if (response === "failure_pw_noMatch") {
                    $('#reset-password-notMatch-message-box-2').show();
                    $('#email-reset-notExistent-message-box').hide();
                    $('#reset-password-8character-message-box').hide();
                    $('#passwort-reset-success-message-box').hide();
                } else if (response === "failure_pw_short") {
                    $('#reset-password-8character-message-box').show();
                    $('#email-reset-notExistent-message-box').hide();
                    $('#reset-password-notMatch-message-box-2').hide();
                    $('#passwort-reset-success-message-box').hide();
                } else {
                    localStorage.setItem("passwort-reset-success-message-box", "true");
                    window.location = "../loginForm";
                }
            },
            error: function (xhr, status, error) {
                $('#reset-password-Failed-message-box').show();
            }
        });
    }

});
