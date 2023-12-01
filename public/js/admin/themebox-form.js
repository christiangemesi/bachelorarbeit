/**
 * Create Themenbox Form
 */
function notEmptyValidate(namevar, statusvar, iconvar) {
    var name = document.getElementById(namevar);
    var status = document.getElementById(statusvar);
    var icon = document.getElementById(iconvar);

    // Check if the element is a dropdown (for Category selection)
    if (name.tagName === "SELECT") {
        status.style.display = "none";
        name.parentNode.className = "form-group has-success has-feedback";
        icon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkform();
        return true;
    }

    if (name.value === "") {
        status.innerHTML = "Feld wird benötigt!";
        status.style.display = "block";
        name.parentNode.className = "form-group has-error has-feedback";
        icon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkform();
        return false;
    } else if (namevar === "themebox-form-weight" || namevar === "themebox-edit-form-weight") {

        if (!onlyNumbers(name.value)) {
            status.innerHTML = "Falsches Gewicht Format - nur Nummern und Punkt erlaubt!";
            status.style.display = "block";
            name.parentNode.className = "form-group has-warning has-feedback";
            icon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
            checkform();
            return false;
        } else {
            status.style.display = "none";
            name.parentNode.className = "form-group has-success has-feedback";
            icon.className = "glyphicon glyphicon-ok form-control-feedback";
            checkform();
            return true;
        }
    } else {
        status.style.display = "none";
        name.parentNode.className = "form-group has-success has-feedback";
        icon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkform();
        return true;
    }
}



function checkform() {
    document.getElementById("create-themebox-button").disabled = true;
    document.getElementById("button-save-themebox-change").disabled = true;
    var f = document.forms['create-themebox-form'].elements;
    var s = document.forms['edit-themebox-form'].elements;
    var cansubmitf = true;
    var cansubmits = true;

    const NUMBER_OF_FIELDS_TO_BE_CHECKED = 8;

    for (var i = 0; i < NUMBER_OF_FIELDS_TO_BE_CHECKED; i++) {
        if (f[i].type === "select-one") { // Check if the element is a dropdown
            if (f[i].selectedIndex === 0) { // Check if any option is selected
                cansubmitf = false;
            }
        } else {
            if (f[i].value.length === 0) {
                cansubmitf = false;
            }
        }
    }

    for (var a = 0; a < NUMBER_OF_FIELDS_TO_BE_CHECKED+1; a++) {
        if (s[a].type === "select-one") { // Check if the element is a dropdown
            if (s[a].selectedIndex === 0) { // Check if any option is selected
                cansubmits = false;
            }
        } else {
            if (s[a].value.length === 0) {
                cansubmits = false;
            }
        }
    }

    if (onlyNumbers(document.getElementById("themebox-form-weight").value)) {
        if (cansubmitf) {
            document.getElementById("create-themebox-button").disabled = !cansubmitf;
        }
    }
    if (onlyNumbers(document.getElementById("themebox-edit-form-weight").value)) {
        if (cansubmits) {
            document.getElementById("button-save-themebox-change").disabled = !cansubmits;
        }
    }

}


function onlyNumbers(word) {
    var pattern = /^[0-9. ]+$/;
    return pattern.test(word);
}





