export default function Stats({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10 mt-8">
            {stats.map((item, i) => (
                <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border border-gray-200/60 shadow-[0_2px_8px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_16px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 ease-out flex flex-col justify-center"
                >
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{item.title}</p>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{item.value}</h2>
                </div>
            ))}
        </div>
    );
}
