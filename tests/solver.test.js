// node tests/solver.test.js
const assert = require("node:assert/strict");
const solver = require("../js/solver.js");

const agent = (uuid, roleId) => ({ uuid, roleId });
const player = (pool, role = "ANY") => ({ pool: new Set(pool), role });

const agents = [
    agent("a", "duelista"),
    agent("b", "duelista"),
    agent("c", "sentinela"),
    agent("d", "controlador"),
    agent("e", "iniciador")
];
const everyone = agents.map(a => a.uuid);

let passed = 0;
function test(name, fn) {
    fn();
    passed++;
    console.log("ok  " + name);
}

test("nunca repete agente, em varias rodadas", () => {
    const players = Array.from({ length: 5 }, () => player(everyone));
    for (let round = 0; round < 200; round++) {
        const result = solver.solve(players, agents);
        assert.equal(new Set(result.map(a => a.uuid)).size, 5);
    }
});

test("respeita pool e funcao de cada jogador", () => {
    const players = [player(everyone, "duelista"), player(["c", "d"]), player(everyone, "controlador")];
    for (let round = 0; round < 200; round++) {
        const [p1, p2, p3] = solver.solve(players, agents);
        assert.equal(p1.roleId, "duelista");
        assert.ok(["c", "d"].includes(p2.uuid));
        assert.equal(p3.uuid, "d");
        assert.notEqual(p2.uuid, "d");
    }
});

test("resolve caso que exige backtracking", () => {
    // se o 1 pegar 'a' primeiro precisa voltar atrás
    const players = [player(["a", "b"]), player(["a"])];
    for (let round = 0; round < 100; round++) {
        const [first, second] = solver.solve(players, agents);
        assert.equal(first.uuid, "b");
        assert.equal(second.uuid, "a");
    }
});

test("retorna null quando e impossivel", () => {
    const players = [player(["a"]), player(["a"])];
    assert.equal(solver.solve(players, agents), null);
});

test("findConflict aponta o grupo problematico", () => {
    const players = [player(["a"]), player(everyone), player(["a"])];
    assert.deepEqual(solver.findConflict(players, agents), { players: [0, 2], available: 1 });
});

test("findConflict acusa jogador sem nenhuma opcao", () => {
    const players = [player(everyone), player(["c"], "duelista")];
    assert.deepEqual(solver.findConflict(players, agents), { players: [1], available: 0 });
});

test("findConflict e null quando existe solucao", () => {
    assert.equal(solver.findConflict([player(everyone), player(["a"])], agents), null);
});

test("rerollCandidates exclui agentes dos outros e o atual", () => {
    const players = [player(everyone), player(everyone), player(everyone)];
    const assigned = [agents[0], agents[1], agents[2]];
    const uuids = solver.rerollCandidates(players, agents, assigned, 1).map(a => a.uuid).sort();
    assert.deepEqual(uuids, ["d", "e"]);
});

test("rerollCandidates fica vazio quando so sobra o agente atual", () => {
    const players = [player(["a"]), player(["b"])];
    assert.equal(solver.rerollCandidates(players, agents, [agents[0], agents[1]], 0).length, 0);
});

console.log(`\n${passed} testes passaram`);
