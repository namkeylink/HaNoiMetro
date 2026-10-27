import React, { useState, useMemo } from 'react';
import { METRO_LINES, MetroLine } from './data/metroData';
import { filterMetroLines, generateStandaloneBootstrapHtml } from './utils/filterMetro';
import { Header } from './components/Header';
import { MapEmbedSection } from './components/MapEmbedSection';
import { LineCard } from './components/LineCard';
import { BilingualTable } from './components/BilingualTable';
import { VinhomesSection } from './components/VinhomesSection';
import { GlossaryModal } from './components/GlossaryModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import {
  Search,
  Filter,
  Layers,
  Table as TableIcon,
  LayoutGrid,
  Building2,
  CheckCircle,
  Clock,
  Compass,
  ArrowRight,
  Download,
  Info
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'operating' | 'construction' | 'planning'>('all');
  const [activeTab, setActiveTab] = useState<'cards' | 'table' | 'projects'>('cards');
  const [langMode, setLangMode] = useState<'bilingual' | 'ja' | 'vi'>('bilingual');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const filteredLines = useMemo(() => {
    return filterMetroLines(METRO_LINES, searchQuery, statusFilter);
  }, [searchQuery, statusFilter]);

  const handleDownloadStandalone = () => {
    const htmlContent = generateStandaloneBootstrapHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hanoi_metro_japanese_guide.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onDownloadHtml={handleDownloadStandalone}
        langMode={langMode}
        onLangModeChange={setLangMode}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Intro Hero Strip */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Dự Án Quy Hoạch Giao Thông Thủ Đô Hà Nội • ハノイ都市鉄道計画</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 leading-tight">
              Bản Đồ Tuyến Metro Hà Nội & Dịch Thuật Tiếng Nhật
            </h2>
            <p className="text-emerald-400 font-medium text-base sm:text-lg mb-3 font-sans">
              ハノイメトロ全16路線・主要駅名・沿線都市開発 日越バイリンガル完全ガイド
            </p>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              Nhúng trực tiếp bản đồ Google My Maps (<code>mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s</code>) kèm toàn bộ bảng dịch song ngữ Việt - Nhật cho từng tuyến tàu điện, lộ trình điểm đầu - cuối, các trạm dừng, tiến độ thi công và hệ thống đô thị Vinhomes kết nối.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 shadow transition"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Xuất file HTML / Bootstrap độc lập</span>
              </button>
              <button
                type="button"
                onClick={() => setIsGlossaryOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-900/60 text-emerald-200 hover:bg-emerald-900 border border-emerald-700/60 transition"
              >
                <span>Bảng tra từ vựng đường sắt Việt - Nhật</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Embedded Google My Maps Section */}
        <MapEmbedSection langMode={langMode} />

        {/* View Tabs & Search Filter Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Main Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('cards')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition ${
                  activeTab === 'cards'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4 text-emerald-600" />
                <span>Thẻ Các Tuyến (16 路線)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition ${
                  activeTab === 'table'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TableIcon className="w-4 h-4 text-blue-600" />
                <span>Bảng Đối Chiếu Song Ngữ (対訳表)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('projects')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition ${
                  activeTab === 'projects'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Dự Án Vinhomes & Sân Bay (沿線開発)</span>
              </button>
            </div>

            {/* Search Input Box */}
            <div className="flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tuyến, tên ga (Cát Linh, Nhổn, ニョン, 2A, M5...)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Status Filters Bar */}
          <div className="flex items-center flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Lọc trạng thái (状況):
            </span>
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả (全線: 16)
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('operating')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'operating'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Đang vận hành (運行中: 2)</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('construction')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'construction'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Đang thi công / Chuẩn bị (建設中: 2)</span>
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('planning')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                statusFilter === 'planning'
                  ? 'bg-sky-600 text-white'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Quy hoạch định hướng (計画中: 12)</span>
            </button>

            <span className="ml-auto text-slate-400 text-[11px]">
              Hiển thị: <strong className="text-slate-800">{filteredLines.length}</strong> / 16 tuyến
            </span>
          </div>
        </div>

        {/* Tab 1: Detailed Cards View */}
        {activeTab === 'cards' && (
          <div>
            {filteredLines.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                <p className="text-base font-semibold mb-1">Không tìm thấy tuyến nào phù hợp</p>
                <p className="text-xs text-slate-400 mb-4">
                  Không có kết quả nào cho từ khóa &quot;{searchQuery}&quot;. Vui lòng thử từ khóa khác.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
                {filteredLines.map((line) => (
                  <LineCard key={line.id} line={line} langMode={langMode} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Side-by-side Table View */}
        {activeTab === 'table' && (
          <BilingualTable lines={filteredLines} />
        )}

        {/* Tab 3: Vinhomes Projects and Airports */}
        {activeTab === 'projects' && (
          <VinhomesSection />
        )}

        {/* Detailed Masterplan Reference Info Box */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-8 text-xs text-slate-600 leading-relaxed shadow-2xs">
          <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Thông tin về Đồ Án Quy Hoạch Đường Sắt Đô Thị Hà Nội (ハノイ都市鉄道マスタープラン)</span>
          </h3>
          <p className="mb-2">
            Mạng lưới đường sắt đô thị Thủ đô Hà Nội được quy hoạch theo Quyết định số 519/QĐ-TTg của Thủ tướng Chính phủ và các đồ án điều chỉnh tổng thể quy hoạch chung Thủ đô Hà Nội đến năm 2030, tầm nhìn đến năm 2050. Tổng mạng lưới quy hoạch gồm 16 tuyến metro với tổng chiều dài dự kiến hơn 600 km, đóng vai trò trục xương sống vận tải hành khách công cộng, kết nối các quận lõi trung tâm với các đô thị vệ tinh lớn như Sóc Sơn, Mê Linh, Hòa Lạc, Sơn Tây, Xuân Mai, Phú Xuyên, Gia Lâm và chuỗi đại dự án đô thị thông minh hiện đại.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 text-slate-500 font-sans">
            <div>
              <strong className="text-slate-700 block mb-1">日本語解説 (Japanese Overview):</strong>
              ハノイ都市鉄道（Hanoi Metro）は、急増する交通渋滞と大気汚染の解消を目指し、ベトナム政府が推進する最優先国家インフラ事業です。2021年11月に2A号線（カットリン〜ハドン）が開業、2024年8月には3号線高架区間（ニョン〜カウザイ）が営業運転を開始しました。今後は都心地下を通る2号線（JICA支援）や、タンロン大通り沿いの5号線、空港連絡線などの早期整備が進められます。
            </div>
            <div>
              <strong className="text-slate-700 block mb-1">Đặc điểm lớp dữ liệu Google My Maps:</strong>
              Thẻ nhúng bản đồ tích hợp đầy đủ tọa độ trạm dừng (S1.01 - S1.30 cho Tuyến 1; S2.01 - S2.41 cho Tuyến 2; S8.01 - S8.55 cho Tuyến 8; S10.01 - S10.31 cho Tuyến 10; S14.01 - S14.26 cho Tuyến 14), các phân khu đô thị Vinhomes Olympic A, B, C, D, Cổ Loa, Ocean Park 1, 2, 3 và ranh giới Sân bay Gia Bình.
            </div>
          </div>
        </section>

      </main>

      {/* Global Modals */}
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <ExportHtmlModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Hanoi Metro Japanese Guide</span>
            <span>•</span>
            <span>Bản Đồ Tuyến Metro Hà Nội & Dịch Tiếng Nhật</span>
          </div>
          <div className="text-slate-400 text-center md:text-right">
            Dữ liệu bản đồ Google My Maps (mid: 1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s)
          </div>
        </div>
      </footer>
    </div>
  );
}
