/**
 * add calendar event
 */
function addEvent() {
    var collision = checkEventCollision(formatCalendarDateCompare($("#start-date").val()), formatCalendarDateCompare($("#end-date").val()));
    hideErrorBoxes();
    if (collision) {
        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "newOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "new_event";
        });

        createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()), false);
        $("#button-save-order-change").prop('disabled', false);
    } else {
        errorHandling("Ihre Auswahl steht in Konflikt mit einem anderen Bestelltermin", "#error-calendar-message-box");
    }
}

/**
 * update calendar event dates by poweruser/admin on edit order
 */
function updateEvent() {
    hideErrorBoxes();

    errorHandling("ACHTUNG! Diese Änderung kann nicht rückgängig gemacht werden!", "#info-calendar-message-box");

    var startTime = $('#pu_dropdown-von').val();
    var endTime = $('#pu_dropdown-bis').val();
    var isHourly = startTime !== null || endTime !== null;
    if (isHourly) {
        var startDateTime = $("#start-date").val() + " " + startTime;
        var endDateTime = $("#end-date").val() + " " + endTime;
    }


    $("#calendar").fullCalendar('removeEvents', function (event) {
        return event.className == "newOrder";
    });

    $("#calendar").fullCalendar('removeEvents', function (event) {
        return event.className == "myOrder";
    });

    $("#calendar").fullCalendar('removeEvents', function (event) {
        return event.className == "new_event";
    });

    if (isHourly) {
        createEvent(formatCalendarDateTimeCompare(startDateTime), formatCalendarDateTimeCompare(endDateTime), isHourly);
    } else {
        createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()), isHourly);
    }

    $("#button-save-order-change").prop('disabled', false);
}

/**
 * Adds the Buttons to switch from Monthly to Weekly view and vice versa
 */
function loadViewChangeButtons() {

    //prevent buttons from being added multiple times
    if ($(".fc-toolbar .fc-left .fc-week-view-button").length !== 0) {
        return;
    }

    var switchToWeekButton = $('<button type="button" class="fc-week-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Wochensicht</button>');
    var switchToMonthButton = $('<button type="button" class="fc-month-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Monatssicht</button>');
    switchToMonthButton.hide();


    switchToWeekButton.on("click", function () {
        $("#calendar, #orderAdd-calendar").fullCalendar("changeView", "agendaWeek");
        //dont show the week button, instead show the month button
        $(".fc-week-view-button").hide();
        $(".fc-month-view-button").show();
    });

    switchToMonthButton.on("click", function () {
        $("#calendar, #orderAdd-calendar").fullCalendar("changeView", "month");
        //dont show the month button, instead show the week button
        $(".fc-month-view-button").hide();
        $(".fc-week-view-button").show();
    });

    $(".fc-toolbar .fc-left")
        .append(switchToWeekButton)
        .append(switchToMonthButton);
}

/**
 * update calendar event dates by user on edit order
 */
function userUpdateEvent() {
    hideErrorBoxes();

    errorHandling("ACHTUNG! Diese Änderung kann nicht rückgängig gemacht werden!", "#info-calendar-message-box");

    var startTime = $('#user-edit-dropdown-von').val();
    var endTime = $('#user-edit-dropdown-bis').val();
    var isHourly = startTime !== null || endTime !== null;

    if (isHourly) {
        var startDateTime = $("#start-date").val() + " " + startTime;
        var endDateTime = $("#end-date").val() + " " + endTime;
        var collision = checkEventCollision(formatCalendarDateTimeCompare(startDateTime), formatCalendarDateTimeCompare(endDateTime));
    } else {
        var collision = checkEventCollision(formatCalendarDateCompare($("#start-date").val()), formatCalendarDateCompare($("#end-date").val()));
    }

    if(collision){
        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "newOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "myOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "new_event";
        });

        if (isHourly) {
            createEvent(formatCalendarDateTimeCompare(startDateTime), formatCalendarDateTimeCompare(endDateTime), isHourly);
        } else {
            createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()), isHourly);
        }

        $("#button-save-order-change").prop('disabled', false);
    } else {
        hideErrorBoxes();
        errorHandling("Ihre Auswahl steht in Konflikt mit einem anderen Bestelltermin", "#error-calendar-message-box");
        $("#button-save-order-change").prop('disabled', true);
    }
}

