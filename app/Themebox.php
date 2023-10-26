<?php

namespace ThekRe;

use Illuminate\Database\Eloquent\Model;

class Themebox extends Model
{
    protected $table = "tbl_themebox";
    protected $primaryKey = "pk_themebox";
    public $timestamps = false; //do not save the object created date time

    protected $guarded = ['pk_themebox']; //every attribut can be changed except the primary key
}
