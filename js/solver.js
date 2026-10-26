(function (root) {
    const ANY_ROLE = "ANY";

    function canPlay(player, agent) {
        return player.pool.has(agent.uuid) && (player.role === ANY_ROLE || agent.roleId === player.role);
    }

    function shuffle(array, rng = Math.random) {
        const copy = array.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function pickRandom(array, rng = Math.random) {
        return array.length ? array[Math.floor(rng() * array.length)] : null;
    }

    // quem tem menos opção escolhe primeiro
    function solve(players, agents, rng = Math.random) {
        const candidates = players.map(player => agents.filter(agent => canPlay(player, agent)));
        const order = shuffle(players.map((_, i) => i), rng).sort((a, b) => candidates[a].length - candidates[b].length);
        const result = new Array(players.length).fill(null);
        const used = new Set();

        function place(step) {
            if (step === order.length) return true;
            const playerIdx = order[step];
            for (const agent of shuffle(candidates[playerIdx], rng)) {
                if (used.has(agent.uuid)) continue;
                used.add(agent.uuid);
                result[playerIdx] = agent;
                if (place(step + 1)) return true;
                used.delete(agent.uuid);
                result[playerIdx] = null;
            }
            return false;
        }

        return place(0) ? result : null;
    }

    // Hall: acha o menor grupo com menos agentes possíveis do que jogadores
    function findConflict(players, agents) {
        const candidateSets = players.map(player => new Set(agents.filter(a => canPlay(player, a)).map(a => a.uuid)));
        let worst = null;

        for (let mask = 1; mask < 1 << players.length; mask++) {
            const members = players.map((_, i) => i).filter(i => mask & (1 << i));
            const union = new Set();
            members.forEach(i => candidateSets[i].forEach(uuid => union.add(uuid)));
            if (union.size < members.length && (!worst || members.length < worst.players.length)) {
                worst = { players: members, available: union.size };
            }
        }
        return worst;
    }

    function rerollCandidates(players, agents, assigned, playerIdx) {
        const taken = new Set();
        assigned.forEach((agent, i) => {
            if (agent && i !== playerIdx) taken.add(agent.uuid);
        });
        const current = assigned[playerIdx] ? assigned[playerIdx].uuid : null;
        return agents.filter(agent => canPlay(players[playerIdx], agent) && !taken.has(agent.uuid) && agent.uuid !== current);
    }

    const api = { canPlay, shuffle, pickRandom, solve, findConflict, rerollCandidates };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    } else {
        (root.VR = root.VR || {}).solver = api;
    }
})(typeof window !== "undefined" ? window : globalThis);
