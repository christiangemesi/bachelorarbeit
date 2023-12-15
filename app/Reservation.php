<?php

namespace ThekRe;


use Illuminate\Database\Eloquent\Model;

class Reservation extends Model{
    protected $table = "tbl_reservation";
    protected $primaryKey = "pk_reservation";
    public $timestamps = false; // Do not save the object created date time

    protected $guarded = ['pk_reservation']; // Every attribute can be changed except the primary key

}