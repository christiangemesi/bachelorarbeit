<?php

namespace ThekRe;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "tbl_order";
    protected $primaryKey = "pk_order";
    public $timestamps = false; //do not save the object created date time

    protected $guarded = ['pk_order']; //every attribut can be changed except the primary key
}
