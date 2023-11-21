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
    $(".button-edit-themebox").click(function () {
        $('#themebox-edit-modal').modal('show');

        console.log("opened modal");

        $.ajax({
            url: "../admin/getThemebox",
            type: 'POST',
            data: {themebox_id: $(this).val()},
            success: function (response) {
                console.log(response)
                $("#themebox-edit-form-name").val(response[0]["title"]);
                $("#themebox-edit-form-signature").val(response[0]["signatur"]);
                $("#themebox-edit-form-schoollevel").val(response[0]["schoollevel"]);
                $("#themebox-edit-form-barcode").val(response[0]["barcode"]);
                $("#themebox-edit-form-size").val(response[0]["size"]);
                $("#themebox-edit-form-weight").val(response[0]["weight"]);
                $("#themebox-edit-form-content").val(response[0]["content"]);
                $("#themebox-edit-form-extra_text").val(response[0]["extra_text"]);
                $('#summernote_edit').summernote("code", response[0]["extra_text"]);

                const categoryElement = document.getElementById("themebox-edit-form-category");
                const categoryOptions = categoryElement.options;
                for (var i = 0; i < categoryOptions.length; i++) {
                    // Convert both values to integers for strict comparison
                    if (parseInt(categoryOptions[i].value, 10) === parseInt(response[1]["pk_category"], 10)) {
                        // Set the selected attribute for the matched option
                        categoryOptions[i].selected = true;
                        break;
                    }
                }

                console.log(response[0])


                if (1 === response[0]["complete"]) {
                    $("#themebox-edit-form-complete").prop('checked', true);
                    $("#themebox-edit-form-complete").val(1);
                } else {
                    $("#themebox-edit-form-complete").prop('checked', false);
                    $("#themebox-edit-form-complete").val(0);
                }
                $("#themebox_id").val(response[0]["pk_themebox"]);

                notEmptyValidate('themebox-edit-form-name','themebox-edit-form-name-status','themebox-edit-form-name-icon');
                notEmptyValidate('themebox-edit-form-signature','themebox-edit-form-signature-status','themebox-edit-form-signature-icon');
                notEmptyValidate('themebox-edit-form-schoollevel','themebox-edit-form-schoollevel-status','themebox-edit-form-schoollevel-icon');
                notEmptyValidate('themebox-edit-form-barcode','themebox-edit-form-barcode-status','themebox-edit-form-barcode-icon');
                notEmptyValidate('themebox-edit-form-size','themebox-edit-form-size-status','themebox-edit-form-size-icon');
                notEmptyValidate('themebox-edit-form-weight','themebox-edit-form-weight-status','themebox-edit-form-weight-icon');
                notEmptyValidate('themebox-edit-form-content','themebox-edit-form-content-status','themebox-edit-form-content-icon');
                notEmptyValidate('themebox-edit-form-category','themebox-edit-form-category-status','themebox-edit-form-category-icon');


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
     * initial datatable settings
     */
    $('#new-themebox-table').DataTable({
        "lengthChange": false,
        "paging": false,
        "pageLength": 10,
        "info": false,
        "language": {
            "search": "Suchen nach: ",
            "sEmptyTable": "Keine Themenkisten vorhanden",
            "zeroRecords": "Keine Themenkisten gefunden",
            "paginate": {
                "previous": "Vorherige Seite",
                "next": "Nächste Seite"
            }
        },
        "columnDefs": [
            {
                "searchable": false, "targets": 7,
                "orderable": false, "targets": 7
            }
        ]
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
