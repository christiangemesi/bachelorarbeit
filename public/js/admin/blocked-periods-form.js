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
    } else {
        status.style.display = "none";
        name.parentNode.className = "form-group has-success has-feedback";
        icon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkform();
        return true;
    }
}

function checkform() {
    document.getElementById("create-blocked-period-button").disabled = true;
    document.getElementById("button-save-blocked-period-change").disabled = true;
    var f = document.forms['create-blocked-period-form'].elements;
    var s = document.forms['edit-blocked-period-form'].elements;
    var cansubmitf = true;
    var cansubmits = true;

    console.log(s);

    for (var i = 0; i < f.length; i++) {
        //console.log("value length " + f[i] + ": " + f[i].value.length);
        if (f[i].value == ""){
            cansubmitf = false;
        }
    }
    for (var a = 0; a < s.length; a++) {
        //console.log("value length " + s[i] + ": " + s[i].value.length);
        if (s[a].value == ""){
            cansubmits = false;
        }
    }

    /*if(onlyNumbers(document.getElementById("settings-form-weight").value)) {
        if (cansubmitf) {
            document.getElementById("create-settings-button").disabled = !cansubmitf;
        }
    }*/
    /*if(onlyNumbers(document.getElementById("settings-edit-form-weight").value)){
        if (cansubmits) {
            document.getElementById("button-save-settings-change").disabled = !cansubmits;
        }
    }*/

    if (cansubmitf) {
        document.getElementById("create-blocked-period-button").disabled = !cansubmitf;
    }

    if (cansubmits) {
        document.getElementById("button-save-blocked-period-change").disabled = !cansubmits;
    }
}

/*
function onlyNumbers(word) {
    var pattern = /^[0-9. ]+$/;
    return pattern.test(word);
}*/





