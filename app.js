/* ==========================================================================
   VALORANT RANDOMIZER - O MOTOR CABULOSO DO SITE
   Tudo feito com muito carinho, cafeína e algumas gambiarras de lei.
   ========================================================================== */

// --- BANCO DE DADOS DE SEGURANÇA (O FAMOSO PLANO B CASO A API CAIA) ---
// Se a API oficial do Valorant der um cano na gente, esse array salva o rolê.
const OFFLINE_AGENTS = [
    {
        uuid: "d3150c5a-42ab-8595-1061-bec7127d1821",
        name: "Jett",
        roleName: "Duelista",
        roleIcon: "https://media.valorant-api.com/agents/roles/d76e2355-4775-13e3-6997-e2945147a5ee/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/d3150c5a-42ab-8595-1061-bec7127d1821/fullportrait.png",
        background: "https://media.valorant-api.com/agents/d3150c5a-42ab-8595-1061-bec7127d1821/background.png",
        isInitial: true
    },
    {
        uuid: "eb3b61fa-4c4b-38e0-a7ec-96b6367201b3",
        name: "Phoenix",
        roleName: "Duelista",
        roleIcon: "https://media.valorant-api.com/agents/roles/d76e2355-4775-13e3-6997-e2945147a5ee/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/eb3b61fa-4c4b-38e0-a7ec-96b6367201b3/fullportrait.png",
        background: "https://media.valorant-api.com/agents/eb3b61fa-4c4b-38e0-a7ec-96b6367201b3/background.png",
        isInitial: true
    },
    {
        uuid: "569f6d58-4b18-85d7-8b5d-47ade6cae61a",
        name: "Sage",
        roleName: "Sentinela",
        roleIcon: "https://media.valorant-api.com/agents/roles/5fc02f96-40ac-ca94-4d9f-a28d5d60f49c/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/569f6d58-4b18-85d7-8b5d-47ade6cae61a/fullportrait.png",
        background: "https://media.valorant-api.com/agents/569f6d58-4b18-85d7-8b5d-47ade6cae61a/background.png",
        isInitial: true
    },
    {
        uuid: "320b2a48-4d9b-a075-30f1-10a9a43fc2ec",
        name: "Sova",
        roleName: "Iniciador",
        roleIcon: "https://media.valorant-api.com/agents/roles/1b47defc-4747-8c83-a136-89b522d4c3fd/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-10a9a43fc2ec/fullportrait.png",
        background: "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-10a9a43fc2ec/background.png",
        isInitial: true
    },
    {
        uuid: "9f0d89ae-417a-4451-b1a2-541217af041e",
        name: "Brimstone",
        roleName: "Controlador",
        roleIcon: "https://media.valorant-api.com/agents/roles/4ee40330-47a8-8a9d-407c-44a6e8530128/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/9f0d89ae-417a-4451-b1a2-541217af041e/fullportrait.png",
        background: "https://media.valorant-api.com/agents/9f0d89ae-417a-4451-b1a2-541217af041e/background.png",
        isInitial: true
    },
    {
        uuid: "a3593731-4771-5493-9240-6b657e0f784f",
        name: "Reyna",
        roleName: "Duelista",
        roleIcon: "https://media.valorant-api.com/agents/roles/d76e2355-4775-13e3-6997-e2945147a5ee/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/a3593731-4771-5493-9240-6b657e0f784f/fullportrait.png",
        background: "https://media.valorant-api.com/agents/a3593731-4771-5493-9240-6b657e0f784f/background.png",
        isInitial: false
    },
    {
        uuid: "8e253930-4c05-31dd-1b6c-968525494517",
        name: "Omen",
        roleName: "Controlador",
        roleIcon: "https://media.valorant-api.com/agents/roles/4ee40330-47a8-8a9d-407c-44a6e8530128/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png",
        background: "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/background.png",
        isInitial: false
    },
    {
        uuid: "117ed9e3-49f3-6512-3ccf-00ad78bb4ab4",
        name: "Cypher",
        roleName: "Sentinela",
        roleIcon: "https://media.valorant-api.com/agents/roles/5fc02f96-40ac-ca94-4d9f-a28d5d60f49c/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-00ad78bb4ab4/fullportrait.png",
        background: "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-00ad78bb4ab4/background.png",
        isInitial: false
    },
    {
        uuid: "30821734-47b0-6218-8071-2b8277b6c72e",
        name: "Breach",
        roleName: "Iniciador",
        roleIcon: "https://media.valorant-api.com/agents/roles/1b47defc-4747-8c83-a136-89b522d4c3fd/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/30821734-47b0-6218-8071-2b8277b6c72e/fullportrait.png",
        background: "https://media.valorant-api.com/agents/30821734-47b0-6218-8071-2b8277b6c72e/background.png",
        isInitial: false
    },
    {
        uuid: "f94c7e02-41d4-8d98-4902-694e319b248e",
        name: "Raze",
        roleName: "Duelista",
        roleIcon: "https://media.valorant-api.com/agents/roles/d76e2355-4775-13e3-6997-e2945147a5ee/displayicon.png",
        portrait: "https://media.valorant-api.com/agents/f94c7e02-41d4-8d98-4902-694e319b248e/fullportrait.png",
        background: "https://media.valorant-api.com/agents/f94c7e02-41d4-8d98-4902-694e319b248e/background.png",
        isInitial: false
    }
];

