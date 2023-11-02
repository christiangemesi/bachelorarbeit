
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_background', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wenn eine E-Mail-Adresse mit diesem Account verknüpft ist, wurde eine E-Mail mit einem Link zum Zurücksetzen des Passworts versendet.
    </div>

    <script src="<?php echo e(asset('js/admin/forget-password.js')); ?>"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" class="form-control" id="forgot-password-email" name="email"/>
        </div>
        <button type="submit" id="forgot-password-button" class="btn btn-success btn-lg">Send Reset Link</button>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\leihmich\thek-re-2\resources\views/admin/forget-password_form.blade.php ENDPATH**/ ?>