<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Text;

class TextController extends Controller
{
    /**
     * Store a newly created text in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function AddText(Request $request)
    {
        $request->validate([
            'text_content' => 'required|string',
        ]);

        $text = Text::create([
            'text_content' => $request->text_content,
            'code' => $this->generateUniqueCode(),
        ]);

        return response()->json($text, 201);
    }

    /**
     * Display the specified text.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $text = Text::findOrFail($id);

        return response()->json($text);
    }

    /**
     * Get text by code.
     *
     * @param  string  $code
     * @return \Illuminate\Http\Response
     */
    public function getTextByCode($code)
    {
        $text = Text::where('code', $code)->first();

        if (!$text) {
            return response()->json(['error' => 'Text not found'], 404);
        }

        return response()->json($text);
    }

    /**
     * Generate a unique code.
     *
     * @return string
     */
    private function generateUniqueCode()
    {
        // Define your logic here to generate a unique code
        // For example:
        return uniqid();
    }
}
