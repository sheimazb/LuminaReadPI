<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Novella extends Model
{
    protected $table = 'novellas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'description',
        'content',
        'progress',
    ];
    use HasFactory;
}
