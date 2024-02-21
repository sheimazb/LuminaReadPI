<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password'];
    use HasFactory, Notifiable, HasApiTokens;
    public function Packss(){
        return $this->hasMany(Pack::class , 'user_id','id');
    }
}
