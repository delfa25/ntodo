<?php

namespace App\Repositories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Collection;

class GroupRepository
{
    public function all(): Collection
    {
        return Group::with('contacts')->get();
    }

    public function find(int $id): ?Group
    {
        return Group::with('contacts')->find($id);
    }

    public function create(array $data): Group
    {
        return Group::create($data);
    }

    public function update(int $id, array $data): bool
    {
        return Group::where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        return Group::destroy($id);
    }

    public function getByUser(int $userId): Collection
    {
        return Group::with('contacts')->where('user_id', $userId)->get();
    }
}