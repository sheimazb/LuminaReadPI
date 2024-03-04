<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SseController extends Controller
{
    public function SEETEST(Request $request)
    {
        // Set headers for SSE
        $response = new StreamedResponse(function () {
            while (true) {
                // Send event data to client
                echo "data: " . json_encode(['message' => 'New event']) . "\n\n";
                // Flush the output buffer
                ob_flush();
                flush();
                // Sleep for a while before sending the next event
                sleep(5);
            }
        });

        // Set SSE headers
        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');

        return $response;
    }
}
