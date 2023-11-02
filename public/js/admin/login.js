/**
 * Created by simon
 */
$(document).ready(function() {

    //set focus to password field
    $("#admin-email").focus();
    $('#login-button').prop("disabled", true);

    /**
     * enter press on password field
     */
    $('#admin-password').keyup(function(e){
       if($(this).val()){
           $('#login-button').prop("disabled", false);
           if(e.keyCode == 13)
           {
               checkLogin();
           }
       }
    });


    /**
     * login button click
     */
    $('#login-button').click(function(e) {
        checkLogin();
    });


    /**
     * admin login
     */
    function checkLogin(){
        $.ajax({
            url: "login",
            type:'POST',
            data: {
                email: $('#admin-email').val(),
                password: $('#admin-password').val()
            },
            success:  function(response) {
                if(response == "failure"){
                    $('#login-error-message-box').css('display', 'block');
                }else{
                    window.location = "";
                }
            },
            error: function(xhr, status, error) {
                $('#login-error-message-box').css('display', 'block');
                $('#login-error-message-box').html(error);
            }
        })
    }

    /**
     * logout button click
     */
    $('#logout-button').click(function(e) {
        window.location = "admin/logout";
    });

} );