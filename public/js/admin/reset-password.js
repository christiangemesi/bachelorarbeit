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
        e.preventDefault(); // Prevent default form submission
        sendToBackend();
    });

    function sendToBackend() {
        const email = $('#reset-password-email').val();
        const password = $('#new-password-password').val();
        const password_confirmation = $('#new-password-confirmed').val();

        if (password.length < 8) {
            $('#passwort-reset-success-message-box').hide();
            $('#reset-password-8character-message-box').show();
        } else if (password !== password_confirmation) {
            $('#passwort-reset-success-message-box').hide();
            $('#reset-password-8character-message-box').hide();
            $('#reset-password-notMatch-message-box-2').show();
        } else {
            $('#passwort-reset-success-message-box').hide();
            $('#reset-password-8character-message-box').hide();
            $('#reset-password-notMatch-message-box-2').hide();

            // If no error, proceed with the AJAX request
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
    }
});
