function checkPassword() {
    var old_password= document.getElementById("password-now");
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirm_password");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwörter nicht identisch!");
    } else {
        confirm_password.setCustomValidity("");

       /* $.ajax({
            url: "../admin/updatePassword",
            type: 'POST',
            data: {password_data: $('#password-change-form').serializeArray()},
            success: function (response) {
                showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
            },
            error: function (xhr, status, error) {
                showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
            }

        });*/

    }
}

function checkIfPasswordChanged(bool){
    if(bool){
        showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
    }
    else{
        showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
    }
}
