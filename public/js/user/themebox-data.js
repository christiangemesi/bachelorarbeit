/**
 * javascript runs on page load
 */
$(document).ready(function () {

        /**
         * Array of all blocked dates for the datepicker
         */
        var listOfBlockedDates = Array();

        /**
         * Helper object to store the selected themebox info
         */
        var selectedThemeboxInfo = []


        /**
         * variable for one day (start with next sunday) to calculate next and previous sundays
         */
        var dayToCalculateNextSundays = getNextDayOfWeek(new Date, 7);
        var dayToCalculatePreviousSundays = getNextDayOfWeek(new Date, 7);

        var dayToCalculateNextSaturdays = getNextDayOfWeek(new Date, 6);
        dayToCalculateNextSaturdays.setHours(14);
        dayToCalculateNextSaturdays.setMinutes(0);
        dayToCalculateNextSaturdays.setSeconds(0);



        // initialize the multiselect
        $('#dropdown2').multiselect({});

        //load themebox data from the first list element
        loadThemeboxInfoBox($(".themebox-list").first().attr('id'));
        //set focus to the first list element
        $(".themebox-list")[0].focus();

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
         * Format of datepicker is set
         */
        $("#start-date").datepicker({
            dateFormat: "dd.mm.yy",
            minDate: 0,
            beforeShowDay: function (date) {
                var string = $.datepicker.formatDate('yy-mm-dd', date)
                return [listOfBlockedDates.indexOf(string) == -1]
            },
            onSelect: function (date) {
                bindEndData();

                if (selectedThemeboxInfo.themebox.fk_order_type === 1) { // Hourly order
                    // reset the dropdown-von and dropdown-bis
                    $("#dropdown-von").val($("#dropdown-von option:first").val());
                    $("#dropdown-bis").val($("#dropdown-bis option:first").val());
                    //disable dropdown-bis
                    $("#dropdown-bis").prop("disabled", true);
                    removeEvent();
                    //reset the carrusel button
                    $("#carousel-right").prop("disabled", true);
                    setStartingTimesSelection();
                }

                if ($("#end-date").datepicker("getDate") != null) {
                    if (selectedThemeboxInfo.themebox.fk_order_type === 2) { // daily order
                        addEvent();
                    }
                }
                $("#end-date").removeAttr("disabled");
                $("#info-calendar-message-box").css("display", "none");
            }
        });


        $("#end-date").datepicker({
            dateFormat: "dd.mm.yy",
            onSelect: function (date) {

                if (selectedThemeboxInfo.themebox.fk_order_type === 2) { // daily order
                    addEvent();
                }

                $("#info-calendar-message-box").css("display", "none");
            }
        });

        function getSelectedDateOrders(date) {
            return selectedThemeboxInfo.orders.filter(function (order) {
                return order.startdate.startsWith(date);
            });
        }

        function setStartingTimesSelection() {

            //cleanup to show correct values
            addAllHoursToDropdown("#dropdown-von");

            // disable the error message
            $("#error-calendar-message-box").css("display", "none");


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

            // if the selected date is a saturday push 14:00 until 18:00 as blocked hour
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
            });
            console.log(blockedThirtyMinutes);

            //the whole day is blocked
            if(blockedThirtyMinutes >= 600) {
                //disable the dropdown-von
                $("#dropdown-von").prop("disabled", true);
                //show error message
                errorHandling("Der gewählte Tag ist leider ausgebucht. Bitte wählen Sie einen anderen Tag.", "#error-calendar-message-box");
            }


            removeBlockedHoursFromDropdown(blockedHours, "#dropdown-von");
        }

        function setEndingTimesSelectionOnStartzeitChange() {

            addAllHoursToDropdown("#dropdown-bis");

            // Reset #dropdown-bis and enable it
            var endDate = formatDate($("#end-date").datepicker("getDate"));

            // Get the selected start time
            var selectedStartTime = $("#dropdown-von").val();
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

            removeBlockedHoursFromDropdown(blockedHours, "#dropdown-bis");
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

        function addAllHoursToDropdown(dropdownClassName) {
            // Remove all options from the dropdown
            $(dropdownClassName).empty();
            if (dropdownClassName === "#dropdown-von") {
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


        $("#dropdown-von").change(function () {
            $("#dropdown-bis").prop("disabled", false);
            setEndingTimesSelectionOnStartzeitChange();
            removeEvent();
        });

        $("#dropdown-bis").change(function () {
            addEvent();
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
        $("#carousel-right").click(function () {
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
        $("#carousel-left").click(function () {
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
         * computes all day between a given start and enddate
         * @param startDate
         * @param endDate
         * @returns {any[]}
         */
        function computeDayBetweenStartAndEnd(startDate, endDate) {

            var arr = new Array();
            var dt = new Date(startDate);

            while (dt <= endDate) {
                arr.push(formatDate(new Date(dt)));
                dt.setDate(dt.getDate() + 1);
            }
            return arr;
        }


        /**
         * formats date in the format YYYY-MM-DD
         * @param date
         * @returns {string}
         */
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

        /**
         *
         */
        function loadViewChangeButtons() {

            //prevent buttons from being added multiple times
            if ($(".fc-toolbar .fc-left .fc-week-view-button").length !== 0) {
                return;
            }

            var switchToWeekButton = $('<button type="button" class="fc-week-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Wochenansicht</button>');
            var switchToMonthButton = $('<button type="button" class="fc-month-view-button fc-button fc-state-default fc-corner-left fc-corner-right">Monatsansicht</button>');
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
         * load calendar and themebox detail list
         * @param themebox_Id
         */
        function loadThemeboxInfoBox(themebox_Id) {

            //clear the array so that the newly selected themebox is loaded
            selectedThemeboxInfo = [];

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




            $.ajax({
                url: "./user/getThemebox",
                type: "POST",
                data: {themeboxId: themebox_Id},
                success: function (response) {
                    selectedThemeboxInfo = response["data"];
                    var html =
                        '<tr><td>Signatur: </td><td class="themebox-table-value">' + response["data"]["themebox"]["signatur"] + '</td></tr>' +
                        '<tr><td>Stufe: </td><td class="themebox-table-value">' + response["data"]["themebox"]["schoollevel"] + '</td></tr>' +
                        '<tr><td>Strichcode: </td><td class="themebox-table-value">' + response["data"]["themebox"]["barcode"] + '</td></tr>' +
                        '<tr><td>Grösse: </td><td class="themebox-table-value">' + response["data"]["themebox"]["size"] + '</td></tr>' +
                        '<tr><td>Gewicht: </td><td class="themebox-table-value">' + response["data"]["themebox"]["weight"] + ' kg</td></tr>' +
                        '<tr><td>Inhalt: </td><td class="themebox-table-value"><button type="button" class="btn btn-default btn-show-themebox-content">Anzeigen <span class="glyphicon glyphicon-search"></span></button></td></tr>';

                    if (response["data"]["themebox"]["extra_text"] != null) {
                        html = html + '<tr><td>Wichtige Info: </td><td class="themebox-table-value"><button type="button" class="btn btn-danger btn-show-extra-text">Anzeigen <span class="glyphicon glyphicon-search"></span></button></td></tr>';
                    }

                    $('#themebox-infobox').html(html);

                    var hiddenField = '<input type="hidden" name="themeboxId" value=' + themebox_Id + '>';
                    $("#themebox-infobox").append(hiddenField);

                    $("#themebox-order-info-title").html(response["data"]["themebox"]["title"]);
                    $("#calendar").fullCalendar("today");
                    $("#carousel-right").prop("disabled", true);

                    $("#calendar").fullCalendar("removeEvents");
                    listOfBlockedDates.length = 0;
                    blockDatesInDatepicker();
                    loadBlockedDates();

                    blockNextFiveSundaysInCalendar();
                    blockPreviousFiveSundaysInCalendar();
                    blockNextFiveSaturdayAfterTwoPmInCalendar();

                    var orders = response["data"]["orders"];
                    loadHourlyView(response["data"]["themebox"]["fk_order_type"]);

                    loadViewChangeButtons();

                    if (response["data"]["themebox"]["fk_order_type"] === 1) { // Hourly order
                        $("#thekre-dropdown").val("3");
                        $("#ausleihdauer-text").html("Ausleihdauer max. 1 Tag");
                        $("#Von-text").html("Am:");


                        $("#thekre-dropdown option[value='3']").prop("disabled", false).show();
                        $("#thekre-dropdown option[value='1']").prop("disabled", true).hide();


                    } else { // Daily order
                        blockTillNextSunday();
                        addBlockDateFromToday();

                        //make the thekre-dropdown option disable and also not show the one with the name "Gebrauch in der Bibliothek"
                        $("#thekre-dropdown option[value='3']").prop("disabled", true).hide();
                        $("#thekre-dropdown option[value='1']").prop("disabled", false).show();



                        $("#ausleihdauer-text").html("Ausleihdauer max. 8 Wochen");
                        $("#Von-text").html("Von:");
                    }

                    var isDailyOrder = response["data"]["themebox"]["fk_order_type"] === 2;

                    $.each(orders, function (index, value) {
                        $('#calendar').fullCalendar("renderEvent", {
                            id: "borrowed",
                            title: "",
                            start: isDailyOrder ? addBlockStartdateDailyOrder(value["startdate"]) : value["startdate"],
                            end: isDailyOrder ? addBlockEnddateDailyOrder(value["enddate"]) : value["enddate"],
                            rendering: isDailyOrder ? "background" : "",
                            className: "block"
                        }, true);

                        if (isDailyOrder) {
                            var dateArr = computeDayBetweenStartAndEnd(new Date(addBlockStartdateDailyOrder(value['startdate'])), new Date(addBlockEnddateDailyOrder(value['enddate'])));
                            for (var i = 0; i <= dateArr.length; i++) {
                                listOfBlockedDates.push(dateArr[i]);
                            }
                        }
                    });

                    hideErrorBoxes();
                    $("#end-date").prop("disabled", true);
                    $("#start-date").val("");
                    $("#end-date").val("");

                    $("#themebox-id").val(response["data"]["themebox"]["pk_themebox"]);


                },
                error: function (xhr, status, error) {
                    errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
                }
            });

        }

        function loadHourlyView(order_type, orders) {
            //reset the selection so that the option is null
            $("#dropdown-von").val($("#dropdown-von option:first").val());
            $("#dropdown-bis").val($("#dropdown-bis option:first").val());
            if (order_type !== 1) {
                $("#themebox-datepicker-bis").show();
                $("#themebox-time-select").hide();
                return;
            }

            //hide themebox-datepicker-bis
            $("#themebox-datepicker-bis").hide();

            $("#themebox-time-select").show();
            //the selection should be disabled by default until the dates are chosen
            $("#dropdown-von").prop("disabled", true);
            $("#dropdown-bis").prop("disabled", true);
        }


        /**
         * Event handler for the click event on the resetCategoryFilterBtn button.
         * Resets the dropdowns and themebox list to their initial states. (i.e. no filters applied, shows all themeboxes)
         */
        $("#resetCategoryFilterBtn").on("click", function () {
            // Reset the dropdown to its initial state
            $("#dropdown1").val("");
            // Reset the multiselect to its initial state
            $("#dropdown2").multiselect("deselectAll", false);
            $("#dropdown2").multiselect("updateButtonText");
            $("#start-date").prop("disabled", false);

            // Reset the themebox list to its initial state
            $.ajax({
                type: "GET",
                url: "./user/getAllThemeboxes",
                success: function (response) {
                    // Load all themeboxes into the list
                    let themeboxesList = response; // Assuming the response contains the list of themeboxes

                    // Clear the existing themebox list
                    $("#themebox-list-ul").empty();
                    // Clear the themebox info box
                    $("#themebox-infobox").empty();
                    // Clear the themebox search field
                    $("#themebox-list-search").val("");


                    // Append the new themeboxes to the list
                    themeboxesList.forEach(function (themebox) {
                        $("#themebox-list-ul").append('<li><a href="#" class="list-group-item list-group-item-action themebox-list" id="' + themebox.pk_themebox + '">' + themebox.title + '</a></li>');
                    });

                    // On click of the themebox list item, load the themebox info box
                    $(".themebox-list").each(function () {
                        $(this).on("click", function () {
                            $(".themebox-list.active").removeClass("active"); // Remove active class from all list items
                            $(this).addClass("active"); // Add active class to the clicked list item
                            loadThemeboxInfoBox($(this).attr("id"));
                        });
                    });

                    // After updating the themebox list, reapply the "active" class
                    $(".themebox-list.active").removeClass("active"); // Remove active class from all list items
                    $(".themebox-list").first().addClass("active"); // Add active class to the first list item
                    loadThemeboxInfoBox($(".themebox-list").first().attr('id')); // Load themebox data from the first list element
                    $(".themebox-list")[0].focus(); // Set focus to the first list element

                },
                error: function (error) {
                    console.error("Error fetching themeboxes:", error);
                }
            });
        });

        /**
         * Event handler for changes in dropdown1 and dropdown2 elements.
         * Retrieves selected category data and school levels, then calls
         * the updateSelectionListFromFilter function to update the themebox list.
         */
        $("#dropdown1, #dropdown2").on("change", function () {
            let selectElement = document.getElementById("dropdown1");
            let selectedCategoryData = selectElement.options[selectElement.selectedIndex].getAttribute('data-category');

            // Get selected values from multiselect
            let selectedSchoolLevels = $('#dropdown2').val();

            // Check if any value is selected in the multiselect
            if (selectedSchoolLevels && selectedSchoolLevels.length > 0) {
                // Add selected values into a comma-separated string
                selectedSchoolLevels = selectedSchoolLevels.join(",");
            } else {
                // If no value is selected, set it to null or an empty string
                selectedSchoolLevels = null; // or selectedSchoolLevels = "";
            }

            // Call updateSelectionListFromCategory function
            updateSelectionListFromFilter(selectedCategoryData, selectedSchoolLevels);
        });

        /**
         * Updates the themebox list based on selected category data and school levels.
         *
         * Makes an AJAX request to retrieve themeboxes matching the provided filters,
         * then updates the themebox list, info box, and calendar accordingly.
         *
         * @param {string} selectedCategoryData - The selected category data for filtering themeboxes.
         * @param {string} selectedSchoolLevels - The selected school levels for filtering themeboxes.
         */
        function updateSelectionListFromFilter(selectedCategoryData, selectedSchoolLevels) {

            $.ajax({
                type: "POST",
                url: "./user/getThemeboxesByFilter",
                data: {
                    selectedCategoryData: selectedCategoryData,
                    selectedSchoolLevels: selectedSchoolLevels
                },
                success: function (response) {
                    let themeboxesList = response.themeboxes;

                    // Clear the existing themebox list
                    $("#themebox-list-ul").empty();
                    // Clear the themebox info box
                    $("#themebox-infobox").empty();
                    // Clear the calendar
                    $("#calendar").fullCalendar("removeEvents");
                    // disable the startDate filed
                    $("#start-date").prop("disabled", true);

                    if (themeboxesList.length > 0) {
                        // Append the new themeboxes to the list
                        themeboxesList.forEach(function (themebox) {
                            $("#themebox-list-ul").append('<li><a href="#" class="list-group-item list-group-item-action themebox-list" id="' + themebox.pk_themebox + '">' + themebox.title + '</a></li>');
                        });

                        // on click of the themebox list item, load the themebox info box
                        $(".themebox-list").each(function () {
                            $(this).on("click", function () {
                                $(".themebox-list.active").removeClass("active"); // Remove active class from all list items
                                $(this).addClass("active"); // Add active class to the clicked list item
                                loadThemeboxInfoBox($(this).attr("id"));
                            });
                        });

                        $("#start-date").prop("disabled", false);

                        // After updating the themebox list, reapply the "active" class
                        $(".themebox-list.active").removeClass("active"); // Remove active class from all list items
                        $(".themebox-list").first().addClass("active"); // Add active class to the first list item
                        loadThemeboxInfoBox($(".themebox-list").first().attr('id')); // Load themebox data from the first list element
                        $(".themebox-list")[0].focus(); // Set focus to the first list element
                    } else {
                    }
                },

                error: function (error) {
                }
            });
        }


        $(".fc-corner-right").click(function () {
            blockNextFiveSundaysInCalendar();
            blockNextFiveSaturdayAfterTwoPmInCalendar();
        });

        $(".fc-corner-left").click(function () {
            blockPreviousFiveSundaysInCalendar();
        });


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


        function blockNextFiveSundaysInCalendar() {
            for (var i = 0; i < 10; i++) {
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

        function blockNextFiveSaturdayAfterTwoPmInCalendar() {
            for(var i = 0; i < 5; i++) {
                blockAllSaturdayAfterTwoPmEvent(dayToCalculateNextSaturdaysStart, dayToCalculateNextSaturdaysEnd);
                dayToCalculateNextSaturdaysStart.setDate(dayToCalculateNextSaturdaysStart.getDate() + 7);
                dayToCalculateNextSaturdaysEnd.setDate(dayToCalculateNextSaturdaysEnd.getDate() + 7);
            }
        }


        /**
         * block dates till next sunday
         */
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
         * create new blocked period
         * @param start
         * @param end
         */
        function blockedPeriodEvent(start, end) {

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


        /**
         * create new blocked sunday
         */
        function blockAllSundaysEvent(Sunday) {
            console.log(Sunday)
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


        /**
         * load blocked dates
         */
        function loadBlockedDates() {

            $.ajax({
                url: "./user/getBlockedPeriods",
                type: "POST",
                data: {},
                success: function (data) {

                    $.each(data, function (index, element) {
                        blockedPeriodEvent(formatBlockedPeriodCalendarStartDate(element.startdate), formatBlockedPeriodCalendarEndDate(element.enddate));
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


        /**
         * button to show the themebox details - content
         */
        $(document).on("click", ".btn-show-themebox-content", function (event) {
            $('#themebox-content-modal').modal('show');

            $.ajax({
                url: "./user/getThemeboxContent",
                type: "POST",
                data: {themeboxId: $("#themebox-id").val()},
                success: function (response) {
                    $('#themebox-content-modal-box').html(response["content"]);
                },
                error: function (xhr, status, error) {
                    errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
                }
            });
        });


        /**
         * button to show the themebox extra text
         */
        $(document).on("click", ".btn-show-extra-text", function (event) {
            $('#themebox-extra-text-modal').modal('show');

            $.ajax({
                url: "./user/getThemeboxContent",
                type: "POST",
                data: {themeboxId: $("#themebox-id").val()},
                success: function (response) {
                    $('#themebox-extra-text-modal-box').html(response["extra_text"]);
                },
                error: function (xhr, status, error) {
                    errorHandling("Es ist ein Fehler bei der Datenverarbeitung passiert. Bitte kontaktieren Sie die FHNW Bibliothek unter bibliothek.windisch@fhnw.ch", "#error-message-box");
                }
            });
        });


        $('.thekre-list li a').click(function (e) {
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

        function infoHandling(msg, box) {
            $(box).html(msg);
            $(box).css("display", "block");
            $("#error-calendar-message-box").css("display", "none");
        }

        /**
         * change the delivery typ
         */
        $("#thekre-dropdown").click(function () {
            if ($("#thekre-dropdown").val() === "1") {
                $("#school-Address").hide();
                $("#user-delivery-info").show();
                $("#carousel-reserve-button").prop('disabled', false);
            } else if ($("#thekre-dropdown").val() === "2") {
                $("#user-delivery-info").hide();
                $("#school-Address").show();
                $("#carousel-reserve-button").prop('disabled', true);
            } else {
                $("#user-delivery-info").show();
                $("#school-Address").hide();
                $("#carousel-reserve-button").prop('disabled', false);
            }
        });


        /**
         * enable and disable next/order buttons
         * @param order_carousel_status
         */
        function checkValidation(order_carousel_status) {
            if (order_carousel_status === 0) {
                $("#carousel-right").prop("disabled", false);
            }

            if (order_carousel_status === 1 && $('#error-message-box').css("display", "block")) {
                $('#carousel-right').prop("disabled", true);
            }

            if (order_carousel_status === 2) {
                $('#carousel-right').prop("disabled", true);
            }
        }

        $('#themebox-order-carousel').off('keydown.bs.carousel');

        /**
         * hide error boxes
         */
        function hideErrorBoxes() {
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
            $('#order-progress-bar-value').text("Schritt " + carousel_counter + " von 3");
        }


        /**
         * add block days after order enddate
         * @param date
         * @returns {string}
         */
        function addBlockEnddateDailyOrder(date) {
            var temp_date = new Date(date + "T00:00:00-00:00");
            temp_date.setDate(temp_date.getUTCDate() + 8);
            return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
        }

        /**
         * add block days before order startdate
         * @param date
         * @returns {string}
         */
        function addBlockStartdateDailyOrder(date) {
            var temp_date = new Date(date + "T00:00:00-00:00");
            temp_date.setDate(temp_date.getUTCDate() - 7);
            return temp_date.getUTCFullYear() + "-" + formatTwoDigit(temp_date.getUTCMonth() + 1) + "-" + formatTwoDigit(temp_date.getUTCDate());
        }

        /**
         * format startdate datepicker
         * @param date
         * @returns {string}
         */
        function formatCalendarDate(date) {
            var temp_date = date.split(".");
            var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
            return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate());
        }

        /**
         * format enddate datepicker
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
         * format date for comparison
         * @param date
         * @returns {Date}
         */
        function formatCalendarDateCompare(date) {
            var temp_date = date.split(".");
            var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
            return new_date;
        }

        function formatCalendarDateTimeCompare(date) {
            var temp_date = date.split(" ");
            var dateComponents = temp_date[0].split(".");
            var timeComponents = temp_date[1].split(":");
            var new_date = new Date(
                dateComponents[2] + "-" + dateComponents[1] + "-" + dateComponents[0] +
                "T" + timeComponents[0] + ":" + timeComponents[1] + ":00-00:00"
            );
            var returnValue = new_date.getUTCFullYear() +
                "-" +
                formatTwoDigit(new_date.getUTCMonth() + 1) +
                "-" +
                formatTwoDigit(new_date.getUTCDate()) +
                " " +
                formatTwoDigit(new_date.getUTCHours()) +
                ":" +
                formatTwoDigit(new_date.getUTCMinutes()) +
                ":00-00:00"
            return (returnValue);
        }

        /**
         * format two digit number
         * @param number
         * @returns {*}
         */
        function formatTwoDigit(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        /**
         * format startdate blocked period
         * @param date
         * @returns {string}
         */
        function formatBlockedPeriodCalendarStartDate(date) {
            var temp_date = date.split(".");
            var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
            return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate());
        }

        /**
         * format enddate blocked period
         * @param date
         * @returns {string}
         */
        function formatBlockedPeriodCalendarEndDate(date) {
            var temp_date = date.split(".");
            var new_date = new Date(temp_date[2] + "-" + temp_date[1] + "-" + temp_date[0] + "T00:00:00-00:00");
            return new_date.getUTCFullYear() + "-" + formatTwoDigit(new_date.getUTCMonth() + 1) + "-" + formatTwoDigit(new_date.getUTCDate() + 1);
        }

        /**
         * check date collision
         * @param start
         * @param end
         * @returns {boolean}
         */
        function checkEventCollision(start, end) {
            var status = true;
            if (start <= current_date) {
                status = false;
            } else {
                $.each($("#calendar").fullCalendar('clientEvents'), function (index, value) {
                    if ((start >= value["start"] && start <= value["end"] - 1 || start <= value["start"] && end >= value["start"]) && (value["id"] == "borrowed")) {
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
         * @param isHourly
         */
        function createEvent(start, end, isHourly) {
            $("#calendar").fullCalendar('renderEvent',
                {
                    title: "",
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

            $('#calendar').fullCalendar('gotoDate', start);
        }

        function removeEvent() {
            $("#calendar").fullCalendar('removeEvents', function (event) {
                return event.className == "new_event";
            });
        }

        /**
         * add event on datepicker change
         */
        function addEvent() {
            $("#calendar").fullCalendar('removeEvents', function (event) {
                return event.className == "new_event";
            });

            var startTime = $('#dropdown-von').val();
            var endTime = $('#dropdown-bis').val();
            var isHourly = startTime !== null || endTime !== null;

            if (isHourly) {
                var startDateTime = $("#start-date").val() + " " + startTime;
                var endDateTime = $("#end-date").val() + " " + endTime;
                var collision = checkEventCollision(formatCalendarDateTimeCompare(startDateTime), formatCalendarDateTimeCompare(endDateTime));
            } else {
                var collision = checkEventCollision(formatCalendarDateCompare($("#start-date").val()), formatCalendarDateCompare($("#end-date").val()));
            }


            if (collision) {
                hideErrorBoxes();

                $("#calendar").fullCalendar('removeEvents', function (event) {
                    return event.className == "new_event";
                });
                if (isHourly) {
                    createEvent(formatCalendarDateTimeCompare(startDateTime), formatCalendarDateTimeCompare(endDateTime), isHourly);
                } else {
                    createEvent(formatCalendarDate($("#start-date").val()), formatCalendarEndDate($("#end-date").val()), isHourly);
                }
            } else {
                errorHandling("Ihre Auswahl steht in Konflikt mit einem anderen Bestelltermin", "#error-calendar-message-box");
                $('#carousel-right').prop('disabled', true);
            }
        }


        /**
         * bind startdate field and enddate field
         */
        function bindEndData() {
            var end_date = $('#end-date');
            var start_date = $("#start-date").datepicker('getDate');
            var min_date = $("#start-date").datepicker('getDate');
            start_date.setDate(start_date.getDate() + 56);
            end_date.datepicker('option', 'maxDate', start_date);
            end_date.datepicker('option', 'minDate', min_date);
            $("#start-date").datepicker('option', 'minDate', new Date());

            if (selectedThemeboxInfo.themebox.fk_order_type === 1) { // Hourly order
                //set the end date to the start date
                $("#end-date").datepicker("setDate", $("#start-date").datepicker("getDate"));
                //enable the dropdowns
                $("#dropdown-von").prop("disabled", false);
            } else {

            }
        }


        /**
         * show loadin modal on submit
         */
        $('#orderform').submit(function () {
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
        $('#themebox-list-search').on("keyup", function () {
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


        /**
         * show callback order confirm details
         */
        $(".button-confirm-order").click(function () {
            if ($('#thekre-dropdown').val() == 2) {
                $('#delete-warning-header-text').text("Die Lieferung an Aargauer Schulen ist kostenpflichtig.");
                $('#button-submit-order').text("Themenkiste liefern lassen");
            } else {
                $('#delete-warning-header-text').text("Wollen Sie die Themenkiste/Lernroboter wirklich bestellen und selbst Abholen?");
                $('#button-submit-order').text("Themenkiste bestellen");
            }
            prepareOrderConfirmModal();

        });

        /**
         * show order confirm modal
         */
        function prepareOrderConfirmModal() {
            $('#callback-modal').modal('show');
            $('#modal-content-failure').css('display', 'none');
            $('#modal-content-success').css('display', 'none');
            $('#modal-confirm-order-warning').css('display', 'block');
        }
    }
)
;