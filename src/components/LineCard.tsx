import React, { useState } from 'react';
import { MetroLine } from '../data/metroData';
import { Check, Copy, ArrowRight, MapPin, Building, Calendar, Gauge } from 'lucide-react';

interface LineCardProps {
  line: MetroLine;
  langMode: 'bilingual' | 'ja' | 'vi';
}

export const LineCard: React.FC<LineCardProps> = ({ line, langMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJapanese = () => {
    navigator.clipboard.writeText(line.nameJa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    operating: {
      badgeVi: 'Đang vận hành',
      badgeJa: '正式商業運行中',
      bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    construction: {
      badgeVi: 'Đang thi công / Chuẩn bị',
      badgeJa: '建設中・着工準備中',
      bgClass: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    planning: {
      badgeVi: 'Quy hoạch định hướng',
      badgeJa: '計画構想段階',
      bgClass: 'bg-sky-50 text-sky-700 border-sky-200'
    }
  };

  const statusInfo = statusConfig[line.status];

  return (
    <article
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col"
      style={{ borderTopColor: line.color, borderTopWidth: 4 }}
    >
      <div className="p-5 flex-1 flex flex-col">
        {/* Line Top Bar: Badge, Code & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-base shadow-sm flex-shrink-0"
              style={{ backgroundColor: line.color }}
            >
              {line.number}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {line.code}
                </span>
                <span className="text-xs text-slate-400">Tuyến đường sắt đô thị</span>
              </div>
              
              {/* Titles based on Lang Mode */}
              {langMode !== 'ja' && (
                <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                  {line.nameVi}
                </h3>
              )}
              {langMode !== 'vi' && (
                <h4 className={`font-semibold text-emerald-800 leading-snug ${langMode === 'ja' ? 'text-base font-bold' : 'text-sm mt-0.5'}`}>
                  {line.nameJa}
                </h4>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.bgClass}`}>
              {langMode === 'ja' ? statusInfo.badgeJa : statusInfo.badgeVi}
            </span>
            {langMode === 'bilingual' && (
              <span className="text-[11px] text-slate-400 font-medium">{statusInfo.badgeJa}</span>
            )}
          </div>
        </div>

        {/* Route Block */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 mb-4 text-xs space-y-2">
          {langMode !== 'ja' && (
            <div>
              <div className="font-semibold text-slate-600 mb-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Lộ trình (Tiếng Việt):</span>
              </div>
              <p className="text-slate-800 font-medium pl-5">{line.routeVi}</p>
            </div>
          )}

          {langMode !== 'vi' && (
            <div className={langMode === 'bilingual' ? 'pt-1.5 border-t border-slate-200/60' : ''}>
              <div className="font-semibold text-emerald-700 mb-0.5 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                <span>運行ルート (日本語):</span>
              </div>
              <p className="text-slate-700 pl-5 font-normal">{line.routeJa}</p>
            </div>
          )}
        </div>

        {/* Technical specs strip */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-slate-100/70 border border-slate-200/60 mb-4 text-xs text-slate-600">
          <div>
            <span className="text-[11px] text-slate-400 block">Chiều dài (総延長)</span>
            <strong className="text-slate-800 font-bold">{line.lengthKm} km</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Số ga (駅数)</span>
            <strong className="text-slate-800 font-bold">{line.stationsCount} Ga (駅)</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Thời gian (予定)</span>
            <strong className="text-slate-800 font-bold">{line.completionYear || 'Đang cập nhật'}</strong>
          </div>
        </div>

        {/* Description */}
        <div className="text-xs text-slate-600 mb-4 space-y-1">
          {langMode !== 'ja' && <p>{line.descriptionVi}</p>}
          {langMode !== 'vi' && <p className="text-slate-500 italic">{line.descriptionJa}</p>}
        </div>

        {/* Key stations tag cloud */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-600 mb-1.5">
            Các ga chính & trạm nút giao (主な駅・乗換駅):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {line.keyStationsVi.map((st, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] border border-slate-200"
              >
                <span>{st}</span>
                {langMode !== 'vi' && line.keyStationsJa[i] && (
                  <span className="text-emerald-700 font-medium">({line.keyStationsJa[i]})</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Connected Urban Projects */}
        {line.connectedProjectsVi && line.connectedProjectsVi.length > 0 && (
          <div className="mt-auto pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Dự án kết nối (接続プロジェクト):</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {line.connectedProjectsVi.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200/60"
                >
                  {p} {langMode !== 'vi' && line.connectedProjectsJa[idx] ? `(${line.connectedProjectsJa[idx]})` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">{line.code} • Tuyến {line.number}</span>
        <button
          type="button"
          onClick={handleCopyJapanese}
          className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-200/80 text-slate-700 font-medium transition"
          title="Sao chép tên tiếng Nhật vào bộ nhớ tạm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Đã chép!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Chép tiếng Nhật</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
