/**
 * Create Category Form
 */
function nonEmptyCategoryValidate(namevar, statusvar, iconvar) {
    var name = document.getElementById(namevar);
    var status = document.getElementById(statusvar);
    var icon = document.getElementById(iconvar);

    if (name.value == "") {
        status.innerHTML = "Feld wird benötigt!";
        status.style.display = "block";
        name.parentNode.className = "form-group has-error has-feedback";
        icon.className = "glyphicon glyphicon-remove form-control-feedback";
        checkCategoryForm();
        return false;
    } else {
        status.style.display = "none";
        name.parentNode.className = "form-group has-success has-feedback";
        icon.className = "glyphicon glyphicon-ok form-control-feedback";
        checkCategoryForm();
        return true;
    }
}


/**
 * check if all fields are filled
 */
function checkCategoryForm() {
    document.getElementById("create-category-button").disabled = true;
    var f = document.forms['create-category-form'].elements;
    var cansubmit = true;

    const NUMBER_OF_FIELDS_TO_BE_CHECKED = 1;

    for (var i = 0; i < NUMBER_OF_FIELDS_TO_BE_CHECKED; i++) {
        if (f[i].value.length === 0) {
            cansubmit = false;
        }
    }

    if (cansubmit) {
        document.getElementById("create-category-button").disabled = !cansubmit;
    }

    document.getElementById('create-category-form').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            e.preventDefault();
        }
    });
}




