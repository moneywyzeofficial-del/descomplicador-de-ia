export const defaultFolders = [
  { id: "geral", name: "Geral", icon: "Folder" },
  { id: "modelos-locais", name: "Modelos Locais & Offline", icon: "Cpu" },
  { id: "agentes", name: "Agentes & Automação", icon: "Bot" },
  { id: "interfaces", name: "Interfaces & Apps de Chat", icon: "Layout" },
  { id: "estudo", name: "Para Estudar", icon: "BookOpen" }
];

export const githubPresets = [
  {
    url: "https://github.com/ollama/ollama",
    owner: "ollama",
    repo: "ollama",
    name: "Ollama",
    stars: "120k+",
    language: "Go / C++",
    simpleDescription: "Uma ferramenta que permite instalar e correr modelos de IA (como o Llama 3 ou Mistral) diretamente no teu próprio computador, sem precisar de internet nem pagar subscrições.",
    analogy: "É como ter um motor elétrico portátil na garagem que podes ligar e usar mesmo que falte a eletricidade da rede pública.",
    useCases: [
      "Processar documentos e relatórios confidenciais sem enviar nada para servidores externos.",
      "Experimentar diferentes modelos de IA gratuitamente em casa ou no portátil.",
      "Criar pequenos assistentes locais que funcionam sem ligação à rede."
    ],
    difficulty: "Fácil / Médio",
    folderId: "modelos-locais",
    savedAt: "2026-10-01"
  },
  {
    url: "https://github.com/open-webui/open-webui",
    owner: "open-webui",
    repo: "open-webui",
    name: "Open WebUI",
    stars: "80k+",
    language: "Python / Svelte",
    simpleDescription: "Uma interface visual no navegador igual ao ChatGPT, mas que se conecta aos teus modelos locais do Ollama ou a várias chaves de API.",
    analogy: "É a carroçaria bonita, os bancos confortáveis e o volante do carro onde colocas o motor do Ollama a funcionar.",
    useCases: [
      "Ter um 'ChatGPT privado' no computador com suporte para carregar ficheiros, PDFs e fotos.",
      "Partilhar um assistente de IA na rede de casa ou da oficina com a família ou colegas.",
      "Personalizar o aspeto, guardar histórico de conversas e criar assistentes personalizados."
    ],
    difficulty: "Fácil",
    folderId: "interfaces",
    savedAt: "2026-10-01"
  },
  {
    url: "https://github.com/modelcontextprotocol/servers",
    owner: "modelcontextprotocol",
    repo: "servers",
    name: "MCP Reference Servers",
    stars: "35k+",
    language: "TypeScript / Python",
    simpleDescription: "Coleção de adaptadores oficiais (MCP) que permitem à IA aceder ao teu computador, bases de dados, GitHub, navegador web e ficheiros locais com segurança.",
    analogy: "Uma caixa de ferramentas com várias pontas de chave de fendas diferentes: uma para o navegador, outra para ficheiros e outra para o calendário.",
    useCases: [
      "Permitir ao assistente de IA pesquisar na web em tempo real.",
      "Ligar a IA a pastas do computador para ler folhas de cálculo e faturas.",
      "Automatizar comandos e tarefas no sistema operativo."
    ],
    difficulty: "Intermédio",
    folderId: "agentes",
    savedAt: "2026-10-01"
  },
  {
    url: "https://github.com/Significant-Gravitas/AutoGPT",
    owner: "Significant-Gravitas",
    repo: "AutoGPT",
    name: "AutoGPT",
    stars: "170k+",
    language: "Python",
    simpleDescription: "Um sistema de agente autónomo que recebe um objetivo complexo e divide-o sozinho em pequenas tarefas, executando-as passo a passo na internet e no computador.",
    analogy: "Um estagiário digital a quem dizes 'faz uma pesquisa de mercado sobre preços de adubos' e ele navega, anota dados e entrega o relatório sem lhe dizeres cada clique.",
    useCases: [
      "Investigações autónomas na internet com compilação de resultados.",
      "Testar tarefas que requerem múltiplos passos sucessivos sem supervisão constante."
    ],
    difficulty: "Avançado",
    folderId: "agentes",
    savedAt: "2026-10-01"
  }
];
