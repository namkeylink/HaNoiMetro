import React, { useState } from 'react';
import { Map, ExternalLink, RotateCw, Layers, Info, Sparkles, HelpCircle, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { InteractiveBilingualMap } from './InteractiveBilingualMap';

interface MapEmbedSectionProps {
  langMode?: 'bilingual' | 'ja' | 'vi';
}

export const MapEmbedSection: React.FC<MapEmbedSectionProps> = ({ langMode = 'bilingual' }) => {
  const [mapMode, setMapMode] = useState<'bilingual_map' | 'google_iframe'>('bilingual_map');
  const [mapHeight, setMapHeight] = useState<'normal' | 'tall'>('normal');
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [showHowToExplain, setShowHowToExplain] = useState<boolean>(true);

  const iframeSrc = "https://www.google.com/maps/d/embed?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s&ehbc=2E312F";
  const directMapsUrl = "https://www.google.com/maps/d/viewer?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s";

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const heightClasses = {
    normal: 'h-[500px] sm:h-[580px]',
    tall: 'h-[700px] sm:h-[780px]'
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-all">
      {/* Map Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-emerald-50/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Map className="w-5 h-5 text-emerald-700" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Bản Đồ Quy Hoạch Đường Sắt Đô Thị Hà Nội
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {mapMode === 'bilingual_map' ? 'Đang bật: Nhãn Tiếng Nhật & Tiếng Việt Trực Tiếp' : 'Đang bật: Google My Maps Gốc'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ハノイ都市鉄道路線図・Vinhomes都市開発・空港境界線（日越バイリンガル対話型マップ ＆ Googleマイマップ埋め込み）
          </p>
        </div>

        {/* Map View Mode Switcher */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex rounded-xl border border-emerald-300 bg-emerald-50/60 p-1 text-xs">
            <button
              type="button"
              onClick={() => setMapMode('bilingual_map')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition ${
                mapMode === 'bilingual_map'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-900 hover:bg-emerald-100/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bản đồ Nhúng Tiếng Nhật (日越マップ)</span>
            </button>
            <button
              type="button"
              onClick={() => setMapMode('google_iframe')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                mapMode === 'google_iframe'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-200/60'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Google My Maps Iframe gốc</span>
            </button>
          </div>

          {/* External Google Maps Link */}
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition"
            title="Mở Google Maps toàn trang trong tab mới"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Answer & Explanation Box about Embedding Japanese into the Map */}
      <div className="bg-gradient-to-r from-emerald-50/80 via-blue-50/50 to-indigo-50/40 p-4 border-b border-slate-200 text-xs">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span className="p-1.5 rounded-lg bg-emerald-200/80 text-emerald-900 flex-shrink-0 mt-0.5">
              <HelpCircle className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Giải đáp: &quot;Có nhúng tiếng Nhật vào map bên cạnh tiếng Việt được không?&quot;</span>
                <span className="text-emerald-700 font-semibold bg-white px-2 py-0.5 rounded border border-emerald-300">
                  Hoàn toàn được! (2 Cách)
                </span>
              </h3>
              
              {showHowToExplain ? (
                <div className="mt-2 space-y-2 text-slate-700 leading-relaxed">
                  <div className="p-2.5 rounded-lg bg-white/90 border border-emerald-200/90 shadow-2xs">
                    <strong className="text-emerald-800 font-bold block mb-1">
                      ✅ Cách 1 (Đã tích hợp sẵn ngay bên dưới - Khuyên dùng):
                    </strong>
                    Chúng tôi đã trích xuất toàn bộ tọa độ GIS và vẽ lại bản đồ tương tác với công nghệ GIS hiện đại. Khi bật chế độ <strong>&quot;Bản đồ Nhúng Tiếng Nhật (日越マップ)&quot;</strong>, các nhãn tuyến đường, tên ga, dự án Vinhomes và sân bay đều hiển thị <strong>Tiếng Nhật đặt song song ngay cạnh Tiếng Việt</strong> trực tiếp trên mặt bản đồ khi xem và rê chuột!
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/90 border border-blue-200/90 shadow-2xs">
                    <strong className="text-blue-800 font-bold block mb-1">
                      ✅ Cách 2 (Nếu muốn sửa trực tiếp bên trong thẻ Google My Maps gốc):
                    </strong>
                    Do cơ chế bảo mật của trình duyệt web (Same-Origin Policy), code bên ngoài không thể can thiệp vào khung nội dung iframe của Google. Tuy nhiên, nếu bạn (hoặc người quản trị) mở bản đồ đó trên Google My Maps và đổi tên các lớp/ga thành dạng song ngữ (ví dụ: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700">Tuyến Metro Số 1 / ハノイ都市鉄道1号線</code> hoặc <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700">Ga Cát Linh / カットリン駅</code>), thì thẻ iframe Google My Maps sẽ <strong>tự động hiển thị tiếng Nhật ngay cạnh tiếng Việt ở mọi nơi</strong> mà không cần sửa code!
                  </div>
                </div>
              ) : (
                <p className="text-slate-600 mt-1">
                  Đã hỗ trợ 2 phương án: Bản đồ Tương tác hiển thị nhãn Tiếng Nhật trực tiếp trên bản đồ hoặc cập nhật Google My Maps gốc.
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowHowToExplain(!showHowToExplain)}
            className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition flex-shrink-0"
            title={showHowToExplain ? 'Thu gọn giải thích' : 'Mở rộng giải thích'}
          >
            {showHowToExplain ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Content Render Area */}
      {mapMode === 'bilingual_map' ? (
        <div className="p-3 sm:p-4 bg-slate-100/60">
          <InteractiveBilingualMap langMode={langMode} />
        </div>
      ) : (
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
      )}

      {/* Map Sub-footer & Layers guide */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            Lớp dữ liệu:
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
            Tuyến Metro (16 路線)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
            Vinhomes (20 拠点)
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
            Sân bay Quốc tế (空港)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {mapMode === 'bilingual_map'
              ? 'Chế độ bản đồ này có nhãn tiếng Nhật gắn kèm trực tiếp vào từng trạm và tuyến tàu.'
              : 'Thẻ iframe Google My Maps gốc theo link nhúng của bạn.'}
          </span>
        </div>
      </div>
    </section>
  );
};
