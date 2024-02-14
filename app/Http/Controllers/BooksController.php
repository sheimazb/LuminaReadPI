<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BooksController extends Controller
{
    protected $book;
    public function __construct(){
        $this->book = new Book();

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->book->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->book->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = $this->book->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $book = $this->book->find($id);
        $book->update($request->all());
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $book = $this->book->find($id);
        return $book->delete();
    }
}
