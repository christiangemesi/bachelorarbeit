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
                $("#themebox-edit-form-name").val(response["title"]);
                $("#themebox-edit-form-signature").val(response["signatur"]);
                $("#themebox-edit-form-schoollevel").val(response["schoollevel"]);
                $("#themebox-edit-form-barcode").val(response["barcode"]);
                $("#themebox-edit-form-size").val(response["size"]);
                $("#themebox-edit-form-weight").val(response["weight"]);
                $("#themebox-edit-form-content").val(response["content"]);
                if (1 === response["complete"]) {
                    $("#themebox-edit-form-complete").prop('checked', true);
                    $("#themebox-edit-form-complete").val(1);
                } else {
                    $("#themebox-edit-form-complete").prop('checked', false);
                    $("#themebox-edit-form-complete").val(0);
                }
                $("#themebox_id").val(response["pk_themebox"]);

                notEmptyValidate('themebox-edit-form-name','themebox-edit-form-name-status','themebox-edit-form-name-icon');
                notEmptyValidate('themebox-edit-form-signature','themebox-edit-form-signature-status','themebox-edit-form-signature-icon');
                notEmptyValidate('themebox-edit-form-schoollevel','themebox-edit-form-schoollevel-status','themebox-edit-form-schoollevel-icon');
                notEmptyValidate('themebox-edit-form-barcode','themebox-edit-form-barcode-status','themebox-edit-form-barcode-icon');
                notEmptyValidate('themebox-edit-form-size','themebox-edit-form-size-status','themebox-edit-form-size-icon');
                notEmptyValidate('themebox-edit-form-weight','themebox-edit-form-weight-status','themebox-edit-form-weight-icon');
                notEmptyValidate('themebox-edit-form-content','themebox-edit-form-content-status','themebox-edit-form-content-icon');
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
