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

    for (var i = 0; i < f.length; i++) {
        if (f[i].value == ""){
            cansubmitf = false;
        }
    }
    for (var a = 0; a < s.length; a++) {
        if (s[a].value == ""){
            cansubmits = false;
        }
    }


    if (cansubmitf) {
        document.getElementById("create-blocked-period-button").disabled = !cansubmitf;
    }

    if (cansubmits) {
        document.getElementById("button-save-blocked-period-change").disabled = !cansubmits;
    }
}





