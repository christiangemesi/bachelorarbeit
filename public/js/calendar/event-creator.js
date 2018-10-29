/**
 * add calendar event
 */
function addEvent() {
    var collision = checkEventCollision(formatCalendarDateCompare($("#start-date").val()), formatCalendarDateCompare($("#end-date").val()));
    hideErrorBoxes();
    if(collision){
        $("#calendar").fullCalendar('removeEvents', function(event) {
            return event.className == "newOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function(event) {
            return event.className == "myOrder";
        });

        createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()));
        $("#button-save-order-change").prop('disabled', false);
    }else{
        errorHandling("Ihre Auswahl steht in Konflikt mit einem anderen Bestelltermin", "#error-calendar-message-box");
    }
}


/**
 * update calendar event dates
 */
function updateEvent() {
    hideErrorBoxes();

        $("#calendar").fullCalendar('removeEvents', function(event) {
            return event.className == "newOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function(event) {
            return event.className == "myOrder";
        });

        createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()));
        $("#button-save-order-change").prop('disabled', false);
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
function hideErrorBoxes(){
    $('#error-calendar-message-box').css("display", "none");
    $("#info-calendar-message-box").css("display", "none");
}

/**
 * format start date for calendar event
 * @param date
 * @returns {string}
 */
function formatCalendarDate(date){
    var temp_date = date.split(".");
    var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
    return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() +1) + "-" + formatTwoDigit(new_date.getUTCDate());
}

/**
 * format end date for calendar event
 * add one day extra, fullcalendar bug
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
 * create calendar event
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
            className: "newOrder",
            color: "#04B404"
        },
        true
    );

    $('#themebox-infobox-select-date').css("display", "block");
    $('#carousel-right').prop('disabled', false);
}

/**
 * format date for collision comparision
 * @param date
 * @returns {Date}
 */
function formatCalendarDateCompare(date){
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
function checkEventCollision(start, end){
    var status = true;
    $.each($("#calendar").fullCalendar('clientEvents'), function (index, value) {
        if(value["className"][0]== "block") {
            if ((start >= value["start"] && start <= value["end"]-1 || start <= value["start"]  && end >= value["start"])) {
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
 * add block days to the end date
 * @param date
 * @returns {string}
 */
function addBlockEnddate(date){
    var temp_date = new Date(date + "T00:00:00-00:00");
    temp_date.setDate(temp_date.getUTCDate() + 8);
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() +1 ) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * add block days to start date
 * @param date
 * @returns {string}
 */
function addBlockStartdate(date){
    var temp_date = new Date(date + "T00:00:00-00:00");
    temp_date.setDate(temp_date.getUTCDate() - 7);
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() +1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * add time to start date for new event
 * @param date
 * @returns {string}
 */
function addTime(date){
    var temp_date = new Date(date + "T00:00:00-00:00");
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() +1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * add time to end date for new event
 * @param date
 * @returns {string}
 */
function addEndTime(date){
    var temp_date = new Date(date + "T00:00:00-00:00");
    temp_date.setDate(temp_date.getUTCDate() + 1);
    return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() +1) + "-" + formatTwoDigit(temp_date.getUTCDate());
}

/**
 * two digit format for datepicker value
 * @param number
 * @returns {*}
 */
function formatTwoDigit(number){
    if (number<10) {
        return '0' + number;
    }
    return number;
}