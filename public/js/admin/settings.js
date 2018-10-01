/**
 * javascript runs on page load
 */
$(document).ready(function () {


    $('#blocked-dates').keydown(function () {
        return false;
    });


    /**
     * Array of blocked dates
     */
    var array = ["2018-10-14", "2018-10-15", "2018-10-16"]

    /**
     * Format of datepicker is set
     */

        $("#blocked-dates").datepicker({
            dateFormat: "dd.mm.yy",
            minDate: 1,
            beforeShowDay: function (date) {
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                return [array.indexOf(string) == -1]
            },
            onSelect: function (date) {
                bindEndData();
                if ($("#end-date").datepicker("getDate") != null) {
                    addEvent();
                }
                $("#end-date").removeAttr("disabled");
                $("#info-calendar-message-box").css("display", "none");
            }
        });

}