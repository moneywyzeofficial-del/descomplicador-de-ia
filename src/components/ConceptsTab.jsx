import React, { useState } from 'react';
import { conceptsData } from '../data/conceptsData';
import { Search, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight, MessageSquare, Lightbulb } from 'lucide-react';

export default function ConceptsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedConcept, setSelectedConcept] = useState(conceptsData[0]);

  const categories = ['Todos', 'Fundamentos', 'Comunicação', 'Automação', 'Avançado', 'Confiabilidade'];

  const filteredConcepts = conceptsData.filter((concept) => {
    const matchesSearch =
      concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.analogy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || concept.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5" /> Guia de Conceitos
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Aprende os termos de IA com analogias reais
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Sem jargão complicado. Cada conceito é explicado como se fosse uma ferramenta de trabalho,
            uma bancada de oficina ou uma conversa prática com um assistente.
          </p>
        </div>
      </div>

      {/* Controls: Search and Categories */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Pesquisar conceito (ex: tokens, RAG, agentes)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Concept List & Active Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Concept Cards List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredConcepts.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 text-sm">
              Nenhum conceito encontrado com a pesquisa "{searchTerm}".
            </div>
          ) : (
            filteredConcepts.map((item) => {
              const isSelected = selectedConcept?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedConcept(item)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-500/50 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 inline-block mb-1.5">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-white text-base">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{item.shortName}</p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed italic bg-slate-950/40 p-2 rounded border border-slate-800/60">
                    "{item.analogy}"
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Concept Deep Dive View */}
        <div className="lg:col-span-7 sticky top-24">
          {selectedConcept ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
              {/* Header */}
              <div className="border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {selectedConcept.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    Nível: {selectedConcept.level}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{selectedConcept.title}</h2>
                <p className="text-slate-400 text-sm mt-1">{selectedConcept.shortName}</p>
              </div>

              {/* Analogy Box */}
              <div className="bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 rounded-xl p-4 sm:p-5 relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      Analogia do Dia a Dia
                    </h4>
                    <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                      "{selectedConcept.analogy}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  Como Funciona na Prática
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {selectedConcept.explanation}
                </p>
              </div>

              {/* Real World Practical Example */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Exemplo de Aplicação
                </h4>
                <div className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  {selectedConcept.practicalExample}
                </div>
              </div>

              {/* Tags */}
              <div className="pt-2 flex flex-wrap gap-2">
                {selectedConcept.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
              Clica num conceito à esquerda para ver os detalhes e analogias.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
