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
        // Vérifiez si le rating est fourni dans la requête, sinon définissez-le sur 1 par défaut
        $review->star_rating = $request->input('rating', 1);
        $review->user_id = Auth::user()->id;
        $review->save();
        return response()->json($review, 200);
    }
    public function getAverageRating($packId)
    {
        $averageRating = Review::where('pack_id', $packId)->avg('star_rating');
        return response()->json($averageRating, 200);
    }
}
