<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateTeamRequest;
use App\Models\Team;
use App\Models\Player;
use Inertia\Inertia;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Team $team)
    {

        if (auth()->id() === 1) {
            return Inertia::render('Team/List', [
                'collection' => Team::with('players')->paginate(10)->toArray(),
            ]);
        }
        $team = Team::whereUserId(auth()->id())->first();
        return $this->edit($team);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function edit(Team $team)
    {
        return Inertia::render('Team/Editor', [
            'team' => $team->toArray(),
            'players' => $team->players()->get()->toArray()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTeamRequest  $request
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTeamRequest $request, Team $team, Player $player)
    {
        $team = $team->where('user_id', auth()->user()->id)->first();
        $update = $team->where('user_id', auth()->user()->id)->first();
        $update->name = $request->name;
        $update->formation = $request->formation;
        $update->primary = $request->primary;
        $update->secondary = $request->secondary;
        $update->save();
        foreach ($request->players as $dataPlayer) {
            $player->updateOrCreate(['id' => $dataPlayer['id']], [
                "team_id" => $team->id,
                'name' => $dataPlayer['name'],
                'number' =>  $dataPlayer['number'],
                'posy' =>  $dataPlayer['posy'],
                'posx' =>  $dataPlayer['posx'],
                'avatar' => $dataPlayer['avatar']
            ]);
        };
        return redirect()->back()->with('success', 'Team berhasil disimpan.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Team  $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(Team $team)
    {
        if ($team->delete()) {
            return back()->with('success', 'Team telah berhasil di hapus.');
        }
        return back()->with('error', 'Gagal menghapus team.');
    }
}
