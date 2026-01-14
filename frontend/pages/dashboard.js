import Head from 'next/head';
import { useState } from 'react';
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Settings,
  User,
  LogOut,
  Plus,
  Search,
  Bell,
  Eye,
  Download,
  Target,
  ArrowRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Resumes', value: '3', icon: <FileText className="w-5 h-5" />, color: 'bg-blue-500' },
    { label: 'Avg. ATS Score', value: '85', icon: <Target className="w-5 h-5" />, color: 'bg-emerald-500' },
    { label: 'Avg. Match', value: '88%', icon: <Briefcase className="w-5 h-5" />, color: 'bg-indigo-500' },
    { label: 'Jobs Found', value: '24', icon: <Search className="w-5 h-5" />, color: 'bg-purple-500' },
  ];

  const recentResumes = [
    { id: 1, name: 'john_doe_resume.pdf', date: 'Nov 15, 2023', atsScore: 78, keywordMatch: 82, status: 'Completed' },
    { id: 2, name: 'john_doe_updated_resume.pdf', date: 'Nov 20, 2023', atsScore: 85, keywordMatch: 89, status: 'Completed' },
    { id: 3, name: 'software_engineer_application.docx', date: 'Nov 25, 2023', atsScore: 92, keywordMatch: 94, status: 'Completed' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Head>
        <title>Dashboard - AI Resume Analyzer</title>
      </Head>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            ResumeAI
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<FileText size={20} />} label="My Resumes" active={activeTab === 'resumes'} onClick={() => setActiveTab('resumes')} />
          <NavItem icon={<Search size={20} />} label="Job Matches" active={activeTab === 'jobs'} href="/jobs" />
          <NavItem icon={<BarChart3 size={20} />} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>

        <div className="p-4 border-t space-y-2">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Logout" color="text-red-500 hover:bg-red-50 hover:text-red-600" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="relative w-96 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input className="pl-10 h-10 border-none bg-slate-100 focus-visible:ring-1 focus-visible:ring-indigo-100" placeholder="Search resumes, jobs..." />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold text-slate-900">John Doe</div>
                <div className="text-xs text-slate-500">Free Account</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                JD
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Performance Overview</h1>
              <p className="text-slate-500 mt-1">Monitor your career progression and resume impact.</p>
            </div>
            <Link href="/upload">
              <Button className="bg-indigo-600 hover:bg-indigo-700 h-11 px-6 shadow-lg shadow-indigo-100">
                <Plus className="w-5 h-5 mr-2" /> New Analysis
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${stat.color} text-white`}>
                      {stat.icon}
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-600">All time</Badge>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent History */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
                  <div>
                    <CardTitle className="text-xl">Recent Analyses</CardTitle>
                    <CardDescription>View and manage your recent resume uploads.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {recentResumes.map((resume) => (
                      <div key={resume.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 truncate max-w-[200px]">{resume.name}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                              {resume.date} • <span className="text-green-600 font-medium">Completed</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                          <div className="flex gap-4 mb-1">
                            <ScoreBadge label="ATS" score={resume.atsScore} />
                            <ScoreBadge label="Match" score={resume.keywordMatch} />
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/analysis?id=${resume.id}`} className="w-full sm:w-auto">
                              <Button variant="ghost" size="sm" className="w-full sm:w-auto text-slate-500 hover:text-indigo-600">
                                <Eye className="w-4 h-4 mr-1.5" /> View
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-slate-500 hover:text-slate-900">
                              <Download className="w-4 h-4 mr-1.5" /> PDF
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Cards */}
            <div className="space-y-8">
              <Card className="bg-indigo-600 text-white border-none shadow-xl shadow-indigo-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <CardHeader>
                  <CardTitle className="text-white">Quick Boost</CardTitle>
                  <CardDescription className="text-indigo-100">Unlock AI-powered cover letter generation.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-indigo-50 mb-6">Upgrade to Pro for unlimited cover letters and advanced analytics.</p>
                  <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold border-none transition-transform hover:scale-[1.02]">
                    Upgrade to Pro
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Career Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProgressBar label="ATS Readiness" value={85} color="bg-emerald-500" />
                  <ProgressBar label="Keyword Coverage" value={72} color="bg-indigo-500" />
                  <ProgressBar label="Soft Skills" value={91} color="bg-amber-500" />

                  <div className="pt-4 border-t flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Current Standing</span>
                    <div className="flex items-center text-green-600 font-bold gap-1 text-sm">
                      <TrendingUp className="w-4 h-4" /> +12% this week
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick, href = '#', color = 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600' }) {
  const content = (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${active
          ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm shadow-indigo-50 border-r-4 border-indigo-600 rounded-r-none'
          : color
        }`}
    >
      <span className={active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600 transition-colors'}>
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );

  return href !== '#' ? <Link href={href}>{content}</Link> : content;
}

function ScoreBadge({ label, score }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">{label}</span>
      <span className={`text-sm font-bold ${score >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{score}</span>
    </div>
  );
}

function ProgressBar({ label, value, color }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs font-semibold text-slate-600">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
}
