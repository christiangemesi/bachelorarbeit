/**
 * 1.Form personal data
 */
function firstNameValidate() {

    var firstNameInput = document.getElementById("surname");

    if (firstNameInput.value == "") {
        document.getElementById("firstNameInputStatus").innerHTML = "Vorname wird benötigt!";
        document.getElementById("firstNameInputStatus").style.display = "block";
        firstNameInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("firstNameIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        return false;
    } else if (!onlyLetters(firstNameInput.value)) {
        document.getElementById("firstNameInputStatus").innerHTML = "Nur Buchstaben sind erlaubt!";
        document.getElementById("firstNameInputStatus").style.display = "block";
        firstNameInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("firstNameIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("firstNameInputStatus").style.display = "none";
        firstNameInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("firstNameIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        return true;
    }
}


function lastNameValidate() {

    var lastNameInput = document.getElementById("lastname");

    if (lastNameInput.value == "") {
        document.getElementById("lastNameInputStatus").innerHTML = "Nachname wird benötigt!";
        document.getElementById("lastNameInputStatus").style.display = "block";
        lastNameInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("lastNameIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        return false;
    } else if (!onlyLetters(lastNameInput.value)) {
        document.getElementById("lastNameInputStatus").innerHTML = "Nur Buchstaben sind erlaubt!";
        document.getElementById("lastNameInputStatus").style.display = "block";
        lastNameInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("lastNameIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("lastNameInputStatus").style.display = "none";
        lastNameInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("lastNameIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        return true;
    }
}

function emailValidate() {

    var emailInput = document.getElementById("email");

    if (emailInput.value == "") {
        document.getElementById("emailInputStatus").innerHTML = "Email Adresse wird benötigt!";
        document.getElementById("emailInputStatus").style.display = "block";
        emailInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("emailIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        return false;
    } else if (!validEmailAddress(emailInput.value)) {
        document.getElementById("emailInputStatus").innerHTML = "Falsches EMail Adressen Format!";
        document.getElementById("emailInputStatus").style.display = "block";
        emailInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("emailIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("emailInputStatus").style.display = "none";
        emailInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("emailIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        return true;
    }
}

function phoneValidate() {

    var phone = document.getElementById("phonenumber");

    if (phone.value == "") {
        document.getElementById("phoneInputStatus").innerHTML = "Telefonnummer wird benötigt!";
        document.getElementById("phoneInputStatus").style.display = "block";
        phone.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("phoneIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        return false;
    } else if (!validPhoneNumber(phone.value)) {
        document.getElementById("phoneInputStatus").innerHTML = "Falsches Telefonnummer Format";
        document.getElementById("phoneInputStatus").style.display = "block";
        phone.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("phoneIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("phoneInputStatus").style.display = "none";
        phone.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("phoneIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        return true;
    }
}

function nebisValidate() {

    var nebisusernumber = document.getElementById("nebisusernumber");

    if (nebisusernumber.value == "") {
        // document.getElementById("nebisInputStatus").innerHTML = "Nebisnummer wird benötigt!";
        // document.getElementById("nebisInputStatus").style.display = "block";
        // nebisusernumber.parentNode.className = "form-group has-error has-feedback";
        // document.getElementById("nebisIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        return true;
    } else if (!notEmpty(nebisusernumber.value)) {
        document.getElementById("nebisInputStatus").innerHTML = "Falsches Nebisnummer Format!";
        document.getElementById("nebisInputStatus").style.display = "block";
        nebisusernumber.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("nebisIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("nebisInputStatus").style.display = "none";
        nebisusernumber.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("nebisIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        return true;
    }
}


/**
 * 2.Form School Address
 */
function schoolnameValidate() {

    var schoolNameInput = document.getElementById("schoolname");

    if (schoolNameInput.value == "") {
        document.getElementById("schoolNameInputStatus").innerHTML = "Name wird benötigt!";
        document.getElementById("schoolNameInputStatus").style.display = "block";
        schoolNameInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolNameIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        return false;
    } else if (!onlyLettersNumbers(schoolNameInput.value)) {
        document.getElementById("schoolNameInputStatus").innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        document.getElementById("schoolNameInputStatus").style.display = "block";
        schoolNameInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolNameIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("schoolNameInputStatus").style.display = "none";
        schoolNameInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolNameIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        return true;
    }
}

function schoolstreetValidate() {

    var schoolstreetInput = document.getElementById("schoolstreet");

    if (schoolstreetInput.value == "") {
        document.getElementById("schoolstreetInputStatus").innerHTML = "Strasse wird benötigt!";
        document.getElementById("schoolstreetInputStatus").style.display = "block";
        schoolstreetInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolstreetIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        return false;
    } else if (!onlyLettersNumbers(schoolstreetInput.value)) {
        document.getElementById("schoolstreetInputStatus").innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        document.getElementById("schoolstreetInputStatus").style.display = "block";
        schoolstreetInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolstreetIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("schoolstreetInputStatus").style.display = "none";
        schoolstreetInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolstreetIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        return true;
    }
}

function schoolcityValidate() {

    var schoolcityInput = document.getElementById("schoolcity");

    if (schoolcityInput.value == "") {
        document.getElementById("schoolcityInputStatus").innerHTML = "Ort wird benötigt!";
        document.getElementById("schoolcityInputStatus").style.display = "block";
        schoolcityInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolcityIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        return false;
    } else if (!validCityName(schoolcityInput.value)) {
        document.getElementById("schoolcityInputStatus").innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        document.getElementById("schoolcityInputStatus").style.display = "block";
        schoolcityInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolcityIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("schoolcityInputStatus").style.display = "none";
        schoolcityInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolcityIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        return true;
    }
}

function placeofhandoverValidate() {

    var placeofhandoverInput = document.getElementById("placeofhandover");

    if (placeofhandoverInput.value == "") {
        document.getElementById("placeofhandoverInputStatus").innerHTML = "Übergabeort wird benötigt!";
        document.getElementById("placeofhandoverInputStatus").style.display = "block";
        placeofhandoverInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("placeofhandoverIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        return false;
    } else if (!onlyLettersNumbers(placeofhandoverInput.value)) {
        document.getElementById("placeofhandoverInputStatus").innerHTML = "Falsches Telefonnummer Format";
        document.getElementById("placeofhandoverInputStatus").style.display = "block";
        placeofhandoverInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("placeofhandoverIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("placeofhandoverInputStatus").style.display = "none";
        placeofhandoverInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("placeofhandoverIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        return true;
    }
}

function schoolphoneValidate() {

    var schoolphoneInput = document.getElementById("schoolphonenumber");

    if (schoolphoneInput.value == "") {
        document.getElementById("schoolphoneInputStatus").innerHTML = "Telefonnummer wird benötigt!";
        document.getElementById("schoolphoneInputStatus").style.display = "block";
        schoolphoneInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolphoneIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        return false;
    } else if (!validPhoneNumber(schoolphoneInput.value)) {
        document.getElementById("schoolphoneInputStatus").innerHTML = "Falsches Telefonnummer Format";
        document.getElementById("schoolphoneInputStatus").style.display = "block";
        schoolphoneInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolphoneIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        document.getElementById("button-save-order-change").disabled = true;
        return false;
    } else {
        document.getElementById("schoolphoneInputStatus").style.display = "none";
        schoolphoneInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolphoneIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        return true;
    }
}

/**
 * Regex validation of admin order form
 * @param word
 * @returns {boolean}
 */
function notEmpty(word) {
    var pattern = /.*\S.*/;
    return pattern.test(word);
}

function onlyLetters(word) {
    var pattern = /^[a-zA-ZäöüÄÖÜéèêàÈÉÀ-]+$/;
    return pattern.test(word);
}

function onlyLettersNumbers(word) {
    var pattern = /^[A-Za-zäöüÄÖÜéèêàÈÉÀ0-9 ]+$/;
    return pattern.test(word);
}

function validEmailAddress(email) {

    var pattern = /[a-zäöüÄÖÜéèêàÈÉÀ0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zäöüÄÖÜéèêàÈÉÀ0-9-]+(\.[a-zäöüÄÖÜéèêàÈÉÀ0-9-]+)*/;
    return pattern.test(email);
}

function validPhoneNumber(phonenr) {
    var pattern = /^[0-9 ]+$/;
    return pattern.test(phonenr);
}

function validCityName(city) {
    var pattern = /^[A-Za-zäöüÄÖÜéèêàÈÉÀ0-9- ]+$/;
    return pattern.test(city);
}

function checkformOrder(form_type) {
    if (form_type === 0) {
        $("#button-save-order-change").prop('disabled', true);
        var cansubmit = true;

        $("#personal-data-box-admin :input").each(function () {
            if ($(this).parent().attr('class') != "form-group has-success has-feedback") {
                cansubmit = false;
            }
        });

        if (cansubmit) {
            $("#button-save-order-change").prop('disabled', !cansubmit);
        }
    }

    if (form_type === 1) {
        $("#button-save-order-change").prop('disabled', true);
        var cansubmit = true;

        $("#delivery-data-box-admin :input").each(function () {
            if ($(this).parent().attr('class') != "form-group has-success has-feedback") {
                cansubmit = false;
            }
        });

        if (cansubmit) {
            $("#button-save-order-change").prop('disabled', !cansubmit);
        }
    }
}