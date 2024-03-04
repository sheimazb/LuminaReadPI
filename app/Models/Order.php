<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'user_id',
        'packs_ids',
      
    ];
    protected $casts = [
        'packs_ids' => 'array', // Cast packs_ids attribute to array when retrieving from / storing to database
    ];

    public function user(){
        return $this->belongsTo(User::class , 'user_id','id');
    }
}
