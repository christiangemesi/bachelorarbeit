
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <script src="<?php echo e(asset('/js/jquery.dataTables.min.js')); ?>"></script>
    <script src="<?php echo e(asset('/js/dataTables.bootstrap.min.js')); ?>"></script>
    <link rel="stylesheet" href="<?php echo e(asset('css/dataTables.bootstrap.min.css')); ?>">

    <script src="<?php echo e(asset('/js/admin/category-form.js')); ?>"></script>
    <script src="<?php echo e(asset('js/admin/category-table.js')); ?>"></script>
    <script src="<?php echo e(asset('js/callback-modal.js')); ?>"></script>

    <link href="<?php echo e(asset('/summernote/summernote.css')); ?>" rel="stylesheet">
    <script src="<?php echo e(asset('/summernote/summernote.js')); ?>"></script>

    <div class="modal fade" id="callback-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">

                <?php echo $__env->make("layouts.callback_messages", \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

                <div id="modal-delete-category-warning">
                    <div class="panel-heading modal-header-warning"><span class="glyphicon glyphicon-flash"
                                                                          id="thekmodal-glyphicon-flash"
                                                                          aria-hidden="true"></span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <h2 class="delete-warning-header-text">Wollen Sie die Kategorie wirklich löschen?</h2>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="button-delete-category-confirm"
                                class="btn btn-lg btn-warning float-left">Eintrag löschen
                        </button>
                        <button type="button" class="btn btn-lg btn-default btn-modal float-right" data-dismiss="modal">
                            Schliessen
                        </button>
                        <input type="hidden" id="object-remove-id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="category-create-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading category-new-title">
                        Neue Kategorie
                    </div>
                </div>
                <div class="model-body">
                    <form id="create-category-form" name="create-category-form" autocomplete="off">
                        <div class="panel-body">
                            <div class="row thekre-row category-create-form-background" id="category-data-box">
                                <div class="form-group has-feedback">
                                    <label class="category-form-label" for="category-form-name">Kategorie Name
                                        * </label>
                                    <input type="text" class="form-control" name="name" id="category-form-name"
                                           maxlength="100" placeholder="Bienen"
                                           onblur="nonEmptyCategoryValidate('category-form-name','category-form-name-status','category-form-name-icon')"
                                           onkeyup="nonEmptyCategoryValidate('category-form-name','category-form-name-status','category-form-name-icon')"
                                           autofocus autofocus="autofocus"/>
                                    <span id="category-form-name-icon"></span>
                                    <span id="category-form-name-status" class="errorHeader">Kategorienname wird benötigt!</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-2">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Schliessen</button>
                        </div>
                        <div class="col-md-10">
                            <button type="button" id="create-category-button" class="btn btn-success float-right"
                                    data-dismiss="modal" disabled>Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="category-edit-modal" tabindex="-1">
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header modal-header-primary">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="panel-heading category-new-title">
                        Kategorie Bearbeiten
                    </div>
                </div>
                <div class="model-body">
                    <form id="edit-category-form" autocomplete="off">
                        <input type="hidden" value="" name="category_id" id="category_id"/>
                        <div class="panel-body">
                            <div class="row thekre-row category-create-form-background" id="category-data-box">
                                <div class="form-group has-feedback">
                                    <label class="category-form-label" for="category-edit-form-name">Kategorie Name
                                        * </label>
                                    <input type="text" class="form-control" name="name" id="category-edit-form-name"
                                           maxlength="100"
                                           onblur="checkCategoryForm('category-edit-form-name','category-edit-form-name-status','category-edit-form-name-icon')"
                                           onkeyup="checkCategoryForm('category-edit-form-name','category-edit-form-name-status','category-edit-form-name-icon')"
                                           autofocus="autofocus"/>
                                    <span id="category-edit-form-name-icon"></span>
                                    <span id="category-edit-form-name-status" class="errorHeader">Kategoriename wird benötigt!</span>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-md-2">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Schliessen</button>
                        </div>
                        <div class="col-md-10">
                            <button type="button" id="button-save-category-change" class="btn btn-primary float-right"
                                    data-dismiss="modal">Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Kategorien</h1>
        <div class="row">
            <button type="button" class="btn btn-success btn-create-cateogry" id="button-create-category"><span
                        class="glyphicon glyphicon-plus"></span> Kategorie erstellen
            </button>
        </div>
        <div class="panel panel-default no-border" id="table-content">
            <table id="new-category-table" class="data-table table table-bordered" cellspacing="0" width="100%">
                <thead>
                <tr>
                    <th class="category-name-column-width">Kategorie</th>
                    <th>Themenboxen</th>
                    <th class="edit-column-width"></th>
                </tr>
                </thead>
                <tbody>
                <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $category): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <tr>
                        <td>
                            <?php echo e($category["name"]); ?>

                        </td>
                        <td>
                            <?php $__currentLoopData = $themeboxes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $themebox): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php if($themebox["fk_category"] == $category["pk_category"]): ?>
                                    <?php echo e($themebox["title"]); ?>,
                                <?php endif; ?>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </td>
                        <td>
                            <button type="button" class="button-update btn btn-primary button-edit-category"
                                    aria-label="edit" value="<?php echo e($category["pk_category"]); ?>" data-toggle="tooltip"
                                    data-placement="top" title="Kategorie bearbeiten">
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </button>
                            <button type="button" class="button-delete-category btn btn-danger"
                                    value="<?php echo e($category["pk_category"]); ?>" aria-label="delete" data-toggle="tooltip"
                                    data-placement="top" title="Kategorie löschen">
                                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </tbody>
            </table>
        </div>
    </div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/html/resources/views/admin/category_index.blade.php ENDPATH**/ ?>