<?php

namespace App\Http\Controllers;

use App\Models\Novella;
use App\Models\Pack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Exception;

class NovellaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $novella = Novella::all();
            return response()->json(['novella' => $novella]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $pack_id)
    {
        try {
            if (!Auth::check()) {
                return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
            }
            $pack = Pack::findOrFail($pack_id);
            $novella = new Novella();
            $novella->pack_id = $pack->id;
            $novella->title = $request->title;
            $novella->description = $request->description;
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $data = "public/images/novellas"; // chemin de destination pour stocker les images
                $image->move(public_path($data), $imageName);
                $novella->img = url($data . '/' . $imageName); // Renvoyer l'URL complète de l'image
            }
            $novella->content = $request->content;
            $novella->progress = $request->progress;
            // Sauvegarder la novella associée au pack
            $pack->novellas()->save($novella);

            return response()->json(['novella' => $novella]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            // Find the Pack by ID
            $pack = Pack::findOrFail($id);
            
            // Query Novellas by Pack ID
            $novellas = Novella::where('pack_id', $pack->id)->get();
            
            // Return the Novellas as JSON response
            return response()->json(['novellas' => $novellas]);
        } catch (ModelNotFoundException $e) {
            // Handle the case where the Pack is not found and return a JSON response with error message
            return response()->json(['message' => 'Pack not found'], 404);
        }
    }
    
    public function FindNovellaByID($id){
        try {
            $novella = Novella::find($id);
            if ($novella) {
                return response()->json($novella, 200);
            } else {
                return response()->json(['message' => 'Novella not found'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

public function FindNovellasByPackID($pack_id) {
    try {
        $novellas = Novella::where('pack_id', $pack_id)->get();
        if ($novellas->isEmpty()) {
            return response()->json(['message' => 'No novellas found for this pack'], 404);
        } else {
            return response()->json($novellas, 200);
        }
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}

    public function exportNovellasToCSV()
    {
        $fileName = 'novellas.csv';
        $novellas = Novella::join('packs', 'novellas.pack_id', '=', 'packs.id')
                            ->select('novellas.id', 'novellas.title', 'novellas.description', 'novellas.content', 'packs.category', 'packs.langue', 'packs.price')
                            ->get();
    
        // Prepare CSV content
        $csvData = [];
        $csvData[] = ['Novella ID', 'Title', 'Description', 'Content', 'Category', 'Langue', 'Price'];
    
        foreach ($novellas as $novella) {
            $csvData[] = [
                $novella->id,
                $novella->title,
                $novella->description,
                $novella->content,
                $novella->category,
                $novella->langue,
                $novella->price,
            ];
        }
    
        // Create the download directory if it doesn't exist
        $downloadPath = public_path('download');
        if (!file_exists($downloadPath)) {
            mkdir($downloadPath, 0755, true);
        }
    
        // Write CSV content to file
        $filePath = $downloadPath . DIRECTORY_SEPARATOR . $fileName;
    
        $file = fopen($filePath, 'w');
        if (!$file) {
            // Log error or throw exception
            return response()->json(['error' => 'Failed to open file for writing'], 500);
        }
    
        foreach ($csvData as $row) {
            if (!fputcsv($file, $row)) {
                // Log error or throw exception
                fclose($file);
                return response()->json(['error' => 'Failed to write data to file'], 500);
            }
        }
    
        fclose($file);
    
        // Provide the file as a download
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];
    
        return response()->download($filePath, $fileName, $headers)->deleteFileAfterSend(true);
    }
    
    
    
}
