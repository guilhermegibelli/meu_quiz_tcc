# Meu Quiz — Jogo Educacional para o Ensino de Gerência de Projetos

Aplicação web educacional que integra a simulação do gerenciamento de uma empresa de Tecnologia da Informação (TI) a um sistema de quizzes interativos. O projeto foi desenvolvido como **Trabalho de Conclusão de Curso (TCC)** para apoiar o ensino da disciplina de **Gerência de Projetos**, permitindo que o professor crie atividades avaliativas e o estudante responda às questões enquanto gerencia uma equipe e resolve chamados técnicos.

* **Curso:** Bacharelado em Engenharia de Computação — Faculdade de Ciências Exatas e Tecnologia (FACET)
* **Instituição:** Universidade Federal da Grande Dourados (UFGD)
* **Autores:** Guilherme Manuel dos Santos Gibelli e Kethlyn Rayane C. Ferreira
* **Orientação:** Prof. Dr. Felipe Jose Carbone
* **Ano:** 2026

---

## Visão Geral e Funcionalidades

O sistema é dividido em dois ambientes integrados que se comunicam em tempo real por meio do banco de dados:

1. **Prancheta do Professor (Módulo Docente):** Permite criar projetos avaliativos, elaborar perguntas em três formatos (*Múltipla Escolha*, *Arrastar/Ordenar Blocos* e *Questão Aberta*), gerar um link exclusivo para a turma e acompanhar o ranking e as respostas enviadas pelos estudantes.
2. **Simulação do Escritório (Ambiente do Estudante):** O aluno acessa o jogo pelo link compartilhado, passa por um tutorial inicial, escolhe 4 funcionários com diferentes especialidades e administra o expediente (08h00 às 18h00). Durante a partida, precisa alocar chamados técnicos (*tickets*), monitorar a energia da equipe, lidar com eventos aleatórios e responder às questões propostas ao final de cada dia simulado para ganhar dinheiro virtual e multiplicadores de desempenho.

---

## Tecnologias Utilizadas

* **Front-end:** React, JSX, JavaScript (ES6+), HTML5 e CSS3
* **Ferramentas de Build e Qualidade de Código:** Vite e Oxlint
* **Back-end e Banco de Dados:** Supabase (PostgreSQL e APIs em tempo real)
* **Hospedagem (Deploy):** Vercel

---

## Navegando pelo Repositório

O código-fonte da aplicação está concentrado dentro da pasta [`meu-quiz/`](./meu-quiz/). Abaixo está a organização completa de pastas e arquivos para facilitar a leitura e avaliação do código:

```text
meu-quiz/
├── public/                   # Arquivos estáticos públicos servidos diretamente sem processamento
├── src/
│   ├── CSS/                  # Folhas de estilo (CSS3) das páginas, telas do jogo e componentes
│   ├── assets/               # Imagens, ícones e recursos visuais utilizados na interface
│   ├── main.jsx              # Ponto de entrada: inicializa e renderiza a aplicação React no DOM
│   ├── App.jsx               # Roteamento principal: alterna entre a visão do professor e a do aluno
│   │
│   ├── # --- Módulo do Professor ---
│   ├── PaginaProfessor.jsx   # Painel docente para listar, criar, compartilhar e excluir quizzes
│   ├── ConstrutorBlocos.jsx  # Interface de montagem e edição das perguntas (pilha de questões)
│   ├── ModalResultados.jsx   # Modal de visualização das respostas dos alunos e métricas da turma
│   │
│   ├── # --- Módulo do Estudante e Mecânicas do Jogo ---
│   ├── PaginaAluno.jsx       # Carrega os dados do quiz pelo ID da URL e gerencia o fluxo do aluno
│   ├── FaseLogin.jsx         # Tela de identificação/entrada do estudante antes de iniciar a partida
│   ├── FaseTutorial.jsx      # Tutorial interativo explicando as regras e mecânicas do escritório
│   ├── JogoGerencia.jsx      # Núcleo da simulação (expediente, funcionários, tickets, energia e quiz diário)
│   ├── QuestaoArrastar.jsx   # Componente de interação drag-and-drop para questões de ordenar blocos
│   ├── EventoAleatorio.jsx   # Gerador e exibição de imprevistos/eventos durante o expediente
│   │
│   ├── # --- Recursos Visuais e Integração ---
│   ├── BonecosEscritorio.jsx # Ilustrações vetoriais (SVG) dos personagens e funcionários do jogo
│   ├── IconesLapis.jsx       # Biblioteca de ícones personalizados da interface
│   └── supabaseClient.js     # Configuração e instância de conexão com o banco de dados Supabase
│
├── index.html                # Estrutura HTML base onde a aplicação React é montada
├── package.json              # Lista de dependências, bibliotecas e scripts de execução
└── vite.config.js            # Configurações do bundler e servidor de desenvolvimento Vite
```

