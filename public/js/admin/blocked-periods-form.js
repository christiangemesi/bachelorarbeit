/**
 * Create Settings Form
 */
function notEmptyValidation(namevar, iconvar, statusvar) {

    var name = document.getElementById(namevar);
    var status = document.getElementById(statusvar);
    var icon = document.getElementById(iconvar);

    if (name.value == "") {
        status.innerHTML = "Feld wird benötigt!";
        status.style.display = "block";
        name.parentNode.className = "form-group has-error has-feedback";
        icon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkform();
        return false;
    } else if(namevar == "themebox-form-weight" || namevar == "themebox-edit-form-weight"){

        if (!onlyNumbers(name.value)) {
            status.innerHTML = "Falsches Gewicht Format - nur Nummern und Punkt erlaubt!";
            status.style.display = "block";
            name.parentNode.className = "form-group has-warning has-feedback";
            icon.className = "glyphicon glyphicon-warning-sign form-control-feedback";
            checkform();
            return false;
        }  else{
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
    document.getElementById("create-settings-button").disabled = true;
    document.getElementById("button-save-settings-change").disabled = true;
    var f = document.forms['create-settings-form'].elements;
    var s = document.forms['edit-settings-form'].elements;
    var cansubmitf = true;
    var cansubmits = true;

    for (var i = 0; i < f.length; i++) {
        if (f[i].value.length == 0){
            cansubmitf = false;
        }
    }
    for (var a = 0; a < s.length; a++) {
        if (s[a].value.length == 0){
            cansubmits = false;
        }
    }

    if(onlyNumbers(document.getElementById("settings-form-weight").value)) {
        if (cansubmitf) {
            document.getElementById("create-settings-button").disabled = !cansubmitf;
        }
    }
    if(onlyNumbers(document.getElementById("settings-edit-form-weight").value)){
        if (cansubmits) {
            document.getElementById("button-save-settings-change").disabled = !cansubmits;
        }
    }

}


function onlyNumbers(word) {
    var pattern = /^[0-9. ]+$/;
    return pattern.test(word);
}





