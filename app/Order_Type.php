<?php

namespace ThekRe;


use Illuminate\Database\Eloquent\Model;

class Order_Type extends Model
{
    protected $table = "tbl_order_type";
    protected $primaryKey = "pk_order_type";
    public $timestamps = false;
    protected $guarded = ['pk_order_type'];
}