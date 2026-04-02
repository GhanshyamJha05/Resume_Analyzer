import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2, Zap, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import api from '@/utils/api';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setFile(selectedFile);
    setError('');
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);
    setError('');
    setSuccess('');

    try {
      // 1. Upload Resume
      setUploadProgress(40);
      const uploadResult = await api.uploadResume(file);

      setUploadProgress(60);
      setSuccess('Resume uploaded successfully! Starting AI analysis...');

      // 2. Trigger Analysis
      const analysisResult = await api.analyzeResume(uploadResult.resume_id, jobDescription);

      setUploadProgress(100);
      setSuccess('Analysis complete! Redirecting...');

      // Redirect to analysis page with the resume ID
      setTimeout(() => {
        router.push(`/analysis?id=${uploadResult.resume_id}`);
      }, 1000);

    } catch (err) {
      setError(err.message || 'Upload or analysis failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Head>
        <title>Upload Resume - AI Resume Analyzer</title>
      </Head>

      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-semibold">Back</span>
          </Link>
        </div>
        <div className="text-xl font-bold text-slate-800">ResumeAI</div>
        <div className="w-20"></div> {/* Spacer for center alignment */}
      </nav>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight lg:text-5xl mb-4">
              Upload Your Resume
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get instant analysis, ATS scores, and AI-powered job matching suggestions.
            </p>
          </div>

          <Card className="border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm shadow-xl">
            <CardContent className="p-0">
              {/* Upload Area */}
              <div
                className={`flex flex-col items-center justify-center py-16 px-6 transition-colors ${file ? 'bg-indigo-50/50' : 'hover:bg-slate-50'}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="bg-indigo-100 p-4 rounded-full mb-6">
                  <Upload className="w-10 h-10 text-indigo-600" />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {file ? 'File Ready' : 'Drag & drop your resume'}
                </h3>

                <p className="text-slate-500 mb-8 text-center max-w-sm">
                  {file ? (
                    <span className="font-medium text-indigo-600 break-all">{file.name}</span>
                  ) : (
                    'Supports PDF and DOCX formats up to 5MB'
                  )}
                </p>

                <div className="relative">
                  {!file && (
                    <input
                      type="file"
                      id="file-upload"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  )}

                  {file ? (
                    <div className="flex gap-4">
                      <Button
                        onClick={uploadFile}
                        disabled={isUploading}
                        className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 text-md"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-5 w-5" />
                            Analyze Resume
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setFile(null)} disabled={isUploading} className="h-12 px-6">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" className="h-12 px-8 text-md border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800">
                      Browse Files
                    </Button>
                  )}
                </div>
              </div>

              {/* Optional Job Description */}
              <div className="px-8 pb-8 pt-4 border-t border-slate-100">
                <label htmlFor="job-description" className="block text-sm font-semibold text-slate-700 mb-2">
                  Target Job Description (Optional)
                </label>
                <textarea
                  id="job-description"
                  rows={4}
                  className="w-full text-slate-900 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm bg-white"
                  placeholder="Paste the job description here for an optimized ATS scan and keyword gap analysis against this specific role..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled={isUploading}
                />
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="px-8 pb-8">
                  <div className="flex justify-between text-sm mb-2 text-slate-600">
                    <span>Uploading & Analyzing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2 bg-slate-100" />
                </div>
              )}

              {/* Status Messages */}
              {(error || success) && (
                <div className="px-8 pb-8">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-lg flex items-center text-sm font-medium">
                      <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="p-4 bg-green-50 text-green-700 rounded-lg flex items-center text-sm font-medium">
                      <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      {success}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
              <CardHeader className="pb-2">
                <FileText className="w-8 h-8 text-indigo-500 mb-2" />
                <CardTitle className="text-lg">Supported Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>We support PDF and DOCX files. Ensure your file is text-readable.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
              <CardHeader className="pb-2">
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle className="text-lg">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Your personal data is processed securely and is never shared with third parties.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-white/80 backdrop-blur">
              <CardHeader className="pb-2">
                <Zap className="w-8 h-8 text-amber-500 mb-2" />
                <CardTitle className="text-lg">Instant Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get comprehensive analysis and job matching suggestions in seconds.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
