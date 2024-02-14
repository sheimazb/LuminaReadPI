<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $table = '_books';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'description',
        'matricule',
    ];
    use HasFactory;
}
