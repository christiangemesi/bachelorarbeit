<?php

namespace ThekRe;


use Illuminate\Database\Eloquent\Model;

class HourlyOrder extends Model{
    protected $table = "tbl_hourly_order";
    protected $primaryKey = "pk_hourly_order";
    public $timestamps = false; // Do not save the object created date time

    protected $guarded = ['pk_hourly_order']; // Every attribute can be changed except the primary key

}