#  VALORANT // RANDOMIZER

> **Gambiarra de elite** pra decidir quem vai jogar com o que naquela gameplay de sexta-feira à noite com o squad!

Esse é um aleatorizador completo, responsivo e ultra-estiloso de agentes e armas do Valorant. Inspirado na identidade visual do jogo, ele conta com efeitos de vidro (glassmorphic cards), brilhos de neon cibernéticos pulsantes no fundo e animações suaves de transição.

Feito do zero com carinho por **LuGoAn(Nekin)**, com uma fenda dimensional holográfica do Yoru no rodapé que muda de cor ao passar o mouse.

---

##  Funcionalidades Cabulosas

1. **Sorteador Inteligente de Agentes (Sem Repetição)**
   - Um resolvedor algorítmico por **Backtracking (CSP - Constraint Satisfaction Problem)** cuida de garantir que **nenhum jogador jogue com o mesmo agente** no time.
   - Cada jogador tem o seu próprio pool personalizado! Clicando no botão de engrenagem `⚙️`, você define exatamente quais bonecos aquele jogador tem liberados na conta dele.
   - **Filtro Inteligente por Função**: Se o jogador escolheu uma função específica (ex: Duelista), o modal de configuração exibe automaticamente **apenas os agentes daquela função**, facilitando marcar/desmarcar o que ele tem liberado sem bagunçar os agentes de outras funções já configurados na memória.
   - O jogador pode escolher uma função/categoria específica (como Duelista, Sentinela, Iniciador ou Controlador) diretamente por um dropdown. O algoritmo quebra a cabeça por trás dos panos para satisfazer as restrições de todo mundo.

2. **Gerenciamento de Perfis Salvos (👤)**
   - Um botão com o ícone de silhueta `👤` antes do número de cada jogador permite acessar o gerenciador de perfis.
   - Você pode salvar as configurações atuais daquele jogador (seu nome e pool de agentes personalizado) com um nome único.
   - Os dados são salvos diretamente no **localStorage** do seu navegador, então você não precisa configurar o pool de agentes dos seus amigos toda vez que abrir o site! Basta carregar o perfil de cada um e mandar bala.

3. **Sorteador de Armas de Elite (Sem Preços)**
   - Distribui armas aleatoriamente para o time (aqui repetição é liberada, pois todos podem jogar de Vandal ou de Ghost!).
   - Layout super limpo e premium que foca inteiramente na arma e na arte, omitindo os preços e créditos das armas.
   - Filtros de categorias globais de armas permitidas na partida (Pistolas, SMGs, Escopetas, Fuzis, Snipers, Pesadas e Confronto/Faca).

4. **Sincronização Instantânea de Jogadores**
   - Escolha a quantidade de jogadores (de 1 a 5) em qualquer uma das abas. A quantidade e os nomes digitados sincronizam automaticamente na outra aba em tempo real!

5. **Resiliência Infinita (Offline Fallback)**
   - Puxa dados atualizados e em tempo real em português (`pt-BR`) da API pública oficial do Valorant (`valorant-api.com`).
   - Se o servidor estiver fora do ar ou o usuário estiver sem internet, o site ativa automaticamente um banco de dados offline interno contendo 10 agentes populares e todas as 19 armas de forma 100% silenciosa e sem banners de erro irritantes na tela.

6. **Animação Suspense 1.4s**
   - Ao clicar em gerar, o painel entra no modo de sorteio alternando dezenas de agentes/armas na tela e piscando em neon vermelho durante 1,4 segundos antes de revelar a equipe e o armamento final!

---

##  Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível.
- **Vanilla CSS**: Estilização rica inspirada no jogo (cores carbon, gradients neon, glassmorphic cards, Barlow Condensed, Teko, etc.). Sem frameworks pesados!
- **Pure JavaScript (ES6)**: Algoritmos de backtracking com constraint satisfaction, sincronização dinâmica de DOM, consumo de APIs REST e gerenciamento de loops de animações.

---

##  Estrutura do Projeto

O projeto é mantido com a seguinte estrutura enxuta de arquivos locais:

```text
valorant-randomizer/
├── index.html   # Estrutura visual e modal de configuração
├── styles.css   # O design insano inspirado em Valorant
├── app.js       # O cérebro do site com o solver backtracking e a API
└── README.md    # Esse manual que você está lendo
```

---

##  Como Usar

1. Basta abrir o arquivo `index.html` em qualquer navegador moderno da sua escolha (não precisa de servidores complexos, tudo roda localmente!).
2. **Defina seu time**: Digite os nomes dos seus amigos e selecione as funções que cada um deseja jogar.
3. **Configure os pools**: Caso alguém seja iniciante e não tenha todos os bonecos liberados, clique no botão de engrenagem `⚙️` do jogador correspondente e ative o filtro "Agentes Iniciais" ou selecione manualmente.
4. **Arme-se**: Vá na aba de armas, configure quais armas estão valendo para a rodada e clique em sortear.
5. **Divirta-se!**

---

*VALORANT // RANDOMIZER é um projeto de fãs e não possui filiação direta com a Riot Games. Imagens e dados extraídos de valorant-api.com.*
