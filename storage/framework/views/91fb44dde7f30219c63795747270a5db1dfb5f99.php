<?php $__env->startSection('title', 'ThekRe'); ?>

<?php $__env->startSection('content'); ?>
    <?php echo $__env->make('layouts.nav_background', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>

    <div id="page-content-wrapper">
        <div class="col-md-12 main-Panel">
            <div class="row">
                <div class="col-md-12">
                    <h1>Die Seite existiert leider nicht…</h1>

                    <p class="order_feeback_text">Entschuldigung, aber die Webseite die Sie versucht haben zu erreichen, ist unter dieser Adresse nicht verfügbar.</p>

                    <a href="../">
                        <button type="button" class="btn btn-primary">Zurück zur Startseite</button>
                    </a>
                </div>
            </div>
        </div>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>