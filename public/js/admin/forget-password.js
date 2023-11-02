$(document).ready(function() {
    $("#forget-password-email").focus();
    $('#forget-password-button').prop("disabled", true);

    $('#forget-password-email').keyup(function(e) {
        if ($(this).val()) {
            $('#forget-password-button').prop("disabled", false);
            if (e.keyCode === 13) {
                checkPasswordReset();
            }
        }
    });

    $('#forget-password-button').click(function(e) {
        checkPasswordReset();
    });

    function checkPasswordReset() {
        var email = $('#forget-password-email').val();
        $.ajax({
            url: "forgetPassword", // Ensure the correct endpoint is specified here
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
