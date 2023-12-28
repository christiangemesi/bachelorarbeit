$(document).ready(function () {
    let listOfBlockedDates = Array();
    let dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
    let dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

    var selectedThemeboxInfo = []

    $('[data-toggle="tooltip"]').tooltip();

    $('#start-date').keydown(function () {
        return false;
    });

    $('#end-date').keydown(function () {
        return false;
    });
    $('#end-date').datepicker
    $('#orderAdd-start-date').keydown(function () {
        return false;
    });

    $('#orderAdd-end-date').keydown(function () {
        return false;
    });

    /**
     * Focus is set on button click on glyphicon
     */
    $("#order-from-glyphicon").click(function () {
        $("#start-date").focus();
    });
    $("#orderAdd-from-glyphicon").click(function () {
        $("#orderAdd-start-date").focus();
    })
    /**
     * Focus is set on button click on glyphicon
     */
    $("#order-to-glyphicon").click(function () {
        $("#end-date").focus();
    });
    $("#orderAdd-to-glyphicon").click(function () {
        $("#orderAdd-end-date").focus();
    });

    /**
     * change order status
     */
    $(".status-update").on("change", function () {
        var status_data = this.value;

        $.ajax({
            url: "poweruser/updateState",
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
                    showSuccessModal("Die Themenkiste ist bereit, die Bestellperson erhält eine Benachrichtigungs Email");
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
     * button print
     */
    function printData() {
        var divToPrint = document.getElementById("printTable");
        newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
        refresh();
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
                    '<tr><td class="print-table-title">Themenkiste: </td><td class="print-table-text">' + response["themebox"]["title"] + '</td></tr>' +
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
        $.ajax({
            url: "poweruser/getOrder",
            type: 'POST',
            data: {order_id: $(this).val()},
            success: function (response) {

                $("#calendar").fullCalendar("render");
                $("#calendar").fullCalendar("removeEvents");
                $("#calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "newOrder";
                });

                $('#order-edit-modal').modal('show',
                    {
                        backdrop: 'static',
                        keyboard: false
                    }
                );

                $('#order-edit-form').trigger("reset");
                $("#order-id").val(response["order"]["pk_order"]);
                $("#ordernumber-edit").val(response["order"]["ordernumber"]);
                $("#themebox-title").val(response["themebox"]["title"]);
                $("#themebox-signatur").val(response["themebox"]["signatur"]);
                $("#datecreated").val(formatDate(response["order"]["datecreated"]));
                $("#start-date").val(formatDate(response["order"]["startdate"]));
                $("#end-date").val(formatDate(response["order"]["enddate"]));
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

                lastNameValidate($("#lastname"), $("#lastNameInputStatus"), $("#lastNameIcon"));
                firstNameValidate($("#surname"), $("#firstNameInputStatus"), $("#firstNameIcon"));
                emailValidate($("#email"), $("#emailInputStatus"), $("#emailIcon"));
                phoneValidate($("#phonenumber"), $("#phoneInputStatus"), $("#phoneIcon"));
                nebisValidate($("#nebisusernumber"), $("#nebisInputStatus"), $("#nebisIcon"));

                if (2 === response["order"]["fk_delivery"]) {
                    $("#order-delivery-type").css("display", "block");
                    $("#schoolname").val(response["order"]["schoolname"]);
                    $("#schoolstreet").val(response["order"]["schoolstreet"]);
                    $("#schoolcity").val(response["order"]["schoolcity"]);
                    $("#placeofhandover").val(response["order"]["placeofhandover"]);
                    $("#schoolphonenumber").val(response["order"]["schoolphonenumber"]);

                    schoolnameValidate($("#schoolname"), $("#schoolNameInputStatus"), $("#schoolNameIcon"));
                    schoolstreetValidate($("#schoolstreet"), $("#schoolstreetInputStatus"), $("#schoolstreetIcon"));
                    schoolcityValidate($("#schoolcity"), $("#schoolcityInputStatus"), $("#schoolcityIcon"));
                    placeofhandoverValidate($("#placeofhandover"), $("#placeofhandoverInputStatus"), $("#placeofhandover"));
                    schoolphoneValidate($("#schoolphonenumber"), $("#schoolphoneInputStatus"), $("#schoolphoneIcon"));
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
                            className: "myOrder",
                            color: "#04B404"
                        }, true);
                        $('#calendar').fullCalendar('gotoDate', addTime(value["startdate"]));
                    } else {
                        $('#calendar').fullCalendar("renderEvent", {
                            title: "",
                            start: addBlockStartdate(value["startdate"]),
                            end: addBlockEnddate(value["enddate"]),
                            rendering: "background",
                            className: "block"
                        }, true);
                    }
                });

                dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
                dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

                bindEndData();
                addBlockDateFromToday();
                loadBlockedDates();
                blockTillNextSunday();
                blockNextFiveSundaysInCalendar();
                blockPreviousFiveSundaysInCalendar();
                loadViewChangeButtons();

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
            url: "poweruser/updateOrder",
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

    $('#button-save-orderAdd').click(function () {
        var order_data = {
            themeboxId: parseInt($('#orderAdd-thembox').val()),
            orderData: $('#order-add-form').serializeArray()
        }
        $.ajax({
            url: "poweruser/addOrder",
            type: 'POST',
            data: order_data,
            beforeSend: function () {
                $('#modal-order-edit-progress').modal('show');

            },
            success: function (response) {
                $('#modal-order-edit-progress').modal('toggle');
                showSuccessModal("Bestelung wurde erfolgreich gespeichert");

            },
            error: function (xhr, status, error, response) {
                $('#modal-order-edit-progress').modal('toggle');
                showFailureModal("Bestellung konnten nicht gespeichert werden", xhr);

            }
        });
    });

    /**
     * show / hide delivery input fields
     */
    $('#delivery').click(function () {
        if ($("#delivery").val() === "1") {
            $("#order-delivery-type").hide();
            lastNameValidate();
            firstNameValidate();
            emailValidate();
            phoneValidate();
            nebisValidate();
        } else {
            $("#order-delivery-type").show();
            schoolnameValidate();
            schoolstreetValidate();
            schoolcityValidate();
            placeofhandoverValidate();
            schoolphoneValidate();
        }
    });

    /**
     * start date input field
     */
    $("#start-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            bindEndData();


            updateEvent();
        }
    });

    /**
     * end date input field
     */
    $("#end-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            updateEvent();
        }
    });

    /**
     * start date input field
     */
    $("#orderAdd-start-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            bindEndDataOrderAdd();
            orderAddUpdateEvent();

        }
    });

    /**
     * end date input field
     */
    $("#orderAdd-end-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            if (selectedThemeboxInfo.fk_order_type === 2) { // daily order
                orderAddUpdateEvent();
            }
        }
    });


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

    $("#orderAdd-calendar").fullCalendar({
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
            var ukDatea = a.split('.');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-eu-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-eu-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
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

    }

    function bindEndDataOrderAdd() {
        var end_date = $('#orderAdd-end-date');
        var start_date = $("#orderAdd-start-date").datepicker('getDate');
        var min_date = $("#orderAdd-start-date").datepicker('getDate');
        end_date.datepicker('option', 'minDate', min_date);

        if (selectedThemeboxInfo.fk_order_type === 1) { // Hourly order
            //set the end date to the same as the start date
            $("#orderAdd-end-date").datepicker('setDate', $("#orderAdd-start-date").datepicker('getDate'));
            //enable the dropdowns
            $("#pu_dropdown-von").prop("disabled", false);
        }
    }

    /**
     * show create order modal
     */
    $("#button-create-order").click(function () {

        //clear the array so that the newly selected themebox is loaded
        selectedThemeboxInfo = [];

        let fk_thembox = 1;
        $.ajax({
            url: "poweruser/getOrderAddData",
            type: "POST",
            data: {fk_thembox},
            success: function (response) {

                $('#summernote_create').summernote();

                $('#order-add-modal').modal('show',
                    {
                        backdrop: 'static',
                        keyboard: false
                    }
                );

                $('#order-add-form').trigger("reset");

                $('#order-add-form span').each(function () {
                    $(this).removeClass("glyphicon glyphicon-ok form-control-feedback")
                });
                $("#order-add-form div").each(function () {
                    $(this).removeClass("has-success has-feedback");
                });
                $('#order-add-form span').each(function () {
                    $(this).removeClass("glyphicon glyphicon-remove form-control-feedback");
                });
                $('#order-add-form div').each(function () {
                    $(this).removeClass("has-error has-feedback");
                });
                $("#orderAdd-calendar").fullCalendar("render");
                $("#orderAdd-calendar").fullCalendar("removeEvents");
                $("#orderAdd-calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "newOrder";
                });
                response["orderData"].forEach(function (element) {
                    console.log(element)
                    $('#orderAdd-calendar').fullCalendar("renderEvent", {
                        title: "",
                        start: addTime(element["order_startdate"]),
                        end: addEndTime(element["order_enddate"]),
                        rendering: "background",
                        className: "Order66",
                        color: "#f44242"
                    }, true);
                });
                loadBlockedDates();
                loadViewChangeButtons();

                dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
                dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

                blockTillNextSunday();
                blockNextFiveSundaysInCalendar();
                blockPreviousFiveSundaysInCalendar();

                $('#order-add-modal').modal('show',
                    {
                        backdrop: 'static',
                        keyboard: false
                    }
                );
                $("#orderAdd-delivery").html("");

                saveOrderAddButton().disabled = true;

                response["delivery"].forEach(function (element) {
                    $("#orderAdd-delivery").append("<option value=" + element['pk_delivery'] + " selected>" + element['type'] + "</option>")

                })
                $("#orderAdd-delivery").val(1);

            },
        })
    })

    function loadViewChangeButtons() {

        //prevent buttons from being added multiple times
        if ($(".fc-toolbar .fc-left .fc-week-view-button").length !== 0) {
            return;
        }

        var switchToWeekButton = $('<button type="button" class="fc-week-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Wochensicht</button>');
        var switchToMonthButton = $('<button type="button" class="fc-month-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Monatssicht</button>');
        //switchToMonthButton.hide();


        switchToWeekButton.on("click", function () {
            console.log("switchToWeekButton")
            $("#calendar").fullCalendar("changeView", "agendaWeek");
            $("#orderAdd-calendar").fullCalendar("changeView", "agendaWeek");
            //dont show the week button, instead show the month button
            switchToWeekButton.hide();
            switchToMonthButton.show();
        });

        switchToMonthButton.on("click", function () {
            $("#calendar").fullCalendar("changeView", "month");
            $("#orderAdd-calendar").fullCalendar("changeView", "month");
            //dont show the month button, instead show the week button
            switchToMonthButton.hide();
            switchToWeekButton.show();
        });

        $(".fc-toolbar .fc-left").append(switchToWeekButton);
        $(".fc-toolbar .fc-left").append(switchToMonthButton);
    }

    $('#orderAdd-delivery').click(function () {
        if ($("#orderAdd-delivery").val() == "1") {
            $("#orderAdd-delivery-type").hide();
            lastNameValidate($("#orderAdd-nachname"), $("#orderAdd-lastNameInputStatus"), $("#orderAdd-lastNameIcon"));
            firstNameValidate($("#orderAdd-name"), $("#orderAdd-firstNameInputStatus"), $("#orderAdd-firstNameIcon"));
            emailValidate($("#orderAdd-email"), $("#orderAdd-emailInputStatus"), $("#orderAdd-emailIcon"));
            phoneValidate($("#orderAdd-phone"), $("#orderAdd-phoneInputStatus"), $("#orderAdd-phoneIcon"));
            nebisValidate($("#orderAdd-Nebisnumber"), $("#orderAdd-nebisInputStatus"), $("#orderAdd-nebisIcon"));
        } else if ($("#orderAdd-delivery").val() == "2") {
            $("#orderAdd-delivery-type").show();
            schoolnameValidate($("#orderAdd-schoolname"), $("#orderAdd-schoolNameInputStatus"), $("#orderAdd-schoolNameIcon"));
            schoolstreetValidate($("#orderAdd-schoolstreet"), $("#orderAdd-schoolstreetInputStatus"), $("#orderAdd-schoolstreetIcon"));
            schoolcityValidate($("#orderAdd-schoolcity"), $("#orderAdd-schoolcityInputStatus"), $("#orderAdd-schoolcityIcon"));
            placeofhandoverValidate($("#orderAdd-placeofhandover"), $("#orderAdd-placeofhandoverInputStatus"), $("#orderAdd-placeofhandoverIcon"));
            schoolphoneValidate($("#orderAdd-schoolphonenumber"), $("#orderAdd-schoolphoneInputStatus"), $("#orderAdd-schoolphoneIcon"));
        } else {
            $("#orderAdd-delivery-type").hide();
            lastNameValidate($("#orderAdd-nachname"), $("#orderAdd-lastNameInputStatus"), $("#orderAdd-lastNameIcon"));
            firstNameValidate($("#orderAdd-name"), $("#orderAdd-firstNameInputStatus"), $("#orderAdd-firstNameIcon"));
            emailValidate($("#orderAdd-email"), $("#orderAdd-emailInputStatus"), $("#orderAdd-emailIcon"));
            phoneValidate($("#orderAdd-phone"), $("#orderAdd-phoneInputStatus"), $("#orderAdd-phoneIcon"));
            nebisValidate($("#orderAdd-Nebisnumber"), $("#orderAdd-nebisInputStatus"), $("#orderAdd-nebisIcon"));
        }
    });

    $('#order-add-modal').on('shown.bs.modal', function () {
        $("#orderAdd-calendar").fullCalendar('render');
    });

    $('#orderAdd-thembox').change(function () {

        selectedThemeboxInfo = []

        let fk_thembox = parseInt($('#orderAdd-thembox').val());
        console.log(fk_thembox)

        $.ajax({
            url: "poweruser/getOrderAddData",
            type: "POST",
            data: {fk_thembox},
            success: function (response) {
                selectedThemeboxInfo = response["themebox"]
                $("#orderAdd-calendar").fullCalendar("render");
                $("#orderAdd-calendar").fullCalendar("removeEvents");
                $("#orderAdd-calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "newOrder";
                });

                console.log(response["themebox"])

                if (response["themebox"]["fk_order_type"] === 1) { // Hourly order
                    //disable the 2nd option from $("#thekre-dropdown")
                    $("#orderAdd-delivery option[value='1']").prop("disabled", true);
                    $("#orderAdd-delivery option[value='2']").prop("disabled", true);
                    $("#orderAdd-delivery").val("3");
                } else { // Daily order
                    //enable the 2nd option from $("#thekre-dropdown")
                    $("#orderAdd-delivery option[value='2']").prop("disabled", false);
                    $("#orderAdd-delivery option[value='1']").prop("disabled", false);
                }

                loadBlockedDates();

                loadHourlyView(response["themebox"]["fk_order_type"], response["orderData"]);


                dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
                dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

                blockTillNextSunday();
                blockNextFiveSundaysInCalendar();
                blockPreviousFiveSundaysInCalendar();
                loadViewChangeButtons();


                response["orderData"].forEach(function (element) {
                    $('#orderAdd-calendar').fullCalendar("renderEvent", {
                        title: "",
                        start: addTime(element["order_startdate"]),
                        end: addEndTime(element["order_enddate"]),
                        rendering: "background",
                        className: "selected",
                        color: "#f44242"
                    }, true);
                })
            }
        })


    });

    function loadHourlyView(order_type, orders) {
        //reset the selection so that the option is null
        $("#pu_dropdown-von").val($("#pu_dropdown-von option:first").val());
        $("#pu_dropdown-bis").val($("#pu_dropdown-bis option:first").val());
        if (order_type !== 1) {
            $("#pu_themebox-datepicker-bis").show();
            $("#pu_themebox-time-select").hide();
            return;
        }

        //hide themebox-datepicker-bis
        $("#pu_themebox-datepicker-bis").hide();

        $("#pu_themebox-time-select").show();
        //the selection should be disabled by default until the dates are chosen
        $("#pu_dropdown-von").prop("disabled", true);
        $("#pu_dropdown-bis").prop("disabled", true);
    }

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
                    showSuccessModal("Die Themenkiste ist bereit, die Bestellperson erhält eine Benachrichtigungs Email");
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
            url: "../" + "/" + "user/getBlockedPeriods",
            type: "POST",
            data: {},
            success: function (data) {


                $.each(data, function (index, element) {
                    blockedPeriodEvent(formatBlockedPeriodCalendarStartDate(element.startdate), formatBlockedPeriodCalendarEndDate(element.enddate));
                    blockedPeriodEventtwo(formatBlockedPeriodCalendarStartDate(element.startdate), formatBlockedPeriodCalendarEndDate(element.enddate));
                    var blockedPeriodsArray = computeDayBetweenStartAndEnd(new Date(formatCalendarDate(element.startdate)), new Date(formatCalendarDate(element.enddate)));

                    for (var i = 0; i <= blockedPeriodsArray.length; i++) {
                        listOfBlockedDates.push(blockedPeriodsArray[i]);
                    }
                });
            },
            error: function (xhr, status, error) {
                errorHandling("Es ist ein Fehler bei der Datenverarbeitung aufgetreten. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
            }
        });
    }

    function blockedPeriodEvent(start, end) {
        $("#orderAdd-calendar").fullCalendar('renderEvent',
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

    function blockNextFiveSundaysInCalendar() {
        for (var i = 0; i < 52; i++) {
            blockAllSundaysEvent(formatBlockDate(dayToCalculateNextSundays));
            blockAllSundaysEventtwo(formatBlockDate(dayToCalculateNextSundays));
            dayToCalculateNextSundays.setDate(dayToCalculateNextSundays.getDate() + 7);
        }
    }

    function blockAllSundaysEvent(Sunday) {

        $("#orderAdd-calendar").fullCalendar('renderEvent',
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

    function blockPreviousFiveSundaysInCalendar() {
        for (var i = 0; i < 52; i++) {
            dayToCalculatePreviousSundays.setDate(dayToCalculatePreviousSundays.getDate() - 7);
            blockAllSundaysEvent(formatBlockDate(dayToCalculatePreviousSundays));
            blockAllSundaysEventtwo(formatBlockDate(dayToCalculatePreviousSundays));
        }
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
                id: "blockeddate",
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


