import React from 'react';
import { Train, Download, Code2, BookOpen, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { getMetroStats } from '../utils/filterMetro';

interface HeaderProps {
  onOpenGlossary: () => void;
  onOpenExportModal: () => void;
  onDownloadHtml: () => void;
  langMode: 'bilingual' | 'ja' | 'vi';
  onLangModeChange: (mode: 'bilingual' | 'ja' | 'vi') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGlossary,
  onOpenExportModal,
  onDownloadHtml,
  langMode,
  onLangModeChange
}) => {
  const stats = getMetroStats();

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-500 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Train className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>METRO HÀ NỘI</span>
                  <span className="text-slate-400 text-sm font-normal">|</span>
                  <span className="text-emerald-400 font-semibold text-base sm:text-lg">ハノイ都市鉄道</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Google My Maps + 日本語対訳
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                Bản đồ quy hoạch 16 tuyến metro, các ga và dự án kết nối song ngữ Việt - Nhật (ハノイメトロ完全路線ガイド)
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <div className="bg-slate-800/90 p-1 rounded-lg border border-slate-700 flex items-center text-xs">
              <button
                type="button"
                onClick={() => onLangModeChange('bilingual')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                  langMode === 'bilingual'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Hiển thị song song cả Tiếng Việt và Tiếng Nhật"
              >
                Song ngữ (並列)
              </button>
              <button
                type="button"
                onClick={() => onLangModeChange('ja')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                  langMode === 'ja'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Ưu tiên hiển thị Tiếng Nhật"
              >
                日本語 (Japanese)
              </button>
              <button
                type="button"
                onClick={() => onLangModeChange('vi')}
                className={`px-2.5 py-1.5 rounded-md font-medium transition ${
                  langMode === 'vi'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                title="Hiển thị bản Tiếng Việt gốc"
              >
                Tiếng Việt (Gốc)
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenGlossary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
              title="Tra cứu từ vựng đường sắt đô thị Việt - Nhật"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Từ Vựng</span>
              <span>用語集</span>
            </button>

            <button
              type="button"
              onClick={onOpenExportModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition"
              title="Xem và sao chép mã nguồn HTML Bootstrap"
            >
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Mã HTML</span>
            </button>

            <button
              type="button"
              onClick={onDownloadHtml}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md transition"
              title="Tải về file HTML Bootstrap độc lập chứa bản đồ và bản dịch"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file HTML</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Train className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tổng số: <strong className="text-white">{stats.totalLines} Tuyến (16路線)</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
            <span>Vận hành: <strong className="text-emerald-400">2 Tuyến (2A, 3*)</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Thi công: <strong className="text-amber-400">2 Tuyến (2, 5)</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Quy hoạch: <strong className="text-sky-400">~{stats.totalKm} km</strong></span>
          </div>
        </div>

      </div>
    </header>
  );
};
