import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Target,
    ArrowLeft,
    Briefcase,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle,
    ExternalLink,
    ChevronRight,
    TrendingUp,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Simulate fetching job matches
        const fetchJobs = async () => {
            await new Promise(resolve => setTimeout(resolve, 1200));

            const mockJobs = [
                {
                    id: '1',
                    title: 'Senior Software Engineer',
                    company: 'TechFlow Systems',
                    location: 'San Francisco, CA (Remote)',
                    type: 'Full-time',
                    matchScore: 94,
                    salary: '$140k - $180k',
                    skills: ['React', 'Node.js', 'Typescript', 'AWS'],
                    missingSkills: ['Kubernetes']
                },
                {
                    id: '2',
                    title: 'Full Stack Developer',
                    company: 'Innovate AI',
                    location: 'New York, NY',
                    type: 'Full-time',
                    matchScore: 88,
                    salary: '$120k - $160k',
                    skills: ['JavaScript', 'React', 'Python', 'PostgreSQL'],
                    missingSkills: ['Docker']
                },
                {
                    id: '3',
                    title: 'Backend Engineer',
                    company: 'CloudScale',
                    location: 'Austin, TX (Hybrid)',
                    type: 'Full-time',
                    matchScore: 76,
                    salary: '$130k - $170k',
                    skills: ['Node.js', 'Go', 'SQL', 'Redis'],
                    missingSkills: ['GraphQL', 'Terraform']
                },
                {
                    id: '4',
                    title: 'Frontend Lead',
                    company: 'DesignWorks',
                    location: 'Seattle, WA',
                    type: 'Full-time',
                    matchScore: 91,
                    salary: '$150k - $190k',
                    skills: ['React', 'Tailwind CSS', 'Redux', 'Testing Library'],
                    missingSkills: []
                }
            ];

            setJobs(mockJobs);
            setLoading(false);
        };

        fetchJobs();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getMatchColor = (score) => {
        if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        if (score >= 80) return 'text-blue-600 bg-blue-50 border-blue-100';
        if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-100';
        return 'text-slate-600 bg-slate-50 border-slate-100';
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Head>
                <title>Job Matches - AI Resume Analyzer</title>
            </Head>

            {/* Navigation */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/dashboard" className="flex items-center text-slate-600 hover:text-slate-900 transition">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        <span className="font-semibold">Back to Dashboard</span>
                    </Link>
                </div>
                <div className="text-xl font-bold text-slate-800">ResumeAI</div>
                <div className="w-32"></div>
            </nav>

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Personalized Job Matches</h1>
                        <p className="text-slate-500 mt-2">We've found these roles based on your latest resume analysis.</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by role or company..."
                                className="pl-10 h-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">Filter</Button>
                            <Button variant="outline">Sort by Match</Button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <Card key={i} className="animate-pulse">
                                    <div className="h-32 bg-slate-100 rounded-lg"></div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => (
                                    <Card key={job.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                                        <CardContent className="p-0">
                                            <div className="p-6">
                                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                                                            <Briefcase className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                                {job.title}
                                                            </h3>
                                                            <p className="text-slate-600 font-medium">{job.company}</p>

                                                            <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-500">
                                                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                                                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                                                                <span className="font-semibold text-slate-700">{job.salary}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getMatchColor(job.matchScore)}`}>
                                                            <TrendingUp className="w-4 h-4" />
                                                            <span className="text-sm font-bold">{job.matchScore}% Match</span>
                                                        </div>
                                                        <p className="text-xs text-slate-400">Compatible with your profile</p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
                                                    <div className="w-full md:max-w-md">
                                                        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                                                            <span>Skill Alignment</span>
                                                            <span>{job.skills.length} matched</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.skills.map((skill, i) => (
                                                                <Badge key={i} variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100">
                                                                    <CheckCircle2 className="w-3 h-3 mr-1" /> {skill}
                                                                </Badge>
                                                            ))}
                                                            {job.missingSkills.map((skill, i) => (
                                                                <Badge key={i} variant="outline" className="text-slate-400 border-dashed">
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 w-full md:w-auto">
                                                        <Button variant="ghost" className="flex-1 md:flex-none">Save</Button>
                                                        <Button className="flex-1 md:flex-none">
                                                            Apply Now <ExternalLink className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                                    <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-slate-900">No matches found</h3>
                                    <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
                                    <Button variant="outline" className="mt-6" onClick={() => setSearchTerm('')}>Clear Search</Button>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
