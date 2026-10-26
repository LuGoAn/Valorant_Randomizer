(function (VR) {
    const KEYS = {
        profiles: "valorant_profiles",
        cache: "valorant_cache_v2",
        team: "valorant_team"
    };

    const MAX_PROFILE_NAME = 40;

    function read(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.warn(`Não foi possível ler "${key}" do localStorage:`, error);
            return null;
        }
    }

    function write(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn(`Não foi possível gravar "${key}" no localStorage:`, error);
            return false;
        }
    }

    // aceita o id ou o nome em maiúsculo que as versões antigas salvavam
    function normalizeRole(value) {
        if (typeof value !== "string") return VR.ANY_ROLE;
        const role = VR.ROLES.find(r => r.id === value || r.name.toUpperCase() === value.toUpperCase());
        return role ? role.id : VR.ANY_ROLE;
    }

    // null = todos os agentes, assim agente novo entra sozinho
    function normalizePool(value) {
        if (!Array.isArray(value)) return null;
        const uuids = value.filter(item => typeof item === "string");
        return uuids.length ? uuids : null;
    }

    // Map pra não ter problema com chave tipo __proto__
    function loadProfiles() {
        const raw = read(KEYS.profiles);
        const profiles = new Map();
        if (!raw || typeof raw !== "object") return profiles;

        Object.keys(raw).forEach(name => {
            const item = raw[name];
            if (!item || typeof item !== "object") return;
            profiles.set(name, {
                playerName: typeof item.playerName === "string" ? item.playerName : "",
                role: normalizeRole(item.role),
                agentPool: item.hasAllAgents ? null : normalizePool(item.agentPool)
            });
        });
        return profiles;
    }

    function saveProfiles(profiles) {
        return write(KEYS.profiles, Object.fromEntries(profiles));
    }

    function loadCache() {
        const cache = read(KEYS.cache);
        if (!cache || !Array.isArray(cache.agents) || !Array.isArray(cache.weapons)) return null;
        const agentsOk = cache.agents.length > 0 && cache.agents.every(a => a && a.uuid && a.name && "roleId" in a);
        const weaponsOk = cache.weapons.length > 0 && cache.weapons.every(w => w && w.uuid && w.name && w.internalCat);
        return agentsOk && weaponsOk ? { agents: cache.agents, weapons: cache.weapons } : null;
    }

    function saveCache(catalog) {
        return write(KEYS.cache, { time: Date.now(), agents: catalog.agents, weapons: catalog.weapons });
    }

    function loadTeam() {
        const team = read(KEYS.team);
        return team && typeof team === "object" ? team : null;
    }

    function saveTeam(team) {
        return write(KEYS.team, team);
    }

    VR.storage = {
        MAX_PROFILE_NAME,
        normalizeRole,
        normalizePool,
        loadProfiles,
        saveProfiles,
        loadCache,
        saveCache,
        loadTeam,
        saveTeam
    };
})((window.VR = window.VR || {}));
