import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Upload,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  Check,
  Star,
  Shield,
  Rocket,
  Globe,
  Sparkles
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: "ATS Score Analysis",
      description: "Get your resume's ATS compatibility score instantly to increase interview chances."
    },
    {
      icon: <Target className="w-6 h-6 text-indigo-500" />,
      title: "Skill Gap Analysis",
      description: "Identify missing skills compared to your target job roles with precision."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "AI-Powered Suggestions",
      description: "Receive personalized, actionable recommendations to improve your resume content."
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Head>
        <title>ResumeAI - Level Up Your Career with AI</title>
        <meta name="description" content="The ultimate AI-powered resume analyzer and job matching engine." />
      </Head>

      {/* Navigation */}
      <nav className="border-b bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Rocket className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">ResumeAI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-md px-6 font-semibold">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-bold shadow-sm">
              <Sparkles className="w-4 h-4 fill-indigo-700" />
              New: AI-Powered Job Match Engine v2.0
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-slate-950 tracking-tight leading-[1.1] mb-8"
          >
            Check your resume <br />
            <span className="text-indigo-600">ATS score instantly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-12 leading-relaxed"
          >
            Land your dream job faster. Our AI analyzes your resume against 50,000+ job descriptions to give you the competitive edge.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <Link href="/upload">
              <Button size="lg" className="h-16 px-10 text-xl font-bold bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-2xl shadow-indigo-200">
                <Upload className="w-6 h-6 mr-3" />
                Analyze My Resume
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold rounded-2xl border-slate-200 bg-white">
              Explore Job Roles
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-col items-center"
          >
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by developers from</p>
            <div className="flex flex-wrap justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-2xl font-bold">Google</div>
              <div className="text-2xl font-bold">Microsoft</div>
              <div className="text-2xl font-bold">Meta</div>
              <div className="text-2xl font-bold">Amazon</div>
              <div className="text-2xl font-bold">Airbnb</div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-4xl font-black text-slate-900 mb-2">94%</div>
              <div className="text-sm font-bold text-slate-500 uppercase">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900 mb-2">50k+</div>
              <div className="text-sm font-bold text-slate-500 uppercase">Resumes Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900 mb-2">10k+</div>
              <div className="text-sm font-bold text-slate-500 uppercase">Jobs Matched</div>
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900 mb-2">4.9/5</div>
              <div className="text-sm font-bold text-slate-500 uppercase">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <h2 className="text-indigo-600 font-bold tracking-widest uppercase mb-4">Core Technology</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Everything you need to beat the ATS.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 border border-slate-200">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 text-white">
              <h3 className="text-4xl md:text-5xl font-black leading-tight mb-8">Secure. Private. Professional.</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1 text-white">GDPR Compliant</div>
                    <p className="text-indigo-100">Your data is yours. We encrypt everything and never sell your information.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-bold mb-1 text-white">Global Standards</div>
                    <p className="text-indigo-100">Optimized for job markets in North America, Europe, and Asia.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-3xl shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center shadow-lg -rotate-12 border-4 border-white">
                  <Star className="w-10 h-10 text-white fill-white" />
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-xl text-slate-800 font-medium mb-6 italic leading-relaxed">
                  "I was struggling to get interviews for 3 months. After using ResumeAI, I received 4 interview calls in just one week. The skill gap analysis was a game changer!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full" />
                  <div>
                    <div className="font-bold text-slate-900">Sarah Jenkins</div>
                    <div className="text-sm text-slate-500 font-medium text-indigo-600">Senior Product Manager</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-600 mb-12">Choose the plan that fits your career goals.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border shadow-lg bg-white relative overflow-hidden text-left p-2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Free</CardTitle>
                <CardDescription>Perfect for a quick resume check.</CardDescription>
                <div className="text-4xl font-black mt-4">₹0</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> 1 AI Resume Analysis</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> Basic ATS Score</li>
                  <li className="flex items-center gap-3 text-slate-400"><Check className="w-5 h-5 opacity-50" /> Detailed Feedback</li>
                  <li className="flex items-center gap-3 text-slate-400"><Check className="w-5 h-5 opacity-50" /> Job Description Match</li>
                </ul>
                <Button className="w-full bg-slate-100 text-slate-900 shadow-none hover:bg-slate-200">Current Plan</Button>
              </CardContent>
            </Card>
            <Card className="border-2 border-indigo-600 shadow-xl bg-white relative overflow-hidden text-left p-2">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                <CardDescription>Maximize your interview chances.</CardDescription>
                <div className="text-4xl font-black mt-4">₹99 <span className="text-base text-slate-500 font-normal">/ 3 reports</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> 3 AI Resume Analyses</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> Detailed Strengths & Weaknesses</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> AI Bullet Improvements</li>
                  <li className="flex items-center gap-3"><Check className="w-5 h-5 text-indigo-600" /> Job Description Match</li>
                </ul>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Upgrade Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Rocket className="w-6 h-6 text-indigo-400" />
                <span className="text-2xl font-bold text-white">ResumeAI</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                The world's most advanced AI platform for job seekers and career professionals.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6">Platform</h5>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="#">ATS Analyzer</Link></li>
                <li><Link href="#">Job Matching</Link></li>
                <li><Link href="#">Resume Builder</Link></li>
                <li><Link href="#">Cover Letter AI</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="#">About Us</Link></li>
                <li><Link href="#">Careers</Link></li>
                <li><Link href="#">Privacy Policy</Link></li>
                <li><Link href="#">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6">Newsletter</h5>
              <p className="text-slate-400 text-sm mb-4">Get career tips delivered to your inbox.</p>
              <div className="flex gap-2">
                <input type="email" className="flex h-10 w-full rounded-md bg-white/10 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="you@email.com" />
                <Button className="bg-indigo-600 hover:bg-indigo-700">Join</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <div>© 2024 ResumeAI. Built for high achievers.</div>
            <div className="flex gap-8">
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
