function checkPassword() {
    var old_password= document.getElementById("password-now");
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirm_password");

    if(password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwörter nicht identisch!");
    } else {
        confirm_password.setCustomValidity("");
    }
}