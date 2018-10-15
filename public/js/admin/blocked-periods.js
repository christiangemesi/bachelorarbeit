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
     * load blocked dates
     */
    function loadBlockedDates() {
        $.ajax({
            url: "../admin/getBlockedPeriods",
            type:"POST",
            success: function(response) {
                var html =
                    '<tr><td>Grund: </td><td class="themebox-table-value">' + response["data"]["blocked_period"]["reason"] +'</td></tr>' +
                    '<tr><td>Startdatum: </td><td class="themebox-table-value">' + response["data"]["blocked_period"]["startdate"] +'</td></tr>' +
                    '<tr><td>Endatum: </td><td class="themebox-table-value">' + response["data"]["blocked_period"]["enddate"]+'</td></tr>';
                $('#themebox-infobox').html(html);

                console.log(html);

                /*
                listOfBlockedDates.length = 0;
                blockTillNextSunday();

                var orders = response["data"]["orders"];
                $.each(orders, function( index, value ) {
                    $('#calendar').fullCalendar( "renderEvent", { title: "", start: addBlockStartdate(value["startdate"]), end: addBlockEnddate(value["enddate"]), rendering: "background", className : "block"}, true);
                    console.log("start date: " + value['startdate'] + " end date: " + value['enddate']);
                    console.log("block start date: " + addBlockStartdate(value['startdate']));
                    console.log("block end date: " + addBlockEnddate(value['enddate']));

                    var dateArr = computeDayBetweenStartAndEnd(new Date(addBlockStartdate(value['startdate'])), new Date(addBlockEnddate(value['enddate'])));

                    for(var i = 0; i <= dateArr.length; i++){
                        console.log(dateArr[i]);
                        listOfBlockedDates.push(dateArr[i]);
                    }
                });


                hideErrorBoxes();
                $("#end-date").prop("disabled", true);
                $("#start-date").val("");
                $("#end-date").val("");

                $("#themebox-id").val(response["data"]["themebox"]["pk_themebox"]);

                addBlockDateFromToday();

                loadBlockedDates();*/
            },
            error: function(xhr, status, error) {
                errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
            }
        });
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