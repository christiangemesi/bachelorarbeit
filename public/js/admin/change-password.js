function checkPassword() {
    var old_password= document.getElementById("password-now");
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirm_password");

    if(password.value !== confirm_password.value) {
        confirm_password.setCustomValidity("Passwörter nicht identisch!");
    } else {
        confirm_password.setCustomValidity("");
    }
}

function checkAdminEmail() {
    var email = document.getElementById("email");
    var confirm_email = document.getElementById("confirm_email");

    if(email.value !== confirm_email.value) {
        confirm_email.setCustomValidity("Emails nicht identisch!");
    } else {
        confirm_email.setCustomValidity("");
    }

    console.log(email.value);

    //TODO: make it so that it checks if its a valid email



}

function checkPoweruserPassword() {
    var old_password= document.getElementById("poweruser-password-now");
    var password = document.getElementById("poweruser-password");
    var confirm_password = document.getElementById("poweruser-confirm_password");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwörter nicht identisch!");
    } else {
        confirm_password.setCustomValidity("");
    }
}
