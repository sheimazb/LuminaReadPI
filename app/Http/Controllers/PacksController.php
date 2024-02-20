<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pack;


class PacksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function AddPack(Request $request)
    {
       
        try{
        $pack = new Pack();
        $pack->title=$request->title;
        $pack->description=$request->description;
        $pack->category=$request->category;
        $pack->img=$request->img;
        $pack->langue=$request->langue;
        $pack->price=$request->price;
        $pack->save();
        return response()->json(['pack' => $pack]);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
