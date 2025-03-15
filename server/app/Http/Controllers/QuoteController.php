<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Quote;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class QuoteController extends Controller
{
    public function getRandomQuote()
    {
        $response = Http::get('https://zenquotes.io/api/random');

        if ($response->failed()) {
            return response()->json(['error' => 'Failed to fetch quote'], 500);
        }

        return response()->json($response->json());
    }

    public function saveQuote(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'author' => 'required',
        ]);

        $quote = Quote::create([
            'user_id' => Auth::id(),
            'content' => $request->content,
            'author' => $request->author,
        ]);

        return response()->json(['message' => 'Quote saved successfully', 'quote' => $quote]);
    }

    public function getSavedQuotes()
    {
        return response()->json(Auth::user()->quotes);
    }

    public function deleteQuote($id)
    {
        $quote = Quote::where('user_id', Auth::id())->findOrFail($id);
        $quote->delete();

        return response()->json(['message' => 'Quote deleted successfully']);
    }
}