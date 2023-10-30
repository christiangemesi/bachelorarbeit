
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <script src="<?php echo e(asset('/js/jquery.dataTables.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/dataTables.bootstrap.min.js')); ?>"></script>
    <link rel="stylesheet" href="<?php echo e(asset('css/dataTables.bootstrap.min.css')); ?>">

    <script src="<?php echo e(asset('js/callback-modal.js')); ?>"></script>
    <script src="<?php echo e(asset('js/admin/mail.js')); ?>"></script>
    <script src="<?php echo e(asset('js/jquery-1.12.4.js')); ?>"></script>

    <!-- include js, jquery and css for summernote-->
    <link href="<?php echo e(asset('js/bootstrap/css/bootstrap.css')); ?>" rel="stylesheet">
    <script src="<?php echo e(asset('js/bootstrap/js/bootstrap.js')); ?>"></script>
    <link href="<?php echo e(asset('/summernote/summernote.css')); ?>" rel="stylesheet">
    <script src="<?php echo e(asset('/summernote/summernote.js')); ?>"></script>

    <link rel="stylesheet" href="<?php echo e(asset('css/style.css')); ?>">





    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                <?php echo $__env->make("layouts.callback_messages", \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

                <div id="modal-edit-mail-modal">
                    <div class="panel-heading modal-header-warning"> <span class="glyphicon glyphicon-flash" id="thekmodal-glyphicon-flash" aria-hidden="true"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <h2 class="delete-warning-header-text">Wollen Sie die Mailvorlage wirklich ändern?</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="button-edit-mail-confirmed" class="btn btn-lg btn-warning float-left">Mailvorlage ändern</button>
                        <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">Schliessen</button>
                        <input type="hidden" id="object-edit-id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <div class="col-md-12 admin-panel  data-table-thekre">
        <h1 class="admin-header">E-Mails</h1>
        <div class="panel panel-default no-border margin-top-less" id="table-content">

                <div class="row thekre-row">
                    <div class="panel-body margin-less">
                    <table class="tbl-mail">
                        <tr>
                            <td>
                                <label class="lbl-mail">Vorlage: </label>
                            </td>
                            <td>
                                <select id="mail-select" class="thekre-dropdown-mail">
                                    <?php $__currentLoopData = $mails; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $mail): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <option  value="<?php echo e($mail->pk_mail); ?>"> <?php echo e($mail->mail_description); ?></option>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </select>
                            </td>
                        </tr>
                    </table>
                </div>

                <div autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <div id="summernote"></div>
                </div>

                <div class="form-group">
                    <button id="confirm-button-mail" class="btn btn-primary float-right">Speichern</button>
                </div>

                    <div id="edit_legend"></div>

                    <div hidden>
                        <form id="change_email_form">
                            <input id="change_email_id" name="change_email_id">
                            <input id="change_email_text" name="change_email_text">
                        </form>
                    </div>

             </div>
        </div>
    </div>



<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.masterNoBootstrap', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\leihmich\thek-re-2\resources\views/admin/indexEmail.blade.php ENDPATH**/ ?>