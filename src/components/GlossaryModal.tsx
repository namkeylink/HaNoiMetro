import React from 'react';
import { TRANSIT_GLOSSARY } from '../data/metroData';
import { X, BookOpen, Search } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = React.useState('');

  if (!isOpen) return null;

  const filteredGlossary = TRANSIT_GLOSSARY.filter((item) => {
    const q = filter.toLowerCase().trim();
    if (!q) return true;
    return (
      item.vi.toLowerCase().includes(q) ||
      item.ja.toLowerCase().includes(q) ||
      item.romaji.toLowerCase().includes(q) ||
      item.meaningVi.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <BookOpen className="w-5 h-5 text-amber-700" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                Từ Điển Thuật Ngữ Đường Sắt Đô Thị Việt - Nhật
              </h3>
              <p className="text-xs text-slate-500">
                日越都市鉄道・交通専門用語集（漢字・読み・日本語対訳・解説）
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Tìm kiếm thuật ngữ (ga ngầm, 地下駅, chika-eki, TBM...)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Glossary Table */}
        <div className="overflow-y-auto p-4 flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="py-2 px-3 font-semibold">Thuật ngữ Tiếng Việt</th>
                <th className="py-2 px-3 font-semibold text-emerald-800">日本語 (Japanese)</th>
                <th className="py-2 px-3 font-semibold">Romaji (Cách đọc)</th>
                <th className="py-2 px-3 font-semibold">Giải thích ý nghĩa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGlossary.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-bold text-slate-900">{item.vi}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700 text-sm">{item.ja}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{item.romaji}</td>
                  <td className="py-2.5 px-3 text-slate-600">{item.meaningVi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 transition"
          >
            Đóng (閉じる)
          </button>
        </div>
      </div>
    </div>
  );
};
