$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    /**
     * remove themebox
     */
    $(".button-delete-themebox").click(function () {
        prepareDeleteWarningModal();
        $('#delete-warning-header-text').val("Wollen Sie die Themenkiste wirklich löschen?");
        $('#object-remove-id').val($(this).val());
    });

    /**
     * confirm remove themebox
     */
    $('#button-delete-themebox-confirm').click(function () {
        $.ajax({
            url: "removeThemebox",
            type: 'POST',
            data: {themebox_id: $('#object-remove-id').val()},
            success: function (response) {
                showSuccessModal("Themenkiste wurde erfolgreich gelöscht");
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Löschen passiert", xhr);
            }
        });
    });

    /**
     * show create themebox modal
     */
    $("#button-create-themebox").click(function () {

        $('#summernote_create').summernote();

        $('#themebox-create-modal').modal('show');
        $('#create-themebox-form').trigger("reset");

        $("#create-themebox-form span").each(function () {
            $(this).removeClass("glyphicon glyphicon-ok form-control-feedback");
        });

        $("#create-themebox-form div").each(function () {
            $(this).removeClass("has-success has-feedback");
        });

        $("#create-themebox-form span").each(function () {
            $(this).removeClass("glyphicon glyphicon-remove form-control-feedback");
        });

        $("#create-themebox-form div").each(function () {
            $(this).removeClass("has-error has-feedback");
        });
    });

    /**
     * create themebox
     */
    $('#create-themebox-button').click(function () {

        document.getElementById('extra_text_create').value = $('#summernote_create').summernote('code');

        $.ajax({
            url: "../admin/createThemebox",
            type: 'POST',
            data: {themebox_data: $('#create-themebox-form').serializeArray()},
            success: function (response) {
                showSuccessModal("Themenkiste wurde erfolgreich erstellt");
            },
            error: function (xhr, status, error) {
                showFailureModal("Themenkiste konnte nicht erstellt werden", xhr);
            }
        })
    });

    /**
     * get themebox data for edit modal
     */
    $(".button-edit-themebox").click(function () {
        $('#themebox-edit-modal').modal('show');

        $.ajax({
            url: "../admin/getThemebox",
            type: 'POST',
            data: {themebox_id: $(this).val()},
            success: function (response) {
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

                const order_typeElement = document.getElementById("themebox-edit-form-order_type");
                const order_typeOptions = order_typeElement.options;
                for (var l = 0; l < order_typeOptions.length; l++) {
                    // Convert both values to integers for strict comparison
                    if (parseInt(order_typeOptions[l].value, 10) === parseInt(response[2]["pk_order_type"], 10)) {
                        // Set the selected attribute for the matched option
                        order_typeOptions[l].selected = true;
                        break;
                    }
                }




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
                notEmptyValidate('themebox-edit-form-order_type','themebox-edit-form-order_type-status','themebox-edit-form-order_type-icon');


            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Server Problem aufgetreten", xhr);
            }
        });
    });

    /**
     * mark themebox as complete / incomplete
     */
    $("#themebox-edit-form-complete").change(function () {
        if ($(this).is(':checked')) {
            $(this).val(1);
        } else {
            $(this).val(0);
        }
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
                "searchable": false, "targets": 8,
                "orderable": false, "targets": 8
            }
        ]
    });

    /**
     * show delete warning modal
     */
    function prepareDeleteWarningModal() {
        $('#callback-modal').modal('show');
        $('#modal-content-failure').css('display', 'none');
        $('#modal-content-success').css('display', 'none');
        $('#modal-delete-themebox-warning').css('display', 'block');
    }

    /**
     * refresh page after modal close 
     */
    $('.callback-close').click(function () {
        refresh();
    });

});