/**
 * update calendar event dates by poweruser on create order
 */
function orderAddUpdateEvent() {

    var startTime = $('#pu_orderAdd-dropdown-von').val();
    var endTime = $('#pu_orderAdd-dropdown-bis').val();
    var isHourly = startTime !== null || endTime !== null;


    var startDateTime = $("#orderAdd-start-date").val();
    var endDateTime = $("#orderAdd-end-date").val();
    if (isHourly) {
        startDateTime = $("#orderAdd-start-date").val() + " " + startTime;
        endDateTime = $("#orderAdd-end-date").val() + " " + endTime;
    }

    $("#orderAdd-calendar").fullCalendar('removeEvents', function (event) {
        return event.className == "newOrder";
    });

    $("#orderAdd-calendar").fullCalendar('removeEvents', function (event) {
        return event.className == "new_event";
    });

    if (isHourly) {
        orderAddCreateEvent(formatCalendarDateTimeCompare(startDateTime), formatCalendarDateTimeCompare(endDateTime), isHourly);
    } else {
        orderAddCreateEvent(formatCalendarDate(startDateTime), formatCalendarEndDate(endDateTime), isHourly);
    }

    $("#button-save-orderAdd-change").prop('disabled', false);
}

/**
 * Takes a Date and returns a string in the format "yyyy-mm-dd hh:mm:ss"
 * (25.01.2024 13:30) -> (2024-01-25 13:30:00-00:00)
 */
function formatCalendarDateTimeCompare(date) {
    var temp_date = date.split(" ");
    var dateComponents = temp_date[0].split(".");
    var timeComponents = temp_date[1].split(":");
    var new_date = new Date(
        dateComponents[2] + "-" + dateComponents[1] + "-" + dateComponents[0] +
        "T" + timeComponents[0] + ":" + timeComponents[1] + ":00-00:00"
    );
    return new_date.getUTCFullYear() +
        "-" +
        formatTwoDigit(new_date.getUTCMonth() + 1) +
        "-" +
        formatTwoDigit(new_date.getUTCDate()) +
        " " +
        formatTwoDigit(new_date.getUTCHours()) +
        ":" +
        formatTwoDigit(new_date.getUTCMinutes()) +
        ":00";
}

/**
 * show calendar error msg
 * @param msg
 * @param box
 */
function errorHandling(msg, box) {
    $(box).html(msg);
    $(box).css("display", "block");
    $("#button-save-order-change").prop('disabled', true);
}

/**
 * hide calendar error msg
 */
function hideErrorBoxes() {
    $('#error-calendar-message-box').css("display", "none");
    $("#info-calendar-message-box").css("display", "none");
}

/**
 * format start date for calendar event
 * @param date
 * @returns {string}
 */
function formatCalendarDate(date) {
    var temp_date = date.split(".");
    var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
    return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate());
}

/**
 * format end date for calendar event
 * add one day extra, fullcalendar bug
 * @param date
 * @returns {string}
 */
function formatCalendarEndDate(date) {
    var temp_date = date.split(".");
    var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
    new_date.setDate(new_date.getUTCDate() + 1);
    return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate());
}

/**
 * create calendar event
 * @param start
 * @param end
 * @param isHourly
 */
function createEvent(start, end, isHourly) {

    $("#calendar").fullCalendar('renderEvent',
        {
            title: isHourly ? extractTimeFromDate(start) + " - " + extractTimeFromDate(end) : "",
            start: start,
            end: end,
            rendering: !isHourly ? "background" : "",
            className: "newOrder",
            color: "#04B404"
        },
        true
    );

    if(isHourly) {
        var endPlus30 = addMinutesToTime(end.split(' ')[1].substring(0, 5), 30);
        var finalEndDate = end.split(' ')[0] + " " + endPlus30 + ":00";

        $("#calendar").fullCalendar('renderEvent',
            {
                title: "Korrektur Personal",
                start: end,
                end: finalEndDate,
                rendering: "",
                className: "newOrder",
                color: "#04B404"
            },
            true
        );
    }

    $('#themebox-infobox-select-date').css("display", "block");
    $('#carousel-right').prop('disabled', false);
}

