
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_background', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <div class="alert alert-danger" id="email-reset-notExistent-message-box">
        Email stimmt nicht mit der Email überein, die mit diesem Account verknüpft ist.
    </div>

    <div class="alert alert-danger" id="reset-password-8character-message-box">
        Passwort muss mindestens 8 Zeichen lang sein.
    </div>

    <div class="alert alert-danger" id="reset-password-notMatch-message-box-2">
        Passwort und Passwortwiederholung stimmen nicht überein.
    </div>

    <div class="alert alert-danger" id="reset-password-Failed-message-box">
        Passwort zurücksetzen fehlgeschlagen.
    </div>

    <script src="<?php echo e(asset('js/admin/reset-password.js')); ?>"></script>

    <div class="col-md-12 admin-panel">
        <input type="text" name="token" id="reset-password-token" hidden value="<?php echo e($token); ?>">
        <h1 class="admin-header">Passwort zurücksetzen</h1>
        <div class="form-group">
            <label for="email">E-Mail Adresse:</label>
            <input type="email" class="form-control" name="email" id="reset-password-email"/>
        </div>
        <div class="form-group">
            <label for="password">Neues Passwort:</label>
            <input type="password" class="form-control" name="password" id="new-password-password"/>
        </div>
        <div class="form-group">
            <label for="password">Neues Passwort wiederholen:</label>
            <input type="password" class="form-control" name="password_confirmation" id="new-password-confirmed"/>
        </div>
        <div>
            <span class="tooltiptext">Passwort muss mindestens 8 Zeichen lang sein.</span>
        </div>
        <button type="submit" id="reset-password-button" class="btn btn-success btn-lg">Change</button>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\leihmich\thek-re-2\resources\views/admin/new-password_form.blade.php ENDPATH**/ ?>