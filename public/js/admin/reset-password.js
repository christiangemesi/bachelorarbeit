$(document).ready(function() {
    $("#new-password-password").focus();
    $('#reset-password-button').prop("disabled", true);

    $('#new-password-password, #new-password-confirmed').on('input', function(e) {
        const password = $('#new-password-password').val();
        const password_confirmation = $('#new-password-confirmed').val();

        if (password && password_confirmation) {
            $('#reset-password-button').prop("disabled", false);
        } else {
            $('#reset-password-button').prop("disabled", true);
        }
    });

    $('#reset-password-button').click(function(e) {
        sendToBackend();
    });

    function sendToBackend() {
        const password = $('#reset-password-password').val();
        const password_confirmation = $('#reset-password-confirmed').val();
        const token = $('#reset-password-token').val();
        $.ajax({
            url: "/admin/resetPassword", // Ensure the correct endpoint is specified here
            type: 'POST',
            data: { password: password, password_confirmation: password_confirmation, token: token },
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
