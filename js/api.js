(function (VR) {
    const BASE_URL = "https://valorant-api.com/v1";
    const TIMEOUT_MS = 8000;

    async function getJson(path) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
        try {
            const response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
            if (!response.ok) throw new Error(`${path} retornou status ${response.status}`);
            const body = await response.json();
            if (!body || !Array.isArray(body.data)) throw new Error(`${path} retornou um formato inesperado`);
            return body.data;
        } finally {
            clearTimeout(timer);
        }
    }

    function mapAgent(raw) {
        return {
            uuid: raw.uuid,
            name: raw.displayName,
            roleId: raw.role ? raw.role.uuid : "",
            roleName: raw.role ? raw.role.displayName : "Sem Função",
            roleIcon: raw.role ? raw.role.displayIcon : "",
            displayIcon: raw.displayIcon || raw.displayIconSmall || "",
            portrait: raw.fullPortrait || raw.displayIcon || "",
            background: raw.background || "",
            isInitial: VR.INITIAL_AGENT_UUIDS.has(raw.uuid)
        };
    }

    // vem tipo "EEquippableCategory::Sidearm"
    function categoryOf(raw) {
        const text = String(raw.category || "").toLowerCase();
        if (text.includes("sidearm") || text.includes("pistol")) return "pistols";
        if (text.includes("smg")) return "smgs";
        if (text.includes("shotgun")) return "shotguns";
        if (text.includes("sniper")) return "snipers";
        if (text.includes("rifle")) return "rifles";
        if (text.includes("heavy")) return "heavies";
        if (text.includes("melee")) return "melee";
        return null;
    }

    function mapWeapons(rawList) {
        const weapons = [];
        rawList.forEach(raw => {
            const category = categoryOf(raw);
            if (!category) {
                console.warn(`Arma "${raw.displayName}" ignorada: categoria desconhecida (${raw.category}).`);
                return;
            }
            weapons.push(VR.makeWeapon(raw.uuid, raw.displayName, category, raw.displayIcon));
        });

        VR.EXTRA_WEAPONS.forEach(extra => {
            if (!weapons.some(w => w.name.toLowerCase() === extra.name.toLowerCase())) weapons.push(extra);
        });
        return weapons;
    }

    async function fetchCatalog() {
        const [rawAgents, rawWeapons] = await Promise.all([
            getJson("/agents?isPlayableCharacter=true&language=pt-BR"),
            getJson("/weapons?language=pt-BR")
        ]);

        const agents = rawAgents.map(mapAgent);
        const weapons = mapWeapons(rawWeapons);
        if (agents.length === 0 || weapons.length === 0) throw new Error("A API devolveu uma lista vazia");
        return { agents, weapons };
    }

    VR.api = { fetchCatalog };
})((window.VR = window.VR || {}));
