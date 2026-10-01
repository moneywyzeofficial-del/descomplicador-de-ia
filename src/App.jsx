import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ConceptsTab from './components/ConceptsTab';
import RadarTab from './components/RadarTab';
import GithubTab from './components/GithubTab';
import PromptsTab from './components/PromptsTab';
import QuizTab from './components/QuizTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('concepts');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'concepts' && <ConceptsTab />}
        {activeTab === 'radar' && <RadarTab />}
        {activeTab === 'github' && <GithubTab />}
        {activeTab === 'prompts' && <PromptsTab />}
        {activeTab === 'quiz' && <QuizTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>Descomplicador de IA • Criado para tornar a tecnologia simples, prática e acessível.</p>
        </div>
      </footer>
    </div>
  );
}