/**
 * Add 30 minutes to time
 */
function addMinutesToTime(time, minutes) {
    var timeArray = time.split(':');
    var hours = parseInt(timeArray[0], 10);
    var mins = parseInt(timeArray[1], 10);

    var totalMinutes = hours * 60 + mins;
    var newTotalMinutes = totalMinutes + minutes;

    var newHours = Math.floor(newTotalMinutes / 60);
    var newMins = newTotalMinutes % 60;

    return padWithZero(newHours) + ':' + padWithZero(newMins);
}

function padWithZero(value) {
    return value < 10 ? '0' + value : value;
}

/**
 * create calendar event
 */
function orderAddCreateEvent(start, end, isHourly) {
    $("#orderAdd-calendar").fullCalendar('renderEvent',
        {
            title: isHourly ? extractTimeFromDate(start) + " - " + extractTimeFromDate(end) : "",
            start: start,
            end: end,
            rendering: !isHourly ? "background" : "",
            className: "new_event",
            color: "#04B404"
        },
        true
    );

    $('#themebox-infobox-select-date').css("display", "block");
    $('#carousel-right').prop('disabled', false);

    $('#orderAdd-calendar').fullCalendar('gotoDate', start);
}

/**
 * Takes a Date and returns a string in the format "hh:mm"
 * 2024-01-24 08:30:00 -> 08:30
 */
function extractTimeFromDate(dateString) {
    // Parse the input date string
    const dateObject = new Date(dateString);

    // Extract hours and minutes
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    // Combine hours and minutes
    return `${hours}:${minutes}`;
}

/**
 * format date for collision comparision
 * @param date
 * @returns {Date}
 */
function formatCalendarDateCompare(date) {
    var temp_date = date.split(".");
    var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0]);
    return new_date;
}

/**
 * check calendar event collision with new event
 * @param start
 * @param end
 * @returns {boolean}
 */
function checkEventCollision(start, end) {
    var status = true;

        $.each($("#calendar").fullCalendar('clientEvents'), function (index, value) {
            if (value["className"][0] == "block") {
                if ((start >= value["start"] && start <= value["end"] - 1 || start <= value["start"] && end >= value["start"])) {
                    status = false;
                }
            }
        });


    return status;
}

/**
 * format date for date picker
 * @param date
 * @returns {string}
 */
function formatDate(date) {
    var tmp_data = date.split("-");
    return tmp_data[2] + "." + tmp_data[1] + "." + tmp_data[0];
}

/**
 * Takes a Date and returns a string in the format "dd.mm.yyyy"
 */
function formatDateWithoutTime(date) {
    var tmp_data = date.split(" ");
    var tmp_date = tmp_data[0].split("-");
    return tmp_date[2] + "." + tmp_date[1] + "." + tmp_date[0];
}

/**
 * Takes a Date and returns a string in the format "hh:mm"
 */
function formatTimeWithoutDate(date) {
    var tmp_data = date.split(" ");
    var tmp_time = tmp_data[1].split(":");
    return tmp_time[0] + ":" + tmp_time[1];

}

/**
 * add block days to the end date
 * @param date
 * @returns {string}
 */
function addBlockEnddate(date) {
    var temp_date = new Date(date + "T00:00:00-00:00");
    temp_date.setDate(temp_date.getUTCDate() + 8);
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * add block days to start date
 * @param date
 * @returns {string}
 */
function addBlockStartdate(date) {
    var temp_date = new Date(date + "T00:00:00-00:00");
    temp_date.setDate(temp_date.getUTCDate() - 7);
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * add time to start date for new event
 * @param date
 * @returns {string}
 */
function addTime(date) {
    var temp_date = new Date(date + "T00:00:00-00:00");
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * add time to end date for new event
 * @param date
 * @returns {string}
 */
function addEndTime(date) {
    var temp_date = new Date(date + "T00:00:00-00:00");
    temp_date.setDate(temp_date.getUTCDate() + 1);
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * two digit format for datepicker value
 * @param number
 * @returns {*}
 */
function formatTwoDigit(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}