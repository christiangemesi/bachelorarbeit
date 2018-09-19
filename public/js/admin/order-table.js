$(document).ready(function () {
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
                showFailureModal("Es ist ein Fehler bei der Statusänderung passiert", xhr);
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
        prepareDeleteWaningModal();
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
     * get order data for edit modal
     */
    $(".button-edit-order").click(function () {
        $.ajax({
            url: "admin/getOrder",
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

                bindEndData();
                addBlockDateFromToday();
            },
            error: function (xhr, status, error) {
                showFailureModal("Es ist ein Fehler beim Laden der Daten vorgekommen", xhr);
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
            url: "../admin/updateOrder",
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
        if ($("#delivery").val() === "1") {
            $("#order-delivery-type").hide();
            lastNameValidate();
            firstNameValidate();
            emailValidate();
            phoneValidate();
            nebisValidate();
        }
        else {
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
            addEvent();
        }
    });

    /**
     * end date input field
     */
    $("#end-date").datepicker({
        dateFormat: "dd.mm.yy",
        onSelect: function (date) {
            addEvent();
        }
    });

    /**
     * initial caledar settings
     */
    $("#calendar").fullCalendar({
        selectable: true,
        eventColor: "#f44242",
        height: "auto",
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
        "paging": true,
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
    function prepareDeleteWaningModal() {
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
});

