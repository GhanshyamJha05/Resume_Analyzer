import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeft,
  Check,
  X,
  Target,
  FileText,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import api from '@/utils/api';
import Loader from '@/components/Loader';

// Sleek Clean ATS Score
const ModernScore = ({ score }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative flex items-center justify-center">
        <h1 className="text-8xl font-black tracking-tighter text-gray-900">{score}</h1>
        <div className="absolute top-2 -right-12">
          <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">/ 100</span>
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-gray-400">Total ATS Score</p>
    </div>
  );
};

export default function Result() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id && router.isReady) {
      setError("No resume ID provided.");
      setLoading(false);
      return;
    }

    if (id) {
      const fetchData = async () => {
        try {
          const res = await api.getAnalysis(id);
          setData({
            ats_score: res.ats_score || 0,
            summary: res.summary || '',
            strengths: Array.isArray(res.strengths) ? res.strengths : [],
            weaknesses: Array.isArray(res.weaknesses) ? res.weaknesses : [],
            keyword_analysis: res.keyword_analysis || { matched_keywords: [], missing_keywords: [] },
            action_plan: Array.isArray(res.action_plan) ? res.action_plan : [],
            bullet_improvements: Array.isArray(res.bullet_improvements) ? res.bullet_improvements : [],
            final_verdict: res.final_verdict || 'Unknown'
          });
        } catch (err) {
          setError(err.message || "Failed to load results.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id, router.isReady]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader message="Loading Results..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="p-8 max-w-sm bg-white rounded-[24px] shadow-[0_2px_8px_rgb(0,0,0,0.04)] text-center border border-gray-100">
          <p className="text-gray-900 font-semibold text-lg">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 px-6 py-2 bg-gray-900 hover:bg-black text-white font-medium rounded-lg text-sm transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 selection:bg-gray-900 selection:text-white pb-20 font-sans">
      <Head>
        <title>Analysis Result - ResumeAnalyzer</title>
      </Head>

      {/* Clean Stripe Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
          <div className="flex items-center gap-2 cursor-pointer pointer-events-none">
            <div className="w-6 h-6 bg-gray-900 text-white rounded-md flex items-center justify-center font-bold text-[10px] shadow-sm">
              RA
            </div>
          </div>
          <div className="w-16"></div> {/* Spacer for balance */}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analysis Result</h1>
          <p className="text-gray-500 mt-2 font-medium">Detailed breakdown of your resume semantics.</p>
        </div>

        {/* ATS Score Section */}
        <div className="bg-white rounded-[24px] shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-gray-200/60 mb-8 overflow-hidden hover:shadow-[0_4px_16px_rgb(0,0,0,0.06)] transition-all duration-300">
          <ModernScore score={data.ats_score} />

          <div className="border-t border-gray-100 bg-gray-50/50 p-6 md:p-8">
            <div className="flex gap-4">
              <FileText className="w-6 h-6 text-gray-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Executive Summary</h3>
                <p className="text-gray-700 leading-relaxed font-medium">{data.summary}</p>
                <div className="mt-4 pt-4 border-t border-gray-200/50 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verdict:</span>
                  <span className="text-sm font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">{data.final_verdict}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses (2 Column) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_4px_rgb(0,0,0,0.02)] border border-gray-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100/50">
                <Check className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Strengths</h2>
            </div>
            <ul className="space-y-4">
              {data.strengths.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-green-500 font-bold mt-0.5">•</span>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">{s}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_4px_rgb(0,0,0,0.02)] border border-gray-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 border border-red-100/50">
                <X className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Weaknesses</h2>
            </div>
            <ul className="space-y-4">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-red-400 font-bold mt-0.5">•</span>
                  <p className="text-gray-600 text-sm leading-relaxed font-medium">{w}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Keywords */}
        <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-gray-200/60 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <Target className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Keyword Analysis</h2>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Matched Criteria</p>
              <div className="flex flex-wrap gap-2">
                {data.keyword_analysis?.matched_keywords?.map((kw, i) => (
                  <div key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
                    {kw}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-px bg-gray-100 w-full" />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Missing Potential</p>
              <div className="flex flex-wrap gap-2">
                {data.keyword_analysis?.missing_keywords?.map((kw, i) => (
                  <div key={i} className="px-3 py-1.5 bg-white border border-gray-200 border-dashed rounded-lg text-sm font-medium text-gray-500">
                    {kw}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="bg-gray-900 p-8 md:p-10 rounded-[24px] shadow-lg mb-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-white tracking-tight">Action Plan</h2>
            </div>
            <div className="space-y-6">
              {data.action_plan.map((plan, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-6 h-6 rounded bg-gray-800 text-gray-400 flex items-center justify-center text-xs font-black shrink-0 border border-gray-700 group-hover:bg-white group-hover:text-gray-900 transition-colors">
                    {i + 1}
                  </div>
                  <p className="text-gray-300 leading-relaxed font-medium">
                    {plan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