const OFFLINE_WEAPONS = [
    { uuid: "classic", name: "Classic", category: "Leves / Pistolas", portrait: "https://media.valorant-api.com/weapons/29a0cfab-4da2-4ca9-95b6-5c690be21629/displayicon.png", internalCat: "pistols" },
    { uuid: "shorty", name: "Shorty", category: "Leves / Pistolas", portrait: "https://media.valorant-api.com/weapons/42da8cce-40be-4b75-b55d-5c1a40612dbf/displayicon.png", internalCat: "pistols" },
    { uuid: "frenzy", name: "Frenzy", category: "Leves / Pistolas", portrait: "https://media.valorant-api.com/weapons/44d134c2-48f5-934c-9f85-ab9c387e287c/displayicon.png", internalCat: "pistols" },
    { uuid: "ghost", name: "Ghost", category: "Leves / Pistolas", portrait: "https://media.valorant-api.com/weapons/1baa85b4-4c70-1284-6d97-fb8f1c05a593/displayicon.png", internalCat: "pistols" },
    { uuid: "sheriff", name: "Sheriff", category: "Leves / Pistolas", portrait: "https://media.valorant-api.com/weapons/e3367401-4aa0-111d-412f-539d9c77517f/displayicon.png", internalCat: "pistols" },
    { uuid: "stinger", name: "Stinger", category: "Submetralhadoras (SMGs)", portrait: "https://media.valorant-api.com/weapons/f7e1b2b4-486a-f111-ee84-7e9e7df01099/displayicon.png", internalCat: "smgs" },
    { uuid: "spectre", name: "Spectre", category: "Submetralhadoras (SMGs)", portrait: "https://media.valorant-api.com/weapons/462080f5-467c-a5b7-e176-ecb73ec9a902/displayicon.png", internalCat: "smgs" },
    { uuid: "bucky", name: "Bucky", category: "Escopetas", portrait: "https://media.valorant-api.com/weapons/910be174-449b-7c41-822f-29bfa4d34b12/displayicon.png", internalCat: "shotguns" },
    { uuid: "judge", name: "Judge", category: "Escopetas", portrait: "https://media.valorant-api.com/weapons/ec845bf4-4f79-dd7b-978b-a083ab100237/displayicon.png", internalCat: "shotguns" },
    { uuid: "bulldog", name: "Bulldog", category: "Fuzis", portrait: "https://media.valorant-api.com/weapons/ae3de142-4d85-2534-72ef-75a9634d8ec7/displayicon.png", internalCat: "rifles" },
    { uuid: "guardian", name: "Guardian", category: "Fuzis", portrait: "https://media.valorant-api.com/weapons/4ade7faa-4cf1-83c1-2757-bdae8f9f49ac/displayicon.png", internalCat: "rifles" },
    { uuid: "phantom", name: "Phantom", category: "Fuzis", portrait: "https://media.valorant-api.com/weapons/ee8e4bbe-4ae3-6399-1dd6-ae92c5cd4e74/displayicon.png", internalCat: "rifles" },
    { uuid: "vandal", name: "Vandal", category: "Fuzis", portrait: "https://media.valorant-api.com/weapons/9c82e19d-4575-0200-1a81-7eec0006f15e/displayicon.png", internalCat: "rifles" },
    { uuid: "marshal", name: "Marshal", category: "Fuzis de Precisão (Snipers)", portrait: "https://media.valorant-api.com/weapons/c4883e50-4494-e02c-be9d-33b1e30e1658/displayicon.png", internalCat: "snipers" },
    { uuid: "outlaw", name: "Outlaw", category: "Fuzis de Precisão (Snipers)", portrait: "https://media.valorant-api.com/weapons/5f0aea87-4385-257a-3f37-85a494729115/displayicon.png", internalCat: "snipers" },
    { uuid: "operator", name: "Operator", category: "Fuzis de Precisão (Snipers)", portrait: "https://media.valorant-api.com/weapons/a03b24d3-472b-9974-ad7f-96f2129d4703/displayicon.png", internalCat: "snipers" },
    { uuid: "ares", name: "Ares", category: "Armas Pesadas (Odin/Ares)", portrait: "https://media.valorant-api.com/weapons/55db3f12-472b-857c-82e6-83a4e99e29a0/displayicon.png", internalCat: "heavies" },
    { uuid: "odin", name: "Odin", category: "Armas Pesadas (Odin/Ares)", portrait: "https://media.valorant-api.com/weapons/63e6c2a6-4a53-8685-3b73-7f854163b027/displayicon.png", internalCat: "heavies" },
    { uuid: "melee", name: "Confronto (Faca)", portrait: "https://media.valorant-api.com/weapons/2f59173c-433b-8590-a739-14af675b3c2e/displayicon.png", category: "Confronto", internalCat: "melee" }
];

// --- ESTADO GLOBAL DA APLICAÇÃO ---
// Guardamos tudo que é dinâmico aqui pra não se perder no meio do tiroteio.
let allAgents = [];
let allWeapons = [];
const players = []; // Array maroto que guarda o status de cada jogador (nome, pool, função)
let currentConfigPlayerId = null; // Guarda quem está sendo editado no modal no momento
let isRaffling = false; // Bloqueia clicks repetidos pra não bugar as animações de giro

// --- INICIALIZAÇÃO ASSÍNCRONA ---
// Assim que abrir a página, a gente já dispara essa função pra buscar os dados oficiais da API.
document.addEventListener("DOMContentLoaded", async () => {
    // Inicializa a lista de jogadores padrão com 1 jogador, igual o patrão pediu
    players.push({
        id: 0,
        name: "Jogador 1",
        role: "ANY",
        pool: new Set()
    });

    // Puxa tudo das APIs oficiais do Valorant em pt-BR
    await fetchValorantData();
    
    // Agora que temos os agentes carregados, garante que o Jogador 1 comece com TODOS liberados no pool dele
    initializeDefaultPools();

    // Roda a atualização visual inicial na tela pra desenhar os inputs do Jogador 1
    updatePlayerInputs('agents');
    updatePlayerInputs('weapons');
});

