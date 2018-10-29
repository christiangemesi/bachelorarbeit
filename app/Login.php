<?php

namespace ThekRe;


use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    protected $table = "tbl_login";
    protected $primaryKey = "pk_login";
    public $timestamps = false; //do not save the object created date time

    protected $guarded = ['pk_login']; //every attribut can be changed except the primary key
}