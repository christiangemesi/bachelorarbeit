/**
 * javascript runs on page load
 */
$(document).ready(function () {
    loadThemeboxInfoBox($(".themebox-list").first().attr('id')); //load themebox data from the first list element
    $(".themebox-list")[0].focus(); //set focus to the first list element

    var carousel_counter = 1;
    var current_date = new Date();

    $("#themebox-order-carousel").carousel();
    $('#themebox-list-search').val("");

    $('#start-date').keydown(function () {
        return false;
    });

    $('#end-date').keydown(function () {
        return false;
    });

    /**
     * Array of blocked dates
     */
    var array = ["2018-10-14","2018-10-15","2018-10-16"]

    /**
     * Format of datepicker is set
     */
    $("#start-date").datepicker({
        dateFormat: "dd.mm.yy",
        minDate: 1,
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            return [ array.indexOf(string) == -1 ]
        },
        onSelect: function (date) {
            bindEndData();
            if($("#end-date").datepicker("getDate") != null){
                addEvent();
            }
            $("#end-date").removeAttr("disabled");
            $("#info-calendar-message-box").css("display", "none");
        }
    });

    $("#end-date").datepicker({
        dateFormat: "dd.mm.yy",
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            return [ array.indexOf(string) == -1 ]
        },
        onSelect: function (date) {
            addEvent();
            $("#info-calendar-message-box").css("display", "none");
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

    /**
     * order continue button on click
     */
    $("#carousel-right").click(function(){
        carousel_counter++;
        if (carousel_counter === 2) {
            $("#carousel-left").css("display", "block");
        }
        if (carousel_counter === 3) {
            $("#carousel-right").css("display", "none");
            $("#carousel-reserve-button").css("display", "block");
        }
        updateProgressBar(carousel_counter);
        checkValidation(carousel_counter);
    });

    /**
     * order back button on click
     */
    $("#carousel-left").click(function(){
        carousel_counter--;
        if (carousel_counter === 1) {
            $('#carousel-left').css("display", "none");
        }
        if (carousel_counter === 2) {
            $("#carousel-right").css("display", "block");
            $("#carousel-reserve-button").css("display", "none");
        }
        updateProgressBar(carousel_counter);
        checkValidation(0);
    });

    /**
     * load themebox data on list click
     */
    $(".themebox-list").each(function () {
        $(this).on("click", function () {
            loadThemeboxInfoBox($(this).attr("id"))
        });
    });


    /**
     * order calendar
     */
    $("#calendar").fullCalendar({
        selectable: true,
        eventColor: "#f44242",
        height: "auto",

        dayClick: function( date, allDay, jsEvent, view ) {
            $("#info-calendar-message-box").html("Wählen Sie oben ihre gewünschte Ausleihperiode");
            $("#info-calendar-message-box").css("display", "block");
            $("#error-calendar-message-box").css("display", "none");
        },
        select: function(start, end, allDay) {
            $("#info-calendar-message-box").html("Wählen Sie oben ihre gewünschte Ausleihperiode");
            $("#info-calendar-message-box").css("display", "block");
            $("#error-calendar-message-box").css("display", "none");
        }
    });

    /**
     * load calendar and themebox detail list
     * @param themebox_Id
     */
    function loadThemeboxInfoBox(themebox_Id) {
        $.ajax({
            url: "../user/getThemebox",
            type:"POST",
            data: {themeboxId: themebox_Id},
            success: function(response) {
                var html =
                    '<tr><td>Signatur: </td><td class="themebox-table-value">' + response["data"]["themebox"]["signatur"] +'</td></tr>' +
                    '<tr><td>Stufe: </td><td class="themebox-table-value">' + response["data"]["themebox"]["schoollevel"] +'</td></tr>' +
                    '<tr><td>Strichcode: </td><td class="themebox-table-value">' + response["data"]["themebox"]["barcode"]+'</td></tr>' +
                    '<tr><td>Grösse: </td><td class="themebox-table-value">' + response["data"]["themebox"]["size"]+'</td></tr>' +
                    '<tr><td>Gewicht: </td><td class="themebox-table-value">' + response["data"]["themebox"]["weight"]+' kg</td></tr>' +
                    '<tr><td>Inhalt: </td><td class="themebox-table-value"><button type="button" class="btn btn-default btn-show-themebox-content">Anzeigen <span class="glyphicon glyphicon-search"></span></button></td></tr>';
                $('#themebox-infobox').html(html);

                var hiddenField = '<input type="hidden" name="themeboxId" value=' + themebox_Id + '>';
                $("#themebox-infobox").append(hiddenField);

                $("#themebox-order-info-title").html( response["data"]["themebox"]["title"]);
                $("#calendar").fullCalendar( "removeEvents");
                $("#calendar").fullCalendar("today");
                $("#carousel-right").prop("disabled", true);

                var orders = response["data"]["orders"];
                $.each(orders, function( index, value ) {
                    $('#calendar').fullCalendar( "renderEvent", { title: "", start: addBlockStartdate(value["startdate"]), end: addBlockEnddate(value["enddate"]), rendering: "background", className : "block"}, true);
                });

                hideErrorBoxes();
                $("#end-date").prop("disabled", true);
                $("#start-date").val("");
                $("#end-date").val("");

                $("#themebox-id").val(response["data"]["themebox"]["pk_themebox"]);

                addBlockDateFromToday();
            },
            error: function(xhr, status, error) {
                errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
            }
        });
    }

    /**
     * button to show the themebox details - content
     */
    $(document).on("click", ".btn-show-themebox-content", function(event){
        $('#themebox-content-modal').modal('show');
        $.ajax({
            url: "../user/getThemeboxContent",
            type:"POST",
            data: {themeboxId: $("#themebox-id").val()},
            success: function(response) {
                $('#themebox-content-modal-box').html(response["content"]);
            },
            error: function(xhr, status, error) {
                errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
            }
        });
    });

    $('.thekre-list li a').click(function(e) {
        e.preventDefault();
        $('a').removeClass('active');
        $(this).addClass('active');
    });

    /**
     * show bootstrap error message box
     */
    function errorHandling(msg, box) {
        $(box).html(msg);
        $(box).css("display", "block");
        $("#info-calendar-message-box").css("display", "none");
    }

    /**
     * change the deliver typ
     */
    $("#thekre-dropdown").click(function(){

        if ($("#thekre-dropdown").val() === "1") {
            $("#school-Address").hide();
            $("#user-delivery-info").show();
            $("#carousel-reserve-button").prop('disabled', false);
            $("#carousel-right").prop('disabled', false);


        }
        else {
            $("#user-delivery-info").hide();
            $("#school-Address").show();
            $("#carousel-reserve-button").prop('disabled', true);
            $("#carousel-right").prop('disabled', true);
            checkValidationDelivery();
        }

    });


    /**
     * check if all fields in delivery are filled out
     */
    function checkValidationDelivery() {
        $filledOut = false;
        while(!$filledOut) {
            if (schoolnameValidate() && schoolstreetValidate() && schoolcityValidate() && placeofhandoverValidate() && schoolphoneValidate()) {
                $("#carousel-right").prop('disabled', false);
            }
        }
    }


    /**
     * enable and disable next/order buttons
     * @param order_carousel_status
     */
    function checkValidation(order_carousel_status){
        if (order_carousel_status === 0) {
            $("#carousel-right").prop("disabled", false);
        }

        if (order_carousel_status === 1 && $('#error-message-box').css("display", "block")){
            $('#carousel-right').prop("disabled", true);
        }

        if (order_carousel_status === 2){
            $('#carousel-right').prop("disabled", true);
        }
    }

    $('#themebox-order-carousel').off('keydown.bs.carousel');

    /**
     * hide error boxes
     */
    function hideErrorBoxes(){
        $('#error-message-box').css("display", "none");
        $('#error-calendar-message-box').css("display", "none");
        $("#info-calendar-message-box").css("display", "none");
    }

    /**
     * update order progress bar
     * @param value
     */
    function updateProgressBar(value) {
        $('#order-progress-bar').css("width", carousel_counter * 33.33 + "%");
        $('#order-progress-bar-value').text("Schritt "+carousel_counter + " von 3");
    }


    /**
     * add block days after order enddate
     * @param date
     * @returns {string}
     */
    function addBlockEnddate(date){
        var temp_date = new Date(date + "T00:00:00-00:00");
        temp_date.setDate(temp_date.getUTCDate() + 8);
        return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() +1 ) + "-" + formatTwoDigit(temp_date.getUTCDate());
    }

    /**
     * add block days before order startdate
     * @param date
     * @returns {string}
     */
    function addBlockStartdate(date){
        var temp_date = new Date(date + "T00:00:00-00:00");
        temp_date.setDate(temp_date.getUTCDate() - 7);
        return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() +1) + "-" + formatTwoDigit(temp_date.getUTCDate());
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
        $('#carousel-right').prop('disabled', false);

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
            hideErrorBoxes();

            $("#calendar").fullCalendar('removeEvents', function(event) {
                return event.className == "new_event";
            });

            createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()));
        }else{
            errorHandling("Ihre Auswahl steht in Konflikt mit einem anderen Bestelltermin", "#error-calendar-message-box");
            $('#carousel-right').prop('disabled', true);
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

    /**
     * search themebox in list
     */
    $('#themebox-list-search').on("keyup", function(){
        var input, filter, ul, li, a, i;
        input = document.getElementById("themebox-list-search");
        filter = input.value.toUpperCase();
        ul = document.getElementById("themebox-list-ul");
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    });
});