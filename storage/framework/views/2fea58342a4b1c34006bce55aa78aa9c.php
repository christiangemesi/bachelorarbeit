
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_background', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <div class="alert alert-success" id="passwort-reset-error-message-box">
        Wdsd
    </div>

     <script src="<?php echo e(asset('js/admin/reset-password.js')); ?>"></script>


    <div class="col-md-12 admin-panel">
        <input type ='text' name="token" value = '<?php echo e($token); ?>'>
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="password">Enter new Password:</label>
            <input type="password" class="form-control" name="password" id = "new-password-password"/>
        </div>
        <div class="form-group">
            <label for="password">Repeat new Password:</label>
            <input type="password" class="form-control" name="password_confirmation" id = "new-password-confirmed"/>
        </div>
        <button type="submit" id="reset-password-button" class="btn btn-success btn-lg">Change</button>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\leihmich\thek-re-2\resources\views/admin/new-password_form.blade.php ENDPATH**/ ?>