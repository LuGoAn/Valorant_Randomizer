(function (VR) {
    const { store, solver, storage } = VR;
    const { h, icon, toast, Modal, setImage } = VR.dom;

    const SPIN_STEP_MS = 80;
    const SPIN_ALL_MS = 1400;
    const SPIN_ONE_MS = 1000;

    const listFormat = new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" });

    const $ = id => document.getElementById(id);

    let spinning = false; // bloqueia clique durante o sorteio
    let editingPlayer = null; // jogador aberto no modal
    const shown = { agents: [], weapons: [] }; // cards na tela + update() de cada um

    const TABS = ["agents", "weapons"];

    function switchTab(tab) {
        TABS.forEach(name => {
            const active = name === tab;
            const button = $(`tab-${name}`);
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", String(active));
            button.tabIndex = active ? 0 : -1;
            $(`section-${name}`).classList.toggle("active", active);
        });
    }

    function bindTabs() {
        TABS.forEach((name, index) => {
            const button = $(`tab-${name}`);
            button.addEventListener("click", () => switchTab(name));
            button.addEventListener("keydown", event => {
                const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
                if (!step) return;
                const next = TABS[(index + step + TABS.length) % TABS.length];
                switchTab(next);
                $(`tab-${next}`).focus();
            });
        });
    }

    function onNameInput(index, input) {
        store.setPlayerName(index, input.value);
        document.querySelectorAll(`input[data-player="${index}"]`).forEach(other => {
            if (other !== input) other.value = input.value;
        });
        syncCardNames(index);
        store.scheduleSave();
    }

    function syncCardNames(index) {
        document.querySelectorAll(`.card-player-name[data-player="${index}"]`).forEach(node => {
            node.textContent = store.displayName(index);
        });
    }

    function nameInput(index) {
        return h("div", { class: "player-name-wrapper" },
            h("input", {
                type: "text",
                class: "player-name-input",
                value: store.players[index].name,
                maxlength: store.MAX_NAME_LENGTH,
                placeholder: `Jogador ${index + 1}`,
                "data-player": index,
                "aria-label": `Nome do jogador ${index + 1}`,
                oninput: event => onNameInput(index, event.target)
            })
        );
    }

    function roleSelect(index) {
        const select = h("select", {
            class: "player-role-select",
            title: "Filtrar por função de agente",
            "aria-label": `Função do jogador ${index + 1}`,
            onchange: event => {
                store.players[index].role = event.target.value;
                store.scheduleSave();
            }
        },
            h("option", { value: VR.ANY_ROLE, text: "Qualquer Função" }),
            VR.ROLES.map(role => h("option", { value: role.id, text: role.name }))
        );
        select.value = store.players[index].role;
        return select;
    }

    function styleConfigButton(button, index) {
        const restricted = !store.hasAllAgents(store.players[index]);
        button.classList.toggle("has-restrictions", restricted);
        button.title = restricted ? "Pool personalizado (restrições ativas)" : "Configurar pool de agentes";
    }

    function configButton(index) {
        const button = h("button", {
            type: "button",
            class: "btn-icon-config",
            "data-player": index,
            "aria-label": `Configurar pool de agentes do jogador ${index + 1}`,
            onclick: () => openAgentModal(index)
        }, icon("sliders"), h("span", { class: "btn-label", text: "Pool de agentes" }));
        styleConfigButton(button, index);
        return button;
    }

    function refreshConfigButtons() {
        document.querySelectorAll(".btn-icon-config").forEach(button => {
            styleConfigButton(button, Number(button.dataset.player));
        });
    }

    function renderPlayers() {
        $("agents-players-list").replaceChildren(
            ...store.players.map((_, index) =>
                h("div", { class: "player-input-card" },
                    h("button", {
                        type: "button",
                        class: "btn-profile",
                        "data-player": index,
                        title: "Gerenciar perfis",
                        "aria-label": `Gerenciar perfis do jogador ${index + 1}`,
                        onclick: () => openProfileModal(index)
                    }, icon("user"), h("span", { class: "btn-label", text: "Perfis" })),
                    h("span", { class: "player-number", text: index + 1 }),
                    nameInput(index),
                    roleSelect(index),
                    configButton(index)
                )
            )
        );

        $("weapons-players-list").replaceChildren(
            ...store.players.map((_, index) =>
                h("div", { class: "player-input-card" },
                    h("span", { class: "player-number", text: index + 1 }),
                    nameInput(index)
                )
            )
        );

        $("agents-player-count").value = String(store.players.length);
        $("weapons-player-count").value = String(store.players.length);
    }

    function onCountChange(select) {
        if (spinning) {
            select.value = String(store.players.length);
            return;
        }
        store.setPlayerCount(Number(select.value));
        store.clearResults();
        renderPlayers();
        showEmpty("agents");
        showEmpty("weapons");
        store.scheduleSave();
    }

    function playerBadge(index) {
        return h("div", { class: "card-player-badge" },
            h("div", { class: "card-player-label", text: `Jogador ${index + 1}` }),
            h("div", { class: "card-player-name", "data-player": index, text: store.displayName(index) })
        );
    }

    function rerollButton(label, handler) {
        return h("button", {
            type: "button",
            class: "btn-reroll",
            title: label,
            "aria-label": label,
            onclick: handler
        }, icon("refresh"));
    }

    function buildAgentCard(index) {
        const background = h("img", { class: "card-agent-bg", alt: "" });
        const portrait = h("img", { class: "card-agent-portrait", alt: "" });
        const name = h("div", { class: "card-agent-name" });
        const roleIcon = h("img", { class: "card-role-icon", alt: "" });
        const roleText = h("span");

        const root = h("div", { class: "result-card", id: `agent-result-card-${index}` },
            rerollButton("Sortear novamente apenas este jogador", () => rerollAgent(index)),
            playerBadge(index),
            h("div", { class: "card-agent-art" }, background, portrait),
            h("div", { class: "card-agent-details" },
                name,
                h("div", { class: "card-agent-role" }, roleIcon, roleText)
            )
        );

        return {
            root,
            update(agent) {
                setImage(background, agent.background);
                setImage(portrait, agent.portrait || agent.displayIcon, agent.displayIcon);
                portrait.alt = agent.name;
                setImage(roleIcon, agent.roleIcon);
                name.textContent = agent.name;
                roleText.textContent = agent.roleName;
            }
        };
    }

    function buildWeaponCard(index) {
        const portrait = h("img", { class: "card-weapon-portrait", alt: "" });
        const category = h("div", { class: "card-weapon-category" });
        const name = h("div", { class: "card-weapon-name" });

        const root = h("div", { class: "weapon-card", id: `weapon-result-card-${index}` },
            rerollButton("Sortear novamente apenas esta arma", () => rerollWeapon(index)),
            playerBadge(index),
            h("div", { class: "card-weapon-portrait-container" }, portrait),
            h("div", { class: "card-agent-details" }, category, name)
        );

        return {
            root,
            update(weapon) {
                setImage(portrait, weapon.portrait);
                portrait.alt = weapon.name;
                category.textContent = weapon.category;
                name.textContent = weapon.name;
            }
        };
    }

    const KINDS = {
        agents: {
            containerId: "agents-results",
            field: "agent",
            build: buildAgentCard,
            emptyText: 'Configure os jogadores, ajuste os pools de agentes liberados e clique em "GERAR AGENTES" para revelar as atribuições.'
        },
        weapons: {
            containerId: "weapons-results",
            field: "weapon",
            build: buildWeaponCard,
            emptyText: 'Configure os jogadores, defina quais categorias de armas estão liberadas e clique em "GERAR ARMAS" para armar sua equipe.'
        }
    };

    function showEmpty(kind) {
        const container = $(KINDS[kind].containerId);
        shown[kind] = [];
        container.classList.add("empty");
        container.replaceChildren(
            h("div", { class: "empty-state" },
                h("h3", { text: "Pronto para o Sorteio" }),
                h("p", { text: KINDS[kind].emptyText })
            )
        );
    }

    function spin(duration, tick) {
        return new Promise(resolve => {
            const start = performance.now();
            tick();
            const timer = setInterval(() => {
                if (performance.now() - start >= duration) {
                    clearInterval(timer);
                    resolve();
                } else {
                    tick();
                }
            }, SPIN_STEP_MS);
        });
    }

    // raf-active e animate-pop-in brigam pelo animation, nunca os dois juntos
    function startSpin(root) {
        root.classList.remove("animate-pop-in");
        root.classList.add("raf-active");
    }

    function endSpin(root) {
        root.classList.remove("raf-active");
        root.classList.add("animate-pop-in");
    }

    async function revealAll(kind, preview, finals) {
        const info = KINDS[kind];
        const container = $(info.containerId);
        spinning = true;
        try {
            const cards = store.players.map((_, index) => info.build(index));
            shown[kind] = cards;
            container.classList.remove("empty");
            container.replaceChildren(...cards.map(card => card.root));
            cards.forEach(card => startSpin(card.root));

            await spin(SPIN_ALL_MS, () => cards.forEach((card, index) => card.update(preview(index))));

            cards.forEach((card, index) => {
                store.players[index][info.field] = finals[index];
                card.update(finals[index]);
                endSpin(card.root);
            });
        } finally {
            spinning = false;
        }
    }

    async function revealOne(kind, index, preview, final) {
        const card = shown[kind][index];
        if (!card) return;
        spinning = true;
        try {
            startSpin(card.root);
            await spin(SPIN_ONE_MS, () => card.update(preview()));
            store.players[index][KINDS[kind].field] = final;
            card.update(final);
            endSpin(card.root);
        } finally {
            spinning = false;
        }
    }

    function agentsFor(player) {
        const options = store.agents.filter(agent => solver.canPlay(player, agent));
        return options.length ? options : store.agents;
    }

    function explainConflict() {
        const conflict = solver.findConflict(store.players, store.agents);
        if (!conflict) return "Não deu para sortear uma combinação válida com essas restrições.";

        const names = listFormat.format(conflict.players.map(index => store.displayName(index)));
        if (conflict.available === 0) {
            const player = store.players[conflict.players[0]];
            const role = player.role === VR.ANY_ROLE ? "" : ` da função ${VR.roleName(player.role)}`;
            return `${names} não tem nenhum agente liberado${role}. Ajuste o pool ou a função.`;
        }
        const amount = `${conflict.available} ${conflict.available === 1 ? "agente" : "agentes"}`;
        return `${names} precisam de agentes diferentes, mas juntos só têm ${amount} liberado${conflict.available === 1 ? "" : "s"}. Libere mais agentes ou mude as funções.`;
    }

    async function randomizeAgents() {
        if (spinning) return;

        const result = solver.solve(store.players, store.agents);
        if (!result) {
            toast(explainConflict(), "error");
            return;
        }
        await revealAll("agents", index => solver.pickRandom(agentsFor(store.players[index])), result);
    }

    async function rerollAgent(index) {
        if (spinning) return;

        const assigned = store.players.map(player => player.agent);
        const options = solver.rerollCandidates(store.players, store.agents, assigned, index);
        if (options.length === 0) {
            toast(`Não há outro agente possível para ${store.displayName(index)} com as regras atuais.`, "error");
            return;
        }
        await revealOne(
            "agents",
            index,
            () => solver.pickRandom(agentsFor(store.players[index])),
            solver.pickRandom(options)
        );
    }

    function weaponPool() {
        if (store.enabledCategories.size === 0) {
            toast("Marque pelo menos uma categoria de arma.", "error");
            return null;
        }
        const pool = store.allowedWeapons();
        if (pool.length === 0) {
            toast("Nenhuma arma encontrada nas categorias selecionadas.", "error");
            return null;
        }
        return pool;
    }

    async function randomizeWeapons() {
        if (spinning) return;
        const pool = weaponPool();
        if (!pool) return;

        const finals = store.players.map(() => solver.pickRandom(pool));
        await revealAll("weapons", () => solver.pickRandom(pool), finals);
    }

    async function rerollWeapon(index) {
        if (spinning) return;
        const pool = weaponPool();
        if (!pool) return;

        const current = store.players[index].weapon;
        const others = pool.filter(weapon => !current || weapon.uuid !== current.uuid);
        await revealOne("weapons", index, () => solver.pickRandom(pool), solver.pickRandom(others.length ? others : pool));
    }

    function renderCategories() {
        $("weapon-categories").replaceChildren(
            ...VR.WEAPON_CATEGORIES.map(category =>
                h("label", { class: "category-checkbox-label" },
                    h("input", {
                        type: "checkbox",
                        checked: store.enabledCategories.has(category.id),
                        onchange: event => {
                            store.toggleCategory(category.id, event.target.checked);
                            store.scheduleSave();
                        }
                    }),
                    h("span", { class: "custom-checkbox" }),
                    category.label
                )
            )
        );
    }

    function openAgentModal(index) {
        editingPlayer = index;
        const player = store.players[index];

        $("modal-player-name").textContent = store.displayName(index);

        const note = $("modal-role-note");
        note.hidden = player.role === VR.ANY_ROLE;
        note.textContent = `Mostrando só agentes da função ${VR.roleName(player.role)}. Os outros agentes continuam como estão.`;

        const visible = store.agents
            .filter(agent => player.role === VR.ANY_ROLE || agent.roleId === player.role)
            .sort((a, b) => a.name.localeCompare(b.name));

        $("agent-selector-grid").replaceChildren(
            ...visible.map(agent => {
                const checked = player.pool.has(agent.uuid);
                const image = h("img", { class: "agent-checkbox-icon", alt: "", loading: "lazy" });
                setImage(image, agent.displayIcon, VR.FALLBACK_AGENT_ICON);

                return h("label", { class: checked ? "agent-checkbox-card checked" : "agent-checkbox-card" },
                    h("input", {
                        type: "checkbox",
                        checked,
                        "data-uuid": agent.uuid,
                        onchange: event => event.target.closest(".agent-checkbox-card").classList.toggle("checked", event.target.checked)
                    }),
                    image,
                    h("span", { class: "agent-checkbox-name", text: agent.name })
                );
            })
        );

        Modal.open($("modal-agent-config"), () => {
            editingPlayer = null;
        });
    }

    function setVisibleAgents(isEnabled) {
        $("agent-selector-grid").querySelectorAll("input[type='checkbox']").forEach(input => {
            input.checked = isEnabled(store.agents.find(agent => agent.uuid === input.dataset.uuid));
            input.closest(".agent-checkbox-card").classList.toggle("checked", input.checked);
        });
    }

    function saveAgentConfig() {
        if (editingPlayer === null) return;
        const player = store.players[editingPlayer];

        const draft = new Set(player.pool);
        $("agent-selector-grid").querySelectorAll("input[type='checkbox']").forEach(input => {
            if (input.checked) draft.add(input.dataset.uuid);
            else draft.delete(input.dataset.uuid);
        });

        const usable = store.agents.some(agent => draft.has(agent.uuid) && (player.role === VR.ANY_ROLE || agent.roleId === player.role));
        if (!usable) {
            toast(
                player.role === VR.ANY_ROLE
                    ? "Marque pelo menos um agente."
                    : `Marque pelo menos um agente da função ${VR.roleName(player.role)}.`,
                "error"
            );
            return;
        }

        player.pool = draft;
        refreshConfigButtons();
        store.scheduleSave();
        Modal.close();
    }

    function openProfileModal(index) {
        editingPlayer = index;
        $("profile-modal-player").textContent = store.displayName(index);
        $("profile-name-input").value = store.players[index].name.trim();
        renderProfileList();
        Modal.open($("modal-profile-config"), () => {
            editingPlayer = null;
        });
    }

    function describeProfile(profile) {
        const parts = [];
        if (profile.playerName) parts.push(profile.playerName);
        parts.push(profile.role === VR.ANY_ROLE ? "Qualquer função" : VR.roleName(profile.role));
        parts.push(profile.agentPool ? `${profile.agentPool.length} agentes` : "todos os agentes");
        return parts.join(" · ");
    }

    function saveCurrentAsProfile() {
        if (editingPlayer === null) return;

        const input = $("profile-name-input");
        const name = input.value.trim().slice(0, storage.MAX_PROFILE_NAME);
        if (!name) {
            toast("Digite um nome para o perfil antes de salvar.", "error");
            input.focus();
            return;
        }

        const profiles = storage.loadProfiles();
        const existed = profiles.has(name);
        profiles.set(name, store.snapshotProfile(editingPlayer));

        if (!storage.saveProfiles(profiles)) {
            toast("Não consegui gravar o perfil. O navegador pode estar bloqueando o armazenamento.", "error");
            return;
        }
        input.value = "";
        renderProfileList();
        toast(existed ? `Perfil "${name}" atualizado.` : `Perfil "${name}" salvo.`, "success");
    }

    function loadProfile(name) {
        const profile = storage.loadProfiles().get(name);
        const index = editingPlayer;
        if (!profile || index === null) return;

        Modal.close(); // fecha antes pra devolver o foco pro botão certo
        store.applyProfile(index, profile);

        let message = `Perfil "${name}" carregado.`;
        const player = store.players[index];
        const usable = store.agents.some(agent => solver.canPlay(player, agent));
        if (!usable) {
            player.role = VR.ANY_ROLE;
            message += " A função salva não tinha agentes liberados, então ficou em Qualquer Função.";
        }

        renderPlayers();
        syncCardNames(index);
        store.scheduleSave();
        const button = document.querySelector(`.btn-profile[data-player="${index}"]`);
        if (button) button.focus();
        toast(message, "success");
    }

    // segundo clique em 3s confirma
    function deleteButton(name) {
        let timer = null;
        const button = h("button", { type: "button", class: "btn-secondary btn-sm btn-danger", text: "Excluir" });

        button.addEventListener("click", () => {
            if (timer === null) {
                button.textContent = "Confirmar?";
                button.classList.add("armed");
                timer = setTimeout(() => {
                    button.textContent = "Excluir";
                    button.classList.remove("armed");
                    timer = null;
                }, 3000);
                return;
            }
            clearTimeout(timer);
            const profiles = storage.loadProfiles();
            profiles.delete(name);
            storage.saveProfiles(profiles);
            renderProfileList();
            toast(`Perfil "${name}" excluído.`, "success");
        });
        return button;
    }

    function renderProfileList() {
        const profiles = storage.loadProfiles();
        const container = $("profile-list-container");

        if (profiles.size === 0) {
            container.replaceChildren(
                h("div", { class: "profile-empty", text: "Nenhum perfil salvo ainda. Digite um nome acima e salve o atual!" })
            );
            return;
        }

        container.replaceChildren(
            ...[...profiles.keys()].sort((a, b) => a.localeCompare(b)).map(name =>
                h("div", { class: "profile-item" },
                    h("span", { class: "profile-item-name" },
                        h("strong", { text: name }),
                        h("small", { text: describeProfile(profiles.get(name)) })
                    ),
                    h("div", { class: "profile-item-actions" },
                        h("button", {
                            type: "button",
                            class: "btn-secondary btn-sm",
                            text: "Carregar",
                            onclick: () => loadProfile(name)
                        }),
                        deleteButton(name)
                    )
                )
            )
        );
    }

    function init() {
        bindTabs();
        renderCategories();
        renderPlayers();
        showEmpty("agents");
        showEmpty("weapons");

        $("agents-player-count").addEventListener("change", event => onCountChange(event.target));
        $("weapons-player-count").addEventListener("change", event => onCountChange(event.target));
        $("btn-randomize-agents").addEventListener("click", randomizeAgents);
        $("btn-randomize-weapons").addEventListener("click", randomizeWeapons);

        $("btn-agent-modal-close").addEventListener("click", Modal.close);
        $("btn-agents-all").addEventListener("click", () => setVisibleAgents(() => true));
        $("btn-agents-none").addEventListener("click", () => setVisibleAgents(() => false));
        $("btn-agents-initial").addEventListener("click", () => setVisibleAgents(agent => agent.isInitial));
        $("btn-agents-save").addEventListener("click", saveAgentConfig);

        $("btn-profile-modal-close").addEventListener("click", Modal.close);
        $("btn-profile-save").addEventListener("click", saveCurrentAsProfile);
        $("profile-name-input").addEventListener("keydown", event => {
            if (event.key === "Enter") saveCurrentAsProfile();
        });
    }

    function onCatalogChanged() {
        refreshConfigButtons();
    }

    VR.ui = { init, onCatalogChanged };
})((window.VR = window.VR || {}));
