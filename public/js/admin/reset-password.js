$(document).ready(function() {
    $("#reset-password-email").focus();
    $('#reset-password-button').prop("disabled", true);

    $('#reset-password-email, #new-password-confirmed, #new-password-password').on('input', function() {
        const email = $('#reset-password-email').val();
        const password = $('#new-password-password').val();
        const password_confirmation = $('#new-password-confirmed').val();

        if (email && password && password_confirmation) {
            $('#reset-password-button').prop("disabled", false);
        } else {
            $('#reset-password-button').prop("disabled", true);
        }
    });

    $('#reset-password-button').click(function(e) {
        sendToBackend();
    });

    function sendToBackend() {
        const email = $('#reset-password-email').val();
        const password = $('#reset-password-password').val();
        const password_confirmation = $('#reset-password-confirmed').val();
        $.ajax({
            url: "/admin/resetPassword",
            type: 'POST',
            data: { email: email, password: password, password_confirmation: password_confirmation },
            success: function(response) {
                console.log("Success: " + response);
                // Add your logic to handle the success response here
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
                console.log("Status: " + status);
                console.log("xhr: " + xhr.responseText);
                // Add your logic to handle the error response here
            }
        });
    }
});
