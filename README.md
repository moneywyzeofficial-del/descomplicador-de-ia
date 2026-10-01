# 🧠 Descomplicador de IA

Uma aplicação web interativa, visual e prática, desenhada para desmistificar o mundo da Inteligência Artificial sem jargão técnico, recorrendo a analogias do dia a dia e cenários práticos.

---

## ✨ Funcionalidades

1. **💡 Guia de Conceitos & Analogias**:
   - Termos fundamentais (LLM, Tokens, Janela de Contexto, RAG, Agentes, MCP, Alucinação) explicados com metáforas simples do quotidiano.
2. **🧭 Radar de IAs & Modelos**:
   - Comparativo entre Gemini, Claude, GPT-4o, DeepSeek, Ollama e geradores de imagem.
   - Recomendador inteligente por tipo de tarefa.
3. **📂 Projetos GitHub**:
   - Analisador instantâneo de repositórios do GitHub com explicação simplificada, analogia e casos de uso.
   - Sistema de organização por pastas personalizadas com persistência local.
4. **🧪 Laboratório de Prompts**:
   - Comparador *Antes vs. Depois* (Prompt Vago vs. Prompt Estruturado).
   - Construtor guiado em 4 passos com botão de cópia rápida.
5. **🎯 Desafios & Quiz**:
   - Perguntas interativas com pontuação e feedback pedagógico imediato.

---

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev
```

Abre o teu navegador em `http://localhost:3000`.

---

## 🌐 Deploy no Render

Esta aplicação está configurada como um **Static Site** no Render:
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- O ficheiro [`render.yaml`](./render.yaml) já inclui a configuração de rotas e build automático.
