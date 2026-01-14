import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  TrendingUp,
  Target,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Download,
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Circular Progress Component
const CircularProgress = ({ value, size = 120, strokeWidth = 10, color = 'text-indigo-600', label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-slate-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={`${color} transition-all duration-1000 ease-out`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
          <span className="text-3xl font-bold">{Math.round(value)}%</span>
        </div>
      </div>
      {label && <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>}
    </div>
  );
};

export default function AnalysisPage() {
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock analysis data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call to get analysis data
    const fetchData = async () => {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockData = {
        ats_score: 78,
        keyword_match_score: 82,
        skill_coverage_score: 75,
        extracted_skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS'],
        extracted_education: ['B.S. Computer Science, University of California, 2020'],
        extracted_experience: ['Software Engineer at Tech Corp (2020-Present)', 'Junior Developer at Startup Inc (2019-2020)'],
        extracted_projects: ['E-commerce Platform', 'Task Management System', 'Weather Forecasting App'],
        missing_skills: ['Docker', 'Kubernetes', 'TypeScript', 'GraphQL'],
        weak_bullet_points: ['Helped with project development', 'Assisted in bug fixing'],
        ai_suggestions: [
          'Quantify your achievements with specific metrics (e.g., "Increased efficiency by 20%").',
          'Use stronger action verbs at the beginning of bullet points.',
          'Include more technical keywords relevant to your target roles.',
          'Add specific technologies used in your projects.'
        ],
        improved_bullets: [
          {
            original: "Helped with project development",
            improved: "Collaborated with cross-functional team to develop a customer-facing application using React and Node.js, resulting in 25% increase in user engagement."
          },
          {
            original: "Assisted in bug fixing",
            improved: "Identified and resolved critical performance bottlenecks in legacy systems, reducing response time by 40%."
          }
        ]
      };

      setAnalysisData(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-slate-600 font-medium">Analyzing your resume against industry standards...</p>
          <Progress value={60} className="w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Head>
        <title>Resume Analysis - AI Resume Analyzer</title>
      </Head>

      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
        <div className="text-xl font-bold text-slate-800">ResumeAI</div>
        <div className="w-32"></div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analysis Report</h1>
              <p className="text-slate-500 mt-2">Comprehensive AI evaluation of your resume.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ATS Compatibility Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4 flex justify-center pb-6">
                <CircularProgress
                  value={analysisData.ats_score}
                  size={140}
                  color={getScoreColor(analysisData.ats_score)}
                />
              </CardContent>
              <CardFooter className="justify-center pt-0 pb-6 text-sm text-muted-foreground">
                {getScoreLabel(analysisData.ats_score)}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Keyword Match</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4 flex justify-center pb-6">
                <CircularProgress
                  value={analysisData.keyword_match_score}
                  size={140}
                  color={getScoreColor(analysisData.keyword_match_score)}
                />
              </CardContent>
              <CardFooter className="justify-center pt-0 pb-6 text-sm text-muted-foreground">
                Matched against Top Software Roles
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skill Coverage</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4 flex justify-center pb-6">
                <CircularProgress
                  value={analysisData.skill_coverage_score}
                  size={140}
                  color={getScoreColor(analysisData.skill_coverage_score)}
                />
              </CardContent>
              <CardFooter className="justify-center pt-0 pb-6 text-sm text-muted-foreground">
                vs. Industry Requirements
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Strengths
                    </CardTitle>
                    <CardDescription>Areas where your resume stands out.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-green-100 p-1 rounded-full"><CheckCircle className="w-3 h-3 text-green-600" /></div>
                        <span className="text-sm text-slate-700">Strong technical skills in JavaScript, React, and Node.js.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-green-100 p-1 rounded-full"><CheckCircle className="w-3 h-3 text-green-600" /></div>
                        <span className="text-sm text-slate-700">Relevant work experience clearly highlighted.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-green-100 p-1 rounded-full"><CheckCircle className="w-3 h-3 text-green-600" /></div>
                        <span className="text-sm text-slate-700">Project section demonstrates practical application.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                      Areas for Improvement
                    </CardTitle>
                    <CardDescription>Critical gaps that need attention.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-amber-100 p-1 rounded-full"><AlertTriangle className="w-3 h-3 text-amber-600" /></div>
                        <span className="text-sm text-slate-700">Lack of containerization skills (Docker, K8s).</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-amber-100 p-1 rounded-full"><AlertTriangle className="w-3 h-3 text-amber-600" /></div>
                        <span className="text-sm text-slate-700">Bullet points lack quantifiable metrics.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-3 mt-1 bg-amber-100 p-1 rounded-full"><AlertTriangle className="w-3 h-3 text-amber-600" /></div>
                        <span className="text-sm text-slate-700">Missing modern tech stack keywords like Typescript.</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skill Analysis</CardTitle>
                  <CardDescription>Gap analysis between your skills and job market demands.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Extracted Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.extracted_skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="px-3 py-1 text-indigo-700 bg-indigo-50 hover:bg-indigo-100">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-red-600">Missing Critical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.missing_skills.map((skill, i) => (
                        <Badge key={i} variant="destructive" className="px-3 py-1 bg-red-50 text-red-700 border-red-200 hover:bg-red-100">{skill}</Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Adding these skills can improve your ATS score by up to 15%.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="improvements" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center"><Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />AI-Powered Rewrite Suggestions</CardTitle>
                  <CardDescription>Smart suggestions to enhance impact and clarity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-2">General Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-blue-800">
                      {analysisData.ai_suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    {analysisData.improved_bullets.map((item, i) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
                        <div>
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Before</span>
                          <p className="text-sm text-slate-600 mt-1">{item.original}</p>
                        </div>
                        <div className="md:border-l pl-0 md:pl-4">
                          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">After (AI Improved)</span>
                          <p className="text-sm text-slate-800 mt-1 font-medium">{item.improved}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisData.extracted_education.map((e, i) => (
                      <div key={i} className="flex gap-3 mb-4 last:mb-0">
                        <div className="bg-slate-100 p-2 rounded h-fit"><FileText className="w-4 h-4 text-slate-500" /></div>
                        <p className="text-sm">{e}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Experience</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {analysisData.extracted_experience.map((e, i) => (
                      <div key={i} className="flex gap-3 mb-4 last:mb-0">
                        <div className="bg-slate-100 p-2 rounded h-fit"><FileText className="w-4 h-4 text-slate-500" /></div>
                        <p className="text-sm">{e}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

        </motion.div>
      </div>
    </div>
  );
}
