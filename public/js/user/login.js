$(document).ready(function () {
    var orders;
    var old_startdate;
    var old_enddate;
    var listOfBlockedDates = Array();
    var dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
    var dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

    dayToCalculateNextSaturdaysStart = getNextDayOfWeek(new Date, 6);
    dayToCalculateNextSaturdaysStart.setHours(14);
    dayToCalculateNextSaturdaysStart.setMinutes(0);
    dayToCalculateNextSaturdaysStart.setSeconds(0);

    dayToCalculateNextSaturdaysEnd = getNextDayOfWeek(new Date, 6);
    dayToCalculateNextSaturdaysEnd.setHours(18);
    dayToCalculateNextSaturdaysEnd.setMinutes(0);
    dayToCalculateNextSaturdaysEnd.setSeconds(0);


    var selectedThemeboxInfo = []


    $('#start-date').keydown(function () {
        return false;
    });

    $('#end-date').keydown(function () {
        return false;
    });

    $(".fc-corner-right").click(function () {
        blockNextFiveSundaysInCalendar();
        blockNextFiveSaturdayAfterTwoPmInCalendar();
    });

    $(".fc-corner-left").click(function () {
        blockPreviousFiveSundaysInCalendar();
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

    $('#user-login-button').attr('disabled', true);

    //set focus to name field
    $("#name").focus();

    /**
     * enter press on order number field
     */
    $('#ordernumber').keyup(function (e) {
        if (checkFields()) {
            if (e.keyCode == 13) {
                checkLogin();
            }
        }
    });

    $('#name').keyup(function (e) {
        checkFields();
    });

    /**
     * Enables login button when input fields have values
     * @returns {boolean}
     */
    function checkFields() {
        if ($('#ordernumber').val().length != 0 && $('#name').val().length != 0) {
            $('#user-login-button').attr('disabled', false);
            return true;
        } else {
            $('#user-login-button').attr('disabled', true);
            return false;
        }
    }


    /**
     * edit order button click
     */
    $('#user-login-button').click(function (e) {
        checkLogin();
        $("#error-calendar-message-box").css("display", "none");
    });


    $('#order-edit-user-modal').on('shown.bs.modal', function () {
        $("#calendar").fullCalendar('render');
    });

    /**
     * user login
     */
    function checkLogin() {
        selectedThemeboxInfo = [];

        dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
        dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

        $.ajax({
            url: "login",
            type: 'POST',
            data: {name: $('#name').val(), ordernumber: $('#ordernumber').val()},
            success: function (response) {
                selectedThemeboxInfo = response;

                bindEndData();
                loadViewChangeButtons();

                blockDatesInDatepicker();
                blockNextFiveSundaysInCalendar();
                blockPreviousFiveSundaysInCalendar();


                $("#calendar").fullCalendar("render");
                $("#calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "newOrder";
                });

                $('#login-user-error-message-box').css('display', 'none');

                $('#order-edit-user-modal').modal('show');
                $('#order-edit-user-modal').modal(
                    {
                        backdrop: 'static',
                        keyboard: false
                    }
                );

                blockNextFiveSaturdayAfterTwoPmInCalendar();


                var isHourlyOrder = response["themebox"]["fk_order_type"] === 1;
                if (isHourlyOrder) {
                    $("#user-edit-themebox-time-select").show();
                    $("#end-date_box").hide();

                    blockStartTimes();
                    blockEndTimes();

                    //select the option in the dropdown that matches the start time
                    $('#user-edit-dropdown-von option[value="' + formatTimeWithoutDate(response["order"][0]["startdate"]) + '"]').prop("selected", true);
                    $('#user-edit-dropdown-bis option[value="' + formatTimeWithoutDate(response["order"][0]["enddate"]) + '"]').prop("selected", true);

                    $("#order-id").val(response["order"][0]["pk_hourly_order"]);
                } else {
                    blockTillNextSunday();
                    addBlockDateFromToday();
                    $("#user-edit-themebox-time-select").hide();
                    $("#end-date_box").show();
                    $("#order-id").val(response["order"][0]["pk_order"]);
                }

                var editable = false;
                orders = "";

                if (response["order"][0]["fk_status"] != 1) {
                    editable = true;
                }

                $("#ordernumber-edit").val($('#ordernumber').val());
                $("#themebox-title").val(response["themebox"]["title"]);
                $("#start-date").val(formatDateWithoutTime(response["order"][0]["startdate"])).prop('disabled', editable);
                $("#end-date").val(formatDateWithoutTime(response["order"][0]["enddate"])).prop('disabled', editable);
                $("#datecreated-login").val(formatDate2(response["order"][0]["datecreated"]));

                $("#status").val(response["status"]["name"]);
                $("#lastNameInput").val(response["order"][0]["name"]).prop('disabled', editable);
                $("#firstNameInput").val(response["order"][0]["surname"]).prop('disabled', editable);
                $("#emailInput").val(response["order"][0]["email"]).prop('disabled', editable);
                $("#phone").val(response["order"][0]["phonenumber"]).prop('disabled', editable);
                $("#nebisusernumber").val(response["order"][0]["nebisusernumber"]).prop('disabled', editable);
                $("#delivery").val(response["delivery"]["type"]);
                $("#user-edit-dropdown-von").prop('disabled', editable);
                $("#user-edit-dropdown-bis").prop('disabled', editable);



                if (response["order"][0]["fk_status"] === 1) {
                    lastNameValidate();
                    firstNameValidate();
                    emailValidate();
                    phoneValidate();
                    nebisValidate();
                }

                if (2 === response["order"][0]["fk_delivery"]) {
                    $("#order-delivery-type-deliver").css("display", "block");
                    $("#schoolNameInput").val(response["order"][0]["schoolname"]);
                    $("#schoolstreetInput").val(response["order"][0]["schoolstreet"]);
                    $("#schoolcityInput").val(response["order"][0]["schoolcity"]);
                    $("#placeofhandoverInput").val(response["order"][0]["placeofhandover"]);
                    $("#schoolphoneInput").val(response["order"][0]["schoolphonenumber"]);
                }

                var footer = '<div class="row">';
                if (!editable) {
                    footer += '<div class="col-md-4"><button type="button" class="btn btn-default float-left" id="user-cancel-edit-order" data-dismiss="modal">Schliessen</button></div>';
                    footer += '<div class="col-md-4"><button type="submit" id="button-save-order-change" class="btn btn-primary float-center" data-dismiss="modal" tabindex=8>Speichern</button></div>';
                    footer += '<div class="col-md-4"><button type="button" class="btn btn-danger float-right" id="btn-remove-order" data-dismiss="modal">Bestellung Löschen</button></div>';
                } else {
                    footer += '<div class="col-md-12"><button type="button" class="btn btn-default float-right" data-dismiss="modal">Schliessen</button></div>';
                }

                $('#modal-view-order-footer').html(footer);

                orders = response["orders"];
                old_startdate = $("#start-date").val();
                old_enddate = $("#end-date").val();


                /**
                 * Removes order on button click
                 */
                $('#btn-remove-order').click(function () {
                    $.ajax({
                        url: "../admin/removeOrder",
                        type: 'POST',
                        data: {order_id: $('#order-id').val()},
                        success: function (response) {
                            showSuccessModal("Bestellung wurde erfolgreich gelöscht");
                        },
                        error: function (xhr, status, error) {
                            showFailureModal("Es ist ein Fehler beim Löschen passiert", xhr);
                        }
                    })
                });

                /**
                 * Saves changes of edit order
                 */
                $("#button-save-order-change").click(function () {
                    $.ajax({
                        url: "../user/updateOrderDates",
                        type: 'POST',
                        data: {order_data: $('#order-edit-user-form').serializeArray()},
                        success: function (response) {
                            showSuccessModal("Bestellung wurde erfolgreich angepasst");
                        },
                        error: function (xhr, status, error) {
                            showFailureModal("Es ist ein Fehler bei der Bearbeitung passiert", xhr);
                        }
                    })
                });

                /**
                 * Renders calendar events
                 */
                $.each(orders, function (index, value) {
                    if (value["pk_order"] == $("#order-id").val()) {
                        $('#calendar').fullCalendar("renderEvent", {
                            title: "",
                            start: addTime(value["startdate"]),
                            end: addEndTime(value["enddate"]),
                            rendering: "background",
                            className: "myOrder",
                            color: "#04B404"
                        }, true);


                        var dateArr = computeDayBetweenStartAndEnd(new Date(addBlockStartdateDailyOrder(value['startdate'])), new Date(addBlockEnddate(value['enddate'])));
                        for (var i = 0; i <= dateArr.length; i++) {
                            listOfBlockedDates.push(dateArr[i]);
                        }

                        $('#calendar').fullCalendar('gotoDate', addTime(value["startdate"]));
                    } else if (value["pk_hourly_order"] == $("#order-id").val()) {
                        var startDateTime = value["startdate"] + "-00:00";
                        var endDateTime = value["enddate"] + "-00:00";
                        $('#calendar').fullCalendar("renderEvent", {
                            title: "",
                            start: startDateTime,
                            end: endDateTime,
                            rendering: "",
                            className: "myOrder",
                            color: "#04B404"
                        }, true);
                        $('#calendar').fullCalendar('gotoDate', startDateTime);
                    } else { // render blocked events
                        var startDateTime = value["startdate"] + "-00:00";
                        var endDateTime = value["enddate"] + "-00:00";
                        $('#calendar').fullCalendar("renderEvent", {
                            title: "",
                            start: !isHourlyOrder ? addBlockStartdate(value["startdate"]) : startDateTime,
                            end: !isHourlyOrder ? addBlockEnddate(value["enddate"]) : endDateTime,
                            rendering: !isHourlyOrder ? "background" : "",
                            className: "block"
                        }, true);
                    }
                });
            },
            error: function (xhr, status, error) {
                $('#login-user-error-message-box').css('display', 'block');
                $('#login-user-error-message-box').html('Die Bestellung konnte nicht gefunden werden. Bitte überprüfen Sie Nachname der Bestellperson sowie Bestellnummer. <br>Ansonsten kontaktieren Sie die Campusbibliothek unter <a href="mailto:bibliothek.windisch@fhnw.ch">bibliothek.windisch@fhnw.ch</a> ');
            }
        })
    }

    function blockTillNextSunday() {
        var nextSunday = getNextDayOfWeek(new Date(), 7);

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        var dateArr = computeDayBetweenStartAndEnd(tomorrow, nextSunday);

        for (var i = 0; i <= dateArr.length; i++) {
            listOfBlockedDates.push(dateArr[i]);
        }
    }

    function addBlockStartdateDailyOrder(date) {
        var temp_date = new Date(date + "T00:00:00-00:00");
        temp_date.setDate(temp_date.getUTCDate() - 7);
        return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
    }

    function computeDayBetweenStartAndEnd(startDate, endDate) {

        var arr = new Array();
        var dt = new Date(startDate);

        while (dt <= endDate) {
            arr.push(formatDate(new Date(dt)));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    }

    function blockNextFiveSundaysInCalendar() {
        for (var i = 0; i < 20; i++) {
            blockAllSundaysEvent(formatDate(dayToCalculateNextSundays));
            dayToCalculateNextSundays.setDate(dayToCalculateNextSundays.getDate() + 7);
        }
    }

    function blockPreviousFiveSundaysInCalendar() {
        for (var i = 0; i < 10; i++) {
            dayToCalculatePreviousSundays.setDate(dayToCalculatePreviousSundays.getDate() - 7);
            blockAllSundaysEvent(formatDate(dayToCalculatePreviousSundays));
        }
    }

    function blockDatesInDatepicker() {
        var nextSunday = getNextDayOfWeek(new Date, 7);
        for (var i = 0; i < 5; i++) {
            listOfBlockedDates.push(formatDate(nextSunday));
            nextSunday.setDate(nextSunday.getDate() - 7);
        }
        nextSunday = getNextDayOfWeek(new Date, 7);
        for (var i = 0; i < 200; i++) {
            nextSunday.setDate(nextSunday.getDate() + 7);
            listOfBlockedDates.push(formatDate(nextSunday));
        }
    }

    function blockAllSundaysEvent(Sunday) {
        $("#calendar").fullCalendar('renderEvent',
            {
                id: "blocked",
                title: "",
                start: Sunday,
                rendering: "background",
                className: "blocked_event",
                color: "#ffad00"
            },
            true
        );
    }

    function blockAllSaturdayAfterTwoPmEvent(start, end) {
        $("#calendar").fullCalendar('renderEvent',
            {
                title: "Geschlossen",
                start: start,
                end: end,
                rendering: "",
                className: "blocked_event",
                color: "#ffad00"
            },
            true
        );
    }

    function blockNextFiveSaturdayAfterTwoPmInCalendar() {
        for(var i = 0; i < 20; i++) {
            blockAllSaturdayAfterTwoPmEvent(dayToCalculateNextSaturdaysStart, dayToCalculateNextSaturdaysEnd);
            dayToCalculateNextSaturdaysStart.setDate(dayToCalculateNextSaturdaysStart.getDate() + 7);
            dayToCalculateNextSaturdaysEnd.setDate(dayToCalculateNextSaturdaysEnd.getDate() + 7);
        }
    }

    function blockEndTimes() {

        if(selectedThemeboxInfo.themebox.fk_order_type === 2){
            return;
        }

        addAllHoursToDropdown("#user-edit-dropdown-bis")

        // Reset #dropdown-bis and enable it
        var endDate = selectedThemeboxInfo.order[0].enddate.split(' ')[0];

        // Get the selected start time
        var selectedStartTime = selectedThemeboxInfo.order[0].startdate.split(' ')[1].substring(0, 5);
        // Find the corresponding orders for the selected date and start time
        var selectedDateOrders = getSelectedDateOrders(endDate);

        // Create an array for blocked hours on the selected date and start time
        var blockedHours = [];
        //add all the values until selectedStartTime+30 in 30-minute intervals to blockedHours
        var currentBlockStart = '08:00';
        while (currentBlockStart < selectedStartTime) {
            var currentBlockEnd = addMinutesToTime(currentBlockStart, 30);

            blockedHours.push({
                start: currentBlockStart,
                end: currentBlockEnd
            });

            currentBlockStart = addMinutesToTime(currentBlockStart, 30);
        }

        //add the selectedStartTime to blockedHours
        blockedHours.push({
            start: selectedStartTime,
            end: selectedStartTime
        });

        // find the first order that starts after the selectedStartTime
        var firstOrderAfterSelectedStartTime = selectedDateOrders.find(function (order) {
            return order.startdate.split(' ')[1].substring(0, 5) > selectedStartTime;
        });

        //add all the values after the firstOrderAfterSelectedStartTime in 30-minute intervals to blockedHours
        if (firstOrderAfterSelectedStartTime) {
            var currentBlockStart = firstOrderAfterSelectedStartTime.startdate.split(' ')[1].substring(0, 5);
            while (currentBlockStart < '18:00') {
                var currentBlockEnd = addMinutesToTime(currentBlockStart, 30);

                blockedHours.push({
                    start: currentBlockStart,
                    end: currentBlockEnd
                });

                currentBlockStart = addMinutesToTime(currentBlockStart, 30);
            }
        }

        // by default push 18:00 as blocked hour
        blockedHours.push({
            start: '18:00',
            end: '18:00'
        });

        if (new Date(endDate).getDay() === 6) {
            blockedHours.push({
                start: '14:00',
                end: '18:00'
            });
        }

        removeBlockedHoursFromDropdown(blockedHours, "#user-edit-dropdown-bis");
    }

    function blockStartTimes() {
        if(selectedThemeboxInfo.themebox.fk_order_type === 2){
            return;
        }

        addAllHoursToDropdown("#user-edit-dropdown-bis")

        var startDate = selectedThemeboxInfo.order[0].startdate.split(' ')[0];

        // Find the corresponding orders for the selected date and start time
        var selectedDateOrders = getSelectedDateOrders(startDate);
        var selectedOrderId = selectedThemeboxInfo.order[0].pk_hourly_order;

        // Create an array for blocked hours on the selected date
        var blockedHours = [];

        // by default push 17:30 and 18:00 as blocked hour
        blockedHours.push({
            start: '17:30',
            end: '18:00'
        });

        if (new Date(startDate).getDay() === 6) {
            blockedHours.push({
                start: '13:30',
                end: '18:00'
            });
        }

        selectedDateOrders.forEach(function (order) {
            var startHour = order.startdate.split(' ')[1].substring(0, 5);
            var endHour = order.enddate.split(' ')[1].substring(0, 5);

            // Add all the values between startHour-30 and endHour+30 in 30-minute intervals to blockedHours
            //dont add the selected order to blockedHours
            if (order.pk_hourly_order !== selectedOrderId) {
                var currentBlockStart = subtractMinutesFromTime(startHour, 30);
                while (currentBlockStart < endHour) {
                    var currentBlockEnd = addMinutesToTime(currentBlockStart, 30);

                    blockedHours.push({
                        start: currentBlockStart,
                        end: currentBlockEnd
                    });

                    currentBlockStart = addMinutesToTime(currentBlockStart, 30);
                }
            }
        });


        removeBlockedHoursFromDropdown(blockedHours, "#user-edit-dropdown-von");

    }

    $("#user-edit-dropdown-von").change(function () {
        $("#user-edit-dropdown-bis").prop("disabled", false);
        setEndingTimesSelectionOnStartzeitChange();
        removeEvent();
    });

    $("#user-edit-dropdown-bis").change(function () {
        userUpdateEvent();
    });

    function setEndingTimesSelectionOnStartzeitChange() {

        addAllHoursToDropdown("#user-edit-dropdown-bis");

        // Reset #dropdown-bis and enable it
        var endDate = formatDate($("#end-date").datepicker("getDate"));

        // Get the selected start time
        var selectedStartTime = $("#user-edit-dropdown-von").val();
        // Find the corresponding orders for the selected date and start time
        var selectedDateOrders = getSelectedDateOrders(endDate);


        // Create an array for blocked hours on the selected date and start time
        var blockedHours = [];
        //add all the values until selectedStartTime+30 in 30-minute intervals to blockedHours
        var currentBlockStart = '08:00';
        while (currentBlockStart < selectedStartTime) {
            var currentBlockEnd = addMinutesToTime(currentBlockStart, 30);

            blockedHours.push({
                start: currentBlockStart,
                end: currentBlockEnd
            });

            currentBlockStart = addMinutesToTime(currentBlockStart, 30);
        }
        //add the selectedStartTime to blockedHours
        blockedHours.push({
            start: selectedStartTime,
            end: selectedStartTime
        });

        // find the first order that starts after the selectedStartTime
        var firstOrderAfterSelectedStartTime = selectedDateOrders.find(function (order) {
            return order.startdate.split(' ')[1].substring(0, 5) > selectedStartTime;
        });


        //add all the values after the firstOrderAfterSelectedStartTime in 30-minute intervals to blockedHours
        if (firstOrderAfterSelectedStartTime) {
            var currentBlockStart = firstOrderAfterSelectedStartTime.startdate.split(' ')[1].substring(0, 5);
            while (currentBlockStart < '18:00') {
                var currentBlockEnd = addMinutesToTime(currentBlockStart, 30);

                blockedHours.push({
                    start: currentBlockStart,
                    end: currentBlockEnd
                });

                currentBlockStart = addMinutesToTime(currentBlockStart, 30);
            }
        }

        // by default push 18:00 as blocked hour
        blockedHours.push({
            start: '18:00',
            end: '18:00'
        });

        // if the selected date is a saturday push 14:00 until 18:00 as blocked hour
        if (new Date(endDate).getDay() === 6) {
            blockedHours.push({
                start: '14:00',
                end: '18:00'
            });
        }


        removeBlockedHoursFromDropdown(blockedHours, "#user-edit-dropdown-bis");
    }

    function formatDate2(date) {
        var tmp_data = date.split("-");
        return tmp_data[2] + "." + tmp_data[1] + "." + tmp_data[0];
    }

    function loadViewChangeButtons() {


        //prevent buttons from being added multiple times
        if ($(".fc-toolbar .fc-left .fc-week-view-button").length !== 0) {
            return;
        }

        var switchToWeekButton = $('<button type="button" class="fc-week-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Wochensicht</button>');
        var switchToMonthButton = $('<button type="button" class="fc-month-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Monatssicht</button>');
        switchToMonthButton.hide();


        switchToWeekButton.on("click", function () {
            $("#calendar").fullCalendar("changeView", "agendaWeek");
            //dont show the week button, instead show the month button
            switchToWeekButton.hide();
            switchToMonthButton.show();
        });

        switchToMonthButton.on("click", function () {
            $("#calendar").fullCalendar("changeView", "month");
            //dont show the month button, instead show the week button
            switchToMonthButton.hide();
            switchToWeekButton.show();
        });

        $(".fc-toolbar .fc-left").append(switchToWeekButton);
        $(".fc-toolbar .fc-left").append(switchToMonthButton);
    }

    /**
     * Datepicker start date onselect
     */
    $("#start-date").datepicker({
        dateFormat: "dd.mm.yy",
        minDate: 0,
        beforeShowDay: (function (date) {
            let string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            return [listOfBlockedDates.indexOf(string) === -1]
        }),
        onSelect: function (date) {
            bindEndData();

            if (selectedThemeboxInfo.themebox.fk_order_type === 1) { // Hourly order
                // reset the dropdown-von and dropdown-bis
                $("#user-edit-dropdown-von").val($("#user-edit-dropdown-von option:first").val());
                $("#user-edit-dropdown-bis").val($("#user-edit-dropdown-bis option:first").val());
                //disable dropdown-bis
                $("#user-edit-dropdown-bis").prop("disabled", true);
                removeEvent();
                //reset the carrusel button
                $("#carousel-right").prop("disabled", true);
                setStartingTimesSelection();
            }

            if ($("#end-date").datepicker("getDate") != null) {
                if (selectedThemeboxInfo.themebox.fk_order_type === 2) { // daily order
                    userUpdateEvent();
                    $("#end-date").removeAttr("disabled");
                    $("#info-calendar-message-box").css("display", "none");
                }
            }
        }
    });

    function setStartingTimesSelection() {

        //cleanup to show correct values
        addAllHoursToDropdown("#user-edit-dropdown-von");
        hideErrorBoxes();


        var startDate = formatDate($("#start-date").datepicker("getDate"));
        var selectedDateOrders = getSelectedDateOrders(startDate);

        // Create an array for blocked hours on the selected date
        var blockedHours = [];
        var blockedThirtyMinutes = 0;

        // by default push 17:30 and 18:00 as blocked hour
        blockedHours.push({
            start: '17:30',
            end: '18:00'
        });
        blockedThirtyMinutes += 30;

        if (new Date(startDate).getDay() === 6) {
            blockedHours.push({
                start: '13:30',
                end: '18:00'
            });
            blockedThirtyMinutes += 9*30;
        }

        selectedDateOrders.forEach(function (order) {
            var startHour = order.startdate.split(' ')[1].substring(0, 5);
            var endHour = order.enddate.split(' ')[1].substring(0, 5);

            if(order.pk_hourly_order !== selectedThemeboxInfo.order[0].pk_hourly_order) {
                // Add all the values between startHour-30 and endHour+30 in 30-minute intervals to blockedHours
                var currentBlockStart = subtractMinutesFromTime(startHour, 30);
                while (currentBlockStart < endHour) {
                    var currentBlockEnd = addMinutesToTime(currentBlockStart, 30);

                    blockedHours.push({
                        start: currentBlockStart,
                        end: currentBlockEnd
                    });
                    blockedThirtyMinutes += 30;

                    currentBlockStart = addMinutesToTime(currentBlockStart, 30);
                }
            }
        });

        if(blockedThirtyMinutes >= 600) {
            $("#carousel-right").prop("disabled", true);
            $("#user-edit-dropdown-von").prop("disabled", true);

            errorHandling("Der gewählte Tag ist leider ausgebucht. Bitte wählen Sie einen anderen Tag.", "#error-calendar-message-box");
        }


        removeBlockedHoursFromDropdown(blockedHours, "#user-edit-dropdown-von");
    }

    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (day < 10) {
            day = '0' + day;
        } else {
            day = '' + day;
        }

        if (month < 10) {
            month = '0' + month;
        } else {
            month = '' + month;
        }

        return year + '-' + month + '-' + day;
    }

    function getSelectedDateOrders(date) {
        return selectedThemeboxInfo.orders.filter(function (order) {
            return order.startdate.startsWith(date);
        });
    }

    function removeBlockedHoursFromDropdown(blockedHours, dropdownClassName) {
        $(dropdownClassName + " option").each(function () {
            var optionValue = $(this).val();
            var optionText = $(this).text();

            // Check if the current option is within the blocked hours
            var isBlocked = blockedHours.find(function (blockedHour) {
                return blockedHour.start <= optionValue && optionValue <= blockedHour.end;
            });

            // If the current option is within the blocked hours, remove it
            if (isBlocked) {
                $(this).remove();
            }
        });
    }

    function subtractMinutesFromTime(time, minutes) {
        var timeArray = time.split(':');
        var hours = parseInt(timeArray[0], 10);
        var mins = parseInt(timeArray[1], 10);

        var totalMinutes = hours * 60 + mins;
        var newTotalMinutes = totalMinutes - minutes;

        var newHours = Math.floor(newTotalMinutes / 60);
        var newMins = newTotalMinutes % 60;

        return padWithZero(newHours) + ':' + padWithZero(newMins);
    }

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

    function addAllHoursToDropdown(dropdownClassName) {
        // Remove all options from the dropdown
        $(dropdownClassName).empty();

        console.log(dropdownClassName);

        if (dropdownClassName === "#user-edit-dropdown-von") {
            $(dropdownClassName).append('<option value="" selected disabled hidden>Startzeit</option>');
        } else {
            $(dropdownClassName).append('<option value="" selected disabled hidden>Endzeit</option>');
        }
        //add all the values from 08:00 until 18:00 in 30-minute intervals to dropdown
        var maxTime = '18:00';
        var currentTime = '08:00';
        while (currentTime <= maxTime) {
            $(dropdownClassName).append('<option value="' + currentTime + '">' + currentTime + '</option>');
            currentTime = addMinutesToTime(currentTime, 30);
        }
    }

    function removeEvent() {
        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "myOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "newOrder";
        });
    }

    /**
     * Datepicker end date onselect
     */
    $("#end-date").datepicker({
        dateFormat: "dd.mm.yy",
        beforeShowDay: (function (date) {
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            return [$.inArray(string, listOfBlockedDates) === -1]
        }),
        onSelect: function (date) {

            if (selectedThemeboxInfo.themebox.fk_order_type === 2) { // daily order
                userUpdateEvent();
            }
        }
    });

    /**
     * Specifies calendar properties
     */
    $("#calendar").fullCalendar({
        selectable: true,
        eventColor: "#f44242",
        height: "auto",
        minTime: '08:00:00',
        maxTime: '18:00:00',
        dayClick: function (date, allDay, jsEvent, view) {
            $("#info-calendar-message-box").html("Wählen Sie oben ihre gewünschte Ausleihperiode");
            $("#info-calendar-message-box").css("display", "block");
            $("#error-calendar-message-box").css("display", "none");
        },
        select: function (start, end, allDay) {
            $("#info-calendar-message-box").html("Wählen Sie oben ihre gewünschte Ausleihperiode");
            $("#info-calendar-message-box").css("display", "block");
            $("#error-calendar-message-box").css("display", "none");
        }
    });

    /**
     * bind start date and end date
     */



    function bindEndData() {
        var end_date = $('#end-date');
        var start_date = $("#start-date").datepicker('getDate');
        var min_date = $("#start-date").datepicker('getDate');
        end_date.datepicker('option', 'minDate', min_date);


        if (selectedThemeboxInfo.themebox.fk_order_type === 1) { // Hourly order
            //set the end date to the same as the start date
            $("#end-date").datepicker('setDate', $("#start-date").datepicker('getDate'));
            //enable the dropdowns
            $("#user-edit-dropdown-von").prop("disabled", false);
        }
    }


    /**
     * prevent on enter submit edit themebox form
     */
    $('#order-edit-user-form').on("keypress", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            return false;
        }
    });
});