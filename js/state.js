(function (VR) {
    const MIN_PLAYERS = 1;
    const MAX_PLAYERS = 5;
    const MAX_NAME_LENGTH = 24;
    const SAVE_DELAY_MS = 300;

    const store = {
        agents: [],
        weapons: [],
        players: [], // { name, role, pool, agent, weapon }
        enabledCategories: new Set(VR.WEAPON_CATEGORIES.map(c => c.id)),
        MIN_PLAYERS,
        MAX_PLAYERS,
        MAX_NAME_LENGTH
    };

    function newPlayer(pool) {
        return { name: "", role: VR.ANY_ROLE, pool: pool || allAgentIds(), agent: null, weapon: null };
    }

    function allAgentIds() {
        return new Set(store.agents.map(a => a.uuid));
    }

    store.displayName = function (index) {
        const player = store.players[index];
        return (player && player.name.trim()) || `Jogador ${index + 1}`;
    };

    store.hasAllAgents = function (player) {
        return store.agents.every(agent => player.pool.has(agent.uuid));
    };

    // quem tinha todos os agentes continua com todos (inclusive os novos)
    store.setCatalog = function (catalog) {
        const previous = store.agents;
        store.agents = catalog.agents;
        store.weapons = catalog.weapons;

        const known = allAgentIds();
        store.players.forEach(player => {
            const hadEverything = previous.length > 0 && previous.every(a => player.pool.has(a.uuid));
            const kept = new Set([...player.pool].filter(uuid => known.has(uuid)));
            player.pool = hadEverything || kept.size === 0 ? new Set(known) : kept;
        });
    };

    store.setPlayerCount = function (count) {
        const target = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, count));
        while (store.players.length < target) store.players.push(newPlayer());
        store.players.length = target;
    };

    store.clearResults = function () {
        store.players.forEach(player => {
            player.agent = null;
            player.weapon = null;
        });
    };

    store.setPlayerName = function (index, value) {
        store.players[index].name = String(value).slice(0, MAX_NAME_LENGTH);
    };

    store.applyProfile = function (index, profile) {
        const player = store.players[index];
        const known = allAgentIds();
        const pool = profile.agentPool ? profile.agentPool.filter(uuid => known.has(uuid)) : null;

        player.pool = pool && pool.length ? new Set(pool) : new Set(known);
        player.role = profile.role;
        if (profile.playerName) store.setPlayerName(index, profile.playerName);
    };

    store.snapshotProfile = function (index) {
        const player = store.players[index];
        return {
            playerName: player.name.trim(),
            role: player.role,
            agentPool: store.hasAllAgents(player) ? null : [...player.pool]
        };
    };

    store.toggleCategory = function (id, enabled) {
        if (enabled) store.enabledCategories.add(id);
        else store.enabledCategories.delete(id);
    };

    store.allowedWeapons = function () {
        return store.weapons.filter(weapon => store.enabledCategories.has(weapon.internalCat));
    };

    store.serialize = function () {
        return {
            categories: [...store.enabledCategories],
            players: store.players.map(player => ({
                name: player.name,
                role: player.role,
                pool: store.hasAllAgents(player) ? null : [...player.pool]
            }))
        };
    };

    store.restore = function (saved) {
        if (!saved || !Array.isArray(saved.players) || saved.players.length === 0) {
            store.setPlayerCount(MIN_PLAYERS);
            return;
        }

        const known = allAgentIds();
        const items = saved.players.filter(item => item && typeof item === "object").slice(0, MAX_PLAYERS);

        store.players = items.map(item => {
            const pool = VR.storage.normalizePool(item.pool);
            const valid = pool ? pool.filter(uuid => known.has(uuid)) : [];
            const player = newPlayer(valid.length ? new Set(valid) : null);
            player.name = typeof item.name === "string" ? item.name.slice(0, MAX_NAME_LENGTH) : "";
            player.role = VR.storage.normalizeRole(item.role);
            return player;
        });
        if (store.players.length === 0) store.setPlayerCount(MIN_PLAYERS);

        if (Array.isArray(saved.categories)) {
            const ids = new Set(VR.WEAPON_CATEGORIES.map(c => c.id));
            store.enabledCategories = new Set(saved.categories.filter(id => ids.has(id)));
        }
    };

    let saveTimer = null;
    store.scheduleSave = function () {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => VR.storage.saveTeam(store.serialize()), SAVE_DELAY_MS);
    };

    VR.store = store;
})((window.VR = window.VR || {}));
