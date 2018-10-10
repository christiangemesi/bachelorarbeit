$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    /**
     * remove blocked periods
     */
    $(".button-delete-blocked-periods").click(function () {
        prepareDeleteWaningModal();
        $('#delete-warning-header-text').val("Wollen Sie die Sperrfrist wirklich löschen?");
        $('#object-remove-id').val($(this).val());
    });

    /**
     * confirm remove blocked period
     */
    $('#button-delete-blocked-period-confirm').click(function () {
        $.ajax({
            url: "removeBlockedPeriod",
            type: 'POST',
            data: {blocked_period_id: $('#object-remove-id').val()},
            success: function (response) {
                showSuccessModal("Themenkiste wurde erfolgreich gelöscht");
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Löschen passiert", xhr);
            }
        });
    });

    /**
     * show create blocked period modal
     */
    $("#button-create-blocked-period").click(function () {
        $('#blocked-period-create-modal').modal('show');
        $('#create-blocked-period-form').trigger("reset");

        $("#create-blocked-period-form span").each(function () {
            $(this).removeClass("glyphicon glyphicon-ok form-control-feedback");
        });

        $("#create-blocked-period-form div").each(function () {
            $(this).removeClass("has-success has-feedback");
        });

        $("#create-blocked-period-form span").each(function () {
            $(this).removeClass("glyphicon glyphicon-remove form-control-feedback");
        });

        $("#create-blocked-period-form div").each(function () {
            $(this).removeClass("has-error has-feedback");
        });
    });

    /**
     * create blocked period
     */
    $('#create-blocked-period-button').click(function () {
        $.ajax({
            url: "../admin/createBlockedPeriod",
            type: 'POST',
            data: {blocked_period_data: $('#create-blocked-period-form').serializeArray()},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                showSuccessModal("Themenkiste wurde erfolgreich erstellt");
            },
            error: function (xhr, status, error) {
                showFailureModal("Themenkiste konnte nicht erstellt werden", xhr);
            }
        })
    });

    /*/!**
     * get settings data for edit modal
     *!/
    $(".button-edit-settings").click(function () {
        $('#settings-edit-modal').modal('show');

        $.ajax({
            url: "../admin/getsettings",
            type: 'POST',
            data: {settings_id: $(this).val()},
            success: function (response) {
                $("#settings-edit-form-name").val(response["title"]);
                $("#settings-edit-form-signature").val(response["signatur"]);
                $("#settings-edit-form-schoollevel").val(response["schoollevel"]);
                $("#settings-edit-form-barcode").val(response["barcode"]);
                $("#settings-edit-form-size").val(response["size"]);
                $("#settings-edit-form-weight").val(response["weight"]);
                $("#settings-edit-form-content").val(response["content"]);
                if (1 === response["complete"]) {
                    $("#settings-edit-form-complete").prop('checked', true);
                    $("#settings-edit-form-complete").val(1);
                } else {
                    $("#settings-edit-form-complete").prop('checked', false);
                    $("#settings-edit-form-complete").val(0);
                }
                $("#settings_id").val(response["pk_settings"]);

                notEmptyValidate('settings-edit-form-name','settings-edit-form-name-status','settings-edit-form-name-icon');
                notEmptyValidate('settings-edit-form-signature','settings-edit-form-signature-status','settings-edit-form-signature-icon');
                notEmptyValidate('settings-edit-form-schoollevel','settings-edit-form-schoollevel-status','settings-edit-form-schoollevel-icon');
                notEmptyValidate('settings-edit-form-barcode','settings-edit-form-barcode-status','settings-edit-form-barcode-icon');
                notEmptyValidate('settings-edit-form-size','settings-edit-form-size-status','settings-edit-form-size-icon');
                notEmptyValidate('settings-edit-form-weight','settings-edit-form-weight-status','settings-edit-form-weight-icon');
                notEmptyValidate('settings-edit-form-content','settings-edit-form-content-status','settings-edit-form-content-icon');
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Server Problem aufgetreten", xhr);
            }
        });
    });

    /!**
     * mark settings as complete / incomplete
     *!/
    $("#settings-edit-form-complete").change(function () {
        if ($(this).is(':checked')) {
            $(this).val(1);
        } else {
            $(this).val(0);
        }
    });

    /!**
     * save settings changes
     *!/
    $("#button-save-settings-change").click(function () {
        $.ajax({
            url: "../admin/updatesettings",
            type: 'POST',
            data: {settings_data: $('#edit-settings-form').serializeArray()},
            success: function (response) {
                showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
            },
            error: function (xhr, status, error) {
                showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
            }

        });
    });

    /!**
     * show callback error text
     *!/
    $("#modal-failure-message-show").click(function () {
        $(".modal-content-failure-message-background").slideToggle("slow");
    });


    /!**
     * show delete warning modal
     *!/
    function prepareDeleteWaningModal() {
        $('#callback-modal').modal('show');
        $('#modal-content-failure').css('display', 'none');
        $('#modal-content-success').css('display', 'none');
        $('#modal-delete-blocked-period-warning').css('display', 'block');
    }

    /!**
     * refresh page after modal close
     *!/
    $('.callback-close').click(function () {
        refresh();
    });*/




});
