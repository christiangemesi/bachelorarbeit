
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_background', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wenn eine E-Mail-Adresse mit diesem Account verknüpft ist, wurde eine E-Mail mit einem Link zum Zurücksetzen des Passworts versendet.
    </div>

    


    <input type ='text' name="token" hidden value = '<?php echo e($token); ?>'>
    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">E-Mail:</label>
            <input type="email" class="form-control" id="forget-password-email" name="email"/>
        </div>
        <div class="form-group">
            <label for="password">Enter new Password:</label>
            <input type="password" class="form-control" name="password"/>
        </div>
        <div class="form-group">
            <label for="password">Repeat new Password:</label>
            <input type="password" class="form-control" name="password_confirmation"/>
        </div>
        <button type="submit" id="forget-password-button" class="btn btn-success btn-lg">Send Reset Link</button>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\leihmich\thek-re-2\resources\views/admin/new-password.blade.php ENDPATH**/ ?>