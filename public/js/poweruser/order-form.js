/**
 * 1.Form personal data
 */
function firstNameValidate(input,status,icon) {

    var firstNameInput = convertToObject(input);
    var firstNameInputStatus = convertToObject(status);
    var firstNameInputIcon = convertToObject(icon);

    if (firstNameInput.value == "") {
        firstNameInputStatus.innerHTML = "Vorname wird benötigt!";
        firstNameInputStatus.style.display = "block";
        firstNameInput.parentNode.className = "form-group has-error has-feedback";
        firstNameInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return false;
    } else if (!onlyLetters(firstNameInput.value)) {
        firstNameInputStatus.innerHTML = "Nur Buchstaben sind erlaubt!";
        firstNameInputStatus.style.display = "block";
        firstNameInput.parentNode.className = "form-group has-warning has-feedback";
        firstNameInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        firstNameInputStatus.style.display = "none";
        firstNameInput.parentNode.className = "form-group has-success has-feedback";
        firstNameInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return true;
    }
}

function lastNameValidate(input,status,icon) {

    // console.log(input,status,icon);



     var lastNameInput = convertToObject(input);
     var lastNameInputStatus = convertToObject(status);
     var lastNameIcon= convertToObject(icon);

    // console.log(lastNameInput,lastNameInputStatus,lastNameIcon)


    if (lastNameInput.value == "") {
        lastNameInputStatus.innerHTML = "Nachname wird benötigt!";
       lastNameInputStatus.style.display = "block";
        lastNameInput.parentNode.className = "form-group has-error has-feedback";
        lastNameIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return false;
    } else if (!onlyLetters(lastNameInput.value)) {
        lastNameInputStatus.innerHTML = "Nur Buchstaben sind erlaubt!";
        lastNameInputStatus.style.display = "block";
        lastNameInput.parentNode.className = "form-group has-warning has-feedback";
        lastNameIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        lastNameInput.style = {};
        lastNameInputStatus.style.display = "none";
        lastNameInput.parentNode.className = "form-group has-success has-feedback";
        lastNameIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return true;
    }
}

function emailValidate(input,status,icon) {
    var emailInput = convertToObject(input);
    var emailInputStatus = convertToObject(status);
    var emailInputIcon = convertToObject(icon);

    if (emailInput.value == "") {
        emailInputStatus.innerHTML = "Email Adresse wird benötigt!";
        emailInputStatus.style.display = "block";
        emailInput.parentNode.className = "form-group has-error has-feedback";
        emailInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return false;
    } else if (!validEmailAddress(emailInput.value)) {
        emailInputStatus.innerHTML = "Falsches EMail Adressen Format!";
        emailInputStatus.style.display = "block";
        emailInput.parentNode.className = "form-group has-warning has-feedback";
        emailInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        emailInputStatus.style.display = "none";
        emailInput.parentNode.className = "form-group has-success has-feedback";
        emailInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return true;
    }
}

function phoneValidate(input,status,icon) {

    var phone = convertToObject(input);
    var phoneStatus = convertToObject(status);
    var phoneIcon =convertToObject(icon);

    if (phone.value == "") {
        phoneStatus.innerHTML = "Telefonnummer wird benötigt!";
        phoneStatus.style.display = "block";
        phone.parentNode.className = "form-group has-error has-feedback";
        phoneIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return false;
    } else if (!validPhoneNumber(phone.value)) {
        phoneStatus.innerHTML = "Falsches Telefonnummer Format";
        phoneStatus.style.display = "block";
        phone.parentNode.className = "form-group has-warning has-feedback";
        phoneIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        phoneStatus.style.display = "none";
        phone.parentNode.className = "form-group has-success has-feedback";
        phoneIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return true;
    }
}

function nebisValidate(input,status,icon) {

    var nebisusernumber = convertToObject(input);
    var nebisusernumberStatus = convertToObject(status);
    var nebisusernumberIcon = convertToObject(icon);

    if (nebisusernumber.value == "") {
        nebisusernumberStatus.innerHTML = "Nebisnummer wird benötigt!";
        nebisusernumberStatus.style.display = "block";
        nebisusernumber.parentNode.className = "form-group has-error has-feedback";
        nebisusernumberIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return false;
    } else if (!notEmpty(nebisusernumber.value)) {
        nebisusernumberStatus.innerHTML = "Falsches Nebisnummer Format!";
        nebisusernumberStatus.style.display = "block";
        nebisusernumber.parentNode.className = "form-group has-warning has-feedback";
        nebisusernumberIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        nebisusernumberStatus.style.display = "none";
        nebisusernumber.parentNode.className = "form-group has-success has-feedback";
        nebisusernumberIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(0);
        checkFormOrderAdd(0);
        return true;
    }
}


/**
 * 2.Form School Address
 */
function schoolnameValidate(input,status,icon) {

    var schoolNameInput = convertToObject(input);
    var schoolNameInputStatus = convertToObject(status);
    var schoolNameInputIcon =  convertToObject(icon);

    if (schoolNameInput.value == "") {
        schoolNameInputStatus.innerHTML = "Name wird benötigt!";
        schoolNameInputStatus.style.display = "block";
        schoolNameInput.parentNode.className = "form-group has-error has-feedback";
        schoolNameInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return false;
    } else if (!onlyLettersNumbers(schoolNameInput.value)) {
        schoolNameInputStatus.innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        schoolNameInputStatus.style.display = "block";
        schoolNameInput.parentNode.className = "form-group has-warning has-feedback";
        schoolNameInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        schoolNameInputStatus.style.display = "none";
        schoolNameInput.parentNode.className = "form-group has-success has-feedback";
        schoolNameInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return true;
    }
}

