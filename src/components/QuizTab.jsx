import React, { useState } from 'react';
import { quizQuestions } from '../data/quizData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

export default function QuizTab() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const question = quizQuestions[currentQuestionIdx];

  const handleSelectOption = (idx) => {
    if (showExplanation) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (question.options[idx].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx + 1 < quizQuestions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Desafios & Quiz de Fixação
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Testa e consolida o teu conhecimento prático
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Pequenos cenários do dia a dia para verificar se compreendeste os conceitos-chave de IA.
          </p>
        </div>
      </div>

      {!quizCompleted ? (
        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-semibold text-slate-400">
            <span>Pergunta {currentQuestionIdx + 1} de {quizQuestions.length}</span>
            <span className="text-amber-400 font-bold">Pontuação: {score} / {quizQuestions.length}</span>
          </div>

          {/* Question Text */}
          <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let optionStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
              if (showExplanation) {
                if (opt.correct) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40';
                } else if (selectedOption === idx) {
                  optionStyle = 'bg-red-950/40 border-red-500 text-red-200 ring-1 ring-red-500/40';
                } else {
                  optionStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={showExplanation}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-start gap-3 ${optionStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                  {showExplanation && opt.correct && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {showExplanation && selectedOption === idx && !opt.correct && (
                    <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  question.options[selectedOption]?.correct
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    : 'bg-red-950/30 border-red-500/30 text-red-200'
                }`}
              >
                <span className="font-bold block mb-1 uppercase tracking-wider">
                  {question.options[selectedOption]?.correct ? '✓ Resposta Correta!' : '✕ Explicação:'}
                </span>
                {question.options[selectedOption]?.explanation}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-md shadow-amber-500/20 transition-all"
                >
                  {currentQuestionIdx + 1 < quizQuestions.length ? 'Próxima Pergunta' : 'Ver Resultado'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Quiz Concluído!</h2>
            <p className="text-slate-400 text-sm">
              Acertaste <span className="text-amber-400 font-bold text-lg">{score}</span> de {quizQuestions.length} perguntas.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
            {score === quizQuestions.length
              ? 'Excelente! Já dominas os conceitos fundamentais do mundo da IA.'
              : 'Bom trabalho! Podes rever os conceitos e tentar novamente para aperfeiçoar o teu entendimento.'}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-md shadow-emerald-600/20 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Reiniciar Quiz
          </button>
        </div>
      )}
    </div>
  );
}
