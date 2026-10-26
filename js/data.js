(function (root) {
    const VR = (root.VR = root.VR || {});
    const MEDIA = "https://media.valorant-api.com";

    VR.ANY_ROLE = "ANY";

    VR.ROLES = [
        { id: "dbe8757e-9e92-4ed4-b39f-9dfc589691d4", name: "Duelista" },
        { id: "5fc02f99-4091-4486-a531-98459a3e95e9", name: "Sentinela" },
        { id: "1b47567f-8f7b-444b-aae3-b0c634622d10", name: "Iniciador" },
        { id: "4ee40330-ecdd-4f2f-98a8-eb1243428373", name: "Controlador" }
    ];

    VR.WEAPON_CATEGORIES = [
        { id: "pistols", label: "Leves / Pistolas" },
        { id: "smgs", label: "Submetralhadoras (SMGs)" },
        { id: "shotguns", label: "Escopetas" },
        { id: "rifles", label: "Fuzis" },
        { id: "snipers", label: "Fuzis de Precisão (Snipers)" },
        { id: "heavies", label: "Armas Pesadas (Odin/Ares)" },
        { id: "melee", label: "Confronto (Faca)" }
    ];

    // agentes de conta nova
    VR.INITIAL_AGENT_UUIDS = new Set([
        "add6443a-41bd-e414-f6ad-e58d267f4e95", // Jett
        "eb93336a-449b-9c1b-0a54-a891f7921d69", // Phoenix
        "569fdd95-4d10-43ab-ca70-79becc718b46", // Sage
        "320b2a48-4d9b-a075-30f1-1f93a9b638fa", // Sova
        "9f0d8ba9-4140-b941-57d3-a7ad57c6b417"  // Brimstone
    ]);

    VR.FALLBACK_AGENT_ICON = MEDIA + "/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png";

    VR.roleName = function (roleId) {
        const role = VR.ROLES.find(r => r.id === roleId);
        return role ? role.name : "Sem Função";
    };

    VR.roleIconUrl = function (roleId) {
        return roleId ? MEDIA + "/agents/roles/" + roleId + "/displayicon.png" : "";
    };

    VR.makeAgent = function (uuid, name, roleId) {
        return {
            uuid,
            name,
            roleId,
            roleName: VR.roleName(roleId),
            roleIcon: VR.roleIconUrl(roleId),
            displayIcon: MEDIA + "/agents/" + uuid + "/displayicon.png",
            portrait: MEDIA + "/agents/" + uuid + "/fullportrait.png",
            background: MEDIA + "/agents/" + uuid + "/background.png",
            isInitial: VR.INITIAL_AGENT_UUIDS.has(uuid)
        };
    };

    VR.makeWeapon = function (uuid, name, category, portrait) {
        const cat = VR.WEAPON_CATEGORIES.find(c => c.id === category);
        return {
            uuid,
            name,
            category: cat ? cat.label : "Arma",
            internalCat: category,
            portrait: portrait || MEDIA + "/weapons/" + uuid + "/displayicon.png"
        };
    };

    // armas que a API ainda pode não ter
    VR.EXTRA_WEAPONS = [
        VR.makeWeapon(
            "warden-patch-13-06",
            "Warden",
            "rifles",
            "https://valorantstrike.com/cms-media/2c6f2b70-160f-4791-bddb-f0a3f76aecb6.jpg"
        )
    ];

    const R = { I: VR.ROLES[2].id, S: VR.ROLES[1].id, C: VR.ROLES[3].id, D: VR.ROLES[0].id };

    // uuid, nome, função (I/S/C/D)
    const AGENT_ROWS = [
        ["e370fa57-4757-3604-3648-499e1f642d3f", "Gekko", "I"],
        ["dade69b4-4f5a-8528-247b-219e5a1facd6", "Fade", "I"],
        ["5f8d3a7f-467b-97f3-062c-13acf203c006", "Breach", "I"],
        ["cc8b64c8-4b25-4ff9-6e7f-37b4da43d235", "Deadlock", "S"],
        ["b444168c-4e35-8076-db47-ef9bf368f384", "Tejo", "I"],
        ["f94c3b30-42be-e959-889c-5aa313dba261", "Raze", "D"],
        ["22697a3d-45bf-8dd7-4fec-84a9e28c69d7", "Chamber", "S"],
        ["601dbbe7-43ce-be57-2a40-4abd24953621", "KAY/O", "I"],
        ["6f2a04ca-43e0-be17-7f36-b3908627744d", "Skye", "I"],
        ["117ed9e3-49f3-6512-3ccf-0cada7e3823b", "Cypher", "S"],
        ["320b2a48-4d9b-a075-30f1-1f93a9b638fa", "Sova", "I"],
        ["7c8a4701-4de6-9355-b254-e09bc2a34b72", "Miks", "C"],
        ["1e58de9c-4950-5125-93e9-a0aee9f98746", "Killjoy", "S"],
        ["95b78ed7-4637-86d9-7e41-71ba8c293152", "Harbor", "C"],
        ["efba5359-4016-a1e5-7626-b1ae76895940", "Vyse", "S"],
        ["707eab51-4836-f488-046a-cda6bf494859", "Viper", "C"],
        ["eb93336a-449b-9c1b-0a54-a891f7921d69", "Phoenix", "D"],
        ["92eeef5d-43b5-1d4a-8d03-b3927a09034b", "Veto", "S"],
        ["41fb69c1-4189-7b37-f117-bcaf1e96f1bf", "Astra", "C"],
        ["9f0d8ba9-4140-b941-57d3-a7ad57c6b417", "Brimstone", "C"],
        ["0e38b510-41a8-5780-5e8f-568b2a4f2d6c", "Iso", "D"],
        ["1dbf2edd-4729-0984-3115-daa5eed44993", "Clove", "C"],
        ["bb2a4828-46eb-8cd1-e765-15848195d751", "Neon", "D"],
        ["7f94d92c-4234-0a36-9646-3a87eb8b5c89", "Yoru", "D"],
        ["df1cb487-4902-002e-5c17-d28e83e78588", "Waylay", "D"],
        ["569fdd95-4d10-43ab-ca70-79becc718b46", "Sage", "S"],
        ["a3bfb853-43b2-7238-a4f1-ad90e9e46bcc", "Reyna", "D"],
        ["8e253930-4c05-31dd-1b6c-968525494517", "Omen", "C"],
        ["add6443a-41bd-e414-f6ad-e58d267f4e95", "Jett", "D"],
    ];

    // uuid, nome, categoria
    const WEAPON_ROWS = [
        ["63e6c2b6-4a8e-869c-3d4c-e38355226584", "Odin", "heavies"],
        ["55d8a0f4-4274-ca67-fe2c-06ab45efdf58", "Ares", "heavies"],
        ["9c82e19d-4575-0200-1a81-3eacf00cf872", "Vandal", "rifles"],
        ["ae3de142-4d85-2547-dd26-4e90bed35cf7", "Bulldog", "rifles"],
        ["ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a", "Phantom", "rifles"],
        ["ec845bf4-4f79-ddda-a3da-0db3774b2794", "Judge", "shotguns"],
        ["910be174-449b-c412-ab22-d0873436b21b", "Bucky", "shotguns"],
        ["44d4e95c-4157-0037-81b2-17841bf2e8e3", "Frenzy", "pistols"],
        ["29a0cfab-485b-f5d5-779a-b59f85e204a8", "Classic", "pistols"],
        ["410b2e0b-4ceb-1321-1727-20858f7f3477", "Bandit", "pistols"],
        ["1baa85b4-4c70-1284-64bb-6481dfc3bb4e", "Ghost", "pistols"],
        ["e336c6b8-418d-9340-d77f-7a9e4cfe0702", "Sheriff", "pistols"],
        ["42da8ccc-40d5-affc-beec-15aa47b42eda", "Shorty", "pistols"],
        ["a03b24d3-4319-996d-0f8c-94bbfba1dfc7", "Operator", "snipers"],
        ["4ade7faa-4cf1-8376-95ef-39884480959b", "Guardian", "rifles"],
        ["5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c", "Outlaw", "snipers"],
        ["c4883e50-4494-202c-3ec3-6b8a9284f00b", "Marshal", "snipers"],
        ["462080d1-4035-2937-7c09-27aa2a5c27a7", "Spectre", "smgs"],
        ["f7e1b454-4ad4-1063-ec0a-159e56b58941", "Stinger", "smgs"],
        ["2f59173c-4bed-b6c3-2191-dea9b58be9c7", "Confronto", "melee"],
    ];

    VR.OFFLINE_AGENTS = AGENT_ROWS.map(([uuid, name, role]) => VR.makeAgent(uuid, name, R[role]));
    VR.OFFLINE_WEAPONS = WEAPON_ROWS.map(([uuid, name, cat]) => VR.makeWeapon(uuid, name, cat)).concat(VR.EXTRA_WEAPONS);
})(typeof window !== "undefined" ? window : globalThis);
