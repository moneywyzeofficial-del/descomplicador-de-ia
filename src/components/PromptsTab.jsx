import React, { useState } from 'react';
import { promptComparisons, promptBuilderTemplates } from '../data/promptsData';
import { Sparkles, Copy, Check, AlertTriangle, CheckCircle2, Wand2, Terminal, ArrowRight } from 'lucide-react';

export default function PromptsTab() {
  const [activeSubTab, setActiveSubTab] = useState('comparisons'); // 'comparisons' | 'builder'
  const [selectedComparison, setSelectedComparison] = useState(promptComparisons[0]);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Prompt Builder State
  const [builderRole, setBuilderRole] = useState(promptBuilderTemplates.roles[0].value);
  const [builderContext, setBuilderContext] = useState('');
  const [builderTask, setBuilderTask] = useState('');
  const [builderRules, setBuilderRules] = useState('Usa português europeu, evita jargão desnecessário e sê conciso.');
  const [builderFormat, setBuilderFormat] = useState(promptBuilderTemplates.formats[0].value);
  const [copiedGenerated, setCopiedGenerated] = useState(false);

  const generatedPromptText = `${builderRole}

Contexto:
${builderContext.trim() ? builderContext.trim() : '[Descreve aqui os detalhes da tua situação / cliente / projeto]'}

Objetivo / Tarefa:
${builderTask.trim() ? builderTask.trim() : '[O que queres exatamente que a IA faça]'}

Regras e Restrições:
${builderRules.trim()}

Formato de Saída:
${builderFormat}`;

  const handleCopy = (text, isGenerated = false) => {
    navigator.clipboard.writeText(text);
    if (isGenerated) {
      setCopiedGenerated(true);
      setTimeout(() => setCopiedGenerated(false), 2000);
    } else {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Laboratório de Prompts
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            A arte de comunicar com precisão com a IA
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A qualidade da resposta da IA depende 90% da clareza das instruções.
            Aprende a diferença entre um pedido vago e um prompt estruturado que entrega resultados perfeitos.
          </p>
        </div>
      </div>

      {/* Sub-tab Toggle */}
      <div className="flex border-b border-slate-800 pb-3 gap-3">
        <button
          onClick={() => setActiveSubTab('comparisons')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeSubTab === 'comparisons'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          🔍 Casos Reais: Antes vs. Depois
        </button>
        <button
          onClick={() => setActiveSubTab('builder')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
            activeSubTab === 'builder'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Wand2 className="w-4 h-4" /> Construtor de Prompts Guiado
        </button>
      </div>

      {/* View 1: Before vs After Comparisons */}
      {activeSubTab === 'comparisons' && (
        <div className="space-y-6">
          {/* Scenario Selector */}
          <div className="flex flex-wrap gap-2">
            {promptComparisons.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedComparison(item)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedComparison.id === item.id
                    ? 'bg-purple-500 text-slate-950 font-bold shadow-md shadow-purple-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Scenario Box */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
            <span className="text-purple-400 font-semibold block mb-1 uppercase tracking-wider">
              Cenário Prático:
            </span>
            {selectedComparison.scenario}
          </div>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bad Prompt */}
            <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                Prompt Vago (Pouco Eficaz)
              </div>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-red-500/20 font-mono text-xs text-slate-300 leading-relaxed">
                "{selectedComparison.badPrompt.text}"
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 block">
                  Por que falha ou dá respostas fracas:
                </span>
                <ul className="space-y-1.5">
                  {selectedComparison.badPrompt.problems.map((prob, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-red-400">✕</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Good Prompt */}
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    Prompt Estruturado (Alta Eficácia)
                  </div>
                  <button
                    onClick={() => handleCopy(selectedComparison.goodPrompt.text)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-medium border border-emerald-500/40 transition-all"
                  >
                    {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedPrompt ? 'Copiado!' : 'Copiar Prompt'}
                  </button>
                </div>

                <div className="p-4 bg-slate-950/90 rounded-xl border border-emerald-500/20 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                  {selectedComparison.goodPrompt.text}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Por que este prompt funciona tão bem:
                  </span>
                  <ul className="space-y-1.5">
                    {selectedComparison.goodPrompt.advantages.map((adv, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Guided Prompt Builder */}
      {activeSubTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Builder Form */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-purple-400" /> Monta o teu Prompt em 4 Passos
            </h3>

            {/* Step 1: Role */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                1. Papel / Especialidade da IA
              </label>
              <select
                value={builderRole}
                onChange={(e) => setBuilderRole(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
              >
                {promptBuilderTemplates.roles.map((r, i) => (
                  <option key={i} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            {/* Step 2: Context */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                2. Contexto (Informação específica do teu caso)
              </label>
              <textarea
                rows={3}
                placeholder="Ex.: Tenho um cliente com relvado de 150m² e rega gota-a-gota que quer mudar para relva sintética..."
                value={builderContext}
                onChange={(e) => setBuilderContext(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Step 3: Task */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                3. Tarefa ou Pergunta Principal
              </label>
              <input
                type="text"
                placeholder="Ex.: Cria um guia com vantagens, desvantagens e estimativa de custos..."
                value={builderTask}
                onChange={(e) => setBuilderTask(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Step 4: Format */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                4. Formato de Saída Pretendido
              </label>
              <select
                value={builderFormat}
                onChange={(e) => setBuilderFormat(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-purple-500 focus:outline-none"
              >
                {promptBuilderTemplates.formats.map((f, i) => (
                  <option key={i} value={f.value}>{f.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Live Generated Prompt Output */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" /> Prompt Gerado Pronto a Usar
                </span>
                <button
                  onClick={() => handleCopy(generatedPromptText, true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
                >
                  {copiedGenerated ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedGenerated ? 'Copiado para Área de Transferência!' : 'Copiar Prompt'}
                </button>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-200 whitespace-pre-line font-mono leading-relaxed min-h-[280px]">
                {generatedPromptText}
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              Podes colar este prompt diretamente no ChatGPT, Claude, Gemini ou OpenCode para testar!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
