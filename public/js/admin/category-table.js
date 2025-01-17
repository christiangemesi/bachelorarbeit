$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * remove category
     */
    $(".button-delete-category").click(function () {
        prepareCategoryDeleteWarningModal();
        $('#delete-warning-header-text').val("Wollen Sie die Kategorie wirklich löschen?");
        $('#object-remove-id').val($(this).val());
    });

    /**
     * confirm remove category
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
                if(xhr.status === 409) {
                    showFailureModal("Kategorie konnte nicht gelöscht werden, da sie noch Ausleihobjekte enthält", xhr)
                } else {
                    showFailureModal("Es ist ein Fehler beim Löschen passiert", xhr);
                }
            }
        });
    });


    /**
     * show create category modal
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
     * create category
     */
    $('#create-category-button').click(function () {


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
     * show edit category modal
     */
    $(".button-edit-category").click(function () {
        var categoryId = $(this).val();

        // Set the category_id in the hidden input field
        $("#category_id").val(categoryId);

        $('#category-edit-modal').modal('show');

        $.ajax({
            url: "../admin/getCategory",
            type: 'POST',
            data: { category_id: categoryId },
            success: function (response) {
                $("#category-edit-form-name").val(response["name"]);
                checkCategoryForm('category-edit-form-name', 'category-edit-form-name-status', 'category-edit-form-name-icon');
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Server Problem aufgetreten", xhr);
            }
        });
    });

    /**
     * save category changes
     */
    $("#button-save-category-change").click(function () {
        var formData = $('#edit-category-form').serializeArray();
        $.ajax({
            url: "../admin/updateCategory",
            type: 'POST',
            data: { category_data: formData },
            success: function (response) {
                showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
            },
            error: function (xhr, status, error) {
                showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
            }
        });
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
     * show callback error text
     */
    $("#modal-failure-message-show").click(function () {
        $(".modal-content-failure-message-background").slideToggle("slow");
    });

    /**
     * initial search
     */
    $('#new-category-table').DataTable({
        "lengthChange": false,
        "paging": false,
        "pageLength": 10,
        "info": false,
        "language": {
            "search": "Suchen nach: ",
            "sEmptyTable": "Keine Kategorie vorhanden",
            "zeroRecords": "Keine Kategorie gefunden",
            "paginate": {
                "previous": "Vorherige Seite",
                "next": "Nächste Seite"
            }
        },
        "columnDefs": [
            {
                "searchable": false, "targets": 2,
                "orderable": false, "targets": 2
            }
        ]
    });

    /**
     * refresh page after modal close
     */
    $('.callback-close').click(function () {
        refresh();
    });

});
