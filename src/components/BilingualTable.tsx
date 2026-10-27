import React, { useState } from 'react';
import { MetroLine } from '../data/metroData';
import { Download, Table, ExternalLink, ArrowUpDown } from 'lucide-react';

interface BilingualTableProps {
  lines: MetroLine[];
}

export const BilingualTable: React.FC<BilingualTableProps> = ({ lines }) => {
  const [sortField, setSortField] = useState<'number' | 'lengthKm' | 'stationsCount'>('number');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedLines = [...lines].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === 'number') {
      const numA = parseFloat(a.number) || 999;
      const numB = parseFloat(b.number) || 999;
      return sortAsc ? numA - numB : numB - numA;
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortAsc ? valA - valB : valB - valA;
    }

    return 0;
  });

  const handleSort = (field: 'number' | 'lengthKm' | 'stationsCount') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const exportCsv = () => {
    const headers = ['Mã tuyến', 'Tên Tiếng Việt', 'Tên Tiếng Nhật', 'Lộ trình Tiếng Việt', 'Lộ trình Tiếng Nhật', 'Chiều dài (km)', 'Số ga', 'Trạng thái'];
    const rows = sortedLines.map(l => [
      l.code,
      `"${l.nameVi.replace(/"/g, '""')}"`,
      `"${l.nameJa.replace(/"/g, '""')}"`,
      `"${l.routeVi.replace(/"/g, '""')}"`,
      `"${l.routeJa.replace(/"/g, '""')}"`,
      l.lengthKm,
      l.stationsCount,
      `"${l.statusVi} / ${l.statusJa}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'hanoi_metro_bilingual_table.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Table className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Bảng Đối Chiếu Song Ngữ Toàn Diện (Tiếng Việt & 日本語)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ハノイ都市鉄道 全路線・日越対訳詳細一覧表（路線名・運行区間・総延長・駅数・進捗状況）
          </p>
        </div>

        <button
          type="button"
          onClick={exportCsv}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-600" />
          <span>Xuất file Excel / CSV (エクスポート)</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3 text-center w-14">
                <button
                  type="button"
                  onClick={() => handleSort('number')}
                  className="inline-flex items-center gap-1 hover:text-blue-600"
                >
                  <span>Mã</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-4 w-1/4">Tên Tuyến (Tiếng Việt gốc)</th>
              <th className="py-3 px-4 w-1/4 text-emerald-800">路線名・日本語訳 (Japanese)</th>
              <th className="py-3 px-4 w-1/4">Lộ Trình / Điểm Đầu - Cuối</th>
              <th className="py-3 px-4 w-1/4 text-emerald-800">運行ルート・起終点</th>
              <th className="py-3 px-3 text-center">
                <button
                  type="button"
                  onClick={() => handleSort('lengthKm')}
                  className="inline-flex items-center gap-1 hover:text-blue-600"
                >
                  <span>Km</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-center">
                <button
                  type="button"
                  onClick={() => handleSort('stationsCount')}
                  className="inline-flex items-center gap-1 hover:text-blue-600"
                >
                  <span>Số ga</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="py-3 px-3 text-center">Trạng thái (状況)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedLines.map((line) => {
              let badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';
              if (line.status === 'operating') badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
              if (line.status === 'construction') badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';

              return (
                <tr key={line.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 text-center">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-white text-xs shadow-2xs"
                      style={{ backgroundColor: line.color }}
                    >
                      {line.code}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div>{line.nameVi}</div>
                    {line.completionYear && (
                      <span className="text-[10px] text-slate-400 font-normal">{line.completionYear}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-emerald-900 font-sans">
                    <div>{line.nameJa}</div>
                    {line.nameJaRomaji && (
                      <span className="text-[10px] text-slate-400 font-mono block">{line.nameJaRomaji}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-700 text-xs">
                    {line.routeVi}
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-xs font-sans">
                    {line.routeJa}
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-slate-800 whitespace-nowrap">
                    {line.lengthKm}
                  </td>
                  <td className="py-3 px-3 text-center font-semibold text-slate-800 whitespace-nowrap">
                    {line.stationsCount}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${badgeColor}`}>
                      {line.statusVi}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">{line.statusJa}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
