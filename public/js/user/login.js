$(document).ready(function () {
    var orders;
    var old_startdate;
    var old_enddate;
    var listOfBlockedDates = Array();


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
        $.ajax({
            url: "login",
            type: 'POST',
            data: {name: $('#name').val(), ordernumber: $('#ordernumber').val()},
            success: function (response) {
                $("#calendar").fullCalendar("render");
                $("#calendar").fullCalendar("removeEvents");
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

                var editable = false;
                orders = "";

                if (response["order"][0]["fk_status"] != 1) {
                     editable = true;
                }

                $("#order-id").val(response["order"][0]["pk_order"]);
                $("#ordernumber-edit").val($('#ordernumber').val());
                $("#themebox-title").val(response["themebox"]["title"]);
                $("#start-date").val(formatDate(response["order"][0]["startdate"])).prop('disabled',  editable);
                $("#end-date").val(formatDate(response["order"][0]["enddate"])).prop('disabled',  editable);
                $("#datecreated-login").val(formatDate(response["order"][0]["datecreated"]));

                $("#status").val(response["status"]["name"]);
                $("#lastNameInput").val(response["order"][0]["name"]).prop('disabled',  editable);
                $("#firstNameInput").val(response["order"][0]["surname"]).prop('disabled',  editable);
                $("#emailInput").val(response["order"][0]["email"]).prop('disabled',  editable);
                $("#phone").val(response["order"][0]["phonenumber"]).prop('disabled',  editable);
                $("#nebisusernumber").val(response["order"][0]["nebisusernumber"]).prop('disabled',  editable);
                $("#delivery").val(response["delivery"]["type"]);


                if (response["order"][0]["fk_status"] === 1){
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
                    footer += '<div class="col-md-4"><button type="button" class="btn btn-default float-left" data-dismiss="modal">Schliessen</button></div>';
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
                $('#login-user-error-message-box').css('display', 'block');
                $('#login-user-error-message-box').html('Die Bestellung konnte nicht gefunden werden. Bitte überprüfen Sie Nachname der Bestellperson sowie Bestellnummer. <br>Ansonsten kontaktieren Sie die Campusbibliothek unter <a href="mailto:bibliothek.windisch@fhnw.ch">bibliothek.windisch@fhnw.ch</a> ');
            }
        })
    }
    $("#start-date").datepicker({
        beforeShowDay: console.log("aaaaa")
    })

    /**
     * Datepicker start date onselect
     */
    $("#start-date").datepicker({
        dateFormat: "dd.mm.yy",
        minDate: 1,
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            console.log(date);
            console.log(string);
            console.log(listOfBlockedDates);
            listOfBlockedDates.push("2021-8-19");
            return [ listOfBlockedDates.indexOf(string) === -1 ]
        },
        onSelect: function (date) {
            bindEndData();
            addEvent();

        }
    });

    /**
     * Datepicker end date onselect
     */
    $("#end-date").datepicker({
        dateFormat: "dd.mm.yy",
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            console.log(string);
            console.log(listOfBlockedDates);
            return [ $.inArray(string, listOfBlockedDates)=== -1 ]
        },
        onSelect: function (date) {
            console.log("aa");
            addEvent();
        }
    });

    /**
     * Specifies calendar properties
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
     * bind start date and end date
     */
    


    function bindEndData() {
        let end_date = $('#end-date');
        let start_date = $("#start-date").datepicker('getDate');
        let min_date = $("#start-date").datepicker('getDate');
        start_date.setDate(start_date.getDate + 42);
        end_date.datepicker('option', 'maxDate', start_date);
        end_date.datepicker('option', 'minDate', min_date);
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