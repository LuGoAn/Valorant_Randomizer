(function (VR) {
    function initialCatalog() {
        const cached = VR.storage.loadCache();
        if (cached) {
            console.log(`Carregados ${cached.agents.length} agentes e ${cached.weapons.length} armas do cache local.`);
            return cached;
        }
        return { agents: VR.OFFLINE_AGENTS, weapons: VR.OFFLINE_WEAPONS };
    }

    async function refreshFromApi() {
        try {
            const catalog = await VR.api.fetchCatalog();
            VR.store.setCatalog(catalog);
            VR.storage.saveCache(catalog);
            VR.ui.onCatalogChanged();
            console.log(`Sucesso! Carregados ${catalog.agents.length} agentes e ${catalog.weapons.length} armas da API.`);
        } catch (error) {
            console.warn("Falha ao consultar a API do Valorant; seguindo com os dados locais.", error);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        VR.store.setCatalog(initialCatalog());
        VR.store.restore(VR.storage.loadTeam());
        VR.ui.init();
        refreshFromApi();
    });
})(window.VR);