// --- COMUNICADOR DE APIs DO VALORANT ---
// Puxa tudo em pt-BR pra ficar lindão no layout. Se a internet do cabra estiver ruim, cai no offline liso.
async function fetchValorantData() {
    const loadingEl = document.getElementById("api-loading");
    
    try {
        // 1. Puxa os Agentes jogáveis oficiais
        const agentsResponse = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
        if (!agentsResponse.ok) throw new Error("API de Agentes falhou");
        const agentsData = await agentsResponse.json();
        
        // Mapeia os dados da API pra nossa estrutura
        allAgents = agentsData.data.map(agent => ({
            uuid: agent.uuid,
            name: agent.displayName,
            roleName: agent.role ? agent.role.displayName : "Sem Função",
            roleIcon: agent.role ? agent.role.displayIcon : "",
            portrait: agent.fullPortrait,
            background: agent.background,
            isInitial: ["Jett", "Phoenix", "Sage", "Sova", "Brimstone"].includes(agent.displayName)
        }));

        // 2. Puxa as Armas oficiais
        const weaponsResponse = await fetch("https://valorant-api.com/v1/weapons?language=pt-BR");
        if (!weaponsResponse.ok) throw new Error("API de Armas falhou");
        const weaponsData = await weaponsResponse.json();

        // Mapeia as armas oficiais da API (sem preço, ignorando creds)
        allWeapons = weaponsData.data.map(weapon => {
            // Mapeia a categoria interna pra gente filtrar fácil pelos checkboxes globais
            let internalCat = "melee";
            const shopData = weapon.shopData;
            
            if (weapon.category) {
                const catStr = weapon.category.toLowerCase();
                if (catStr.includes("pistol") || catStr.includes("sidearm")) internalCat = "pistols";
                else if (catStr.includes("smg")) internalCat = "smgs";
                else if (catStr.includes("shotgun")) internalCat = "shotguns";
                else if (catStr.includes("rifle")) internalCat = "rifles";
                else if (catStr.includes("sniper")) internalCat = "snipers";
                else if (catStr.includes("heavy")) internalCat = "heavies";
            }
            
            // Faca (Melee) não tem categoria na API de forma padronizada às vezes, força o melee
            if (weapon.displayName.toLowerCase().includes("confronto") || weapon.displayName.toLowerCase().includes("faca") || weapon.displayName.toLowerCase().includes("melee")) {
                internalCat = "melee";
            }

            return {
                uuid: weapon.uuid,
                name: weapon.displayName,
                category: weapon.shopData ? translateCategory(weapon.shopData.categoryText) : (internalCat === "melee" ? "Confronto" : "Arma"),
                portrait: weapon.displayIcon,
                internalCat: internalCat
            };
        });

        console.log("Sucesso! Agentes e armas oficiais carregados diretamente da API do Valorant. Coisa fina!");

    } catch (error) {
        console.error("Ops! Deu ruim ao chamar a API oficial do Valorant. Sem desespero, puxando offline data liso:", error);
        // Fallback offline invisível: o usuário nem percebe o baque
        allAgents = [...OFFLINE_AGENTS];
        allWeapons = [...OFFLINE_WEAPONS];
    } finally {
        // Esconde o spinner de loading suavemente
        if (loadingEl) {
            loadingEl.style.display = "none";
        }
    }
}

// Auxiliar pra traduzir categorias de armas da API pra ficar bonitinho
function translateCategory(categoryText) {
    if (!categoryText) return "Arma";
    const text = categoryText.toLowerCase();
    if (text.includes("pistols") || text.includes("sidearms") || text.includes("leves")) return "Leves / Pistolas";
    if (text.includes("smgs") || text.includes("submetralhadoras")) return "Submetralhadoras (SMGs)";
    if (text.includes("shotguns") || text.includes("escopetas")) return "Escopetas";
    if (text.includes("rifles") || text.includes("fuzis")) return "Fuzis";
    if (text.includes("snipers") || text.includes("precisão")) return "Fuzis de Precisão (Snipers)";
    if (text.includes("heavies") || text.includes("pesadas")) return "Armas Pesadas (Odin/Ares)";
    return categoryText;
}

// Inicializa o pool de agentes de todos os jogadores ativos com todos os agentes habilitados por padrão
function initializeDefaultPools() {
    players.forEach(player => {
        if (!player.pool || player.pool.size === 0) {
            player.pool = new Set(allAgents.map(a => a.uuid));
        }
    });
}

// --- CONTROLE DE ALTERNÂNCIA DE ABAS ---
// Troca as abas "Sortear Agentes" e "Sortear Armas" sem recarregar nada na tela
function switchTab(tab) {
    // Desativa tudo
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

    // Ativa só o que o cabra clicou
    document.getElementById(`tab-${tab}`).classList.add("active");
    document.getElementById(`section-${tab}`).classList.add("active");
}

// --- GERENCIADOR DE INPUTS DE JOGADORES (DINÂMICO) ---
// Sincroniza a quantidade de jogadores e nomes em ambas as abas de forma automática
function updatePlayerInputs(triggerTab) {
    // Pega o valor selecionado no select do select que ativou a função
    const countSelect = document.getElementById(`${triggerTab}-player-count`);
    const newCount = parseInt(countSelect.value, 10);

    // Sincroniza o select da outra aba pro mesmo valor!
    const otherTab = triggerTab === "agents" ? "weapons" : "agents";
    const otherSelect = document.getElementById(`${otherTab}-player-count`);
    if (otherSelect) {
        otherSelect.value = newCount;
    }

    // Ajusta o array de jogadores no estado local da aplicação
    const currentCount = players.length;
    if (newCount > currentCount) {
        // Se aumentou, adiciona novos jogadores com pool completo por padrão
        for (let i = currentCount; i < newCount; i++) {
            players.push({
                id: i,
                name: `Jogador ${i + 1}`,
                role: "ANY",
                pool: new Set(allAgents.map(a => a.uuid))
            });
        }
    } else if (newCount < currentCount) {
        // Se diminuiu, remove do final mantendo os dados dos primeiros intactos
        players.splice(newCount);
    }

    // Redesenha a lista de inputs na aba de AGENTES
    renderAgentsPlayerInputs();
    
    // Redesenha a lista de inputs na aba de ARMAS
    renderWeaponsPlayerInputs();
}

