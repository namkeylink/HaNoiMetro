import React from 'react';
import { VINHOMES_PROJECTS, AIRPORT_FACILITIES } from '../data/metroData';
import { Building2, Plane, MapPin, Train } from 'lucide-react';

export const VinhomesSection: React.FC = () => {
  return (
    <div className="space-y-8 mb-8">
      {/* Vinhomes Projects */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Dự Án Vinhomes & Đô Thị Lớn Nằm Dọc Mạng Lưới Metro
              </h2>
              <p className="text-xs text-slate-500">
                メトロ沿線の主要不動産開発プロジェクト（Vinhomesメガ都市・商業施設・大学キャンパス連携）
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {VINHOMES_PROJECTS.length} Đại Dự Án (プロジェクト)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VINHOMES_PROJECTS.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xs transition bg-gradient-to-b from-white to-slate-50/50 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-sm text-slate-900">{p.nameVi}</h3>
              </div>
              <h4 className="text-xs font-semibold text-blue-700 mb-2 font-sans">{p.nameJa}</h4>
              
              <div className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>{p.locationVi}</span>
              </div>
              <div className="text-xs text-slate-600 mb-3 flex-1">
                {p.scaleVi}
              </div>

              <div className="pt-2 border-t border-slate-200/80 mt-auto flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Train className="w-3 h-3 text-emerald-600" /> Tuyến kết nối:
                </span>
                <div className="flex gap-1">
                  {p.connectedLines.map((lineCode) => (
                    <span
                      key={lineCode}
                      className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {lineCode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Airports Section */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
          <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
            <Plane className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Đầu Mối Hàng Không Quốc Tế (Sân Bay Nội Bài & Gia Bình)
            </h2>
            <p className="text-xs text-slate-500">
              空港アクセス鉄道・主要ハブ（ノイバイ国際空港 ＆ ジャービン新国際空港）
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AIRPORT_FACILITIES.map((airport) => (
            <div
              key={airport.id}
              className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="font-bold text-sm text-slate-900">{airport.nameVi}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                  Airport Hub
                </span>
              </div>
              <h4 className="text-xs font-semibold text-amber-900 mb-2">{airport.nameJa}</h4>
              <p className="text-xs text-slate-600 mb-3">{airport.roleVi}</p>
              <p className="text-xs text-slate-500 italic mb-4">{airport.roleJa}</p>

              <div className="pt-2 border-t border-amber-200/60 mt-auto flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Tuyến Metro phục vụ:</span>
                <div className="flex gap-1.5">
                  {airport.connectedLines.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white shadow-2xs"
                    >
                      Tuyến {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
