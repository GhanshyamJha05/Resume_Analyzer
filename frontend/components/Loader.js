export default function Loader({ message = "Processing your resume..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_16px_rgb(0,0,0,0.06)] mb-6">
                <svg className="w-6 h-6 text-gray-900 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            <h3 className="text-base font-semibold text-gray-900 tracking-tight">{message}</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-sm text-center font-medium">
                Running proprietary algorithms against modern ATS parsers.
            </p>
        </div>
    );
}
