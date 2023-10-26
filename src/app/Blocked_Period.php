<?php

namespace ThekRe;

use Illuminate\Database\Eloquent\Model;

class Blocked_Period extends Model
{
    protected $table = "tbl_blocked_period";
    protected $primaryKey = "pk_blocked_period";
    public $timestamps = false; //do not save the object created date time

    protected $guarded = ['pk_blocked_period']; //every attribut can be changed except the primary key
}
