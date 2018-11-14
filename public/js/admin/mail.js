$(document).ready(function() {
    loadMailData($("#mail-select").val());

    /**
     * onchange of mail-select
     */
    $("#mail-select").on("change", function () {
        loadMailData(this.value);
    });

    /**
     * load statistics data from year
     * @param mail_id
     */
    function loadMailData(mail_id) {

        $.ajax({
            url: "getMail",
            type: 'POST',
            data: {mail_id: mail_id},
            headers: {
                'X-CSRFToken': $('meta[name="token"]').attr('content')
            },
            success: function (response) {
                $('#summernote').summernote("code", response["mail_text"]);
                document.getElementById("edit_legend").innerHTML = response["edit_legend"];

            },
            error: function (xhr, status, error) {
                $("#error-message-box").css("display", "block");
                $("#error-message-box").html("Interner Server Fehler");
            }
        });
    }

    /**
     * edit mail
     */
    $('#confirm-button-mail').click(function () {
        prepareMailWarning();
        $('#delete-warning-header-text').val("Wollen Sie die Mailvorlage wirklich ändern?");
        $('#object-edit-id').val($(this).val());
    });

    /**
     * confirm remove blocked period
     */
    $('#button-edit-mail-confirmed').click(function () {

        document.getElementById('change_email_id').value = $("#mail-select").val();
        document.getElementById('change_email_text').value = $('#summernote').summernote('code');

        $.ajax({
            url: "updateMail",
            type: 'POST',
            data: {mailIdAndText: $('#change_email_form').serializeArray()},
            success: function (response) {
                showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
            },
            error: function (xhr, status, error) {
                showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
            }

        });
    });

    /**
     * show edit mail warning modal
     */
    function prepareMailWarning() {
        $('#callback-modal').modal('show');
        $('#modal-content-failure').css('display', 'none');
        $('#modal-content-success').css('display', 'none');
        $('#modal-edit-mail-modal').css('display', 'block');
    }

});
