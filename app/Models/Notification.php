<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'seen'];

    /**
     * Marks the notification as seen.
     *
     * @return void
     */
    public function markAsSeen()
    {
        $this->seen = true;
        $this->save();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
