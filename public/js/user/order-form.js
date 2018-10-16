// form.js
window.onload = function () {
    document.getElementById("firstNameInput").onkeyup = firstNameValidate;
    document.getElementById("lastNameInput").onkeyup = lastNameValidate;
    document.getElementById("emailInput").onkeyup = emailValidate;
    document.getElementById("nebisusernumber").onkeyup = nebisValidate;
    document.getElementById("phone").onkeyup = phoneValidate;
    document.getElementById("schoolstreetInput").onkeyup = schoolstreetValidate;
    document.getElementById("schoolcityInput").onkeyup = schoolcityValidate;
    document.getElementById("placeofhandoverInput").onkeyup = placeofhandoverValidate;
    document.getElementById("schoolphoneInput").onkeyup = schoolphoneValidate;
    document.getElementById("schoolNameInput").onkeyup = schoolnameValidate;
};


/**
 * Datepicker
 */
function dateFromValidate() {

    var dateFromInput = document.getElementById("start-date");

    if (!dateValidateRegex(dateFromInput.value)) {
        document.getElementById("error-calendar-message-box").style.display = "block";
        document.getElementById("error-calendar-message-box").innerText = "Falsches Format!";
        $('#carousel-right').prop('disabled', true);
        return false;
    } else {
        document.getElementById("error-calendar-message-box").style.display = "none";
        $('#error-calendar-message-box').css("display", "none");
        return true;
    }
}

function dateToValidate() {

    var dateToInput = document.getElementById("end-date");

   if (!dateValidateRegex(dateToInput.value)) {
        document.getElementById("error-calendar-message-box").style.display = "block";
        document.getElementById("error-calendar-message-box").innerText = "Falsches Format!";
        $('#carousel-right').prop('disabled', true);
        return false;
    } else {
        document.getElementById("error-calendar-message-box").style.display = "none";
        $('#error-calendar-message-box').css("display", "none");
        return true;
    }
}

/**
 * 1.Form personal data
 */
