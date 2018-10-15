/**
 * javascript runs on page load
 */
$(document).ready(function () {

    var current_date = new Date();

    /**
     * Array of already blocked dates
     */
    var listOfAlreadyBlockedDates = [];


        $('#start-date').keydown(function () {
            return false;
        });

        $('#end-date').keydown(function () {
            return false;
        });

        /**
         * Format of datepicker is set
         */
        $("#start-date").datepicker({
            dateFormat: "dd.mm.yy",
            minDte: 1,
            beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                console.log("Blockierte Daten: " + listOfAlreadyBlockedDates);
                return [ listOfAlreadyBlockedDates.indexOf(string) == -1 ]
            },
            onSelect: function (date) {
                bindEndData();
                if($("#end-date").datepicker("getDate") != null){
                    addEvent();
                }
                notEmptyValidation('start-date', 'order-from-glyphicon', 'start-date-form-status');
            }
        });

        $("#end-date").datepicker({
            dateFormat: "dd.mm.yy",
            beforeShowDay: function(date){
                var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
                console.log("Blockierte Daten: " + listOfAlreadyBlockedDates);
                return [ listOfAlreadyBlockedDates.indexOf(string) == -1 ]
            },
            onSelect: function (date) {
                addEvent();
                notEmptyValidation('end-date', 'order-to-glyphicon', 'end-date-form-status');
            }
        });

        /**
         * Focus is set on button click on glyphicon
         */
        $("#order-from-glyphicon").click(function () {
            $("#start-date").focus();
        });

        /**
         * Focus is set on button click on glyphicon
         */
        $("#order-to-glyphicon").click(function () {
            $("#end-date").focus();
        });



    function computeDayBetweenStartAndEnd(startDate, endDate) {
        var arr = new Array();
        var dt = new Date(startDate);
        while (dt <= endDate) {
            arr.push(formatDate(new Date(dt)));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if(day<10){
            day = '0' + day;
        }else{
            day = '' + day;
        }

        if(month<10){
            month = '0' + month;
        }else{
            month = '' + month;
        }

        return year + '-' + month + '-' + day;
    }



    /**
     * format startdate datepicker
     * @param date
     * @returns {string}
     */
    function formatCalendarDate(date){
        var temp_date = date.split(".");
        var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
        return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() +1) + "-" + formatTwoDigit(new_date.getUTCDate());
    }

    /**
     * format enddate datepicker
     * @param date
     * @returns {string}
     */
    function formatCalendarEndDate(date){
        var temp_date = date.split(".");
        var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
        new_date.setDate(new_date.getUTCDate() + 1);
        return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() +1) + "-" + formatTwoDigit(new_date.getUTCDate());
    }

    /**
     * format date for comparison
     * @param date
     * @returns {Date}
     */
    function formatCalendarDateCompare(date){
        var temp_date = date.split(".");
        var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
        return new_date;
    }

    /**
     * format two digit number
     * @param number
     * @returns {*}
     */
    function formatTwoDigit(number){
        if (number<10) {
            return '0' + number;
        }
        return number;
    }


    /**
     * check date collision
     * @param start
     * @param end
     * @returns {boolean}
     */
    function checkEventCollision(start, end){
        var status = true;
        if (start <= current_date) {
            status = false;
        }else {
            $.each($("#calendar").fullCalendar('clientEvents'), function (index, value) {
                if ((start >= value["start"] && start <= value["end"]-1 || start <= value["start"]  && end >= value["start"])) {
                    status = false;
                }
            });
        }

        return status;
    }

    /**
     * create new event
     * @param start
     * @param end
     */
    function createEvent(start, end){
        $("#calendar").fullCalendar('renderEvent',
            {
                title: "",
                start: start,
                end:  end,
                rendering: "background",
                className: "new_event",
                color: "#04B404"
            },
            true
        );

        $('#themebox-infobox-select-date').css("display", "block");

        $('#calendar').fullCalendar('gotoDate', start);
    }

    /**
     * add event on datepicker change
     */
    function addEvent() {
        $("#calendar").fullCalendar('removeEvents', function(event) {
            return event.className == "new_event";
        });

        var collision = checkEventCollision(formatCalendarDateCompare($("#start-date").val()), formatCalendarDateCompare($("#end-date").val()));

        if(collision){

            $("#calendar").fullCalendar('removeEvents', function(event) {
                return event.className == "new_event";
            });

            createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()));
        }else{
            errorHandling("Ihre Auswahl steht in Konflikt mit einem anderen Bestelltermin", "#error-calendar-message-box");
        }
    }


    /**
     * bind startdate field and enddate field
     */
    function bindEndData(){
        var end_date = $('#end-date');
        var start_date = $("#start-date").datepicker('getDate');
        var min_date = $("#start-date").datepicker('getDate');
        start_date.setDate(start_date.getDate() + 42);
        end_date.datepicker('option', 'maxDate', start_date);
        end_date.datepicker('option', 'minDate', min_date);
        $("#start-date").datepicker('option', 'minDate', new Date());
    }


    /**
     * show loadin modal on submit
     */
    $('#orderform').submit(function() {
        $('#modal-create-order-progress').modal('show');
    });

    /**
     * prevent on enter submit
     */
    $('#orderform').on("keypress", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            return false;
        }
    });

});