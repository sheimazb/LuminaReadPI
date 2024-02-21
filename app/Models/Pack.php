<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pack extends Model
{
    protected $table = 'packs';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
        'img',
        'langue',
        'price',
    ];
    use HasFactory;
    public function usser(){
        return $this->belongsTo(User::class , 'user_id','id');
    }
    public function novellas()
{
    return $this->hasMany(Novella::class);
}
}
