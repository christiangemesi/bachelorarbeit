/**
 * block to next sunday with event
 */
function addBlockDateFromToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;

    var enddate = getNextDayOfWeek(new Date(), 7);
    enddate.setDate(enddate.getUTCDate() + 1);
    enddate.setHours(1);
    var edd = enddate.getDate();
    var emm = enddate.getMonth() + 1; //January is 0!
    var eyyyy = enddate.getFullYear();

    if (edd < 10) {
        edd = '0' + edd;
    }
    if (emm < 10) {
        emm = '0' + emm;
    }
    enddate = eyyyy + '-' + emm + '-' + edd;

    $("#calendar").fullCalendar('renderEvent',
        {
            title: "",
            start: today,
            end: enddate,
            rendering: "background",
            className: "block"
        },
        true
    );
    $("#orderAdd-calendar").fullCalendar('renderEvent',
        {
            title: "",
            start: today,
            end: enddate,
            rendering: "background",
            className: "block"
        },
        true
    );
}

/**
 * EXTERNAL CODE
 * get next sunday as date
 * @param date
 * @param dayOfWeek
 * @returns {Date}
 */
function getNextDayOfWeek(date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}