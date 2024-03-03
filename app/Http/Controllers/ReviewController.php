<?php

namespace App\Http\Controllers;

use App\Models\Pack;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class ReviewController extends Controller
{
    public function reviewstore(Request $request, $id)
    {
        $review = new Review();
        $pack = Pack::findOrFail($id);
        $review->pack_id = $pack->id;
        $review->star_rating = $request->input('rating');
        $review->user_id = Auth::user()->id;
        $review->save();
        return response()->json($review, 200);
    }
}
