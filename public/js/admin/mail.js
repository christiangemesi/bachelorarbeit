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

            },
            error: function (xhr, status, error) {
                $("#error-message-box").css("display", "block");
                $("#error-message-box").html("Interner Server Fehler");
            }
        });
    }


    $('#confirm-button-mail').click(function() {
        var markupStr = $('#summernote').summernote('code');
        console.log(markupStr);
    });



});