function schoolstreetValidate(input,status,icon) {

    var schoolstreetInput = convertToObject(input);
    var schoolstreetInputStatus = convertToObject(status);
    var schoolstreetInputIcon =  convertToObject(icon);

    if (schoolstreetInput.value == "") {
        schoolstreetInputStatus.innerHTML = "Strasse wird benötigt!";
        schoolstreetInputStatus.style.display = "block";
        schoolstreetInput.parentNode.className = "form-group has-error has-feedback";
        schoolstreetInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return false;
    } else if (!onlyLettersNumbers(schoolstreetInput.value)) {
        schoolstreetInputStatus.innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        schoolstreetInputStatus.style.display = "block";
        schoolstreetInput.parentNode.className = "form-group has-warning has-feedback";
        schoolstreetInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        schoolstreetInputStatus.style.display = "none";
        schoolstreetInput.parentNode.className = "form-group has-success has-feedback";
        schoolstreetInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return true;
    }
}

function schoolcityValidate(input,status,icon) {

    var schoolcityInput = convertToObject(input);
    var schoolcityInputStatus = convertToObject(status);
    var schoolcityInputIcon = convertToObject(icon);

    if (schoolcityInput.value == "") {
        schoolcityInputStatus.innerHTML = "Ort wird benötigt!";
        schoolcityInputStatus.style.display = "block";
        schoolcityInput.parentNode.className = "form-group has-error has-feedback";
        schoolcityInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return false;
    } else if (!validCityName(schoolcityInput.value)) {
        schoolcityInputStatus.innerHTML = "Falsches Format! Nur Buchstaben und Zahlen erlaubt.";
        schoolcityInputStatus.style.display = "block";
        schoolcityInput.parentNode.className = "form-group has-warning has-feedback";
        schoolcityInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        schoolcityInputStatus.style.display = "none";
        schoolcityInput.parentNode.className = "form-group has-success has-feedback";
        schoolcityInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return true;
    }
}

function placeofhandoverValidate(input,status,icon) {

    var placeofhandoverInput = convertToObject(input);
    var placeofhandoverInputStatus = convertToObject(status);
    var placeofhandoverInputIcon = convertToObject(icon);

    if (placeofhandoverInput.value == "") {
        placeofhandoverInputStatus.innerHTML = "Übergabeort wird benötigt!";
        placeofhandoverInputStatus.style.display = "block";
        placeofhandoverInput.parentNode.className = "form-group has-error has-feedback";
        placeofhandoverInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return false;
    } else if (!onlyLettersNumbers(placeofhandoverInput.value)) {
        placeofhandoverInputStatus.innerHTML = "Falsches Telefonnummer Format";
        placeofhandoverInputStatus.style.display = "block";
        placeofhandoverInput.parentNode.className = "form-group has-warning has-feedback";
        placeofhandoverInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton.disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        placeofhandoverInputStatus.style.display = "none";
        placeofhandoverInput.parentNode.className = "form-group has-success has-feedback";
        placeofhandoverInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return true;
    }
}

function schoolphoneValidate(input,status,icon) {

    var schoolphoneInput = convertToObject(input);
    var schoolphoneInputStatus = convertToObject(status);
    var schoolphoneInputIcon = convertToObject(icon);

    if (schoolphoneInput.value == "") {
        schoolphoneInputStatus.innerHTML = "Telefonnummer wird benötigt!";
        schoolphoneInputStatus.style.display = "block";
        schoolphoneInput.parentNode.className = "form-group has-error has-feedback";
        schoolphoneInputIcon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return false;
    } else if (!validPhoneNumber(schoolphoneInput.value)) {
        schoolphoneInputStatus.innerHTML = "Falsches Telefonnummer Format";
        schoolphoneInputStatus.style.display = "block";
        schoolphoneInput.parentNode.className = "form-group has-warning has-feedback";
        schoolphoneInputIcon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
        saveOrderChangeButton().disabled = true;
        saveOrderAddButton().disabled = true;
        return false;
    } else {
        schoolphoneInputStatus.style.display = "none";
        schoolphoneInput.parentNode.className = "form-group has-success has-feedback";
        schoolphoneInputIcon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkformOrder(1);
        checkFormOrderAdd(1);
        return true;
    }
}

/**
 * Regex validation of admin order form
 * @param word
 * @returns {boolean}
 */
function saveOrderChangeButton() {
    return document.getElementById("button-save-order-change")
}
function saveOrderAddButton() {
    return document.getElementById("button-save-orderAdd")
}

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
function checkFormOrderAdd(form_type) {
    if (form_type === 0) {
        $("#button-save-orderAdd").prop('disabled', true);
        var cansubmit = true;

        $("#orderAdd-personal-data-box-admin :input").each(function () {
            if ($(this).parent().attr('class') != "form-group has-success has-feedback") {
                cansubmit = false;
            }
        });

        if (cansubmit) {
            $("#button-save-orderAdd").prop('disabled', !cansubmit);
        }
    }

    if (form_type === 1) {
        $("#button-save-orderAdd").prop('disabled', true);
        var cansubmit = true;

        $("#orderAdd-delivery-data-box-admin :input").each(function () {
            if ($(this).parent().attr('class') != "form-group has-success has-feedback") {
                cansubmit = false;
            }
        });

        if (cansubmit) {
            $("#button-save-orderAdd").prop('disabled', !cansubmit);
        }
    }

}
function convertToObject(objectToConvert) {
    if(typeof objectToConvert == "object"){
        console.log("converter");
        console.log(objectToConvert);
        console.log(objectToConvert[0]);
        return objectToConvert[0];
    }
    return document.getElementById(objectToConvert);

}