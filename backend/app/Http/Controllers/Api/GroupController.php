<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\GroupRepository;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GroupController extends Controller
{
    public function __construct(private GroupRepository $groupRepository) {}

    public function index(): JsonResponse
    {
        return response()->json($this->groupRepository->getByUser(auth()->id()));
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $data = $request->all();
        $data['user_id'] = auth()->id();
        $group = $this->groupRepository->create($data);
        return response()->json($group, 201);
    }

    public function show(int $id): JsonResponse
    {
        $group = $this->groupRepository->find($id);
        if (!$group) {
            return response()->json(['message' => 'Groupe non trouvé'], 404);
        }
        return response()->json($group);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $updated = $this->groupRepository->update($id, $request->all());
        if (!$updated) {
            return response()->json(['message' => 'Groupe non trouvé'], 404);
        }
        return response()->json(['message' => 'Groupe mis à jour']);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->groupRepository->delete($id);
        if (!$deleted) {
            return response()->json(['message' => 'Groupe non trouvé'], 404);
        }
        return response()->json(['message' => 'Groupe supprimé']);
    }
}
