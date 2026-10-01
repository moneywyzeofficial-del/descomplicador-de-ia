export const quizQuestions = [
  {
    id: 1,
    question: "Precisas de analisar um manual de 300 páginas em PDF de uma bomba de piscina para descobrir como configurar o temporizador. Qual é a característica do modelo que mais importa?",
    options: [
      { text: "Ter uma Janela de Contexto (Context Window) muito grande", correct: true, explanation: "Correto! Um modelo com grande janela de contexto (como 1 milhão de tokens) consegue ler o PDF inteiro de uma só vez e encontrar a secção exata do temporizador." },
      { text: "Ter capacidade de gerar imagens fotorrealistas", correct: false, explanation: "Incorreto. A geração de imagens não ajuda a interpretar texto de manuais técnicos." },
      { text: "Funcionar sem tokens", correct: false, explanation: "Incorreto. Todos os modelos de linguagem processam texto através de tokens." }
    ]
  },
  {
    id: 2,
    question: "O que é o RAG (Retrieval-Augmented Generation) numa aplicação de IA?",
    options: [
      { text: "Um comando para reiniciar a IA quando ela fica lenta", correct: false, explanation: "Incorreto. RAG é uma técnica de consulta de informação." },
      { text: "Fazer a IA pesquisar nos teus próprios ficheiros/documentos antes de responder, garantindo dados reais e atualizados", correct: true, explanation: "Exatamente! O RAG funciona como ter um livro de apontamentos aberto onde a IA consulta os teus dados privados antes de escrever a resposta." },
      { text: "Apagar a memória de conversas antigas", correct: false, explanation: "Incorreto. Isso seria limpar o histórico de contexto." }
    ]
  },
  {
    id: 3,
    question: "Qual é a melhor forma de evitar que a IA 'alucine' (invente respostas falsas)?",
    options: [
      { text: "Fazer perguntas com 1 ou 2 palavras apenas", correct: false, explanation: "Incorreto. Perguntas vagas aumentam a probabilidade de respostas inventadas ou genéricas." },
      { text: "Fornecer contexto, regras claras e pedir para ela admitir se não tiver a certeza", correct: true, explanation: "Excelente! Instruir a IA com contexto, limites bem definidos ('se não souberes com base no texto, diz que não sabes') reduz drasticamente as alucinações." },
      { text: "Usar sempre letras maiúsculas no prompt", correct: false, explanation: "Incorreto. A formatação em maiúsculas não afeta a precisão factual." }
    ]
  },
  {
    id: 4,
    question: "O que é o protocolo MCP (Model Context Protocol)?",
    options: [
      { text: "Um antivírus para ficheiros de computador", correct: false, explanation: "Incorreto. Não é um antivírus." },
      { text: "Um padrão universal ('tipo ficha USB-C') que permite ligar a IA a ferramentas do computador, navegadores e bases de dados", correct: true, explanation: "Certo! O MCP padroniza a forma como os assistentes de IA utilizam ferramentas externas de forma segura e modular." },
      { text: "Um formato de imagem como JPG ou PNG", correct: false, explanation: "Incorreto. O MCP é um protocolo de comunicação para ferramentas de IA." }
    ]
  }
];
