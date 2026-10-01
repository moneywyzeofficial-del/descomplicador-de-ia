export const promptComparisons = [
  {
    id: "orcamento-jardim",
    title: "Elaborar Orçamento de Serviço",
    scenario: "Precisas de enviar um orçamento formal para a manutenção de um espaço com jardim e piscina.",
    badPrompt: {
      text: "Faz um orçamento para arranjar um jardim e limpar a piscina.",
      problems: [
        "Não define o papel nem o nível de formalidade",
        "Não diz as dimensões, periodicidade ou tarefas incluídas",
        "Não estabelece estrutura (tabela, valores de mão de obra vs materiais)",
        "Resultado será genérico e inútil para o cliente"
      ]
    },
    goodPrompt: {
      text: `Atua como um profissional experiente de jardinagem e manutenção de piscinas em Portugal.

Cria uma proposta de orçamento profissional em português europeu com o seguinte contexto:
- Cliente: Vivenda unifamiliar
- Espaço: Jardim com 250m² de relvado + sebes de tuia e piscina de 8x4m (sal)
- Frequência: 2 visitas por mês na época alta (Maio a Outubro) e 1 visita por mês na época baixa
- Tarefas do Jardim: Corte de relva, aparo de sebes, controlo de infestantes, regulação de rega automática
- Tarefas da Piscina: Teste e correção de pH/cloro, aspiração de fundo, lavagem de filtro de areia

Formata a resposta com:
1. Saudação cordial e resumo do plano
2. Tabela discriminando: Tarefa, Frequência, Materiais Incluídos e Preço Estimado Mensal (sugere valores realistas de mercado)
3. Termos de pagamento e condições gerais
4. Nota profissional de garantia de qualidade`,
      advantages: [
        "Dá a persona correta (profissional em Portugal)",
        "Contexto preciso com dimensões e periodicidades",
        "Pede formatação em tabela pronta a copiar e adaptar",
        "Leva a IA a produzir um resultado profissional à primeira tentativa"
      ]
    }
  },
  {
    id: "diagnostico-plantas",
    title: "Diagnosticar Problema em Plantas / Água",
    scenario: "Um cliente relata que as folhas dos citrinos estão amarelas e a piscina começou a ficar esverdeada.",
    badPrompt: {
      text: "Porque é que as folhas dos limoeiros ficam amarelas e a piscina verde?",
      problems: [
        "Junta dois problemas não relacionados sem fornecer sintomas detalhados",
        "Não refere testes feitos (ex.: pH, rega, adubação)",
        "Resposta será um resumo vago sem plano de ação"
      ]
    },
    goodPrompt: {
      text: `Atua como especialista em agronomia e tratamento de águas.

Preciso de um diagnóstico prático e plano de ação imediato para 2 situações:

Situação 1: Limoeiro com folhas a amarelar mantendo as nervuras verdes. Está em solo argiloso e é regado 2x por semana.
Situação 2: Piscina de 45m³ com água turva/esverdeada após 3 dias de trovoada e calor. O pH medido foi 7.8 e o cloro livre está a 0.2 ppm.

Para cada situação apresenta:
1. Causa mais provável (diagnóstico claro)
2. Ações corretivas passo a passo nas próximas 48 horas (com produtos recomendados)
3. Como prevenir a recorrência
4. Avisos de segurança a ter em conta

Usa linguagem direta e em português europeu.`,
      advantages: [
        "Fornece os sintomas específicos (nervuras verdes, medidas exatas da água)",
        "Pede uma estrutura clara: Causa -> Plano 48h -> Prevenção",
        "Evita respostas genéricas e foca em soluções acionáveis"
      ]
    }
  },
  {
    id: "aprender-programacao",
    title: "Aprender um Conceito Técnico Difícil",
    scenario: "Estás a aprender programação e queres entender o que é uma API ou uma Base de Dados.",
    badPrompt: {
      text: "O que é uma API e como funciona no código?",
      problems: [
        "A IA costuma responder com jargão técnico complexo (endpoints, REST, JSON, HTTP)",
        "Sem saber o teu nível, a explicação pode ser inacessível e confusa"
      ]
    },
    goodPrompt: {
      text: `Explica o que é uma API como se eu fosse jardineiro e nunca tivesse programado.

Regras da explicação:
1. Usa uma analogia prática do dia a dia (ex.: encomendar plantas num viveiro ou o empregado de mesa num restaurante)
2. Explica quem pede, quem entrega e como é feita a comunicação
3. Dá um exemplo real de como uma app de telemóvel do tempo usa uma API para saber se vai chover no jardim amanhã
4. Evita termos em inglês desnecessários ou explica-os logo a seguir se precisares de usar

Conclui com um resumo de 2 frases.`,
      advantages: [
        "Define o nível de conhecimento prévio e o estilo da analogia",
        "Proíbe jargão desnecessário",
        "Garante que o conceito fica perfeitamente claro e memorável"
      ]
    }
  }
];

export const promptBuilderTemplates = {
  roles: [
    { label: "Assistente de Jardinagem & Paisagismo", value: "Atua como especialista em jardinagem, rega e paisagismo profissional em Portugal." },
    { label: "Técnico de Piscinas & Tratamento de Águas", value: "Atua como técnico certificado de manutenção e química de piscinas." },
    { label: "Consultor de Negócios & Orçamentos", value: "Atua como consultor experiente na criação de propostas comerciais e orçamentos claros." },
    { label: "Tutor de Programação para Iniciantes", value: "Atua como professor paciente de programação, explicando tudo com analogias simples do dia a dia." },
    { label: "Redator de Emails e Comunicação com Clientes", value: "Atua como profissional de comunicação cordial, empático e resolutivo." }
  ],
  formats: [
    { label: "Tabela organizada com colunas claras", value: "Apresenta a resposta numa tabela organizada com colunas bem definidas." },
    { label: "Lista passo a passo numerada", value: "Apresenta um guia prático passo a passo numerado, pronto a executar." },
    { label: "Email / Mensagem pronta a enviar", value: "Escreve em formato de mensagem pronta a enviar ao cliente, com tom profissional e simpático." },
    { label: "Explicação simples com analogia", value: "Explica de forma concisa usando uma analogia simples e um resumo de 3 pontos no final." }
  ]
};
