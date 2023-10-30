
<?php $__env->startSection('title', 'ThekRe - Admin'); ?>

<?php $__env->startSection('content'); ?>

    <?php echo $__env->make('layouts.nav_admin', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    <script src="<?php echo e(asset('/js/admin/statistics-load.js')); ?>"></script>


    <div class="col-md-12 admin-panel data-table-thekre">
        <h1 class="admin-header">Statistiken</h1>

            <div class="panel panel-default">
                <div class="row">
                   <table class="tbl-statistics-year">
                       <tr>
                            <td>
                                <label class="lbl-statistics-year">Statistik für das Jahr: </label>
                            </td>
                            <td>
                               <select id="statistics-year-select" class="thekre-dropdown-statics-year">
                                   <?php $__currentLoopData = $dates; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $date): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <option  value="<?php echo e($date); ?>"> <?php echo e($date); ?></option>
                                   <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                               </select>
                            </td>
                       </tr>
                   </table>
                </div>
                <div class="spacer"></div>
                <div class="row">
                    <div class="col-md-12" id="statistics-background">
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\leihmich\thek-re-2\resources\views/admin/statistics_index.blade.php ENDPATH**/ ?>