// Desenha a listagem de cards de setups de agentes
function renderAgentsPlayerInputs() {
    const listContainer = document.getElementById("agents-players-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    players.forEach((player, index) => {
        // Cria a caixinha elegante do jogador
        const card = document.createElement("div");
        card.className = "player-input-card";

        // Verifica se o cara restringiu o pool de agentes dele pra aplicar a classe amarela do botão
        const hasRestrictions = player.pool.size < allAgents.length;
        const configBtnClass = hasRestrictions ? "btn-icon-config has-restrictions" : "btn-icon-config";
        const configBtnTitle = hasRestrictions ? "Pool Personalizado (Restrições Ativas)" : "Configurar Pool de Agentes";

        card.innerHTML = `
            <button class="btn-profile" onclick="openProfileModal(${index})" title="Gerenciar Perfis">👤</button>
            <span class="player-number">${index + 1}</span>
            <div class="player-name-wrapper">
                <input type="text" class="player-name-input" value="${player.name}" data-player-id="${index}" placeholder="Nome do Jogador" oninput="syncPlayerName(${index}, this.value)">
            </div>
            <select class="player-role-select" onchange="syncPlayerRole(${index}, this.value)" title="Filtrar por Categoria/Função de Agente">
                <option value="ANY" ${player.role === 'ANY' ? 'selected' : ''}>Qualquer Função</option>
                <option value="DUELISTA" ${player.role === 'DUELISTA' ? 'selected' : ''}>Duelista</option>
                <option value="SENTINELA" ${player.role === 'SENTINELA' ? 'selected' : ''}>Sentinela</option>
                <option value="INICIADOR" ${player.role === 'INICIADOR' ? 'selected' : ''}>Iniciador</option>
                <option value="CONTROLADOR" ${player.role === 'CONTROLADOR' ? 'selected' : ''}>Controlador</option>
            </select>
            <button class="${configBtnClass}" onclick="openAgentModal(${index})" title="${configBtnTitle}">
                ⚙️
            </button>
        `;
        listContainer.appendChild(card);
    });
}

