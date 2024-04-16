<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Novella extends Model
{
    protected $table = 'novellas';
    protected $primaryKey = 'id';
    protected $fillable = [
        'pack_id',
        'title',
        'description',
        'img',
        'content',
        'progress',
    ];
    use HasFactory;

    public function packs(){
        return $this->belongsTo(Pack::class , 'pack_id','id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

}
