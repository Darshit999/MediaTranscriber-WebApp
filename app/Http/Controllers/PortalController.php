<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Files;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class PortalController extends Controller
{
    public function dashboard($id = null)
    {
        $files = Media::with(['File'])->where('user_id', auth()->id())->get();

        if ($id) {
            $selected = Media::with(['File'])->find($id);
        } else {
            $selected = null;
        }

        return inertia('Dashboard', [
            'files' => $files,
            'selectedMedia' => $selected,
        ]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:mp3,wav,mp4,mkv|max:10240',
        ]);

        $file = $request->file('file');
        $fileType = explode("/", $file->getClientMimeType());
        $fileName = Str::random(9) . '_' . $file->getClientOriginalName();
        $filePath = 'public/files/' . $fileName;

        Storage::put($filePath, file_get_contents($file));

        $audioFile = new Files();
        $audioFile->name = $fileName;
        $audioFile->path = $filePath;
        $audioFile->url = Storage::url($filePath);
        $audioFile->size = $file->getSize();
        $audioFile->type = $fileType[0];

        $audioFile->save();

        $media = new Media();
        $media->user_id = Auth::id();
        $media->file_id = $audioFile->id;
        $media->name = $audioFile->name;
        $media->save();

        $files = Media::with(['File'])->where('user_id', auth()->id())->get();

        return response()->json($files);
    }

    public function update(Request $request, $id)
    {
        $file = Files::find($id);

        $file->transcription_title = $request->input('title');
        $file->transcription_text = $request->input('text');
        $file->save();

        return response()->json(['message' => 'Title updated successfully']);
    }
}