// Desenha a listagem de cards de setups de armas (sincronizada com nomes e quantidade)
function renderWeaponsPlayerInputs() {
    const listContainer = document.getElementById("weapons-players-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    players.forEach((player, index) => {
        const card = document.createElement("div");
        card.className = "player-input-card";

        card.innerHTML = `
            <span class="player-number">${index + 1}</span>
            <div class="player-name-wrapper">
                <input type="text" class="player-name-input" value="${player.name}" data-player-id="${index}" placeholder="Nome do Jogador" oninput="syncPlayerName(${index}, this.value)">
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Sincroniza o nome digitado por uma pessoa em tempo real em todas as telas
function syncPlayerName(index, value) {
    // Trata nome vazio pra não avacalhar o design das cartas
    const finalValue = value.trim() === "" ? `Jogador ${index + 1}` : value;
    players[index].name = finalValue;

    // Atualiza os campos de input correspondentes nas duas abas pra ficarem iguais
    const inputs = document.querySelectorAll(`input[data-player-id="${index}"]`);
    inputs.forEach(input => {
        if (document.activeElement !== input) {
            input.value = value; // Só mexe no valor se o cara não estiver digitando nele pra não quebrar o foco
        }
    });
}

// Sincroniza a função/categoria selecionada pelo jogador na memória
function syncPlayerRole(index, value) {
    players[index].role = value;
}


// --- MODAL DE SELEÇÃO DE POOL DE AGENTES DO JOGADOR ---
// Abre a janela flutuante com a grade de agentes pra escolher quem esse jogador tem desbloqueado
function openAgentModal(playerId) {
    currentConfigPlayerId = playerId;
    const player = players[playerId];
    
    // Atualiza o título do modal com o nome do maluco
    document.getElementById("modal-player-name").textContent = player.name;
    
    // Renderiza a grade de bonecos com caixas marcáveis elegantes
    renderAgentSelectorGrid(player);
    
    // Abre a janela no CSS adicionando a classe active
    document.getElementById("modal-agent-config").classList.add("active");
}

// Fecha a janela flutuante do modal
function closeAgentModal() {
    document.getElementById("modal-agent-config").classList.remove("active");
    currentConfigPlayerId = null;
}

// Desenha todos os agentes disponíveis no grid do modal com seus retratos reais
function renderAgentSelectorGrid(player) {
    const gridContainer = document.getElementById("agent-selector-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    // Ordena por ordem alfabética pra ficar chique de ler
    const sortedAgents = [...allAgents].sort((a, b) => a.name.localeCompare(b.name));

    // Filtra os agentes de acordo com a função selecionada pelo jogador (ex: Duelista)
    const filteredAgents = sortedAgents.filter(agent => {
        return player.role === 'ANY' || agent.roleName.toUpperCase() === player.role.toUpperCase();
    });

    filteredAgents.forEach(agent => {
        const isChecked = player.pool.has(agent.uuid);
        
        // Cria a carta do checkbox estilizada
        const card = document.createElement("div");
        card.className = `agent-checkbox-card ${isChecked ? 'checked' : ''}`;
        card.id = `modal-agent-card-${agent.uuid}`;
        
        // Trata retrato vazio de algum agente misterioso novo pra não quebrar a imagem
        const iconSrc = agent.portrait || "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png";

        card.innerHTML = `
            <input type="checkbox" id="chk-agent-${agent.uuid}" ${isChecked ? 'checked' : ''} onchange="toggleAgentInModal('${agent.uuid}')">
            <img src="${iconSrc}" class="agent-checkbox-icon" alt="${agent.name}">
            <span class="agent-checkbox-name">${agent.name}</span>
        `;
        
        // Faz clicar em qualquer lugar da cartinha alternar o status do checkbox
        card.addEventListener("click", (e) => {
            if (e.target.tagName !== "INPUT") {
                const chk = card.querySelector("input");
                chk.checked = !chk.checked;
                toggleAgentInModal(agent.uuid);
            }
        });

        gridContainer.appendChild(card);
    });
}

// Controla visualmente quando o usuário liga ou desliga um agente dentro do modal
function toggleAgentInModal(agentUuid) {
    const card = document.getElementById(`modal-agent-card-${agentUuid}`);
    const chk = document.getElementById(`chk-agent-${agentUuid}`);
    
    if (chk && card) {
        if (chk.checked) {
            card.classList.add("checked");
        } else {
            card.classList.remove("checked");
        }
    }
}

// Atalho do modal: Habilita ou desabilita TODOS os bonecos de uma vez só
function setAllAgents(enable) {
    const grid = document.getElementById("agent-selector-grid");
    if (!grid) return;
    
    const checkboxes = grid.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(chk => {
        chk.checked = enable;
        const agentUuid = chk.id.replace("chk-agent-", "");
        const card = document.getElementById(`modal-agent-card-${agentUuid}`);
        if (card) {
            if (enable) card.classList.add("checked");
            else card.classList.remove("checked");
        }
    });
}

// Atalho do modal: Ativa apenas os 5 Agentes Iniciais gratuitos do Valorant
function setInitialAgents() {
    const grid = document.getElementById("agent-selector-grid");
    if (!grid) return;

    // Desmarca geral primeiro pra limpar a casa
    setAllAgents(false);

    // Agora ativa só os clássicos iniciais
    const sortedAgents = [...allAgents];
    sortedAgents.forEach(agent => {
        if (agent.isInitial) {
            const chk = document.getElementById(`chk-agent-${agent.uuid}`);
            const card = document.getElementById(`modal-agent-card-${agent.uuid}`);
            if (chk && card) {
                chk.checked = true;
                card.classList.add("checked");
            }
        }
    });
}

// Salva as alterações feitas no pool de agentes e fecha o modal
function saveAgentConfig() {
    if (currentConfigPlayerId === null) return;
    
    const player = players[currentConfigPlayerId];
    
    // Varre a tela pegando as caixas marcadas e desmarcadas que estavam visíveis no modal
    const grid = document.getElementById("agent-selector-grid");
    if (grid) {
        const inputs = grid.querySelectorAll("input[type='checkbox']");
        inputs.forEach(input => {
            const agentUuid = input.id.replace("chk-agent-", "");
            if (input.checked) {
                player.pool.add(agentUuid); // Libera o boneco no pool do jogador
            } else {
                player.pool.delete(agentUuid); // Remove o boneco do pool
            }
        });
    }

    // Garante que o jogador tenha pelo menos um agente habilitado correspondente à função dele
    const poolAgents = Array.from(player.pool).map(uuid => allAgents.find(a => a.uuid === uuid)).filter(Boolean);
    const matchesSelectedRole = poolAgents.filter(agent => {
        return player.role === 'ANY' || agent.roleName.toUpperCase() === player.role.toUpperCase();
    });

    if (matchesSelectedRole.length === 0) {
        // Puxa um agente padrão correspondente à função escolhida pra roleta não dar crash
        const defaultAgent = allAgents.find(agent => {
            return player.role === 'ANY' || agent.roleName.toUpperCase() === player.role.toUpperCase();
        });
        if (defaultAgent) {
            player.pool.add(defaultAgent.uuid);
            alert(`Epa! Você desmarcou todos os agentes da função "${player.role}". Habilitamos o ${defaultAgent.name} por segurança para o sorteio funcionar.`);
        }
    }

    // Atualiza a interface gráfica dos setups pra destacar se o cara tem restrições ativas
    renderAgentsPlayerInputs();
    
    // Fecha o modal liso
    closeAgentModal();
}


// --- ALGORITMO BACKTRACKING DA EQUIPE (CONTRAINT SATISFACTION PROBLEM) ---
// Tenta resolver a distribuição sem repetição de bonecos, respeitando as restrições individuais
function solveAgentAssignments(playersList, availableAgents, playerIdx, currentAssignments, usedUuids) {
    // Condição de parada de sucesso absoluto: todos os jogadores foram atribuídos com sucesso!
    if (playerIdx === playersList.length) {
        return currentAssignments;
    }

    const player = playersList[playerIdx];

    // 1. Filtra candidatos válidos para este jogador específico
    let candidates = availableAgents.filter(agent => {
        // Regra 1: O agente precisa estar na lista de habilitados (pool) desse jogador
        const inPool = player.pool.has(agent.uuid);
        
        // Regra 2: Precisa bater com a função individual escolhida no dropdown
        const matchesRole = player.role === "ANY" || 
            agent.roleName.toUpperCase() === player.role.toUpperCase();

        // Regra 3: O boneco não pode já ter sido pego por outro jogador nessa rodada
        const notUsedYet = !usedUuids.has(agent.uuid);

        return inPool && matchesRole && notUsedYet;
    });

    // Embaralha os candidatos pra garantir total aleatoriedade em cada geração
    candidates = shuffleArray([...candidates]);

    // 2. Loop de Backtracking: tenta encaixar um candidato e ver se o resto do time se ajeita
    for (const agent of candidates) {
        // Aloca provisoriamente
        usedUuids.add(agent.uuid);
        currentAssignments[playerIdx] = agent;

        // Tenta resolver para o próximo da fila
        const solution = solveAgentAssignments(playersList, availableAgents, playerIdx + 1, currentAssignments, usedUuids);
        if (solution !== null) {
            return solution; // Achou uma distribuição fantástica!
        }

        // Se deu ruim na frente, desfaz a alocação (backtrack) e tenta o próximo candidato
        usedUuids.delete(agent.uuid);
        currentAssignments[playerIdx] = null;
    }

    return null; // Não há combinação válida viável por este ramo da busca
}

// Função de embaralhamento de arrays (Fisher-Yates) para dar aquela balançada honesta
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// --- SISTEMA DE ANIMAÇÃO DE SORTEIO (1.4 SEGUNDOS DO CORAÇÃO SAIR PELA BOCA) ---
// Roda o sorteio com animação ciclante antes de entregar as cartas oficiais
function randomizeAgents() {
    if (isRaffling) return; // Bloqueia clicks apressados
    
    // Resolve o backtracking antes pra garantir que a distribuição final seja viável
    const resultsContainer = document.getElementById("agents-results");
    if (!resultsContainer) return;

    // Roda o algoritmo de backtracking em busca de uma solução perfeita
    const finalAssignments = solveAgentAssignments(players, allAgents, 0, new Array(players.length).fill(null), new Set());

    // Se falhar nas restrições cruzadas (muito duelista e pouca gente no pool)
    if (finalAssignments === null) {
        alert("Ih, rapaz! Não deu pra sortear uma combinação válida com essas restrições. Tente liberar mais agentes no botão de engrenagem ⚙️ de cada jogador ou mude as funções!");
        return;
    }

    // Inicia a animação de sorteio emocionante!
    isRaffling = true;
    resultsContainer.classList.remove("empty");
    resultsContainer.classList.add("raf-active"); // Faz o painel todo brilhar piscando neon

    let elapsed = 0;
    const intervalTime = 80; // Troca os bonecos na tela a cada 80 milissegundos
    const totalTime = 1400; // Duração exata do suspense: 1.4 segundos

    const animInterval = setInterval(() => {
        resultsContainer.innerHTML = "";
        
        // Desenha bonecos avulsos temporários de forma aleatória em cada carta
        players.forEach((player, index) => {
            // Escolhe qualquer agente do pool daquele jogador só pra fazer graça girando na tela
            const poolArray = Array.from(player.pool).map(uuid => allAgents.find(a => a.uuid === uuid)).filter(Boolean);
            const randomAgent = poolArray.length > 0 
                ? poolArray[Math.floor(Math.random() * poolArray.length)] 
                : allAgents[Math.floor(Math.random() * allAgents.length)];
            
            resultsContainer.appendChild(createAgentCardHTML(index, randomAgent, true));
        });

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            // Fim do suspense! Mostra o resultado do backtracking final
            clearInterval(animInterval);
            resultsContainer.classList.remove("raf-active");
            
            renderFinalAgents(finalAssignments);
            isRaffling = false;
        }
    }, intervalTime);
}

// Desenha a listagem final de agentes sorteados
function renderFinalAgents(assignments) {
    const resultsContainer = document.getElementById("agents-results");
    if (!resultsContainer) return;

    resultsContainer.innerHTML = "";
    
    assignments.forEach((agent, index) => {
        const player = players[index];
        player.currentAgent = agent; // Salva o agente sorteado na memória do jogador pra poder girar de novo individualmente sem repetir
        resultsContainer.appendChild(createAgentCardHTML(index, agent));
    });
}

// Auxiliar pra cuspir o HTML do Card de Agente em formato de elemento DOM pronto pra estilizar
function createAgentCardHTML(playerIdx, agent, isRerolling = false) {
    const player = players[playerIdx];
    const card = document.createElement("div");
    card.className = "result-card animate-pop-in";
    card.id = `agent-result-card-${playerIdx}`;

    // Trata arte de fundo e portraits pra não quebrar
    const bgUrl = agent.background || "";
    const portraitUrl = agent.portrait || "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png";
    const roleIconUrl = agent.roleIcon || "";

    // Botão de girar novamente individual (escondido durante a roleta pra não dar treta)
    const rerollButtonHTML = isRerolling ? "" : `<button class="btn-reroll" onclick="rerollSingleAgent(${playerIdx})" title="Sortear novamente apenas este jogador">🔄</button>`;

    card.innerHTML = `
        ${rerollButtonHTML}
        <img src="${bgUrl}" class="card-agent-bg" alt="">
        <img src="${portraitUrl}" class="card-agent-portrait" alt="${agent.name}">
        
        <div class="card-player-badge">
            <div class="card-player-label">Jogador ${playerIdx + 1}</div>
            <div class="card-player-name">${player.name}</div>
        </div>
        
        <div class="card-agent-details">
            <div class="card-agent-name">${agent.name}</div>
            <div class="card-agent-role">
                ${roleIconUrl ? `<img src="${roleIconUrl}" class="card-role-icon" alt="${agent.roleName}">` : ""}
                <span>${agent.roleName}</span>
            </div>
        </div>
    `;
    return card;
}


// --- SORTEADOR DE ARMAS DO TIME ---
// Sorteia armas aleatórias (com repetição liberada) com base nos filtros globais marcados
function randomizeWeapons() {
    if (isRaffling) return;

    const resultsContainer = document.getElementById("weapons-results");
    if (!resultsContainer) return;

    // 1. Coleta quais categorias de armas o usuário permitiu nos checkboxes
    const allowedCategories = [];
    if (document.getElementById("weapon-cat-pistols")?.checked) allowedCategories.push("pistols");
    if (document.getElementById("weapon-cat-smgs")?.checked) allowedCategories.push("smgs");
    if (document.getElementById("weapon-cat-shotguns")?.checked) allowedCategories.push("shotguns");
    if (document.getElementById("weapon-cat-rifles")?.checked) allowedCategories.push("rifles");
    if (document.getElementById("weapon-cat-snipers")?.checked) allowedCategories.push("snipers");
    if (document.getElementById("weapon-cat-heavies")?.checked) allowedCategories.push("heavies");
    if (document.getElementById("weapon-cat-melee")?.checked) allowedCategories.push("melee");

    // Valida se o infeliz desmarcou absolutamente tudo
    if (allowedCategories.length === 0) {
        alert("Opa, meu consagrado! Marque pelo menos uma categoria de arma para realizar o sorteio.");
        return;
    }

    // Filtra nosso banco de armas completo de acordo com as marcadas
    const candidates = allWeapons.filter(w => allowedCategories.includes(w.internalCat));

    if (candidates.length === 0) {
        alert("Nenhuma arma encontrada nas categorias selecionadas!");
        return;
    }

    // Inicia a animação de sorteio na aba de armas!
    isRaffling = true;
    resultsContainer.classList.remove("empty");
    resultsContainer.classList.add("raf-active");

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1400; // Mantém a padronização de 1.4s emocionante

    const animInterval = setInterval(() => {
        resultsContainer.innerHTML = "";

        // Mostra armas passando correndo rápido na tela de cada jogador
        players.forEach((player, index) => {
            const randomWeapon = candidates[Math.floor(Math.random() * candidates.length)];
            resultsContainer.appendChild(createWeaponCardHTML(index, randomWeapon, true));
        });

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            // Revela a artilharia pesada oficial sorteada
            clearInterval(animInterval);
            resultsContainer.classList.remove("raf-active");

            resultsContainer.innerHTML = "";
            players.forEach((player, index) => {
                const finalWeapon = candidates[Math.floor(Math.random() * candidates.length)];
                player.currentWeapon = finalWeapon; // Salva a arma na memória
                resultsContainer.appendChild(createWeaponCardHTML(index, finalWeapon));
            });

            isRaffling = false;
        }
    }, intervalTime);
}

// Auxiliar pra cuspir o HTML do Card de Arma (estilo super clean sem exibir creds/preços)
function createWeaponCardHTML(playerIdx, weapon, isRerolling = false) {
    const player = players[playerIdx];
    const card = document.createElement("div");
    card.className = "weapon-card animate-pop-in";
    card.id = `weapon-result-card-${playerIdx}`;

    const portraitUrl = weapon.portrait || "";
    
    // Botão de girar novamente individual (escondido durante a roleta)
    const rerollButtonHTML = isRerolling ? "" : `<button class="btn-reroll" onclick="rerollSingleWeapon(${playerIdx})" title="Sortear novamente apenas esta arma">🔄</button>`;

    card.innerHTML = `
        ${rerollButtonHTML}
        <div class="card-player-badge">
            <div class="card-player-label">Jogador ${playerIdx + 1}</div>
            <div class="card-player-name">${player.name}</div>
        </div>
        
        <div class="card-weapon-portrait-container">
            <img src="${portraitUrl}" class="card-weapon-portrait" alt="${weapon.name}">
        </div>
        
        <div class="card-agent-details">
            <div class="card-weapon-category">${weapon.category}</div>
            <div class="card-weapon-name">${weapon.name}</div>
        </div>
    `;
    return card;
}

// --- SORTEIO INDIVIDUAL DE UM JOGADOR (AGENTE) ---
// Rola a roleta novamente apenas para um jogador específico, respeitando a unicidade!
function rerollSingleAgent(playerIdx) {
    if (isRaffling) return; // Bloqueia se o sorteio geral ou outro individual estiver rolando

    const player = players[playerIdx];
    const cardEl = document.getElementById(`agent-result-card-${playerIdx}`);
    if (!cardEl) return;

    // 1. Calcula quais agentes já estão em uso por OUTROS jogadores
    const usedUuids = new Set();
    players.forEach((p, idx) => {
        if (idx !== playerIdx && p.currentAgent) {
            usedUuids.add(p.currentAgent.uuid);
        }
    });

    // 2. Filtra os candidatos válidos para esse jogador
    const candidates = allAgents.filter(agent => {
        const inPool = player.pool.has(agent.uuid);
        const matchesRole = player.role === "ANY" || 
            agent.roleName.toUpperCase() === player.role.toUpperCase();
        const notUsed = !usedUuids.has(agent.uuid);
        return inPool && matchesRole && notUsed;
    });

    // Se as restrições forem muito apertadas e não sobrou ninguém
    if (candidates.length === 0) {
        alert(`Ih, rapaz! Não sobrou nenhum agente disponível no pool de ${player.name} que atenda à função de ${player.role} e não esteja sendo usado por outros jogadores!`);
        return;
    }

    // Embaralha e escolhe um felizardo
    const finalAgent = shuffleArray([...candidates])[0];

    // Inicia a animação individual na caixinha deste jogador!
    isRaffling = true;
    cardEl.classList.add("raf-active"); // Efeito de neon piscando na caixinha dele

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1000; // 1 segundo de suspense individual é perfeito

    // Pega o pool completo dele para ciclar durante o suspense
    const poolArray = Array.from(player.pool).map(uuid => allAgents.find(a => a.uuid === uuid)).filter(Boolean);

    const animInterval = setInterval(() => {
        // Mostra agentes passando correndo na caixinha
        const tempAgent = poolArray.length > 0 
            ? poolArray[Math.floor(Math.random() * poolArray.length)] 
            : allAgents[Math.floor(Math.random() * allAgents.length)];
            
        // Renderiza o card temporário (com o botão de girar escondido durante a animação)
        const tempCard = createAgentCardHTML(playerIdx, tempAgent, true);
        cardEl.innerHTML = tempCard.innerHTML;

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            clearInterval(animInterval);
            cardEl.classList.remove("raf-active");

            // Define e exibe o agente final oficial
            player.currentAgent = finalAgent;
            const finalCard = createAgentCardHTML(playerIdx, finalAgent, false);
            cardEl.innerHTML = finalCard.innerHTML;

            isRaffling = false;
        }
    }, intervalTime);
}

// --- SORTEIO INDIVIDUAL DE UMA ARMA ---
// Sorteia novamente apenas a arma de um jogador específico
function rerollSingleWeapon(playerIdx) {
    if (isRaffling) return;

    const player = players[playerIdx];
    const cardEl = document.getElementById(`weapon-result-card-${playerIdx}`);
    if (!cardEl) return;

    // 1. Coleta quais categorias de armas estão permitidas globalmente
    const allowedCategories = [];
    if (document.getElementById("weapon-cat-pistols")?.checked) allowedCategories.push("pistols");
    if (document.getElementById("weapon-cat-smgs")?.checked) allowedCategories.push("smgs");
    if (document.getElementById("weapon-cat-shotguns")?.checked) allowedCategories.push("shotguns");
    if (document.getElementById("weapon-cat-rifles")?.checked) allowedCategories.push("rifles");
    if (document.getElementById("weapon-cat-snipers")?.checked) allowedCategories.push("snipers");
    if (document.getElementById("weapon-cat-heavies")?.checked) allowedCategories.push("heavies");
    if (document.getElementById("weapon-cat-melee")?.checked) allowedCategories.push("melee");

    if (allowedCategories.length === 0) {
        alert("Opa! Selecione pelo menos uma categoria de arma globalmente para girar de novo!");
        return;
    }

    const candidates = allWeapons.filter(w => allowedCategories.includes(w.internalCat));

    if (candidates.length === 0) {
        alert("Nenhuma arma encontrada nas categorias ativas!");
        return;
    }

    // Escolhe a arma final
    const finalWeapon = candidates[Math.floor(Math.random() * candidates.length)];

    // Animação suspense na cartinha de arma do jogador
    isRaffling = true;
    cardEl.classList.add("raf-active");

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1000; // 1 segundo de suspense

    const animInterval = setInterval(() => {
        const tempWeapon = candidates[Math.floor(Math.random() * candidates.length)];
        const tempCard = createWeaponCardHTML(playerIdx, tempWeapon, true);
        cardEl.innerHTML = tempCard.innerHTML;

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            clearInterval(animInterval);
            cardEl.classList.remove("raf-active");

            // Salva e exibe a arma final oficial
            player.currentWeapon = finalWeapon;
            const finalCard = createWeaponCardHTML(playerIdx, finalWeapon, false);
            cardEl.innerHTML = finalCard.innerHTML;

            isRaffling = false;
        }
    }, intervalTime);
}

// ==========================================================================
// --- SISTEMA CABULOSO DE GESTÃO DE PERFIS (PERSISTÊNCIA COM LOCALSTORAGE) ---
// ==========================================================================

// Abre o modal de perfis salvos pra carregar ou criar configurações de jogador
function openProfileModal(playerIdx) {
    currentConfigPlayerId = playerIdx;
    
    // Limpa o input do nome do perfil pro maluco digitar do zero
    document.getElementById("profile-name-input").value = "";
    
    // Desenha a listinha atualizada de perfis salvos na tela
    renderProfileList();
    
    // Exibe o modal na marra
    document.getElementById("modal-profile-config").classList.add("active");
}

// Fecha o modal de perfis de forma lisa
function closeProfileModal() {
    document.getElementById("modal-profile-config").classList.remove("active");
    currentConfigPlayerId = null;
}

// Puxa os perfis do localStorage de forma segura pra não quebrar a máquina do usuário
function loadProfilesFromStorage() {
    try {
        const stored = localStorage.getItem("valorant_profiles");
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.error("Ih, deu ruim ao parsear os perfis no localStorage! Resetando...", e);
        return {};
    }
}

// Salva a lista inteira de perfis no localStorage pro cabra não ter que reconfigurar tudo depois
function saveProfilesToStorage(profiles) {
    try {
        localStorage.setItem("valorant_profiles", JSON.stringify(profiles));
    } catch (e) {
        console.error("Ops! Erro ao tentar persistir os perfis no localStorage:", e);
    }
}

// Salva o pool de agentes e nome do jogador atual como um perfil persistente
function saveCurrentAsProfile() {
    if (currentConfigPlayerId === null) return;

    const profileInput = document.getElementById("profile-name-input");
    const profileName = profileInput.value.trim();

    if (!profileName) {
        alert("Epa, meu consagrado! Digite um nome para o perfil antes de tentar salvar.");
        return;
    }

    const player = players[currentConfigPlayerId];
    const profiles = loadProfilesFromStorage();

    // Salva o nome do jogador, a função/role selecionada e o pool de UUIDs dos agentes desbloqueados
    profiles[profileName] = {
        playerName: player.name,
        role: player.role, // Salva a função/role selecionada
        agentPool: Array.from(player.pool)
    };

    saveProfilesToStorage(profiles);
    profileInput.value = ""; // Limpa o input pro cara ficar feliz
    renderProfileList(); // Redesenha a lista
    
    alert(`Perfil "${profileName}" salvo com sucesso! Coisa linda!`);
}

// Renderiza a lista de perfis disponíveis para carregar ou excluir
function renderProfileList() {
    const listContainer = document.getElementById("profile-list-container");
    if (!listContainer) return;

    listContainer.innerHTML = "";
    const profiles = loadProfilesFromStorage();
    const keys = Object.keys(profiles);

    if (keys.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem 0; font-size: 0.9rem;">Nenhum perfil salvo ainda. Digite um nome acima e salve o atual!</div>`;
        return;
    }

    keys.sort().forEach(profileName => {
        const profile = profiles[profileName];
        const item = document.createElement("div");
        item.className = "profile-item";

        item.innerHTML = `
            <span class="profile-item-name">
                <strong>${profileName}</strong> (Jogador: ${profile.playerName})
            </span>
            <div class="profile-item-actions">
                <button class="btn-secondary btn-sm" onclick="loadProfile('${profileName}')" title="Carregar Perfil">Carregar</button>
                <button class="btn-secondary btn-sm" style="border-color: var(--primary); color: var(--primary);" onclick="deleteProfile('${profileName}')" title="Excluir Perfil">Excluir</button>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// Carrega o perfil selecionado para o jogador atual em foco
function loadProfile(profileName) {
    if (currentConfigPlayerId === null) return;

    const profiles = loadProfilesFromStorage();
    const profile = profiles[profileName];

    if (!profile) return;

    const player = players[currentConfigPlayerId];
    
    // Apenas carrega o pool de agentes e a função/role do perfil, sem alterar o nome atual do jogador
    const validUuids = profile.agentPool.filter(uuid => allAgents.some(a => a.uuid === uuid));
    player.pool = new Set(validUuids);

    // Carrega a função caso ela esteja salva no perfil
    if (profile.role) {
        player.role = profile.role;
    } else {
        player.role = "ANY"; // Fallback se for um perfil antigo sem role
    }

    // Garante que o pool não fique inteiramente vazio pra não avacalhar o algoritmo
    if (player.pool.size === 0) {
        player.pool = new Set(allAgents.map(a => a.uuid));
    }

    // Redesenha os inputs dos jogadores mantendo os nomes atuais e atualizando o dropdown de função
    renderAgentsPlayerInputs();
    renderWeaponsPlayerInputs();

    closeProfileModal();
    alert(`Configurações de agentes e função do perfil "${profileName}" carregadas com sucesso!`);
}

// Exclui um perfil salvo da memória
function deleteProfile(profileName) {
    if (!confirm(`Deseja mesmo chutar o perfil "${profileName}" pra fora?`)) return;

    const profiles = loadProfilesFromStorage();
    delete profiles[profileName];
    saveProfilesToStorage(profiles);
    renderProfileList();
}
