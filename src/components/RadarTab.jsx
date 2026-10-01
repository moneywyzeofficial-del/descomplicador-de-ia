import React, { useState } from 'react';
import { modelsData, modelCategories } from '../data/modelsData';
import { Compass, CheckCircle2, Zap, Shield, Sparkles, Filter, Cpu } from 'lucide-react';

export default function RadarTab() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTask, setSelectedTask] = useState('');

  const tasksGuide = [
    { id: 'long-docs', label: 'Resumir PDFs/manuais gigantes (+100 páginas)', recommendedId: 'gemini-2-5-flash', reason: 'O Gemini tem uma janela de contexto colossal de mais de 1 milhão de tokens, lendo tudo sem esquecer nada.' },
    { id: 'coding', label: 'Criar aplicações, scripts e código fiável', recommendedId: 'claude-3-7-sonnet', reason: 'O Claude 3.7 Sonnet é a referência global em programação de qualidade e raciocínio técnico passo a passo.' },
    { id: 'daily-chat', label: 'Conversar por voz e tarefas gerais no telemóvel', recommendedId: 'gpt-4o', reason: 'O ChatGPT / GPT-4o tem a melhor integração com telemóveis e voz em tempo real muito natural.' },
    { id: 'offline-privacy', label: 'Trabalhar com dados confidenciais 100% offline', recommendedId: 'ollama-llama-3', reason: 'O Ollama corre modelos no teu próprio computador sem enviar um único byte para a internet.' },
    { id: 'landscaping-images', label: 'Criar imagens e simulações de jardins/designs', recommendedId: 'midjourney-flux', reason: 'Flux e Midjourney criam visuais fotorrealistas de plantas, relvados e espaços com excelente detalhe.' },
  ];

  const filteredModels = modelsData.filter(
    (m) => selectedCategory === 'Todos' || m.category === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/20 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> Radar de IAs & Modelos
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Compreende as diferenças e forças de cada IA
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Não existe uma "IA perfeita para tudo". Cada modelo tem especialidades diferentes:
            alguns são mais rápidos para leitura longa, outros são mestres em código ou geração de imagem.
          </p>
        </div>
      </div>

      {/* Task-based Smart Recommender */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-lg">Guia Rápido: Qual IA devo usar para... ?</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {tasksGuide.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTask(selectedTask === t.id ? '' : t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedTask === t.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700/80 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {selectedTask && (
          <div className="mt-4 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-slate-200 text-sm animate-fadeIn">
            {(() => {
              const currentTask = tasksGuide.find((t) => t.id === selectedTask);
              const recModel = modelsData.find((m) => m.id === currentTask?.recommendedId);
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-amber-400 font-semibold block text-xs uppercase tracking-wider mb-1">
                      Modelo Recomendado: {recModel?.name} ({recModel?.provider})
                    </span>
                    <p className="text-slate-200">{currentTask?.reason}</p>
                  </div>
                  <button
                    onClick={() => {
                      document.getElementById(recModel?.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-medium whitespace-nowrap self-start sm:self-center border border-amber-500/40"
                  >
                    Ver Ficha Técnica ↓
                  </button>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-500 ml-1" />
        {modelCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <div
            id={model.id}
            key={model.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-5 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/5"
          >
            {/* Top info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {model.provider}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1.5 tracking-tight">{model.name}</h3>
                </div>
                <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
                  <Cpu className={`w-5 h-5 ${model.iconColor}`} />
                </div>
              </div>

              <div className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {model.badge}
              </div>

              {/* Strengths List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Pontos Fortes:
                </span>
                <ul className="space-y-1.5">
                  {model.strengths.map((st, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal for */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Ideal para:
                </span>
                <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                  {model.idealFor}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div>
                <span className="text-slate-500 block">Contexto:</span>
                <span className="text-slate-200 font-medium">{model.contextWindow}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Acesso:</span>
                <span className="text-slate-200 font-medium">{model.tier}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
