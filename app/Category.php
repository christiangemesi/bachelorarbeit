<?php

namespace ThekRe;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "tbl_category";
    protected $primaryKey = "pk_category";
    public $timestamps = false;

    protected $guarded = ['pk_category'];
}
