<?php

namespace ThekRe;


use Illuminate\Database\Eloquent\Model;

class PasswordResets extends Model
{
    protected $table = "tbl_password_resets";
    protected $primaryKey = "pk_password_resets";
    public $timestamps = false; //do not save the object created date time

    protected $guarded = ['pk_password_resets']; //every attribut can be changed except the primary key
}