/* ==========================================================================
   VALORANT RANDOMIZER - O MOTOR CABULOSO DO SITE
   Tudo feito com muito carinho, cafeína e algumas gambiarras de lei.
   ========================================================================== */

// --- BANCO DE DADOS DE SEGURANÇA (O FAMOSO PLANO B CASO A API CAIA) ---
// Se a API oficial do Valorant der um cano na gente ou faltar internet, esse array salva o rolê.
// Contém os 29 agentes e 21 armas oficiais (incluindo a nova Warden do Patch 13.06).
const OFFLINE_AGENTS = [
    {
        "uuid": "e370fa57-4757-3604-3648-499e1f642d3f",
        "name": "Gekko",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/background.png",
        "isInitial": false
    },
    {
        "uuid": "dade69b4-4f5a-8528-247b-219e5a1facd6",
        "name": "Fade",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/background.png",
        "isInitial": false
    },
    {
        "uuid": "5f8d3a7f-467b-97f3-062c-13acf203c006",
        "name": "Breach",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/5f8d3a7f-467b-97f3-062c-13acf203c006/background.png",
        "isInitial": false
    },
    {
        "uuid": "cc8b64c8-4b25-4ff9-6e7f-37b4da43d235",
        "name": "Deadlock",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/cc8b64c8-4b25-4ff9-6e7f-37b4da43d235/background.png",
        "isInitial": false
    },
    {
        "uuid": "b444168c-4e35-8076-db47-ef9bf368f384",
        "name": "Tejo",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/b444168c-4e35-8076-db47-ef9bf368f384/background.png",
        "isInitial": false
    },
    {
        "uuid": "f94c3b30-42be-e959-889c-5aa313dba261",
        "name": "Raze",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/f94c3b30-42be-e959-889c-5aa313dba261/background.png",
        "isInitial": false
    },
    {
        "uuid": "22697a3d-45bf-8dd7-4fec-84a9e28c69d7",
        "name": "Chamber",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/22697a3d-45bf-8dd7-4fec-84a9e28c69d7/background.png",
        "isInitial": false
    },
    {
        "uuid": "601dbbe7-43ce-be57-2a40-4abd24953621",
        "name": "KAY/O",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/601dbbe7-43ce-be57-2a40-4abd24953621/background.png",
        "isInitial": false
    },
    {
        "uuid": "6f2a04ca-43e0-be17-7f36-b3908627744d",
        "name": "Skye",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/6f2a04ca-43e0-be17-7f36-b3908627744d/background.png",
        "isInitial": false
    },
    {
        "uuid": "117ed9e3-49f3-6512-3ccf-0cada7e3823b",
        "name": "Cypher",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/117ed9e3-49f3-6512-3ccf-0cada7e3823b/background.png",
        "isInitial": false
    },
    {
        "uuid": "320b2a48-4d9b-a075-30f1-1f93a9b638fa",
        "name": "Sova",
        "roleName": "Iniciador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/320b2a48-4d9b-a075-30f1-1f93a9b638fa/background.png",
        "isInitial": true
    },
    {
        "uuid": "7c8a4701-4de6-9355-b254-e09bc2a34b72",
        "name": "Miks",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/7c8a4701-4de6-9355-b254-e09bc2a34b72/background.png",
        "isInitial": false
    },
    {
        "uuid": "1e58de9c-4950-5125-93e9-a0aee9f98746",
        "name": "Killjoy",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/background.png",
        "isInitial": false
    },
    {
        "uuid": "95b78ed7-4637-86d9-7e41-71ba8c293152",
        "name": "Harbor",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/95b78ed7-4637-86d9-7e41-71ba8c293152/background.png",
        "isInitial": false
    },
    {
        "uuid": "efba5359-4016-a1e5-7626-b1ae76895940",
        "name": "Vyse",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/efba5359-4016-a1e5-7626-b1ae76895940/background.png",
        "isInitial": false
    },
    {
        "uuid": "707eab51-4836-f488-046a-cda6bf494859",
        "name": "Viper",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/707eab51-4836-f488-046a-cda6bf494859/background.png",
        "isInitial": false
    },
    {
        "uuid": "eb93336a-449b-9c1b-0a54-a891f7921d69",
        "name": "Phoenix",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/eb93336a-449b-9c1b-0a54-a891f7921d69/background.png",
        "isInitial": true
    },
    {
        "uuid": "92eeef5d-43b5-1d4a-8d03-b3927a09034b",
        "name": "Veto",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/92eeef5d-43b5-1d4a-8d03-b3927a09034b/background.png",
        "isInitial": false
    },
    {
        "uuid": "41fb69c1-4189-7b37-f117-bcaf1e96f1bf",
        "name": "Astra",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/41fb69c1-4189-7b37-f117-bcaf1e96f1bf/background.png",
        "isInitial": false
    },
    {
        "uuid": "9f0d8ba9-4140-b941-57d3-a7ad57c6b417",
        "name": "Brimstone",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/background.png",
        "isInitial": true
    },
    {
        "uuid": "0e38b510-41a8-5780-5e8f-568b2a4f2d6c",
        "name": "Iso",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/0e38b510-41a8-5780-5e8f-568b2a4f2d6c/background.png",
        "isInitial": false
    },
    {
        "uuid": "1dbf2edd-4729-0984-3115-daa5eed44993",
        "name": "Clove",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/1dbf2edd-4729-0984-3115-daa5eed44993/background.png",
        "isInitial": false
    },
    {
        "uuid": "bb2a4828-46eb-8cd1-e765-15848195d751",
        "name": "Neon",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/bb2a4828-46eb-8cd1-e765-15848195d751/background.png",
        "isInitial": false
    },
    {
        "uuid": "7f94d92c-4234-0a36-9646-3a87eb8b5c89",
        "name": "Yoru",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/background.png",
        "isInitial": false
    },
    {
        "uuid": "df1cb487-4902-002e-5c17-d28e83e78588",
        "name": "Waylay",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/df1cb487-4902-002e-5c17-d28e83e78588/background.png",
        "isInitial": false
    },
    {
        "uuid": "569fdd95-4d10-43ab-ca70-79becc718b46",
        "name": "Sage",
        "roleName": "Sentinela",
        "roleIcon": "https://media.valorant-api.com/agents/roles/5fc02f99-4091-4486-a531-98459a3e95e9/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/background.png",
        "isInitial": true
    },
    {
        "uuid": "a3bfb853-43b2-7238-a4f1-ad90e9e46bcc",
        "name": "Reyna",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/background.png",
        "isInitial": false
    },
    {
        "uuid": "8e253930-4c05-31dd-1b6c-968525494517",
        "name": "Omen",
        "roleName": "Controlador",
        "roleIcon": "https://media.valorant-api.com/agents/roles/4ee40330-ecdd-4f2f-98a8-eb1243428373/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/background.png",
        "isInitial": false
    },
    {
        "uuid": "add6443a-41bd-e414-f6ad-e58d267f4e95",
        "name": "Jett",
        "roleName": "Duelista",
        "roleIcon": "https://media.valorant-api.com/agents/roles/dbe8757e-9e92-4ed4-b39f-9dfc589691d4/displayicon.png",
        "displayIcon": "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayicon.png",
        "portrait": "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/fullportrait.png",
        "background": "https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/background.png",
        "isInitial": true
    }
];

