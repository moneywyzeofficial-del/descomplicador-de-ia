export const conceptsData = [
  {
    id: "llm",
    title: "LLM (Large Language Model)",
    shortName: "Modelo de Linguagem",
    category: "Fundamentos",
    level: "Iniciante",
    analogy: "Uma biblioteca gigante que leu quase tudo o que a humanidade escreveu e prevê qual é a próxima palavra mais lógica numa frase.",
    explanation: "É o 'cérebro' do sistema. Não tem consciência nem pensa como um humano; é uma rede matemática treinada em triliões de textos para reconhecer padrões e responder de forma coerente ao que lhe pedes.",
    practicalExample: "Quando perguntas 'Como podar uma oliveira no inverno?', o modelo prevê as instruções técnicas corretas com base em tudo o que aprendeu sobre olivicultura.",
    tags: ["Cérebro", "Texto", "Rede Neuronal"]
  },
  {
    id: "tokens",
    title: "Tokens",
    shortName: "Unidade de Medida da IA",
    category: "Fundamentos",
    level: "Iniciante",
    analogy: "As 'sílabas' ou peças de Lego com que a IA constrói e lê o texto. Em média, 100 palavras em português correspondem a cerca de 130 tokens.",
    explanation: "Os computadores não leem palavras completas de uma vez; partem o texto em pedaços pequenos chamados tokens. É por isso que os modelos cobram ou medem limites em 'número de tokens'.",
    practicalExample: "A palavra 'jardinagem' pode ser dividida internamente em ['jar', 'din', 'agem'].",
    tags: ["Medição", "Custos", "Processamento"]
  },
  {
    id: "context-window",
    title: "Janela de Contexto (Context Window)",
    shortName: "Memória de Curto Prazo",
    category: "Fundamentos",
    level: "Iniciante",
    analogy: "O tamanho da tua bancada de trabalho. Se a bancada for pequena (8k tokens), só podes ter uma folha aberta. Se for enorme (1 milhão de tokens), podes espalhar um livro inteiro na mesa ao mesmo tempo.",
    explanation: "É a quantidade total de texto (a tua pergunta + a conversa anterior + a resposta) que a IA consegue 'lembrar' e analisar numa única interação.",
    practicalExample: "Um modelo com 1 Milhão de tokens de contexto (como o Gemini 2.5) consegue ler um manual de 500 páginas e responder a perguntas sobre qualquer detalhe do livro.",
    tags: ["Memória", "Capacidade", "Leitura"]
  },
  {
    id: "prompt",
    title: "Prompt e Engenharia de Prompts",
    shortName: "Instrução dada à IA",
    category: "Comunicação",
    level: "Iniciante",
    analogy: "As instruções que dás a um ajudante novo. Se disseres apenas 'arranja o jardim', ele não sabe o que priorizar. Se disseres 'corta a relva a 4cm, apara as sebes e junta os restos no saco verde', o resultado fica impecável.",
    explanation: "Prompt é a mensagem que envias à IA. Quanto mais claro for o objetivo, o contexto, as restrições e o formato desejado, melhor e mais precisa será a resposta.",
    practicalExample: "Em vez de 'Faz um orçamento', pedir 'Atua como jardineiro profissional e cria um orçamento discriminado por mão-de-obra e materiais para manutenção mensal de piscina e jardim'.",
    tags: ["Comunicação", "Instruções", "Qualidade"]
  },
  {
    id: "rag",
    title: "RAG (Retrieval-Augmented Generation)",
    shortName: "Geração com Consulta de Ficheiros",
    category: "Avançado",
    level: "Intermédio",
    analogy: "Fazer um exame com o teu próprio caderno de apontamentos aberto ao lado, em vez de depender apenas do que tens decorado de cabeça.",
    explanation: "Técnica em que a IA, antes de responder, pesquisa numa pasta de ficheiros ou base de dados privada os documentos mais relevantes e usa essa informação fresca para responder sem inventar.",
    practicalExample: "Carregar os teus manuais de bombas de piscina e faturas antigas. Quando perguntas o preço de um filtro, a IA consulta esses documentos específicos e responde com os teus dados exatos.",
    tags: ["Ficheiros", "Documentos", "Precisão"]
  },
  {
    id: "agents",
    title: "Agentes de IA (AI Agents)",
    shortName: "IAs que Tomam Ações",
    category: "Automação",
    level: "Intermédio",
    analogy: "Em vez de um conselheiro que só fala, tens um assistente executivo que consegue abrir pastas, criar ficheiros, testar ferramentas e corrigir-se sozinho se encontrar um erro.",
    explanation: "Um agente é um modelo de IA programado para executar tarefas em vários passos: ele pensa, escolhe uma ferramenta (ex.: ler ficheiro, executar comando), observa o resultado e repete até cumprir o objetivo.",
    practicalExample: "O OpenCode / Antigravity a criar este projeto: leu ficheiros, planeou a arquitetura, criou o código e validou o funcionamento de forma autónoma.",
    tags: ["Autonomia", "Ferramentas", "Execução"]
  },
  {
    id: "mcp",
    title: "MCP (Model Context Protocol)",
    shortName: "Adaptador Universal de Ferramentas",
    category: "Automação",
    level: "Intermédio",
    analogy: "A tomada USB-C das IAs. Permite ligar qualquer ferramenta externa (base de dados, navegador web, ficheiros locais) a qualquer IA através de uma ficha padrão universal.",
    explanation: "Um protocolo aberto criado pela Anthropic que permite que assistentes e agentes de IA se conectem de forma segura e padronizada a ferramentas locais e serviços externos.",
    practicalExample: "Ter um servidor MCP do teu calendário ou navegador Web para que a IA possa agendar tarefas ou pesquisar preços online diretamente.",
    tags: ["Conectividade", "Protocolo", "Integração"]
  },
  {
    id: "hallucination",
    title: "Alucinação (Hallucination)",
    shortName: "Quando a IA Inventa",
    category: "Confiabilidade",
    level: "Iniciante",
    analogy: "Uma pessoa muito confiante e convincente que, quando não sabe a resposta exata, inventa uma história plausível sem má intenção.",
    explanation: "Como os modelos funcionam por probabilidade de palavras, quando não têm a certeza podem gerar respostas que parecem muito lógicas e bem redigidas, mas que são factualmente falsas.",
    practicalExample: "Pedir à IA o artigo de uma lei inventada ou referências científicas sem contexto; ela pode criar títulos de livros que não existem na realidade.",
    tags: ["Atenção", "Verificação", "Limites"]
  },
  {
    id: "fine-tuning",
    title: "Fine-Tuning (Ajuste Fino)",
    shortName: "Treino Especializado",
    category: "Avançado",
    level: "Avançado",
    analogy: "Pegar num condutor experiente (modelo base) e dar-lhe um curso intensivo de condução de tratores agrícolas (especialização num domínio específico).",
    explanation: "Processo de pegar num modelo já treinado e treiná-lo com milhares de exemplos específicos de uma empresa ou profissão para que aprenda o tom de voz e regras exatas daquele nicho.",
    practicalExample: "Ajustar um modelo para responder exatamente no formato das fichas técnicas de manutenção de uma empresa.",
    tags: ["Especialização", "Treino", "Personalização"]
  }
];
