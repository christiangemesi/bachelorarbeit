
<?php $__env->startSection('title', 'ThekRe - Poweruser'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_background', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <div class="alert alert-danger" id="login-error-message-box">
        Login Fehlgeschlagen.
    </div>

    <script src="<?php echo e(asset('/js/poweruser/login.js')); ?>"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Poweruser Login</h1>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="password" class="form-control" id="poweruser-password" name="password"/>
        </div>
        <button type="submit" id="login-button" class="btn btn-success btn-lg">Login</button>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\thek-re-2\resources\views/poweruser/login_form.blade.php ENDPATH**/ ?>