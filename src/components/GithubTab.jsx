import React, { useState, useEffect } from 'react';
import { githubPresets, defaultFolders } from '../data/githubPresets';
import {
  Folder,
  FolderPlus,
  FolderOpen,
  FolderGit2,
  Search,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Trash2,
  Plus,
  BookOpen,
  Bookmark,
  Layers,
  Star,
  Cpu,
  Bot,
  Layout,
  Code,
  Tag,
  AlertCircle,
  Loader2,
  Check
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function GithubTab() {
  const [repoInput, setRepoInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedFolderForSave, setSelectedFolderForSave] = useState('geral');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Folder and Saved Repos State (persisted in localStorage)
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('ai_assistant_folders');
    return saved ? JSON.parse(saved) : defaultFolders;
  });

  const [savedRepos, setSavedRepos] = useState(() => {
    const saved = localStorage.getItem('ai_assistant_saved_repos');
    return saved ? JSON.parse(saved) : githubPresets;
  });

  const [activeFolderFilter, setActiveFolderFilter] = useState('todos');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ai_assistant_folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('ai_assistant_saved_repos', JSON.stringify(savedRepos));
  }, [savedRepos]);

  // Extract owner and repo from URL or string
  const parseGithubUrl = (input) => {
    const clean = input.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '');
    const parts = clean.split('/');
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
    return null;
  };

  // Analyze repository
  const handleAnalyze = async (overrideUrl) => {
    const target = overrideUrl || repoInput;
    setErrorMsg('');
    setSaveSuccess(false);

    const parsed = parseGithubUrl(target);
    if (!parsed) {
      setErrorMsg('Por favor, introduz um link válido do GitHub (ex: https://github.com/ollama/ollama ou ollama/ollama).');
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    // Check if we have preset high-detail analysis
    const preset = githubPresets.find(
      (p) => p.owner.toLowerCase() === parsed.owner.toLowerCase() && p.repo.toLowerCase() === parsed.repo.toLowerCase()
    );

    if (preset) {
      setTimeout(() => {
        setAnalysisResult(preset);
        setAnalyzing(false);
      }, 400);
      return;
    }

    // Otherwise, fetch from GitHub API
    try {
      const res = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Repositório não encontrado no GitHub. Verifica se o nome/link está correto e se o repo é público.');
        } else if (res.status === 403) {
          throw new Error('Limite temporário de pedidos à API do GitHub atingido. Tenta novamente dentro de alguns minutos.');
        } else {
          throw new Error(`Erro ao consultar o GitHub (${res.status}).`);
        }
      }

      const data = await res.json();

      // Heuristic analysis based on language, description and topics
      const description = data.description || 'Sem descrição oficial no GitHub.';
      const topics = data.topics || [];
      const language = data.language || 'Geral';
      const stars = data.stargazers_count ? `${data.stargazers_count > 1000 ? (data.stargazers_count / 1000).toFixed(1) + 'k' : data.stargazers_count}` : '0';

      // Generate accessible explanation
      let simpleExplanation = `Trata-se de um projeto de código aberto em ${language} focado em: ${description}`;
      let analogy = 'Uma ferramenta de software pronta a ser integrada ou executada em projetos de desenvolvimento.';
      let difficulty = 'Médio';

      if (topics.includes('llm') || topics.includes('ai') || topics.includes('machine-learning') || description.toLowerCase().includes('model')) {
        analogy = 'Uma peça de motor ou ferramenta especializada para construir e alimentar sistemas de inteligência artificial.';
      } else if (topics.includes('ui') || topics.includes('frontend') || topics.includes('react') || topics.includes('vue')) {
        analogy = 'Um conjunto de peças de acabamento e painéis visuais para criar interfaces bonitas e fáceis de usar.';
        difficulty = 'Fácil / Médio';
      }

      const generatedAnalysis = {
        url: data.html_url,
        owner: data.owner?.login || parsed.owner,
        repo: data.name || parsed.repo,
        name: data.name,
        stars,
        language,
        simpleDescription: description,
        analogy,
        useCases: [
          `Automatizar tarefas e processos relacionados com ${topics.slice(0, 3).join(', ') || language}.`,
          `Integrar como base ou biblioteca em novas aplicações.`,
          `Consultar o código para aprender como foi construído este tipo de sistema.`
        ],
        difficulty,
        folderId: 'geral',
        savedAt: new Date().toISOString().split('T')[0]
      };

      setAnalysisResult(generatedAnalysis);
    } catch (err) {
      setErrorMsg(err.message || 'Ocorreu um erro ao analisar o repositório.');
    } finally {
      setAnalyzing(false);
    }
  };

  // Save to folder
  const handleSaveToFolder = () => {
    if (!analysisResult) return;

    // Check if already saved
    const exists = savedRepos.some(
      (r) => r.owner.toLowerCase() === analysisResult.owner.toLowerCase() && r.repo.toLowerCase() === analysisResult.repo.toLowerCase()
    );

    const repoToSave = {
      ...analysisResult,
      folderId: selectedFolderForSave,
      savedAt: new Date().toISOString().split('T')[0]
    };

    if (exists) {
      // Update folder
      setSavedRepos((prev) =>
        prev.map((r) =>
          r.owner.toLowerCase() === analysisResult.owner.toLowerCase() && r.repo.toLowerCase() === analysisResult.repo.toLowerCase()
            ? repoToSave
            : r
        )
      );
    } else {
      setSavedRepos((prev) => [repoToSave, ...prev]);
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Remove repo
  const handleRemoveSavedRepo = (owner, repo) => {
    setSavedRepos((prev) =>
      prev.filter((r) => !(r.owner.toLowerCase() === owner.toLowerCase() && r.repo.toLowerCase() === repo.toLowerCase()))
    );
  };

  // Change repo folder
  const handleChangeRepoFolder = (owner, repo, newFolderId) => {
    setSavedRepos((prev) =>
      prev.map((r) =>
        r.owner.toLowerCase() === owner.toLowerCase() && r.repo.toLowerCase() === repo.toLowerCase()
          ? { ...r, folderId: newFolderId }
          : r
      )
    );
  };

  // Create new folder
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newId = newFolderName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    if (folders.some((f) => f.id === newId)) {
      alert('Já existe uma pasta com esse nome!');
      return;
    }

    const newFolder = {
      id: newId,
      name: newFolderName.trim(),
      icon: 'Folder'
    };

    setFolders((prev) => [...prev, newFolder]);
    setNewFolderName('');
    setShowNewFolderModal(false);
    setSelectedFolderForSave(newId);
  };

  // Delete folder
  const handleDeleteFolder = (folderId) => {
    if (folderId === 'geral') {
      alert('A pasta Geral não pode ser eliminada.');
      return;
    }
    if (confirm('Tens a certeza que queres eliminar esta pasta? Os repositórios nela serão movidos para Geral.')) {
      setSavedRepos((prev) =>
        prev.map((r) => (r.folderId === folderId ? { ...r, folderId: 'geral' } : r))
      );
      setFolders((prev) => prev.filter((f) => f.id !== folderId));
      if (activeFolderFilter === folderId) setActiveFolderFilter('todos');
    }
  };

  const filteredSavedRepos = savedRepos.filter((r) => {
    if (activeFolderFilter === 'todos') return true;
    return r.folderId === activeFolderFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/20 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <GithubIcon className="w-3.5 h-3.5" /> Explorador de Projetos GitHub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Descodifica qualquer repositório do GitHub em termos simples
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Cola o link de um projeto do GitHub para descobrir o que faz, para que serve com analogias práticas e organiza os teus projetos favoritos em pastas.
          </p>
        </div>
      </div>

      {/* Input Analyzer Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Search className="w-4 h-4 text-teal-400" /> Analisar Novo Repositório
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <GithubIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Cola o link (ex: https://github.com/ollama/ollama ou autor/projeto)..."
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all font-mono"
            />
          </div>
          <button
            disabled={analyzing || !repoInput.trim()}
            onClick={() => handleAnalyze()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm shadow-md shadow-teal-600/20 transition-all"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analisando...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Explicar Projeto
              </>
            )}
          </button>
        </div>

        {/* Quick Presets Buttons */}
        <div className="pt-1 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 font-medium">Exemplos populares para testar:</span>
          {githubPresets.map((preset) => (
            <button
              key={preset.repo}
              onClick={() => {
                setRepoInput(preset.url);
                handleAnalyze(preset.url);
              }}
              className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs rounded-lg border border-slate-700/60 transition-all"
            >
              {preset.owner}/{preset.repo}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Analysis Result Card */}
        {analysisResult && (
          <div className="mt-6 bg-slate-950 border border-teal-500/30 rounded-2xl p-6 space-y-6 shadow-2xl animate-fadeIn">
            {/* Header / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-teal-400 border border-slate-700">
                    {analysisResult.owner}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <Star className="w-3 h-3 fill-amber-400" /> {analysisResult.stars} estrelas
                  </span>
                  <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {analysisResult.language}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  {analysisResult.name}
                  <a
                    href={analysisResult.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-teal-400 transition-colors"
                    title="Ver no GitHub"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
              </div>

              {/* Save to Folder Action */}
              <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-medium ml-1">Pasta:</span>
                <select
                  value={selectedFolderForSave}
                  onChange={(e) => setSelectedFolderForSave(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-teal-500"
                >
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>
                      📁 {f.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleSaveToFolder}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Guardado!
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" /> Guardar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Practical Analogy Box */}
            <div className="bg-gradient-to-br from-teal-950/40 to-slate-950 border border-teal-500/30 rounded-xl p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-teal-500/20 rounded-lg text-teal-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-1">
                    Analogia Prática do Dia a Dia
                  </h4>
                  <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                    "{analysisResult.analogy}"
                  </p>
                </div>
              </div>
            </div>

            {/* Simple Terms Explanation */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-400" />
                O que é e para que serve (Sem Jargão)
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {analysisResult.simpleDescription}
              </p>
            </div>

            {/* Practical Use Cases */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Exemplos de Como Podes Usar
              </h4>
              <div className="space-y-2">
                {analysisResult.useCases.map((uc, i) => (
                  <div key={i} className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed mt-0.5">{uc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty footer */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Nível de Dificuldade Técnica:</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold border border-slate-700">
                  {analysisResult.difficulty}
                </span>
              </div>
              <a
                href={analysisResult.url}
                target="_blank"
                rel="noreferrer"
                className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-medium"
              >
                Abrir repositório original no GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Saved Folders and Bookmarked Repositories Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-teal-400" /> Os Meus Projetos e Pastas
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Organiza os repositórios que estás a acompanhar por pastas temáticas
            </p>
          </div>

          {/* New Folder Button */}
          <button
            onClick={() => setShowNewFolderModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-all self-start sm:self-center"
          >
            <FolderPlus className="w-4 h-4 text-teal-400" /> Nova Pasta
          </button>
        </div>

        {/* Folder Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFolderFilter('todos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFolderFilter === 'todos'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Todos os Projetos ({savedRepos.length})
          </button>

          {folders.map((folder) => {
            const count = savedRepos.filter((r) => r.folderId === folder.id).length;
            const isSelected = activeFolderFilter === folder.id;
            return (
              <div key={folder.id} className="relative group flex items-center">
                <button
                  onClick={() => setActiveFolderFilter(folder.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>{folder.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800/80 text-slate-300">
                    {count}
                  </span>
                </button>

                {folder.id !== 'geral' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFolder(folder.id);
                    }}
                    title="Eliminar Pasta"
                    className="hidden group-hover:flex items-center justify-center w-5 h-5 ml-1 rounded-full bg-red-950/80 hover:bg-red-900 text-red-400 text-xs"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Saved Repos Grid */}
        {filteredSavedRepos.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-400 text-sm space-y-2">
            <Folder className="w-8 h-8 text-slate-600 mx-auto" />
            <p>Nenhum repositório guardado nesta pasta ainda.</p>
            <p className="text-xs text-slate-500">
              Usa o analisador acima para colar o link de um projeto e adicioná-lo aqui.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredSavedRepos.map((repo) => {
              const currentFolder = folders.find((f) => f.id === repo.folderId) || folders[0];
              return (
                <div
                  key={`${repo.owner}-${repo.repo}`}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/5"
                >
                  <div className="space-y-3">
                    {/* Top line */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                            {repo.owner}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                            <Star className="w-3 h-3 fill-amber-400" /> {repo.stars}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{repo.name}</h3>
                      </div>

                      <div className="flex items-center gap-1">
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                          title="Abrir no GitHub"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleRemoveSavedRepo(repo.owner, repo.repo)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-all"
                          title="Remover dos guardados"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Analogy & description */}
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                      <span className="text-teal-400 font-semibold block text-[11px] uppercase tracking-wider">
                        Analogia Rápida:
                      </span>
                      <p className="italic leading-relaxed font-medium">"{repo.analogy}"</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {repo.simpleDescription}
                    </p>
                  </div>

                  {/* Bottom: Folder Switcher & Re-analyze */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[11px]">Pasta:</span>
                      <select
                        value={repo.folderId}
                        onChange={(e) => handleChangeRepoFolder(repo.owner, repo.repo, e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1 focus:outline-none focus:border-teal-500"
                      >
                        {folders.map((f) => (
                          <option key={f.id} value={f.id}>
                            📁 {f.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => {
                        setRepoInput(repo.url);
                        handleAnalyze(repo.url);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-teal-400 hover:text-teal-300 font-medium text-xs flex items-center gap-1"
                    >
                      Ver Detalhes Completos →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Create New Folder */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl animate-fadeIn">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderPlus className="w-5 h-5 text-teal-400" /> Criar Nova Pasta
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dá um nome à tua pasta para agrupar repositórios com o mesmo tema (ex.: "Modelos de Visão", "Automação de Tarefas", etc.).
            </p>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <input
                type="text"
                placeholder="Nome da pasta (ex: Ferramentas Locais)..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-teal-500"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewFolderModal(false);
                    setNewFolderName('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!newFolderName.trim()}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 disabled:opacity-50"
                >
                  Criar Pasta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