const OFFLINE_WEAPONS = [
    {
        "uuid": "63e6c2b6-4a8e-869c-3d4c-e38355226584",
        "name": "Odin",
        "category": "Armas Pesadas (Odin/Ares)",
        "portrait": "https://media.valorant-api.com/weapons/63e6c2b6-4a8e-869c-3d4c-e38355226584/displayicon.png",
        "internalCat": "heavies"
    },
    {
        "uuid": "55d8a0f4-4274-ca67-fe2c-06ab45efdf58",
        "name": "Ares",
        "category": "Armas Pesadas (Odin/Ares)",
        "portrait": "https://media.valorant-api.com/weapons/55d8a0f4-4274-ca67-fe2c-06ab45efdf58/displayicon.png",
        "internalCat": "heavies"
    },
    {
        "uuid": "9c82e19d-4575-0200-1a81-3eacf00cf872",
        "name": "Vandal",
        "category": "Fuzis",
        "portrait": "https://media.valorant-api.com/weapons/9c82e19d-4575-0200-1a81-3eacf00cf872/displayicon.png",
        "internalCat": "rifles"
    },
    {
        "uuid": "ae3de142-4d85-2547-dd26-4e90bed35cf7",
        "name": "Bulldog",
        "category": "Fuzis",
        "portrait": "https://media.valorant-api.com/weapons/ae3de142-4d85-2547-dd26-4e90bed35cf7/displayicon.png",
        "internalCat": "rifles"
    },
    {
        "uuid": "ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a",
        "name": "Phantom",
        "category": "Fuzis",
        "portrait": "https://media.valorant-api.com/weapons/ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a/displayicon.png",
        "internalCat": "rifles"
    },
    {
        "uuid": "ec845bf4-4f79-ddda-a3da-0db3774b2794",
        "name": "Judge",
        "category": "Escopetas",
        "portrait": "https://media.valorant-api.com/weapons/ec845bf4-4f79-ddda-a3da-0db3774b2794/displayicon.png",
        "internalCat": "shotguns"
    },
    {
        "uuid": "910be174-449b-c412-ab22-d0873436b21b",
        "name": "Bucky",
        "category": "Escopetas",
        "portrait": "https://media.valorant-api.com/weapons/910be174-449b-c412-ab22-d0873436b21b/displayicon.png",
        "internalCat": "shotguns"
    },
    {
        "uuid": "44d4e95c-4157-0037-81b2-17841bf2e8e3",
        "name": "Frenzy",
        "category": "Leves / Pistolas",
        "portrait": "https://media.valorant-api.com/weapons/44d4e95c-4157-0037-81b2-17841bf2e8e3/displayicon.png",
        "internalCat": "pistols"
    },
    {
        "uuid": "29a0cfab-485b-f5d5-779a-b59f85e204a8",
        "name": "Classic",
        "category": "Leves / Pistolas",
        "portrait": "https://media.valorant-api.com/weapons/29a0cfab-485b-f5d5-779a-b59f85e204a8/displayicon.png",
        "internalCat": "pistols"
    },
    {
        "uuid": "410b2e0b-4ceb-1321-1727-20858f7f3477",
        "name": "Bandit",
        "category": "Leves / Pistolas",
        "portrait": "https://media.valorant-api.com/weapons/410b2e0b-4ceb-1321-1727-20858f7f3477/displayicon.png",
        "internalCat": "pistols"
    },
    {
        "uuid": "1baa85b4-4c70-1284-64bb-6481dfc3bb4e",
        "name": "Ghost",
        "category": "Leves / Pistolas",
        "portrait": "https://media.valorant-api.com/weapons/1baa85b4-4c70-1284-64bb-6481dfc3bb4e/displayicon.png",
        "internalCat": "pistols"
    },
    {
        "uuid": "e336c6b8-418d-9340-d77f-7a9e4cfe0702",
        "name": "Sheriff",
        "category": "Leves / Pistolas",
        "portrait": "https://media.valorant-api.com/weapons/e336c6b8-418d-9340-d77f-7a9e4cfe0702/displayicon.png",
        "internalCat": "pistols"
    },
    {
        "uuid": "42da8ccc-40d5-affc-beec-15aa47b42eda",
        "name": "Shorty",
        "category": "Leves / Pistolas",
        "portrait": "https://media.valorant-api.com/weapons/42da8ccc-40d5-affc-beec-15aa47b42eda/displayicon.png",
        "internalCat": "pistols"
    },
    {
        "uuid": "a03b24d3-4319-996d-0f8c-94bbfba1dfc7",
        "name": "Operator",
        "category": "Fuzis de Precisão (Snipers)",
        "portrait": "https://media.valorant-api.com/weapons/a03b24d3-4319-996d-0f8c-94bbfba1dfc7/displayicon.png",
        "internalCat": "snipers"
    },
    {
        "uuid": "4ade7faa-4cf1-8376-95ef-39884480959b",
        "name": "Guardian",
        "category": "Fuzis",
        "portrait": "https://media.valorant-api.com/weapons/4ade7faa-4cf1-8376-95ef-39884480959b/displayicon.png",
        "internalCat": "rifles"
    },
    {
        "uuid": "5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c",
        "name": "Outlaw",
        "category": "Fuzis de Precisão (Snipers)",
        "portrait": "https://media.valorant-api.com/weapons/5f0aaf7a-4289-3998-d5ff-eb9a5cf7ef5c/displayicon.png",
        "internalCat": "snipers"
    },
    {
        "uuid": "c4883e50-4494-202c-3ec3-6b8a9284f00b",
        "name": "Marshal",
        "category": "Fuzis de Precisão (Snipers)",
        "portrait": "https://media.valorant-api.com/weapons/c4883e50-4494-202c-3ec3-6b8a9284f00b/displayicon.png",
        "internalCat": "snipers"
    },
    {
        "uuid": "462080d1-4035-2937-7c09-27aa2a5c27a7",
        "name": "Spectre",
        "category": "Submetralhadoras (SMGs)",
        "portrait": "https://media.valorant-api.com/weapons/462080d1-4035-2937-7c09-27aa2a5c27a7/displayicon.png",
        "internalCat": "smgs"
    },
    {
        "uuid": "f7e1b454-4ad4-1063-ec0a-159e56b58941",
        "name": "Stinger",
        "category": "Submetralhadoras (SMGs)",
        "portrait": "https://media.valorant-api.com/weapons/f7e1b454-4ad4-1063-ec0a-159e56b58941/displayicon.png",
        "internalCat": "smgs"
    },
    {
        "uuid": "2f59173c-4bed-b6c3-2191-dea9b58be9c7",
        "name": "Confronto",
        "category": "Confronto",
        "portrait": "https://media.valorant-api.com/weapons/2f59173c-4bed-b6c3-2191-dea9b58be9c7/displayicon.png",
        "internalCat": "melee"
    },
    {
        "uuid": "warden-patch-13-06",
        "name": "Warden",
        "category": "Fuzis",
        "portrait": "https://valorantstrike.com/cms-media/2c6f2b70-160f-4791-bddb-f0a3f76aecb6.jpg",
        "internalCat": "rifles"
    }
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

    // Puxa tudo das APIs oficiais do Valorant em pt-BR silenciosamente em segundo plano
    await fetchValorantData();
    
    // Agora que temos os agentes carregados, garante que o Jogador 1 comece com TODOS liberados no pool dele
    initializeDefaultPools();

    // Roda a atualização visual inicial na tela pra desenhar os inputs do Jogador 1
    updatePlayerInputs('agents');
    updatePlayerInputs('weapons');
});

