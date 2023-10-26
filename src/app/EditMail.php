<?php

namespace ThekRe;

use Illuminate\Database\Eloquent\Model;

class EditMail extends Model
{
    protected $table = "tbl_mail";
    protected $primaryKey = "pk_mail";
    public $timestamps = false; //do not save the object created date time

    protected $guarded = ['pk_mail']; //every attribut can be changed except the primary key
}
