$(document).ready(function () {
    let listOfBlockedDates = Array();
    let dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
    let dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

    var dayToCalculateNextSaturdaysStart = getNextDayOfWeek(new Date, 6);
    dayToCalculateNextSaturdaysStart.setHours(14);
    dayToCalculateNextSaturdaysStart.setMinutes(0);
    dayToCalculateNextSaturdaysStart.setSeconds(0);

    var dayToCalculateNextSaturdaysEnd = getNextDayOfWeek(new Date, 6);
    dayToCalculateNextSaturdaysEnd.setHours(18);
    dayToCalculateNextSaturdaysEnd.setMinutes(0);
    dayToCalculateNextSaturdaysEnd.setSeconds(0);


    var dayToCalculatePreviousSaturdaysStart = getNextDayOfWeek(new Date, 6);
    dayToCalculatePreviousSaturdaysStart.setDate(dayToCalculatePreviousSaturdaysStart.getDate() - 7);
    dayToCalculatePreviousSaturdaysStart.setHours(14);
    dayToCalculatePreviousSaturdaysStart.setMinutes(0);
    dayToCalculatePreviousSaturdaysStart.setSeconds(0);

    var dayToCalculatePreviousSaturdaysEnd = getNextDayOfWeek(new Date, 6);
    dayToCalculatePreviousSaturdaysEnd.setDate(dayToCalculatePreviousSaturdaysEnd.getDate() - 7);
    dayToCalculatePreviousSaturdaysEnd.setHours(18);
    dayToCalculatePreviousSaturdaysEnd.setMinutes(0);
    dayToCalculatePreviousSaturdaysEnd.setSeconds(0);

    var selectedThemeboxInfo = []

    $('[data-toggle="tooltip"]').tooltip();

    $('#start-date').keydown(function () {
        return false;
    });

    $('#end-date').keydown(function () {
        return false;
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
     * change order status
     */
    $(".status-update").on("change", function () {
        var status_data = this.value;

        $.ajax({
            url: "admin/updateState",
            type: 'POST',
            data: {status_data: status_data},
            headers: {
                'X-CSRFToken': $('meta[name="token"]').attr('content')
            },
            beforeSend: function () {
                $('#modal-order-edit-progress').modal('show');
            },
            success: function (response) {
                $('#modal-order-edit-progress').modal('toggle');
                if (1 === response) {
                    showSuccessModal("Das Ausleihobjekt ist bereit, die Bestellperson erhält eine Benachrichtigungs Email wenn es sich um eine Tagesbasierte Ausleihe handelt.");
                } else {
                    showSuccessModal("Status wurde erfolgreich geändert");
                }
            },
            error: function (xhr, status, error) {
                $('#modal-order-edit-progress').modal('toggle');
                showFailureModal("Es ist ein Fehler bei der Statusänderung aufgetreten", xhr);
            }
        })
    });

    /**
     * show callback error details
     */
    $("#modal-failure-message-show").click(function () {
        $(".modal-content-failure-message-background").slideToggle("slow");
    });

    $(".button-delete-order").click(function () {
        prepareDeleteWarningModal();
        $('#delete-warning-header-text').val("Wollen Sie die Bestellung wirklich löschen?");
        $('#object-remove-id').val($(this).val());
    });

    /**
     * confirm remove themebox
     */
    $('#button-delete-order-confirm').click(function () {
        $.ajax({
            url: "admin/removeOrder",
            type: 'POST',
            data: {order_id: $('#object-remove-id').val()},
            success: function (response) {
                showSuccessModal("Bestellung wurde erfolgreich gelöscht");
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Löschen passiert", xhr);
            }
        })
    });


    /**
     * button print
     */
    function printData() {
        var divToPrint = document.getElementById("printTable");
        newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        //newWin.close();
        //newWin.print();
        //refresh();
    }

    $(".button-print-order").click(function () {
        $.ajax({
            url: "admin/getOrder",
            type: 'POST',
            data: {order_id: $(this).val()},
            success: function (response) {
                var html =
                    '<tr><td class="print-table-title"><strong>Bestellung: </strong></td><td class="print-table-text">' + response["order"]["ordernumber"] + '</td></tr>' +
                    '<tr><td> </td></tr>' +
                    '<tr><td class="print-table-title">Ausleihobjekt: </td><td class="print-table-text">' + response["themebox"]["title"] + '</td></tr>' +
                    '<tr><td class="print-table-title">Von: </td><td class="print-table-text">' + formatDate(response["order"]["startdate"]) + '</td></tr>' +
                    '<tr><td class="print-table-title">Bis: </td><td class="print-table-text">' + formatDate(response["order"]["enddate"]) + '</td></tr>' +
                    '<tr><td class="print-table-title">Bestelldatum: </td><td class="print-table-text">' + formatDate(response["order"]["datecreated"]) + '</td></tr>' +
                    '<tr><td> </td></tr>' +
                    '<tr class="print-table-user"><td class="print-table-title">Nachname: </td><td class="print-table-text">' + response["order"]["name"] + '</td></tr>' +
                    '<tr class="print-table-user"><td class="print-table-title">Vorname: </td><td class="print-table-text">' + response["order"]["surname"] + '</td></tr>' +
                    '<tr class="print-table-user"><td class="print-table-title">Bibliotheksausweis: </td><td class="print-table-text">' + response["order"]["nebisusernumber"] + '</td></tr>' +
                    '<tr class="print-table-user"><td class="print-table-title">Email: </td><td class="print-table-text">' + response["order"]["email"] + '</td></tr>' +
                    '<tr class="print-table-user"><td class="print-table-title">Telefonnummer: </td><td class="print-table-text">' + response["order"]["phonenumber"] + '</td></tr>';

                if (2 === response["order"]["fk_delivery"]) {
                    var deliveryHtml =
                        '+ <tr><td> </td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">Lieferart: </td><td class="print-table-text">' + "Lieferung an Aargauer Schulen" + '</td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">Name der Schule: </td><td class="print-table-text">' + response["order"]["schoolname"] + '</td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">Strasse und Nr.: </td><td class="print-table-text">' + response["order"]["schoolstreet"] + '</td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">PLZ und Ort: </td><td class="print-table-text">' + response["order"]["schoolcity"] + '</td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">Abgabeort: </td><td class="print-table-text">' + response["order"]["placeofhandover"] + '</td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">Telefonnummer der Schule: </td><td class="print-table-text">' + response["order"]["schoolphonenumber"] + '</td></tr>';
                    html = html + deliveryHtml;
                } else {
                    var deliveryTypeHtml =
                        '+ <tr><td> </td></tr>' +
                        '<tr class="print-table-delivery"><td class="print-table-title">Lieferart: </td><td class="print-table-text">' + "Abholung in der Bibliothek" + '</td></tr>';
                    html = html + deliveryTypeHtml;
                }
                $('#print-order').html(html);
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Laden der Daten aufgetreten", xhr);
            },
            complete: function () {
                printData();
            }
        });
    });


    /**
     * get order data for edit modal
     */
    $(".button-edit-order").click(function () {

        dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
        dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

        dayToCalculateNextSaturdaysStart = getNextDayOfWeek(new Date, 6);
        dayToCalculateNextSaturdaysStart.setHours(14);
        dayToCalculateNextSaturdaysStart.setMinutes(0);
        dayToCalculateNextSaturdaysStart.setSeconds(0);

        dayToCalculateNextSaturdaysEnd = getNextDayOfWeek(new Date, 6);
        dayToCalculateNextSaturdaysEnd.setHours(18);
        dayToCalculateNextSaturdaysEnd.setMinutes(0);
        dayToCalculateNextSaturdaysEnd.setSeconds(0);

        dayToCalculatePreviousSaturdaysStart = getNextDayOfWeek(new Date, 6);
        dayToCalculatePreviousSaturdaysStart.setDate(dayToCalculatePreviousSaturdaysStart.getDate() - 7);
        dayToCalculatePreviousSaturdaysStart.setHours(14);
        dayToCalculatePreviousSaturdaysStart.setMinutes(0);
        dayToCalculatePreviousSaturdaysStart.setSeconds(0);

        dayToCalculatePreviousSaturdaysEnd = getNextDayOfWeek(new Date, 6);
        dayToCalculatePreviousSaturdaysEnd.setDate(dayToCalculatePreviousSaturdaysEnd.getDate() - 7);
        dayToCalculatePreviousSaturdaysEnd.setHours(18);
        dayToCalculatePreviousSaturdaysEnd.setMinutes(0);
        dayToCalculatePreviousSaturdaysEnd.setSeconds(0);

        $.ajax({
            url: "admin/getOrder",
            type: 'POST',
            data: {order_id: $(this).val()},
            success: function (response) {
                selectedThemeboxInfo = response["themebox"]
                $("#pu_dropdown-von").val("");
                $("#pu_dropdown-bis").val("");

                $("#calendar").fullCalendar("render");
                $("#calendar").fullCalendar("removeEvents");
                $("#calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "newOrder";
                });

                bindEndData();
                //addBlockDateFromToday();
                loadBlockedDates();
                blockTillNextSunday();

                blockPreviousFiveSundaysInCalendar();
                blockNextFiveSundaysInCalendar();

                if (selectedThemeboxInfo.fk_order_type === 1) {
                    blockPreviousFiveSaturdayAfterTwoPmInCalendar();
                    blockNextFiveSaturdayAfterTwoPmInCalendar();
                }


                $('#order-edit-modal').modal('show',
                    {
                        backdrop: 'static',
                        keyboard: false
                    }
                );

                var isHourlyOrder = response["themebox"]["fk_order_type"] === 1;

                if (isHourlyOrder) {
                    $("#pu_themebox-time-select").show();
                    $("#end-date_box").hide();

                    //select the option in the dropdown that matches the start time
                    $('#pu_dropdown-von option[value="' + formatTimeWithoutDate(response["order"]["startdate"]) + '"]').prop("selected", true);
                    $('#pu_dropdown-bis option[value="' + formatTimeWithoutDate(response["order"]["enddate"]) + '"]').prop("selected", true);
                    $("#order-id").val(response["order"]["pk_hourly_order"]);
                    // set the Von-text to Am
                    $("#Von-text").html("Am");
                } else {
                    $("#pu_themebox-time-select").hide();
                    $("#end-date_box").show();
                    $("#order-id").val(response["order"]["pk_order"]);
                    // set the Von-text to Von
                    $("#Von-text").html("Von");
                }

                $("#ordernumber-edit").val(response["order"]["ordernumber"]);
                $("#themebox-title").val(response["themebox"]["title"]);
                $("#themebox-signatur").val(response["themebox"]["signatur"]);
                $("#datecreated").val(formatDate(response["order"]["datecreated"]));
                $("#start-date").val(formatDateWithoutTime(response["order"]["startdate"]));
                $("#end-date").val(formatDateWithoutTime(response["order"]["enddate"]));
                $("#status").html("");

                response["all_status"].forEach(function (element) {
                    if (element['pk_status'] === response["order"]["fk_status"]) {
                        $("#status").append("<option  value=" + element['pk_status'] + " selected>" + element['name'] + "</option>");
                    } else {
                        $("#status").append("<option  value=" + element['pk_status'] + ">" + element['name'] + "</option>");
                    }
                });

                $("#lastname").val(response["order"]["name"]);
                $("#surname").val(response["order"]["surname"]);
                $("#email").val(response["order"]["email"]);
                $("#phonenumber").val(response["order"]["phonenumber"]);
                $("#nebisusernumber").val(response["order"]["nebisusernumber"]);
                $("#delivery").html("");

                response["all_deliveries"].forEach(function (element) {
                    if (element['pk_delivery'] === response["order"]["fk_delivery"]) {
                        $("#delivery").append("<option  value=" + element['pk_delivery'] + " selected>" + element['type'] + "</option>");
                    } else {
                        $("#delivery").append("<option  value=" + element['pk_delivery'] + ">" + element['type'] + "</option>");
                    }
                });

                lastNameValidate();
                firstNameValidate();
                emailValidate();
                phoneValidate();
                nebisValidate();

                if (2 === response["order"]["fk_delivery"]) {
                    $("#order-delivery-type").css("display", "block");
                    $("#schoolname").val(response["order"]["schoolname"]);
                    $("#schoolstreet").val(response["order"]["schoolstreet"]);
                    $("#schoolcity").val(response["order"]["schoolcity"]);
                    $("#placeofhandover").val(response["order"]["placeofhandover"]);
                    $("#schoolphonenumber").val(response["order"]["schoolphonenumber"]);

                    schoolnameValidate();
                    schoolstreetValidate();
                    schoolcityValidate();
                    placeofhandoverValidate();
                    schoolphoneValidate();
                } else {
                    $("#order-delivery-type").css("display", "none");
                }

                orders = response["orders"];
                old_startdate = $("#start-date").val();
                old_enddate = $("#end-date").val();

                $.each(orders, function (index, value) {
                    if (value["pk_order"] == $("#order-id").val()) {
                        $('#calendar').fullCalendar("renderEvent", {
                            title: "",
                            start: addTime(value["startdate"]),
                            end: addEndTime(value["enddate"]),
                            rendering: "background",
                            className: "new_event",
                            color: "#04B404"
                        }, true);
                        $('#calendar').fullCalendar('gotoDate', addTime(value["startdate"]));
                    } else if (value["pk_hourly_order"] == $("#order-id").val()) {
                        var startDateTime = value["startdate"] + "-00:00";
                        var endDateTime = value["enddate"] + "-00:00";
                        $('#calendar').fullCalendar("renderEvent", {
                            title: extractTimeFromDate(value["startdate"]) + " - " + extractTimeFromDate(value["enddate"]),
                            start: startDateTime,
                            end: endDateTime,
                            rendering: "",
                            className: "new_event",
                            color: "#04B404"
                        }, true);

                        var endPlus30 = addMinutesToTime(endDateTime.split(' ')[1].substring(0, 5), 30);
                        var finalEndDate = endDateTime.split(' ')[0] + " " + endPlus30 + ":00";

                        $("#calendar").fullCalendar('renderEvent',
                            {
                                title: "Korrektur",
                                start: endDateTime,
                                end: finalEndDate,
                                rendering: "",
                                className: "new_event",
                                color: "#04B404"
                            },
                            true
                        );

                        $('#calendar').fullCalendar('gotoDate', startDateTime);
                    } else { // render blocked events
                        var startDateTime = value["startdate"] + "-00:00";
                        var endDateTime = value["enddate"] + "-00:00";

                        if(isHourlyOrder){
                            var endDateTimePlus30 = addMinutesToTime(endDateTime.split(' ')[1].substring(0, 5), 30);
                            var finalEndDatePlus30 = endDateTime.split(' ')[0] + " " + endDateTimePlus30 + ":00";
                        }

                        $('#calendar').fullCalendar("renderEvent", {
                            title: isHourlyOrder ? extractTimeFromDate(value["startdate"]) + " - " + extractTimeFromDate(finalEndDatePlus30) : "",
                            start: !isHourlyOrder ? addBlockStartdate(value["startdate"]) : startDateTime,
                            end: !isHourlyOrder ? addBlockEnddate(value["enddate"]) : finalEndDatePlus30,
                            rendering: !isHourlyOrder ? "background" : "",
                            className: "block"
                        }, true);
                    }
                });

                dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
                dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);


            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Laden der Daten aufgetreten", xhr);
            }
        })
    });

    /**
     * render calendar on edit order modal
     */
    $('#order-edit-modal').on('shown.bs.modal', function () {
        $("#calendar").fullCalendar('render');
    });

    /**
     * save order changes
     */
    $('#button-save-order-change').click(function () {
        $.ajax({
            url: "admin/updateOrder",
            type: 'POST',
            data: {order_data: $('#order-edit-form').serializeArray()},
            beforeSend: function () {
                $('#modal-order-edit-progress').modal('show');
            },
            success: function (response) {
                $('#modal-order-edit-progress').modal('toggle');
                showSuccessModal("Änderungen konnten erfolgreich gespeichert werden");
            },
            error: function (xhr, status, error) {
                $('#modal-order-edit-progress').modal('toggle');
                showFailureModal("Änderungen konnten nicht gespeichert werden", xhr);
            }
        });
    });

    /**
     * show / hide delivery input fields
     */
    $('#delivery').click(function () {
        if ($("#delivery").val() === "2") {
            $("#order-delivery-type").show();
            schoolnameValidate();
            schoolstreetValidate();
            schoolcityValidate();
            placeofhandoverValidate();
            schoolphoneValidate();
        } else {
            $("#order-delivery-type").hide();
            lastNameValidate();
            firstNameValidate();
            emailValidate();
            phoneValidate();
            nebisValidate();
        }
    });

    /**
     * start date input field
     */
    $("#start-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            bindEndData();

            if (selectedThemeboxInfo.fk_order_type === 1) { // hourly order
                $('#button-save-order-change').prop('disabled', true);

                $("#calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "newOrder";
                });

                $("#calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "new_event";
                });

                //reset the dropdowns
                $("#pu_dropdown-von").val($("#pu_dropdown-von option:first").val());
                $("#pu_dropdown-bis").val($("#pu_dropdown-bis option:first").val());
                //disable the dropdown bis
                $("#pu_dropdown-bis").prop("disabled", true);
                //goto selected date
                $("#calendar").fullCalendar('gotoDate', $("#start-date").datepicker('getDate'));
            } else { //daily order
                updateEvent();
            }
        }
    });

    /**
     * end date input field
     */
    $("#end-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            if (selectedThemeboxInfo.fk_order_type === 2) { // daily order
                updateEvent();
            }
        }
    });

    /**
     * Extract the time from a date string
     */
    function extractTimeFromDate(dateString) {
        const dateObject = new Date(dateString);

        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    function setAppropriateEndTimes() {
        //get the selected start time
        var selectedStartTime = $("#pu_dropdown-von").val();
        //remove all options from the dropdown
        $("#pu_dropdown-bis").empty();
        //add all the values from 08:00 until 18:00 in 30-minute intervals to dropdown except the selected start time
        var maxTime = '18:00';
        var currentTime = selectedStartTime;
        //add the option called "Endzeit" disabled
        $("#pu_dropdown-bis").append('<option value="" disabled selected>Endzeit</option>');

        while (currentTime <= maxTime) {
            $("#pu_dropdown-bis").append('<option value="' + currentTime + '">' + currentTime + '</option>');
            currentTime = addMinutesToTime(currentTime, 30);
        }
        //remove the selectedTime from the dropdown
        $("#pu_dropdown-bis option[value='" + selectedStartTime + "']").remove();
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

    /**
     * initial caledar settings
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
    loadViewChangeButtons();

    /**
     * initial datatable settings
     */
    $('#new-order-table').DataTable({
        "lengthChange": false,
        "paging": false,
        "pageLength": 10,
        "info": false,
        "order": [[7, "asc"]],
        "columnDefs": [
            {
                "searchable": false, "targets": 8,
                "orderable": false, "targets": 8
            }
        ],
        "language": {
            "search": "Suchen nach: ",
            "sEmptyTable": "Keine Bestellungen vorhanden",
            "zeroRecords": "Keine Bestellungen gefunden",
            "paginate": {
                "previous": "Vorherige Seite",
                "next": "Nächste Seite"
            }
        },
        "aoColumns": [
            null,
            null,
            null,
            {"sType": "date-eu"},
            {"sType": "date-eu"},
            null,
            null,
            null,
            null
        ]
    });

    /**
     * allow date sorting in datatable
     */
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "date-eu-pre": function (a) {
            // Split the date and time components
            var parts = a.split(' ');
            var datePart = parts[0].split('.');
            var timePart = parts[1] || '00:00:00';

            // Combine date and time in a format that can be parsed by Date
            var combinedDateTime = datePart[2] + '-' + datePart[1] + '-' + datePart[0] + 'T' + timePart;

            // Parse the combined date and time using Date object
            return new Date(combinedDateTime);
        },

        "date-eu-asc": function (a, b) {
            return a - b;
        },

        "date-eu-desc": function (a, b) {
            return b - a;
        }
    });

    /**
     * show delete warning modal
     */
    function prepareDeleteWarningModal() {
        $('#callback-modal').modal('show');
        $('#modal-content-failure').css('display', 'none');
        $('#modal-content-success').css('display', 'none');
        $('#modal-delete-order-warning').css('display', 'block');
    }

    /**
     * prevent on enter submit
     */
    $('#order-edit-form').on("keypress", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            return false;
        }
    });

    $('.callback-close').click(function () {
        refresh();
    });

    /**
     * bind start date and end date
     */
    function bindEndData() {
        var end_date = $('#end-date');
        var start_date = $("#start-date").datepicker('getDate');
        var min_date = $("#start-date").datepicker('getDate');
        end_date.datepicker('option', 'minDate', min_date);

        if (selectedThemeboxInfo.fk_order_type === 1) { // Hourly order
            //set the end date to the same as the start date
            $("#end-date").datepicker('setDate', $("#start-date").datepicker('getDate'));
            //enable the dropdowns
            $("#pu_dropdown-von").prop("disabled", false);
        }
    }

    $("#status-select").change(function () {
        let table = $("#new-order-table").DataTable();
        table.search("");
        table.draw();
    });

    $.fn.dataTable.ext.search.push(function (settings, searchData, index, rowData, counter) {
        let searchedStatus = $("#status-select option:selected").text();
        let selection = $(rowData[7]);
        let selectedText = $(selection).find('option:selected').text();
        return searchedStatus === selectedText || searchedStatus === "All";
    })

    function loadBlockedDates() {

        $.ajax({
            url: "../" + "user/getBlockedPeriods",
            type: "POST",
            data: {},
            success: function (data) {

                $.each(data, function (index, element) {
                    blockedPeriodEventtwo(formatBlockedPeriodCalendarStartDate(element.startdate), formatBlockedPeriodCalendarEndDate(element.enddate));
                    var blockedPeriodsArray = computeDayBetweenStartAndEnd(new Date(formatCalendarDate(element.startdate)), new Date(formatCalendarDate(element.enddate)));

                    for (var i = 0; i <= blockedPeriodsArray.length; i++) {
                        listOfBlockedDates.push(blockedPeriodsArray[i]);
                    }
                });
            },
            error: function (xhr, status, error) {
                errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
            }
        });
    }


    $("#pu_dropdown-von").change(function () {
        setAppropriateEndTimes();
        $("#pu_dropdown-bis").prop("disabled", false);
        $('#button-save-order-change').prop('disabled', true);
        //set the first value
        $("#pu_dropdown-bis").val($("#pu_dropdown-bis option:first").val());
        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "newOrder";
        });

        $("#calendar").fullCalendar('removeEvents', function (event) {
            return event.className == "new_event";
        });
    });

    $("#pu_dropdown-bis").change(function () {
        updateEvent();
    });


    function formatBlockedPeriodCalendarStartDate(date) {
        let temp_date = date.split(".");
        var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
        return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate());
    }

    function formatBlockedPeriodCalendarEndDate(date) {
        var temp_date = date.split(".");
        var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
        return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate() + 1);
    }

    function computeDayBetweenStartAndEnd(startDate, endDate) {

        var arr = new Array();
        var dt = new Date(startDate);

        while (dt <= endDate) {
            arr.push(formatBlockDate(new Date(dt)));
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
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

    /**
     * Block the the next following Sundays in the calendar
     */
    function blockNextFiveSundaysInCalendar() {
        for (var i = 0; i < 40; i++) {
            blockAllSundaysEventtwo(formatBlockDate(dayToCalculateNextSundays));
            dayToCalculateNextSundays.setDate(dayToCalculateNextSundays.getDate() + 7);
        }
    }

    function blockPreviousFiveSundaysInCalendar() {
        for (var i = 0; i < 19; i++) {
            blockAllSundaysEventtwo(formatBlockDate(dayToCalculatePreviousSundays));
            dayToCalculatePreviousSundays.setDate(dayToCalculatePreviousSundays.getDate() - 7);
        }
    }

    function blockPreviousFiveSaturdayAfterTwoPmInCalendar() {
        for (var i = 0; i < 19; i++) {
            blockAllSaturdayAfterTwoPmEvent(dayToCalculatePreviousSaturdaysStart, dayToCalculatePreviousSaturdaysEnd);
            dayToCalculatePreviousSaturdaysStart.setDate(dayToCalculatePreviousSaturdaysStart.getDate() - 7);
            dayToCalculatePreviousSaturdaysEnd.setDate(dayToCalculatePreviousSaturdaysEnd.getDate() - 7);
        }
    }

    /**
     * Block the the next following Saturdays after 2 pm in the calendar since the library is closed
     */
    function blockNextFiveSaturdayAfterTwoPmInCalendar() {
        for (var i = 0; i < 40; i++) {
            blockAllSaturdayAfterTwoPmEvent(dayToCalculateNextSaturdaysStart, dayToCalculateNextSaturdaysEnd);
            dayToCalculateNextSaturdaysStart.setDate(dayToCalculateNextSaturdaysStart.getDate() + 7);
            dayToCalculateNextSaturdaysEnd.setDate(dayToCalculateNextSaturdaysEnd.getDate() + 7);
        }
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

    function formatBlockDate(date) {
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

    function blockAllSundaysEventtwo(Sunday) {

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

    function blockedPeriodEventtwo(start, end) {
        $("#calendar").fullCalendar('renderEvent',
            {
                id: "blocked",
                title: "",
                start: start,
                end: end,
                rendering: "background",
                className: "blocked_event",
                color: "#ffad00"
            },
            true
        );
    }
});