---

## Arquitetura e Fluxo de Funcionamento

1. **Inicialização (`main.jsx` → `App.jsx`):** Ao abrir a aplicação, `main.jsx` carrega o componente raiz `App.jsx`, que inspeciona os parâmetros da URL para definir qual ambiente exibir.
2. **Fluxo do Professor (URL sem parâmetro `id`):**
   * `App.jsx` renderiza `PaginaProfessor.jsx` ("Prancheta do Professor"), que consulta os projetos salvos no Supabase.
   * Ao criar ou editar um projeto, `ConstrutorBlocos.jsx` permite adicionar questões em sequência (cada questão corresponde a um dia de simulação no jogo).
   * Ao publicar, o sistema gera um link contendo o identificador único do quiz (`?id=...`). Os resultados da turma podem ser inspecionados em `ModalResultados.jsx`.
3. **Fluxo do Estudante (URL com `?id=...`):**
   * `App.jsx` identifica o parâmetro `id` e direciona para `PaginaAluno.jsx`, que busca as perguntas daquele quiz no Supabase.
   * O estudante informa seus dados em `FaseLogin.jsx`, visualiza as instruções em `FaseTutorial.jsx` e inicia a simulação em `JogoGerencia.jsx`.
   * Durante os dias simulados, componentes auxiliares como `EventoAleatorio.jsx` e `QuestaoArrastar.jsx` dão suporte às dinâmicas de escritório e avaliação. Ao final, o desempenho e as respostas são gravados no Supabase.

---

## Como Executar Localmente

Para rodar o projeto em sua máquina, é necessário ter o **Node.js** e o **npm** instalados. No terminal, a partir da raiz do repositório, execute:

```bash
cd meu-quiz
npm install
npm run dev
```

Após iniciar o servidor, abra no navegador o endereço local exibido no terminal (geralmente `http://localhost:5173`).

### Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento com recarregamento automático |
| `npm run build` | Compila e otimiza a aplicação para produção na pasta `dist/` |
| `npm run preview` | Sobe um servidor local para testar a versão gerada pelo `build` |
| `npm run lint` | Executa a análise estática de qualidade e padronização do código com **Oxlint** |

---

## Configuração do Banco de Dados (Supabase)

A comunicação com o back-end é centralizada em `src/supabaseClient.js`. A aplicação utiliza duas tabelas principais no PostgreSQL do Supabase:

* **`quizzes`:** Armazena os projetos criados pelos professores, títulos e a estrutura das questões.
* **`respostas`:** Registra as submissões, pontuações e respostas dos estudantes vinculadas a cada quiz.

Para executar o sistema conectado a uma nova instância do Supabase, configure a URL do projeto e a chave pública (`anon key`) em `src/supabaseClient.js` e habilite as políticas de segurança (**Row Level Security — RLS**) nas tabelas `quizzes` e `respostas`. Por segurança, nunca insira chaves privadas (`service_role`) no código-fonte ou no repositório.
