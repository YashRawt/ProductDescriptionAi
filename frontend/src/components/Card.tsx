const badgeColors = {
  Premium: "bg-amber-50 text-amber-700 border-amber-200",
  Trending: "bg-rose-50 text-rose-700 border-rose-200",
  Bestseller: "bg-emerald-50 text-emerald-700 border-emerald-200",
  New: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function Card({ title, description, badge, emoji = "🍽️", tone }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-xl hover:shadow-gray-100/80 hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center text-2xl shadow-sm">
          {emoji}
        </div>
        {badge && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeColors[badge] ?? "bg-gray-50 text-gray-600 border-gray-200"}`}>
            {badge}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{description}</p>
      </div>

      {tone && (
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Tone: <span className="font-medium text-emerald-700">{tone}</span>
        </div>
      )}

      <button className="mt-auto w-full py-2.5 rounded-xl border border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-50 hover:border-emerald-300 transition-colors group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600">
        Generate Description
      </button>
    </div>
  );
}
