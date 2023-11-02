$(document).ready(function() {
    $("#forgot-password-email").focus();
    $('#forgot-password-button').prop("disabled", true);

    $('#forgot-password-email').keyup(function(e) {
        if ($(this).val()) {
            $('#forgot-password-button').prop("disabled", false);
            if (e.keyCode === 13) {
                checkPasswordReset();
            }
        }
    });

    $('#forgot-password-button').click(function(e) {
        checkPasswordReset();
    });

    function checkPasswordReset() {
        var email = $('#forgot-password-email').val();

        $.ajax({
            url: "/admin/forgotPassword", // Ensure the correct endpoint is specified here
            type: 'POST',
            data: { email: email },
            success: function(response) {
                console.log("Success: " + response);
                // Add your logic to handle the success response here
            },
            error: function(xhr, status, error) {
                console.log("Error: " + error);
                // Add your logic to handle the error response here
            }
        });
    }
});