function firstNameValidate() {

    var firstNameInput = document.getElementById("firstNameInput");

    if (firstNameInput.value == "") {
        document.getElementById("firstNameInputStatus").innerHTML = "Vorname wird benötigt!";
        document.getElementById("firstNameInputStatus").style.display = "block";
        firstNameInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("firstNameIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(0);
        return false;
    } else if (!onlyLetters(firstNameInput.value)) {
        document.getElementById("firstNameInputStatus").innerHTML = "Nur Buchstaben sind erlaubt!";
        document.getElementById("firstNameInputStatus").style.display = "block";
        firstNameInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("firstNameIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(0);
        return false;
    } else {
        document.getElementById("firstNameInputStatus").style.display = "none";
        firstNameInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("firstNameIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(0);
        return true;
    }
}


function lastNameValidate() {

    var lastNameInput = document.getElementById("lastNameInput");

    if (lastNameInput.value == "") {
        document.getElementById("lastNameInputStatus").innerHTML = "Nachname wird benötigt!";
        document.getElementById("lastNameInputStatus").style.display = "block";
        lastNameInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("lastNameIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(0);
        return false;
    } else if (!onlyLetters(lastNameInput.value)) {
        document.getElementById("lastNameInputStatus").innerHTML = "Nur Buchstaben sind erlaubt!";
        document.getElementById("lastNameInputStatus").style.display = "block";
        lastNameInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("lastNameIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(0);
        return false;
    } else {
        document.getElementById("lastNameInputStatus").style.display = "none";
        lastNameInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("lastNameIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(0);
        return true;
    }
}

function emailValidate() {

    if (emailInput.value == "") {
        document.getElementById("emailInputStatus").innerHTML = "Email Adresse wird benötigt!";
        document.getElementById("emailInputStatus").style.display = "block";
        emailInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("emailIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(0);
        return false;
    } else if (!validEmailAddress(emailInput.value)) {
        document.getElementById("emailInputStatus").innerHTML = "Falsches EMail Adressen Format!";
        document.getElementById("emailInputStatus").style.display = "block";
        emailInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("emailIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(0);
        return false;
    } else {
        document.getElementById("emailInputStatus").style.display = "none";
        emailInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("emailIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(0);
        return true;
    }
}

function phoneValidate() {

    if (phone.value == "") {
        document.getElementById("phoneInputStatus").innerHTML = "Telefonnummer wird benötigt!";
        document.getElementById("phoneInputStatus").style.display = "block";
        phone.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("phoneIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(0);
        return false;
    } else if (!validPhoneNumber(phone.value)) {
        document.getElementById("phoneInputStatus").innerHTML = "Falsches Telefonnummer Format";
        document.getElementById("phoneInputStatus").style.display = "block";
        phone.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("phoneIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(0);
        return false;
    } else {
        document.getElementById("phoneInputStatus").style.display = "none";
        phone.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("phoneIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(0);
        return true;
    }
}

function nebisValidate() {

    if (nebisusernumber.value == "") {
        document.getElementById("nebisInputStatus").innerHTML = "Nebisnummer wird benötigt!";
        document.getElementById("nebisInputStatus").style.display = "block";
        nebisusernumber.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("nebisIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(0);
        return false;
    } else if (!notEmpty(nebisusernumber.value)) {
        document.getElementById("nebisInputStatus").innerHTML = "Falsches Nebisnummer Format!";
        document.getElementById("nebisInputStatus").style.display = "block";
        nebisusernumber.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("nebisIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(0);
        return false;
    } else {
        document.getElementById("nebisInputStatus").style.display = "none";
        nebisusernumber.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("nebisIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(0);
        return true;
    }
}

/**
 * 2.Form School Address
 */

function schoolnameValidate() {

    var schoolNameInput = document.getElementById("schoolNameInput");

    if (schoolNameInput.value == "") {
        document.getElementById("schoolNameInputStatus").innerHTML = "Name wird benötigt!";
        document.getElementById("schoolNameInputStatus").style.display = "block";
        schoolNameInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolNameIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(1);
        return false;
    } else if (!onlyLettersNumbers(schoolNameInput.value)) {
        document.getElementById("schoolNameInputStatus").innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        document.getElementById("schoolNameInputStatus").style.display = "block";
        schoolNameInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolNameIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(1);
        return false;
    } else {
        document.getElementById("schoolNameInputStatus").style.display = "none";
        schoolNameInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolNameIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(1);
        return true;
    }
}

function schoolstreetValidate() {

    var schoolstreetInput = document.getElementById("schoolstreetInput");

    if (schoolstreetInput.value == "") {
        document.getElementById("schoolstreetInputStatus").innerHTML = "Strasse wird benötigt!";
        document.getElementById("schoolstreetInputStatus").style.display = "block";
        schoolstreetInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolstreetIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(1);
        return false;
    } else if (!onlyLettersNumbers(schoolstreetInput.value)) {
        document.getElementById("schoolstreetInputStatus").innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        document.getElementById("schoolstreetInputStatus").style.display = "block";
        schoolstreetInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolstreetIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(1);
        return false;
    } else {
        document.getElementById("schoolstreetInputStatus").style.display = "none";
        schoolstreetInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolstreetIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(1);
        return true;
    }
}

function schoolcityValidate() {

    var schoolcityInput = document.getElementById("schoolcityInput");

    if (schoolcityInput.value == "") {
        document.getElementById("schoolcityInputStatus").innerHTML = "PLZ und Ort wird benötigt!";
        document.getElementById("schoolcityInputStatus").style.display = "block";
        schoolcityInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolcityIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(1);
        return false;
    } else if (!onlyLettersNumbers(schoolcityInput.value)) {
        document.getElementById("schoolcityInputStatus").innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        document.getElementById("schoolcityInputStatus").style.display = "block";
        schoolcityInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolcityIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(1);
        return false;
    } else {
        document.getElementById("schoolcityInputStatus").style.display = "none";
        schoolcityInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolcityIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(1);
        return true;
    }
}

function placeofhandoverValidate() {

    var placeofhandoverInput = document.getElementById("placeofhandoverInput");

    if (placeofhandoverInput.value == "") {
        document.getElementById("placeofhandoverInputStatus").innerHTML = "Übergabeort wird benötigt!";
        document.getElementById("placeofhandoverInputStatus").style.display = "block";
        placeofhandoverInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("placeofhandoverIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(1);
        return false;
    } else if (!onlyLettersNumbers(placeofhandoverInput.value)) {
        document.getElementById("placeofhandoverInputStatus").innerHTML = "Falsches Telefonnummer Format";
        document.getElementById("placeofhandoverInputStatus").style.display = "block";
        placeofhandoverInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("placeofhandoverIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(1);
        return false;
    } else {
        document.getElementById("placeofhandoverInputStatus").style.display = "none";
        placeofhandoverInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("placeofhandoverIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(1);
        return true;
    }
}

function schoolphoneValidate() {

    var schoolphoneInput = document.getElementById("schoolphoneInput");

    if (schoolphoneInput.value == "") {
        document.getElementById("schoolphoneInputStatus").innerHTML = "Telefonnummer wird benötigt!";
        document.getElementById("schoolphoneInputStatus").style.display = "block";
        schoolphoneInput.parentNode.className = "form-group has-error has-feedback";
        document.getElementById("schoolphoneIcon").className = "glyphicon glyphicon-remove form-control-feedback";
        checkValidation(1);
        return false;
    } else if (!validPhoneNumber(schoolphoneInput.value)) {
        document.getElementById("schoolphoneInputStatus").innerHTML = "Falsches Telefonnummer Format";
        document.getElementById("schoolphoneInputStatus").style.display = "block";
        schoolphoneInput.parentNode.className = "form-group has-warning has-feedback";
        document.getElementById("schoolphoneIcon").className = "glyphicon glyphicon-warning-sign form-control-feedback";
        checkValidation(1);
        return false;
    } else {
        document.getElementById("schoolphoneInputStatus").style.display = "none";
        schoolphoneInput.parentNode.className = "form-group has-success has-feedback";
        document.getElementById("schoolphoneIcon").className = "glyphicon glyphicon-ok form-control-feedback";
        checkValidation(1);
        return true;
    }

}

/**
 * different regex validations for user input fields
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

function dateValidateRegex(date) {
    //var pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20)\d\d*/;
    var pattern = /^((0?[1-9]|[12][1-9]|3[01])\.(0?[13578]|1[02])\.20[0-9]{2}|(0?[1-9]|[12][1-9]|30)\.(0?[13456789]|1[012])\.20[0-9]{2}|(0?[1-9]|1[1-9]|2[0-8])\.(0?[123456789]|1[012])\.20[0-9]{2}|(0?[1-9]|[12][1-9])\.(0?[123456789]|1[012])\.20(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96))$/;
    return pattern.test(date);
}

function validEmailAddress(email) {

    var pattern = /[a-zäöüÄÖÜéèêàÈÉÀ0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zäöüÄÖÜéèêàÈÉÀ0-9-]+(\.[a-zäöüÄÖÜéèêàÈÉÀ0-9-]+)*/;
    return pattern.test(email);
}

function validPhoneNumber(phonenr) {
    var pattern = /^(0041|041|\+41|\+\+41|41)?(0|\(0\))?([1-9]\d{1})(\d{3})(\d{2})(\d{2})$/;
    return pattern.test(phonenr);
}

/**
 * Enables/Disables continue buttons
 * @param order_carousel_status
 */
function checkValidation(order_carousel_status) {
    if (order_carousel_status === 0) {
        $("#carousel-right").prop('disabled', true);
        $("#button-save-order-change").prop('disabled', true);
        var cansubmit = true;

        $("#personal-data-box :input").each(function () {
            if ($(this).parent().attr('class') != "form-group has-success has-feedback") {
                cansubmit = false;
            }
        });

        if (cansubmit) {
            $("#carousel-right").prop('disabled', !cansubmit);
            $("#button-save-order-change").prop('disabled', !cansubmit);
        }
    }

    if (order_carousel_status === 1) {
        $("#carousel-reserve-button").prop('disabled', true);
        var cansubmit = true;

        $("#delivery-data-box :input").each(function () {
            if ($(this).parent().attr('class') != "form-group has-success has-feedback") {
                cansubmit = false;
            }
        });

        if (cansubmit) {
            $("#carousel-reserve-button").prop('disabled', !cansubmit);
        }
    }
}
