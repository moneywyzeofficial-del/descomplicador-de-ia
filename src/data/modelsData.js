export const modelsData = [
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash / Pro",
    provider: "Google",
    category: "Geral & Multimodal",
    badge: "Excelente Custo/Velocidade",
    strengths: [
      "Janela de contexto gigante (1M+ tokens)",
      "Processamento nativo de áudio, vídeo, imagens e PDFs longos",
      "Muito rápido e económico"
    ],
    idealFor: "Resumir livros/manuais inteiros, analisar fotografias e vídeos de instalações, tarefas rápidas do dia a dia.",
    contextWindow: "1.000.000+ tokens",
    tier: "Gratuito / Pago",
    difficulty: "Fácil",
    iconColor: "text-blue-400"
  },
  {
    id: "claude-3-7-sonnet",
    name: "Claude 3.7 Sonnet / Opus",
    provider: "Anthropic",
    category: "Código & Raciocínio",
    badge: "Líder em Programação e Texto Natural",
    strengths: [
      "Escrita de texto muito humana e nuance excecional",
      "Capacidade de raciocínio híbrido (modo rápido vs modo de pensamento profundo)",
      "Pioneiro na integração com ferramentas locais (MCP)"
    ],
    idealFor: "Criar aplicações e código fiável, redação cuidada de relatórios e propostas, planeamento complexo.",
    contextWindow: "200.000 tokens",
    tier: "Pago / Subscrição",
    difficulty: "Fácil a Médio",
    iconColor: "text-amber-400"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o / GPT-4.5",
    provider: "OpenAI",
    category: "Geral & Ecossistema",
    badge: "O Mais Conhecido",
    strengths: [
      "Ecossistema enorme com milhares de GPTs personalizados",
      "Voz em tempo real muito fluida",
      "Grande versatilidade em múltiplos temas"
    ],
    idealFor: "Brainstorming geral, conversa por voz no telemóvel, tarefas diárias no ChatGPT.",
    contextWindow: "128.000 tokens",
    tier: "Gratuito / Pago",
    difficulty: "Fácil",
    iconColor: "text-emerald-400"
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 / V3",
    provider: "DeepSeek",
    category: "Raciocínio Puro & Open Source",
    badge: "Poderoso em Lógica e Matemática",
    strengths: [
      "Mostra o processo de pensamento ('Chain of Thought') passo a passo",
      "Código e lógica com custo extremamente baixo ou gratuito",
      "Arquitetura aberta de alto desempenho"
    ],
    idealFor: "Resolver problemas de lógica, cálculos matemáticos, depuração profunda de problemas difíceis.",
    contextWindow: "64.000 - 128.000 tokens",
    tier: "Gratuito / Acessível",
    difficulty: "Médio",
    iconColor: "text-cyan-400"
  },
  {
    id: "ollama-llama-3",
    name: "Ollama (Llama 3 / Mistral / Qwen)",
    provider: "Local / Open Source",
    category: "Privacidade & Offline",
    badge: "100% Local no teu PC",
    strengths: [
      "Funciona totalmente offline sem enviar dados para a internet",
      "Privacidade total para ficheiros confidenciais",
      "Sem custos de subscrição mensal"
    ],
    idealFor: "Processar dados privados no teu próprio computador, aprender como funcionam os modelos sem ligação à rede.",
    contextWindow: "8.000 - 128.000 tokens",
    tier: "100% Gratuito (requer hardware)",
    difficulty: "Médio a Avançado",
    iconColor: "text-purple-400"
  },
  {
    id: "midjourney-flux",
    name: "Flux / Midjourney",
    provider: "Especialistas em Imagem",
    category: "Geração de Imagens",
    badge: "Arte & Design Visual",
    strengths: [
      "Fotorrealismo impressionante e controlo de iluminação",
      "Criação de mockups de design de jardins, paisagismo e plantas visuais",
      "Renderização precisa de detalhes e texturas"
    ],
    idealFor: "Simular como vai ficar um jardim reformado, criar logótipos ou ilustrações para marketing e orçamentos.",
    contextWindow: "N/A (Imagens)",
    tier: "Pago / Créditos",
    difficulty: "Médio",
    iconColor: "text-pink-400"
  }
];

export const modelCategories = [
  "Todos",
  "Geral & Multimodal",
  "Código & Raciocínio",
  "Raciocínio Puro & Open Source",
  "Privacidade & Offline",
  "Geração de Imagens"
];
