import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import Stats from "@/components/Stats";
import UploadBox from "@/components/UploadBox";
import History from "@/components/History";
import api from "@/utils/api";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const fetchDashboardContext = async () => {
    try {
      // Authenticate via network call mapping API utility
      const meResult = await api.getMe();
      setUser(meResult);

      // Fetch History
      const data = await api.getResumeHistory();
      setHistory(data);
      setLoadingHistory(false);
    } catch (err) {
      // Redirect if auth missing or network failed (unauthed)
      console.error("Dashboard auth failed", err);
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchDashboardContext();
  }, [router]);

  // Handle uploaded JSON routing jump
  const handleAnalysisResult = (data) => {
    // Re-fetch to seamlessly update the board, wait no, let's just reload.
    fetchDashboardContext();
  };

  // Compile Dynamic Data
  const validScores = history
    .map(h => h.ats_score)
    .filter(s => typeof s === 'number' && !isNaN(s));

  const bestScore = validScores.length > 0 ? Math.max(...validScores) : 0;

  const stats = [
    { title: "Total Scans", value: history.length },
    { title: "Peak ATS", value: bestScore },
    { title: "Active Plan", value: user?.plan?.toUpperCase() || "FREE" },
  ];

  if (!user && loadingHistory) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans">
      <Head>
        <title>Dashboard - ATS Analyzer</title>
      </Head>

      <div className="max-w-5xl mx-auto">
        <Navbar user={user} />
        <Stats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <UploadBox onResult={handleAnalysisResult} />
          </div>
          <div>
            <History data={history} />
          </div>
        </div>
      </div>
    </div>
  );
}
