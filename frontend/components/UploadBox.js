import { useState, useRef } from "react";
import { UploadCloud, File as FileIcon, Loader2, ArrowRight } from "lucide-react";
import api from "../utils/api";

export default function UploadBox({ onResult }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave" || e.type === "drop") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        try {
            const uploadData = await api.uploadResume(file);
            const analysisData = await api.analyzeResume(uploadData.resume_id, "");
            onResult(analysisData);
        } catch (err) {
            console.error(err);
            alert(err.message || 'Error parsing resume.');
        } finally {
            setLoading(false);
            setFile(null);
        }
    };

    return (
        <div className="bg-white p-8 rounded-[24px] border border-gray-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.04)] w-full">
            <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">Upload Resume</h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">Drag and drop your document to begin the ATS scan.</p>
            </div>

            <div
                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 transition-all duration-200 ease-in-out cursor-pointer ${dragActive
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    } ${file ? 'border-gray-900 bg-gray-50/50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !file && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {file ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-900 shadow-sm border border-gray-200">
                            <FileIcon className="w-5 h-5" />
                        </div>
                        <p className="font-semibold text-gray-900 tracking-tight text-sm">{file.name}</p>
                        <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                            className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-600 shadow-sm border border-gray-200">
                            <UploadCloud className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">Click to upload <span className="text-gray-500">or drag and drop</span></p>
                            <p className="text-xs text-gray-400 font-medium mt-1">PDF or DOCX (Max 5MB)</p>
                        </div>
                    </div>
                )}
            </div>

            {file && (
                <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="mt-6 w-full flex items-center justify-center h-11 bg-gray-900 hover:bg-black text-white px-6 font-medium tracking-wide rounded-xl transition-all shadow-[0_2px_4px_rgb(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgb(0,0,0,0.1)] disabled:opacity-70"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing document...
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            Analyze Resume <ArrowRight className="w-4 h-4" />
                        </div>
                    )}
                </button>
            )}
        </div>
    );
}
