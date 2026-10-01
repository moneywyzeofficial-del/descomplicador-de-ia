import React from 'react';
import { Lightbulb, Compass, Sparkles, HelpCircle, BookOpen, Bot, FolderGit2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'concepts', label: 'Conceitos & Analogias', icon: Lightbulb, badge: 'Fundamentos' },
    { id: 'radar', label: 'Radar de IAs & Modelos', icon: Compass, badge: 'Comparador' },
    { id: 'github', label: 'Projetos GitHub', icon: FolderGit2, badge: 'Repositórios' },
    { id: 'prompts', label: 'Laboratório de Prompts', icon: Sparkles, badge: 'Prática' },
    { id: 'quiz', label: 'Desafios & Quiz', icon: HelpCircle, badge: 'Treino' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Bot className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                Descomplicador <span className="text-emerald-400">de IA</span>
              </span>
              <p className="text-xs text-slate-400 hidden sm:block">Aprender Inteligência Artificial sem jargão</p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
