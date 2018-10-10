$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    /**
     * remove blocked periods
     */
    $(".button-delete-blocked-period").click(function () {
        prepareDeleteWarningModal();
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
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                showSuccessModal("Sperrfrist wurde erfolgreich gelöscht");
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
                showSuccessModal("Sperrfrist wurde erfolgreich erstellt");
            },
            error: function (xhr, status, error) {
                showFailureModal("Sperrfrist konnte nicht erstellt werden", xhr);
            }
        })
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
