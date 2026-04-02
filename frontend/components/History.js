import Link from 'next/link';
import { ChevronRight, File } from 'lucide-react';

export default function History({ data }) {
    return (
        <div className="bg-white p-8 rounded-[24px] border border-gray-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.04)] w-full">
            <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight text-gray-900">Scan History</h2>
                <p className="text-sm text-gray-500 mt-1 font-medium">Your previously parsed documents and scores.</p>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-2xl">
                    <File className="w-8 h-8 text-gray-300 mb-3" />
                    <p className="text-sm font-medium text-gray-500">No history found.</p>
                    <p className="text-xs text-gray-400 mt-1">Upload a resume to get started.</p>
                </div>
            ) : (
                <div className="flex flex-col space-y-2">
                    {data.map((item) => (
                        <Link
                            href={`/analysis?id=${item.id}`}
                            key={item.id}
                            className="group flex justify-between items-center p-4 hover:bg-gray-50/80 border border-transparent hover:border-gray-200/60 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shadow-sm border border-gray-200/50 group-hover:scale-105 transition-transform duration-200">
                                    <File className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm tracking-tight">{item.filename}</h4>
                                    <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wider mt-1">
                                        {new Date(item.uploaded_at).toLocaleDateString(undefined, {
                                            month: 'short', day: 'numeric', year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end justify-center">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5">Score</span>
                                    <span className={`text-base font-bold tracking-tight ${item.ats_score >= 80 ? 'text-green-600' : 'text-gray-900'}`}>
                                        {item.ats_score !== null ? item.ats_score : '—'}
                                    </span>
                                </div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 group-hover:text-gray-900 group-hover:bg-white group-hover:shadow-[0_2px_4px_rgb(0,0,0,0.06)] border border-transparent group-hover:border-gray-200 transition-all duration-200">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
