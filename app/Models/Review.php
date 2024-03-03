<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = [
        'pack_id',
        'user_id', 
        'star_rating',
    ];
    public function pack()
    {
        return $this->belongsTo(Pack::class , 'pack_id','id');

    }

    public function user()
    {
        return $this->belongsTo(User::class , 'user_id','id');

    }
}
