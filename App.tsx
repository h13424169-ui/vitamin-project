
import React, { useState, useEffect } from 'react';
import { VITAMIN_PRODUCTS } from './constants';
import { PCABiplot } from './components/PCABiplot';
import { getExpertRecommendation } from './services/geminiService';
import { AnalysisResult } from './types';

function App() {
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!userInput.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await getExpertRecommendation(userInput);
      setResult(data);
    } catch (err) {
      setError('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recommendedProduct = VITAMIN_PRODUCTS.find(p => p.id === result?.recommendedProductId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-none">Vitamin PCA Expert</h1>
              <p className="text-xs text-slate-500 mt-1">식품공학 전문가의 비타민 주성분 분석 시스템</p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">PCA Ver 2.5</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        {/* Intro Section */}
        <section className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-3xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">당신의 영양 상태를 분석합니다</h2>
          <p className="text-indigo-100 mb-6">현재 느끼는 피로감, 면역 저하, 피부 고민 등 증상을 적어주세요. 10종의 비타민 PCA 데이터를 기반으로 최적의 영양 배합을 찾아드립니다.</p>
          
          <div className="relative">
            <textarea
              className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[120px] transition-all"
              placeholder="예: 요즘 만성 피로가 심하고 눈이 자주 침침해요. 감기도 자주 걸리는 것 같습니다."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !userInput.trim()}
              className="absolute bottom-4 right-4 bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  분석 중...
                </>
              ) : (
                '분석 시작'
              )}
            </button>
          </div>
        </section>

        {/* Visualizer Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PCABiplot selectedId={result?.recommendedProductId} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-800 mb-4">분석 데이터 요약</h3>
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[340px] pr-2">
              {VITAMIN_PRODUCTS.map(product => (
                <div key={product.id} className="group p-3 hover:bg-slate-50 rounded-lg transition-colors border-l-4" style={{ borderColor: product.color }}>
                  <p className="text-sm font-bold text-slate-700">{product.name}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Result Section */}
        {result && recommendedProduct && (
          <section className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="bg-indigo-50 border-b border-indigo-100 px-8 py-4 flex items-center justify-between">
              <span className="text-indigo-600 font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                전문가 분석 결과
              </span>
            </div>
            
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-sm text-slate-400 font-semibold uppercase tracking-wider mb-2">추천 제품</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg" style={{ backgroundColor: recommendedProduct.color }}>
                        {recommendedProduct.name[0]}
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-slate-800">{recommendedProduct.name}</h4>
                        <p className="text-indigo-600 font-medium">{recommendedProduct.specialty}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 17h2v2h-2v-2zm0-2h2V9h-2v6zm4-12v18H6V3h12zm2-2H4v22h16V1z"/>
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                      식품공학 전문가 소견
                    </h4>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {result.expertReasoning}
                    </p>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                      영양학적 조언 (Nutritional Insight)
                    </h4>
                    <p className="text-slate-600 leading-relaxed italic">
                      {result.nutritionalInsight}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-64 space-y-4">
                  <div className="bg-indigo-600 rounded-2xl p-6 text-white text-center">
                    <p className="text-xs text-indigo-200 mb-1">PCA Score</p>
                    <div className="text-3xl font-bold mb-4">{(recommendedProduct.pc1 + recommendedProduct.pc2).toFixed(2)}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>에너지(PC1)</span>
                        <span>{recommendedProduct.pc1.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-indigo-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-white h-full" style={{ width: `${Math.min(100, Math.max(0, (recommendedProduct.pc1 + 6) / 12 * 100))}%` }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <span>성향(PC2)</span>
                        <span>{recommendedProduct.pc2.toFixed(1)}</span>
                      </div>
                      <div className="w-full bg-indigo-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-white h-full" style={{ width: `${Math.min(100, Math.max(0, (recommendedProduct.pc2 + 6) / 12 * 100))}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-white border-2 border-slate-100 hover:border-indigo-600 py-4 rounded-2xl font-bold text-slate-600 hover:text-indigo-600 transition-all text-sm shadow-sm flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    분석 레포트 다운로드
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 mt-12 text-center text-slate-400 text-sm">
        <p>© 2024 Vitamin PCA Analyzer. 본 분석은 정보 제공 목적으로만 사용되며, 의학적 진단을 대신할 수 없습니다.</p>
      </footer>
    </div>
  );
}

export default App;
