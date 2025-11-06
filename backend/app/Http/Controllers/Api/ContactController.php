<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\ContactRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(private ContactRepository $contactRepository) {}

    public function index(): JsonResponse
    {
        return response()->json($this->contactRepository->getByUser(auth()->id()));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'group_id' => 'nullable|exists:groups,id,user_id,' . auth()->id()
        ]);

        $data = $request->all();
        $data['user_id'] = auth()->id();
        $contact = $this->contactRepository->create($data);
        return response()->json($contact, 201);
    }

    public function show(int $id): JsonResponse
    {
        $contact = $this->contactRepository->find($id);
        if (!$contact) {
            return response()->json(['message' => 'Contact non trouvé'], 404);
        }
        return response()->json($contact);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'group_id' => 'nullable|exists:groups,id,user_id,' . auth()->id()
        ]);

        $updated = $this->contactRepository->update($id, $request->all());
        if (!$updated) {
            return response()->json(['message' => 'Contact non trouvé'], 404);
        }
        return response()->json(['message' => 'Contact mis à jour']);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->contactRepository->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Contact non trouvé'], 404);
        }
        return response()->json(['message' => 'Contact supprimé']);
    }

    public function getByGroup(int $groupId): JsonResponse
    {
        $contacts = $this->contactRepository->getByGroup($groupId);
        return response()->json($contacts);
    }
}
