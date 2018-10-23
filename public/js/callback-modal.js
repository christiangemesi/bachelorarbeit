/**
 * show success callback modal
 * @param msg
 */
function showSuccessModal(msg) {
    $('#callback-modal').modal('show');
    $('#modal-content-success-header').text(msg);
    $('#modal-content-success').css('display', 'block');
    $('#modal-content-failure').css('display', 'none');
    $('#modal-content-info').css('display', 'none');
    $('#modal-delete-warning').css('display', 'none');
    $('#modal-delete-order-warning').css('display', 'none');
    $('#modal-delete-themebox-warning').css('display', 'none');
    $('#modal-delete-blocked-period-warning').css('display', 'none');
}

/**
 * show failure callback modal
 */
function showFailureModal(msg, xhr) {
    var responseText = jQuery.parseJSON(xhr.responseText);
    $('#callback-modal').modal('show');
    $('#modal-content-failure-header').text(msg);
    $('#modal-failure-message').text(responseText["message"]);
    $('#modal-content-failure').css('display', 'block');
    $('#modal-content-success').css('display', 'none');
    $('#modal-content-info').css('display', 'none');
    $('#modal-delete-order-warning').css('display', 'none');
    $('#modal-delete-themebox-warning').css('display', 'none');
    $('#modal-delete-blocked-period-warning').css('display', 'none');
}

function refresh() {
    window.setTimeout(function(){location.reload()},500);
}