// --- COMUNICADOR DE APIs DO VALORANT ---
// Puxa tudo em pt-BR direto da fonte. Se a internet estiver ruim, cai no cache ou offline liso.
async function fetchValorantData() {
    try {
        // 1. Puxa os Agentes jogáveis oficiais
        const agentsResponse = await fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=pt-BR");
        if (!agentsResponse.ok) throw new Error(`API de Agentes retornou status ${agentsResponse.status}`);
        const agentsData = await agentsResponse.json();
        
        // Mapeia os dados da API pra nossa estrutura
        allAgents = agentsData.data.map(agent => ({
            uuid: agent.uuid,
            name: agent.displayName,
            roleName: agent.role ? agent.role.displayName : "Sem Função",
            roleIcon: agent.role ? agent.role.displayIcon : "",
            displayIcon: agent.displayIcon || agent.displayIconSmall || "",
            portrait: agent.fullPortrait || agent.displayIcon || "",
            background: agent.background || "",
            isInitial: ["Jett", "Phoenix", "Sage", "Sova", "Brimstone"].includes(agent.displayName),
            releaseDate: agent.releaseDate || ""
        }));

        // 2. Puxa as Armas oficiais
        const weaponsResponse = await fetch("https://valorant-api.com/v1/weapons?language=pt-BR");
        if (!weaponsResponse.ok) throw new Error(`API de Armas retornou status ${weaponsResponse.status}`);
        const weaponsData = await weaponsResponse.json();

        // Mapeia as armas oficiais da API
        allWeapons = weaponsData.data.map(weapon => {
            let internalCat = "melee";
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

        // Caso a API pública (valorant-api.com) ainda esteja na versão 13.05 e não tenha catalogado a Warden recém-lançada no Patch 13.06:
        const hasWarden = allWeapons.some(w => w.name.toLowerCase() === "warden");
        if (!hasWarden) {
            allWeapons.push({
                uuid: "warden-patch-13-06",
                name: "Warden",
                category: "Fuzis",
                portrait: "https://valorantstrike.com/cms-media/2c6f2b70-160f-4791-bddb-f0a3f76aecb6.jpg",
                internalCat: "rifles"
            });
        }

        // Salva cache no localStorage para velocidade e resiliência offline
        try {
            localStorage.setItem("valorant_cache_agents", JSON.stringify(allAgents));
            localStorage.setItem("valorant_cache_weapons", JSON.stringify(allWeapons));
            localStorage.setItem("valorant_cache_time", Date.now().toString());
        } catch (e) {
            console.warn("Não foi possível salvar cache no localStorage:", e);
        }

        console.log(`Sucesso! Carregados ${allAgents.length} agentes e ${allWeapons.length} armas do Valorant.`);

    } catch (error) {
        console.warn("Aviso: Falha ao consultar a API online do Valorant. Verificando cache local...", error);
        
        let loadedFromCache = false;
        try {
            const storedAgents = localStorage.getItem("valorant_cache_agents");
            const storedWeapons = localStorage.getItem("valorant_cache_weapons");
            if (storedAgents && storedWeapons) {
                allAgents = JSON.parse(storedAgents);
                allWeapons = JSON.parse(storedWeapons);
                loadedFromCache = true;
            }
        } catch (e) {
            console.error("Erro ao ler cache local:", e);
        }

        if (loadedFromCache && allAgents.length > 0 && allWeapons.length > 0) {
            // Garante que a Warden também esteja presente se o cache for de uma versão anterior
            if (!allWeapons.some(w => w.name.toLowerCase() === "warden")) {
                allWeapons.push({
                    uuid: "warden-patch-13-06",
                    name: "Warden",
                    category: "Fuzis",
                    portrait: "https://valorantstrike.com/cms-media/2c6f2b70-160f-4791-bddb-f0a3f76aecb6.jpg",
                    internalCat: "rifles"
                });
            }
            console.log(`Carregados ${allAgents.length} agentes e ${allWeapons.length} armas do cache local.`);
        } else {
            // Fallback seguro usando o banco de emergência
            allAgents = [...OFFLINE_AGENTS];
            allWeapons = [...OFFLINE_WEAPONS];
            console.log(`Carregados ${allAgents.length} agentes e ${allWeapons.length} armas do banco de emergência.`);
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
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

    const tabBtn = document.getElementById(`tab-${tab}`);
    const sectionEl = document.getElementById(`section-${tab}`);
    if (tabBtn) tabBtn.classList.add("active");
    if (sectionEl) sectionEl.classList.add("active");
}

// --- GERENCIADOR DE INPUTS DE JOGADORES (DINÂMICO) ---
// Sincroniza a quantidade de jogadores e nomes em ambas as abas de forma automática
function updatePlayerInputs(triggerTab) {
    const countSelect = document.getElementById(`${triggerTab}-player-count`);
    if (!countSelect) return;
    const newCount = parseInt(countSelect.value, 10);

    const otherTab = triggerTab === "agents" ? "weapons" : "agents";
    const otherSelect = document.getElementById(`${otherTab}-player-count`);
    if (otherSelect) {
        otherSelect.value = newCount;
    }

    const currentCount = players.length;
    if (newCount > currentCount) {
        for (let i = currentCount; i < newCount; i++) {
            players.push({
                id: i,
                name: `Jogador ${i + 1}`,
                role: "ANY",
                pool: new Set(allAgents.map(a => a.uuid))
            });
        }
    } else if (newCount < currentCount) {
        players.splice(newCount);
    }

    renderAgentsPlayerInputs();
    renderWeaponsPlayerInputs();
}

// Desenha a listagem de cards de setups de agentes
function renderAgentsPlayerInputs() {
    const listContainer = document.getElementById("agents-players-list");
    if (!listContainer) return;

    listContainer.innerHTML = "";

    players.forEach((player, index) => {
        const card = document.createElement("div");
        card.className = "player-input-card";

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
    const finalValue = value.trim() === "" ? `Jogador ${index + 1}` : value;
    players[index].name = finalValue;

    const inputs = document.querySelectorAll(`input[data-player-id="${index}"]`);
    inputs.forEach(input => {
        if (document.activeElement !== input) {
            input.value = value;
        }
    });
}

// Sincroniza a função/categoria selecionada pelo jogador na memória
function syncPlayerRole(index, value) {
    players[index].role = value;
}

// --- MODAL DE SELEÇÃO DE POOL DE AGENTES DO JOGADOR ---
function openAgentModal(playerId) {
    currentConfigPlayerId = playerId;
    const player = players[playerId];
    
    document.getElementById("modal-player-name").textContent = player.name;
    renderAgentSelectorGrid(player);
    document.getElementById("modal-agent-config").classList.add("active");
}

function closeAgentModal() {
    document.getElementById("modal-agent-config").classList.remove("active");
    currentConfigPlayerId = null;
}

// Desenha todos os agentes disponíveis no grid do modal com seus ícones de cabeça (displayIcon)
function renderAgentSelectorGrid(player) {
    const gridContainer = document.getElementById("agent-selector-grid");
    if (!gridContainer) return;

    gridContainer.innerHTML = "";

    const sortedAgents = [...allAgents].sort((a, b) => a.name.localeCompare(b.name));

    const filteredAgents = sortedAgents.filter(agent => {
        return player.role === 'ANY' || agent.roleName.toUpperCase() === player.role.toUpperCase();
    });

    filteredAgents.forEach(agent => {
        const isChecked = player.pool.has(agent.uuid);
        
        const card = document.createElement("div");
        card.className = `agent-checkbox-card ${isChecked ? 'checked' : ''}`;
        card.id = `modal-agent-card-${agent.uuid}`;
        
        const iconSrc = agent.displayIcon || agent.portrait || "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png";

        card.innerHTML = `
            <input type="checkbox" id="chk-agent-${agent.uuid}" ${isChecked ? 'checked' : ''} onchange="toggleAgentInModal('${agent.uuid}')">
            <img src="${iconSrc}" class="agent-checkbox-icon" alt="${agent.name}" loading="lazy" onerror="this.src='https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/displayicon.png'">
            <span class="agent-checkbox-name">${agent.name}</span>
        `;
        
        card.addEventListener("click", (e) => {
            if (e.target.tagName !== "INPUT") {
                const chk = card.querySelector("input");
                if (chk) {
                    chk.checked = !chk.checked;
                    toggleAgentInModal(agent.uuid);
                }
            }
        });

        gridContainer.appendChild(card);
    });
}

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

function setInitialAgents() {
    const grid = document.getElementById("agent-selector-grid");
    if (!grid) return;

    setAllAgents(false);

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

function saveAgentConfig() {
    if (currentConfigPlayerId === null) return;
    
    const player = players[currentConfigPlayerId];
    
    const grid = document.getElementById("agent-selector-grid");
    if (grid) {
        const inputs = grid.querySelectorAll("input[type='checkbox']");
        inputs.forEach(input => {
            const agentUuid = input.id.replace("chk-agent-", "");
            if (input.checked) {
                player.pool.add(agentUuid);
            } else {
                player.pool.delete(agentUuid);
            }
        });
    }

    const poolAgents = Array.from(player.pool).map(uuid => allAgents.find(a => a.uuid === uuid)).filter(Boolean);
    const matchesSelectedRole = poolAgents.filter(agent => {
        return player.role === 'ANY' || agent.roleName.toUpperCase() === player.role.toUpperCase();
    });

    if (matchesSelectedRole.length === 0) {
        const defaultAgent = allAgents.find(agent => {
            return player.role === 'ANY' || agent.roleName.toUpperCase() === player.role.toUpperCase();
        });
        if (defaultAgent) {
            player.pool.add(defaultAgent.uuid);
            alert(`Epa! Você desmarcou todos os agentes da função "${player.role}". Habilitamos o ${defaultAgent.name} por segurança para o sorteio funcionar.`);
        }
    }

    renderAgentsPlayerInputs();
    closeAgentModal();
}

// --- ALGORITMO BACKTRACKING DA EQUIPE (CONSTRAINT SATISFACTION PROBLEM) ---
function solveAgentAssignments(playersList, availableAgents, playerIdx, currentAssignments, usedUuids) {
    if (playerIdx === playersList.length) {
        return currentAssignments;
    }

    const player = playersList[playerIdx];

    let candidates = availableAgents.filter(agent => {
        const inPool = player.pool.has(agent.uuid);
        const matchesRole = player.role === "ANY" || 
            agent.roleName.toUpperCase() === player.role.toUpperCase();
        const notUsedYet = !usedUuids.has(agent.uuid);

        return inPool && matchesRole && notUsedYet;
    });

    candidates = shuffleArray([...candidates]);

    for (const agent of candidates) {
        usedUuids.add(agent.uuid);
        currentAssignments[playerIdx] = agent;

        const solution = solveAgentAssignments(playersList, availableAgents, playerIdx + 1, currentAssignments, usedUuids);
        if (solution !== null) {
            return solution;
        }

        usedUuids.delete(agent.uuid);
        currentAssignments[playerIdx] = null;
    }

    return null;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- SISTEMA DE ANIMAÇÃO DE SORTEIO ---
function randomizeAgents() {
    if (isRaffling) return;
    
    const resultsContainer = document.getElementById("agents-results");
    if (!resultsContainer) return;

    const finalAssignments = solveAgentAssignments(players, allAgents, 0, new Array(players.length).fill(null), new Set());

    if (finalAssignments === null) {
        alert("Ih, rapaz! Não deu pra sortear uma combinação válida com essas restrições. Tente liberar mais agentes no botão de engrenagem ⚙️ de cada jogador ou mude as funções!");
        return;
    }

    isRaffling = true;
    resultsContainer.classList.remove("empty");
    resultsContainer.classList.add("raf-active");

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1400;

    const animInterval = setInterval(() => {
        resultsContainer.innerHTML = "";
        
        players.forEach((player, index) => {
            const poolArray = Array.from(player.pool).map(uuid => allAgents.find(a => a.uuid === uuid)).filter(Boolean);
            const randomAgent = poolArray.length > 0 
                ? poolArray[Math.floor(Math.random() * poolArray.length)] 
                : allAgents[Math.floor(Math.random() * allAgents.length)];
            
            resultsContainer.appendChild(createAgentCardHTML(index, randomAgent, true));
        });

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            clearInterval(animInterval);
            resultsContainer.classList.remove("raf-active");
            
            renderFinalAgents(finalAssignments);
            isRaffling = false;
        }
    }, intervalTime);
}

function renderFinalAgents(assignments) {
    const resultsContainer = document.getElementById("agents-results");
    if (!resultsContainer) return;

    resultsContainer.innerHTML = "";
    
    assignments.forEach((agent, index) => {
        const player = players[index];
        player.currentAgent = agent;
        resultsContainer.appendChild(createAgentCardHTML(index, agent));
    });
}

function createAgentCardHTML(playerIdx, agent, isRerolling = false) {
    const player = players[playerIdx];
    const card = document.createElement("div");
    card.className = "result-card animate-pop-in";
    card.id = `agent-result-card-${playerIdx}`;

    const bgUrl = agent.background || "";
    const portraitUrl = agent.portrait || agent.displayIcon || "https://media.valorant-api.com/agents/7f94d92c-4234-0a36-9646-3a87eb8b5c89/fullportrait.png";
    const roleIconUrl = agent.roleIcon || "";

    const rerollButtonHTML = isRerolling ? "" : `<button class="btn-reroll" onclick="rerollSingleAgent(${playerIdx})" title="Sortear novamente apenas este jogador">🔄</button>`;

    card.innerHTML = `
        ${rerollButtonHTML}
        ${bgUrl ? `<img src="${bgUrl}" class="card-agent-bg" alt="" loading="lazy">` : ""}
        <img src="${portraitUrl}" class="card-agent-portrait" alt="${agent.name}" loading="lazy" onerror="this.src='${agent.displayIcon}'">
        
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
function randomizeWeapons() {
    if (isRaffling) return;

    const resultsContainer = document.getElementById("weapons-results");
    if (!resultsContainer) return;

    const allowedCategories = [];
    if (document.getElementById("weapon-cat-pistols")?.checked) allowedCategories.push("pistols");
    if (document.getElementById("weapon-cat-smgs")?.checked) allowedCategories.push("smgs");
    if (document.getElementById("weapon-cat-shotguns")?.checked) allowedCategories.push("shotguns");
    if (document.getElementById("weapon-cat-rifles")?.checked) allowedCategories.push("rifles");
    if (document.getElementById("weapon-cat-snipers")?.checked) allowedCategories.push("snipers");
    if (document.getElementById("weapon-cat-heavies")?.checked) allowedCategories.push("heavies");
    if (document.getElementById("weapon-cat-melee")?.checked) allowedCategories.push("melee");

    if (allowedCategories.length === 0) {
        alert("Opa, meu consagrado! Marque pelo menos uma categoria de arma para realizar o sorteio.");
        return;
    }

    const candidates = allWeapons.filter(w => allowedCategories.includes(w.internalCat));

    if (candidates.length === 0) {
        alert("Nenhuma arma encontrada nas categorias selecionadas!");
        return;
    }

    isRaffling = true;
    resultsContainer.classList.remove("empty");
    resultsContainer.classList.add("raf-active");

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1400;

    const animInterval = setInterval(() => {
        resultsContainer.innerHTML = "";

        players.forEach((player, index) => {
            const randomWeapon = candidates[Math.floor(Math.random() * candidates.length)];
            resultsContainer.appendChild(createWeaponCardHTML(index, randomWeapon, true));
        });

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            clearInterval(animInterval);
            resultsContainer.classList.remove("raf-active");

            resultsContainer.innerHTML = "";
            players.forEach((player, index) => {
                const finalWeapon = candidates[Math.floor(Math.random() * candidates.length)];
                player.currentWeapon = finalWeapon;
                resultsContainer.appendChild(createWeaponCardHTML(index, finalWeapon));
            });

            isRaffling = false;
        }
    }, intervalTime);
}

function createWeaponCardHTML(playerIdx, weapon, isRerolling = false) {
    const player = players[playerIdx];
    const card = document.createElement("div");
    card.className = "weapon-card animate-pop-in";
    card.id = `weapon-result-card-${playerIdx}`;

    const portraitUrl = weapon.portrait || "";
    const rerollButtonHTML = isRerolling ? "" : `<button class="btn-reroll" onclick="rerollSingleWeapon(${playerIdx})" title="Sortear novamente apenas esta arma">🔄</button>`;

    card.innerHTML = `
        ${rerollButtonHTML}
        <div class="card-player-badge">
            <div class="card-player-label">Jogador ${playerIdx + 1}</div>
            <div class="card-player-name">${player.name}</div>
        </div>
        
        <div class="card-weapon-portrait-container">
            <img src="${portraitUrl}" class="card-weapon-portrait" alt="${weapon.name}" loading="lazy">
        </div>
        
        <div class="card-agent-details">
            <div class="card-weapon-category">${weapon.category}</div>
            <div class="card-weapon-name">${weapon.name}</div>
        </div>
    `;
    return card;
}

// --- SORTEIO INDIVIDUAL DE UM JOGADOR (AGENTE) ---
function rerollSingleAgent(playerIdx) {
    if (isRaffling) return;

    const player = players[playerIdx];
    const cardEl = document.getElementById(`agent-result-card-${playerIdx}`);
    if (!cardEl) return;

    const usedUuids = new Set();
    players.forEach((p, idx) => {
        if (idx !== playerIdx && p.currentAgent) {
            usedUuids.add(p.currentAgent.uuid);
        }
    });

    const candidates = allAgents.filter(agent => {
        const inPool = player.pool.has(agent.uuid);
        const matchesRole = player.role === "ANY" || 
            agent.roleName.toUpperCase() === player.role.toUpperCase();
        const notUsed = !usedUuids.has(agent.uuid);
        return inPool && matchesRole && notUsed;
    });

    if (candidates.length === 0) {
        alert(`Ih, rapaz! Não sobrou nenhum agente disponível no pool de ${player.name} que atenda à função de ${player.role} e não esteja sendo usado por outros jogadores!`);
        return;
    }

    const finalAgent = shuffleArray([...candidates])[0];

    isRaffling = true;
    cardEl.classList.add("raf-active");

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1000;

    const poolArray = Array.from(player.pool).map(uuid => allAgents.find(a => a.uuid === uuid)).filter(Boolean);

    const animInterval = setInterval(() => {
        const tempAgent = poolArray.length > 0 
            ? poolArray[Math.floor(Math.random() * poolArray.length)] 
            : allAgents[Math.floor(Math.random() * allAgents.length)];
            
        const tempCard = createAgentCardHTML(playerIdx, tempAgent, true);
        cardEl.innerHTML = tempCard.innerHTML;

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            clearInterval(animInterval);
            cardEl.classList.remove("raf-active");

            player.currentAgent = finalAgent;
            const finalCard = createAgentCardHTML(playerIdx, finalAgent, false);
            cardEl.innerHTML = finalCard.innerHTML;

            isRaffling = false;
        }
    }, intervalTime);
}

// --- SORTEIO INDIVIDUAL DE UMA ARMA ---
function rerollSingleWeapon(playerIdx) {
    if (isRaffling) return;

    const player = players[playerIdx];
    const cardEl = document.getElementById(`weapon-result-card-${playerIdx}`);
    if (!cardEl) return;

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

    const finalWeapon = candidates[Math.floor(Math.random() * candidates.length)];

    isRaffling = true;
    cardEl.classList.add("raf-active");

    let elapsed = 0;
    const intervalTime = 80;
    const totalTime = 1000;

    const animInterval = setInterval(() => {
        const tempWeapon = candidates[Math.floor(Math.random() * candidates.length)];
        const tempCard = createWeaponCardHTML(playerIdx, tempWeapon, true);
        cardEl.innerHTML = tempCard.innerHTML;

        elapsed += intervalTime;
        if (elapsed >= totalTime) {
            clearInterval(animInterval);
            cardEl.classList.remove("raf-active");

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

function openProfileModal(playerIdx) {
    currentConfigPlayerId = playerIdx;
    
    const input = document.getElementById("profile-name-input");
    if (input) input.value = "";
    
    renderProfileList();
    document.getElementById("modal-profile-config").classList.add("active");
}

function closeProfileModal() {
    document.getElementById("modal-profile-config").classList.remove("active");
    currentConfigPlayerId = null;
}

function loadProfilesFromStorage() {
    try {
        const stored = localStorage.getItem("valorant_profiles");
        return stored ? JSON.parse(stored) : {};
    } catch (e) {
        console.error("Erro ao parsear perfis no localStorage:", e);
        return {};
    }
}

function saveProfilesToStorage(profiles) {
    try {
        localStorage.setItem("valorant_profiles", JSON.stringify(profiles));
    } catch (e) {
        console.error("Ops! Erro ao tentar persistir os perfis no localStorage:", e);
    }
}

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

    const hasAll = player.pool.size >= allAgents.length;

    profiles[profileName] = {
        playerName: player.name,
        role: player.role,
        hasAllAgents: hasAll,
        agentPool: Array.from(player.pool)
    };

    saveProfilesToStorage(profiles);
    profileInput.value = "";
    renderProfileList();
    
    alert(`Perfil "${profileName}" salvo com sucesso! Coisa linda!`);
}

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

function loadProfile(profileName) {
    if (currentConfigPlayerId === null) return;

    const profiles = loadProfilesFromStorage();
    const profile = profiles[profileName];

    if (!profile) return;

    const player = players[currentConfigPlayerId];
    
    if (profile.hasAllAgents) {
        player.pool = new Set(allAgents.map(a => a.uuid));
    } else {
        const validUuids = (profile.agentPool || []).filter(uuid => allAgents.some(a => a.uuid === uuid));
        player.pool = new Set(validUuids);
    }

    if (profile.role) {
        player.role = profile.role;
    } else {
        player.role = "ANY";
    }

    if (player.pool.size === 0) {
        player.pool = new Set(allAgents.map(a => a.uuid));
    }

    renderAgentsPlayerInputs();
    renderWeaponsPlayerInputs();

    closeProfileModal();
    alert(`Configurações de agentes e função do perfil "${profileName}" carregadas com sucesso!`);
}

function deleteProfile(profileName) {
    if (!confirm(`Deseja mesmo chutar o perfil "${profileName}" pra fora?`)) return;

    const profiles = loadProfilesFromStorage();
    delete profiles[profileName];
    saveProfilesToStorage(profiles);
    renderProfileList();
}
