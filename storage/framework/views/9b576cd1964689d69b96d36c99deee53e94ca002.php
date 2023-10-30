<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_background', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>
    <div class="alert alert-danger" id="login-error-message-box">
        Login Fehlgeschlagen.
    </div>

    <script src="<?php echo e(asset('/js/admin/login.js')); ?>"></script>

    <div class="col-md-12 admin-panel">
        <h1 class="admin-header">Administrator Login</h1>
        <div class="form-group">
            <label for="password">Passwort:</label>
            <input type="password" class="form-control" id="admin-password" name="password"/>
        </div>
        <button type="submit" id="login-button" class="btn btn-success btn-lg">Login</button>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>