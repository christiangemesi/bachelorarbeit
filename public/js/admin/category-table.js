$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * remove themebox
     */
    $(".button-delete-category").click(function () {
        prepareCategoryDeleteWarningModal();
        $('#delete-warning-header-text').val("Wollen Sie die Kategorie wirklich löschen?");
        $('#object-remove-id').val($(this).val());
    });

    /**
     * confirm remove themebox
     */
    $('#button-delete-category-confirm').click(function () {
        $.ajax({
            url: "removeCategory",
            type: 'POST',
            data: {category_id: $('#object-remove-id').val()},
            success: function (response) {
                showSuccessModal("Kategorie wurde erfolgreich gelöscht");
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Löschen passiert", xhr);
            }
        });
    });


    /**
     * show create themebox modal
     */
    $("#button-create-category").click(function () {

        $('#summernote_create').summernote();

        $('#category-create-modal').modal('show');
        $('#create-category-form').trigger("reset");

        $("#create-category-form span").each(function () {
            $(this).removeClass("glyphicon glyphicon-ok form-control-feedback");
        });

        $("#create-category-form div").each(function () {
            $(this).removeClass("has-success has-feedback");
        });

        $("#create-category-form span").each(function () {
            $(this).removeClass("glyphicon glyphicon-remove form-control-feedback");
        });

        $("#create-category-form div").each(function () {
            $(this).removeClass("has-error has-feedback");
        });
    });

    /**
     * create themebox
     */
    $('#create-category-button').click(function () {

        console.log($('#create-category-form').serializeArray());

        $.ajax({
            url: "../admin/createCategory",
            type: 'POST',
            data: {category_data: $('#create-category-form').serializeArray()},
            success: function (response) {
                showSuccessModal("Kategorie wurde erfolgreich erstellt");
            },
            error: function (xhr, status, error) {
                showFailureModal("Kategorie konnte nicht erstellt werden", xhr);
            }
        })
    });

    /**
     * get themebox data for edit modal
     */
    $(".button-edit-category").click(function () {
        $('#category-edit-modal').modal('show');

        $.ajax({
            url: "../admin/getCategory",
            type: 'POST',
            data: {category_id: $(this).val()},
            success: function (response) {
                console.log(response)

                $("#category-edit-form-name").val(response["name"]);

                checkCategoryForm('category-edit-form-name','category-edit-form-name-status','category-edit-form-name-icon');

            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Server Problem aufgetreten", xhr);
            }
        });
    });

    /**
     * save themebox changes
     */
    $("#button-save-themebox-change").click(function () {

        document.getElementById('extra_text_edit').value = $('#summernote_edit').summernote('code');

        rawText = document.getElementById('extra_text_edit').value.replace(/<\/?[^>]+(>|$)/g, "");

        if (rawText === "") {
            document.getElementById('extra_text_edit').value = null;
        }

        $.ajax({
            url: "../admin/updateThemebox",
            type: 'POST',
            data: {themebox_data: $('#edit-themebox-form').serializeArray()},
            success: function (response) {
                showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
            },
            error: function (xhr, status, error) {
                showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
            }

        });
    });

    /**
     * show callback error text
     */
    $("#modal-failure-message-show").click(function () {
        $(".modal-content-failure-message-background").slideToggle("slow");
    });


    /**
     * show delete warning modal
     */
    function prepareCategoryDeleteWarningModal() {
        $('#callback-modal').modal('show');
        $('#modal-content-failure').css('display', 'none');
        $('#modal-content-success').css('display', 'none');
        $('#modal-delete-category-warning').css('display', 'block');
    }

    /**
     * refresh page after modal close
     */
    $('.callback-close').click(function () {
        refresh();
    });

});
