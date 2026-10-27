import React, { useState } from 'react';
import { Map, ExternalLink, RotateCw, Maximize2, Minimize2, Layers, Check, Info } from 'lucide-react';

export const MapEmbedSection: React.FC = () => {
  const [mapHeight, setMapHeight] = useState<'normal' | 'tall' | 'extra'>('normal');
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState(false);

  const iframeSrc = "https://www.google.com/maps/d/embed?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s&ehbc=2E312F";
  const directMapsUrl = "https://www.google.com/maps/d/viewer?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s";

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directMapsUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const heightClasses = {
    normal: 'h-[460px] sm:h-[540px]',
    tall: 'h-[650px] sm:h-[720px]',
    extra: 'h-[85vh]'
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-all">
      {/* Map Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-emerald-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Map className="w-5 h-5 text-emerald-700" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Bản Đồ Quy Hoạch Đường Sắt Đô Thị Hà Nội (Google My Maps)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ハノイ都市鉄道路線図・Vinhomes都市開発・空港境界線 埋め込みマップ（拡大・縮小・レイヤー表示対応）
          </p>
        </div>

        {/* Map Toolbar Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Height Switcher */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setMapHeight('normal')}
              className={`px-2 py-1 rounded-md font-medium transition ${
                mapHeight === 'normal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kích thước vừa"
            >
              Tiêu chuẩn
            </button>
            <button
              type="button"
              onClick={() => setMapHeight('tall')}
              className={`px-2 py-1 rounded-md font-medium transition ${
                mapHeight === 'tall' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kích thước mở rộng"
            >
              Rộng lớn
            </button>
            <button
              type="button"
              onClick={() => setMapHeight('extra')}
              className={`px-2 py-1 rounded-md font-medium transition ${
                mapHeight === 'extra' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Toàn màn hình dọc"
            >
              Cực đại
            </button>
          </div>

          {/* Reload Button */}
          <button
            type="button"
            onClick={handleReload}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            title="Tải lại bản đồ"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* External Google Maps Link */}
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
            title="Mở Google Maps toàn trang trong tab mới"
          >
            <span>Mở tab mới (別タブ)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Iframe Container */}
      <div className={`relative w-full ${heightClasses[mapHeight]} bg-slate-100 transition-all duration-300`}>
        <iframe
          key={iframeKey}
          src={iframeSrc}
          title="Google My Maps Hanoi Metro Network Embed"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>

      {/* Map Sub-footer & Layers guide */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Các lớp dữ liệu trong bản đồ:
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
            Tuyến Metro Hà Nội (16 Tuyến)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
            Dự án Vinhomes (20 điểm)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
            Ga & Ranh giới (200+ điểm)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
            Sân bay (Nội Bài & Gia Bình)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>Bấm biểu tượng <strong className="text-slate-800">[ ]</strong> góc trên bên phải khung bản đồ để xem chi tiết danh sách trạm.</span>
        </div>
      </div>
    </section>
  );
};
