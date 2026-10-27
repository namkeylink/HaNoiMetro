import React, { useState } from 'react';
import { generateStandaloneBootstrapHtml } from '../utils/filterMetro';
import { X, Copy, Check, Download, FileCode } from 'lucide-react';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlContent = generateStandaloneBootstrapHtml();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-sky-100 text-sky-800">
              <FileCode className="w-5 h-5 text-sky-700" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                File HTML + CSS Bootstrap Độc Lập
              </h3>
              <p className="text-xs text-slate-500">
                Tệp HTML hoàn chỉnh chứa Google My Maps iframe, Bootstrap 5, bảng tra cứu song ngữ và bộ lọc tìm kiếm
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

        <div className="p-3 bg-emerald-50 border-b border-emerald-100 text-xs text-emerald-800 flex items-center justify-between flex-wrap gap-2">
          <span>
            💡 <strong>Tệp đơn lập:</strong> Lưu file này và mở trực tiếp bằng bất kỳ trình duyệt nào mà không cần cài đặt thêm gì.
          </span>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải ngay (.html)</span>
          </button>
        </div>

        <div className="p-4 flex-1 overflow-hidden flex flex-col bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono">hanoi_metro_japanese_guide.html ({(htmlContent.length / 1024).toFixed(1)} KB)</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Sao chép toàn bộ code</span>
                </>
              )}
            </button>
          </div>
          <pre className="flex-1 overflow-y-auto p-4 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono leading-relaxed border border-slate-800 select-all">
            {htmlContent.slice(0, 3000)}
            {htmlContent.length > 3000 && '\n\n... [Còn tiếp toàn bộ nội dung HTML, dữ liệu 16 tuyến metro và script] ...'}
          </pre>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500">
            Sử dụng thẻ iframe <code>mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s</code> theo đúng yêu cầu
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200 transition"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file về máy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
