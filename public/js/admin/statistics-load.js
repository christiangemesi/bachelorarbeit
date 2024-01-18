$(document).ready(function() {
    loadStatisticsData($("#statistics-year-select").val());

    /**
     * onchange of status update show success/failure box
     */
    $("#statistics-year-select").on("change",function(){
        loadStatisticsData(this.value);
    });

    /**
     * load statistics data from year
     * @param year
     */
    function loadStatisticsData(year) {
        $.ajax({
            url: "loadStatisticsThemebox",
            type: 'POST',
            data: {year: year},
            success: function (response) {
                $("#error-message-box").css("display", "none");
                var html = '';
                var max_order = 0;

                $.each(response["themeboxes"], function (index, value) {
                    if (value > max_order) {
                        max_order = value;
                    }
                });

                var max_value = 100 / max_order;

                html += '<div class="row statistics-themebox-header">';
                html += '<div class="col-md-4 statistics-themebox-name">Ausleihobjekt</div>';
                html += '<div class="col-md-8">Anzahl Bestellungen</div>';
                html += '</div><hr>';

                $.each(response["themeboxes"], function (index, value) {
                    var share = (value * max_value) + "%";
                    html += '<div class="row">';
                    html += '<div class="col-md-4 statistics-themebox-name">' + index + '</div>';
                    html += '<div class="col-md-8">';
                    html += '<div class="progress statistics-progressbar-background"><div class="statistics-progressbar-value progress-bar progress-bar-info" role="progressbar" aria-valuenow="70"aria-valuemin="0" aria-valuemax="100" style="width:' + share + '">' + value + '</div>';
                    html += '</div></div></div>';
                })

                $("#statistics-background").html(html);
            },
            error: function (xhr, status, error) {
                $("#error-message-box").css("display", "block");
                $("#error-message-box").html("Interner Server Fehler");
            }
        })
    }
});