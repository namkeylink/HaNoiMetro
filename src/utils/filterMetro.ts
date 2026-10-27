import { METRO_LINES, MetroLine, VINHOMES_PROJECTS, AIRPORT_FACILITIES, TRANSIT_GLOSSARY } from '../data/metroData';

export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function filterMetroLines(
  lines: MetroLine[],
  searchQuery: string,
  statusFilter: 'all' | 'operating' | 'construction' | 'planning'
): MetroLine[] {
  const query = normalizeText(searchQuery);
  const rawQuery = searchQuery.trim().toLowerCase();

  return lines.filter((line) => {
    if (statusFilter !== 'all' && line.status !== statusFilter) {
      return false;
    }

    if (!query) {
      return true;
    }

    if (line.number.toLowerCase() === query || line.code.toLowerCase().includes(query)) {
      return true;
    }

    const viText = normalizeText(
      `${line.nameVi} ${line.routeVi} ${line.startStationVi} ${line.endStationVi} ${line.descriptionVi} ${line.keyStationsVi.join(' ')} ${line.connectedProjectsVi.join(' ')}`
    );
    if (viText.includes(query)) {
      return true;
    }

    const jaText = `${line.nameJa} ${line.routeJa} ${line.startStationJa} ${line.endStationJa} ${line.descriptionJa} ${line.keyStationsJa.join(' ')} ${line.connectedProjectsJa.join(' ')} ${line.nameJaRomaji || ''}`.toLowerCase();
    if (jaText.includes(rawQuery) || (line.nameJaRomaji && normalizeText(line.nameJaRomaji).includes(query))) {
      return true;
    }

    return false;
  });
}

export function getMetroStats(lines: MetroLine[] = METRO_LINES) {
  const totalLines = lines.length;
  const operatingCount = lines.filter((l) => l.status === 'operating').length;
  const constructionCount = lines.filter((l) => l.status === 'construction').length;
  const planningCount = lines.filter((l) => l.status === 'planning').length;

  const totalKm = lines.reduce((acc, curr) => {
    const km = typeof curr.lengthKm === 'number' ? curr.lengthKm : parseFloat(String(curr.lengthKm)) || 0;
    return acc + km;
  }, 0);

  const totalStations = lines.reduce((acc, curr) => acc + curr.stationsCount, 0);

  return {
    totalLines,
    operatingCount,
    constructionCount,
    planningCount,
    totalKm: Math.round(totalKm * 10) / 10,
    totalStations
  };
}

export function generateStandaloneBootstrapHtml(): string {
  const linesJson = JSON.stringify(METRO_LINES);
  const projectsJson = JSON.stringify(VINHOMES_PROJECTS);
  const airportsJson = JSON.stringify(AIRPORT_FACILITIES);
  const glossaryJson = JSON.stringify(TRANSIT_GLOSSARY);

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bản Đồ Tuyến Metro Hà Nội (Tiếng Việt & 日本語) - Hanoi Metro Japanese Guide</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
    }
    .map-container {
      position: relative;
      width: 100%;
      height: 520px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      background-color: #e2e8f0;
    }
    .map-container iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }
    .line-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      color: #ffffff;
      font-weight: 800;
      font-size: 1.05rem;
      flex-shrink: 0;
    }
    .status-pill-operating {
      background-color: #dcfce7;
      color: #15803d;
      border: 1px solid #bbf7d0;
      font-weight: 600;
    }
    .status-pill-construction {
      background-color: #fef3c7;
      color: #b45309;
      border: 1px solid #fde68a;
      font-weight: 600;
    }
    .status-pill-planning {
      background-color: #e0f2fe;
      color: #0369a1;
      border: 1px solid #bae6fd;
      font-weight: 600;
    }
    .station-tag {
      font-size: 0.78rem;
      background: #f1f5f9;
      color: #334155;
      padding: 3px 8px;
      border-radius: 6px;
      display: inline-block;
      margin: 2px;
      border: 1px solid #e2e8f0;
    }
    .card-metro {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
    }
    .card-metro:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.12);
    }
    .ja-text {
      font-family: 'Noto Sans JP', sans-serif;
    }
  </style>
</head>
<body>
  <header class="bg-dark text-white py-3 border-bottom border-secondary shadow-sm">
    <div class="container-fluid px-lg-5 d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div class="d-flex align-items-center gap-3">
        <span class="fs-3"><i class="bi bi-train-front text-warning"></i></span>
        <div>
          <h1 class="h5 mb-0 fw-bold">BẢN ĐỒ QUY HOẠCH METRO HÀ NỘI & BẢN DỊCH TIẾNG NHẬT</h1>
          <p class="small text-secondary mb-0 ja-text">ハノイ都市鉄道路線図（Google My Maps）＆ 日越バイリンガル完全ガイド</p>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2">
          <i class="bi bi-check-circle-fill me-1"></i> 16 Tuyến Metro / 16路線
        </span>
        <button class="btn btn-outline-light btn-sm" onclick="window.print()">
          <i class="bi bi-printer me-1"></i> In / Print (印刷)
        </button>
      </div>
    </div>
  </header>

  <main class="container-fluid px-lg-5 py-4">
    <div class="row g-3 mb-4">
      <div class="col-6 col-md-3">
        <div class="card p-3 bg-white border-0 shadow-sm rounded-3">
          <div class="d-flex align-items-center gap-3">
            <div class="p-3 bg-primary-subtle text-primary rounded-3 fs-4"><i class="bi bi-geo-alt"></i></div>
            <div>
              <div class="text-secondary small">Tổng số tuyến / 全路線</div>
              <div class="fs-4 fw-bold">16 Tuyến (路線)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 bg-white border-0 shadow-sm rounded-3">
          <div class="d-flex align-items-center gap-3">
            <div class="p-3 bg-success-subtle text-success rounded-3 fs-4"><i class="bi bi-check2-all"></i></div>
            <div>
              <div class="text-secondary small">Đang vận hành / 運行中</div>
              <div class="fs-4 fw-bold text-success">2 Tuyến (2A, 3*)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 bg-white border-0 shadow-sm rounded-3">
          <div class="d-flex align-items-center gap-3">
            <div class="p-3 bg-warning-subtle text-warning rounded-3 fs-4"><i class="bi bi-cone-striped"></i></div>
            <div>
              <div class="text-secondary small">Thi công / 建設・準備</div>
              <div class="fs-4 fw-bold text-warning">2 Tuyến (2, 5)</div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="card p-3 bg-white border-0 shadow-sm rounded-3">
          <div class="d-flex align-items-center gap-3">
            <div class="p-3 bg-info-subtle text-info rounded-3 fs-4"><i class="bi bi-buildings"></i></div>
            <div>
              <div class="text-secondary small">Dự án Vinhomes kết nối</div>
              <div class="fs-4 fw-bold text-info">20 Dự án / 拠点</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm p-3 p-lg-4 mb-4 bg-white rounded-4">
      <div class="d-flex flex-wrap align-items-center justify-content-between mb-3 gap-2">
        <div>
          <h2 class="h5 fw-bold mb-1 text-primary">
            <i class="bi bi-map-fill me-2"></i>Bản Đồ Trực Quan Nhúng Google My Maps
          </h2>
          <span class="text-secondary small ja-text">
            埋め込みGoogleマイマップ（ハノイメトロ全16路線・Vinhomes各プロジェクト・空港境界線）
          </span>
        </div>
        <div class="d-flex gap-2">
          <a href="https://www.google.com/maps/d/viewer?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-box-arrow-up-right me-1"></i> Mở tab riêng / 別タブで開く
          </a>
        </div>
      </div>
      <div class="map-container">
        <iframe src="https://www.google.com/maps/d/embed?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s&ehbc=2E312F" title="Google Maps Hanoi Metro Network" loading="lazy" allowfullscreen></iframe>
      </div>
      <div class="d-flex flex-wrap justify-content-between align-items-center mt-3 text-secondary small gap-2">
        <span><i class="bi bi-info-circle me-1"></i> Bạn có thể phóng to / thu nhỏ, bấm vào các lớp (Layers) hoặc trạm metro trên bản đồ để xem chi tiết.</span>
        <span class="badge bg-light text-dark border">Iframe URL: google.com/maps/d/embed?mid=1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s</span>
      </div>
    </div>

    <div class="card border-0 shadow-sm p-3 mb-4 bg-white rounded-3">
      <div class="row g-2 align-items-center">
        <div class="col-md-5">
          <div class="input-group">
            <span class="input-group-text bg-light border-end-0"><i class="bi bi-search"></i></span>
            <input type="text" id="searchInput" class="form-control border-start-0" placeholder="Tìm kiếm theo tên ga, số tuyến (Nhổn, Cát Linh, ニョン, 2A...)..." onkeyup="filterLines()">
          </div>
        </div>
        <div class="col-md-4">
          <div class="btn-group w-100" role="group">
            <button type="button" class="btn btn-outline-secondary active btn-sm filter-btn" data-status="all" onclick="setStatusFilter('all', this)">Tất cả (全線)</button>
            <button type="button" class="btn btn-outline-success btn-sm filter-btn" data-status="operating" onclick="setStatusFilter('operating', this)">Đang chạy (運行中)</button>
            <button type="button" class="btn btn-outline-warning btn-sm filter-btn" data-status="construction" onclick="setStatusFilter('construction', this)">Thi công (建設中)</button>
            <button type="button" class="btn btn-outline-info btn-sm filter-btn" data-status="planning" onclick="setStatusFilter('planning', this)">Quy hoạch (計画中)</button>
          </div>
        </div>
        <div class="col-md-3 text-md-end text-secondary small">
          Đang hiển thị: <span id="displayedCount" class="fw-bold text-dark">16</span> / 16 tuyến
        </div>
      </div>
    </div>

    <div class="row g-4 mb-5" id="metroLinesGrid"></div>

    <div class="card border-0 shadow-sm p-3 p-lg-4 mb-5 bg-white rounded-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 class="h5 fw-bold mb-1 text-dark">
            <i class="bi bi-table me-2 text-primary"></i>Bảng Tổng Hợp Chi Tiết Song Ngữ Việt - Nhật
          </h3>
          <p class="text-secondary small mb-0 ja-text">ハノイ都市鉄道 全路線・日越対訳一覧表（起終点・ステータス・主要駅）</p>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th style="width: 70px;" class="text-center">Mã (番号)</th>
              <th style="width: 25%;">Tên Tuyến (Tiếng Việt)</th>
              <th style="width: 25%;">路線名・日本語訳 (Japanese)</th>
              <th style="width: 25%;">Lộ Trình / Điểm Đầu - Cuối (Tiếng Việt)</th>
              <th style="width: 25%;">運行ルート・起終点 (日本語)</th>
              <th style="width: 110px;" class="text-center">Trạng Thái (状況)</th>
            </tr>
          </thead>
          <tbody id="bilingualTableBody"></tbody>
        </table>
      </div>
    </div>

    <div class="card border-0 shadow-sm p-3 p-lg-4 mb-5 bg-white rounded-4">
      <h3 class="h5 fw-bold mb-1 text-dark">
        <i class="bi bi-buildings-fill me-2 text-info"></i>Các Dự Án Vinhomes & Đô Thị Nằm Dọc Tuyến Metro
      </h3>
      <p class="text-secondary small mb-4 ja-text">メトロ沿線の主要不動産開発プロジェクト（Vinhomes各メガ都市）</p>
      <div class="row g-3" id="vinhomesGrid"></div>
    </div>

    <div class="card border-0 shadow-sm p-3 p-lg-4 mb-4 bg-white rounded-4">
      <h3 class="h5 fw-bold mb-1 text-dark">
        <i class="bi bi-book-half me-2 text-success"></i>Bảng Tra Từ Vựng Đường Sắt Đô Thị Việt - Nhật
      </h3>
      <p class="text-secondary small mb-3 ja-text">日越都市鉄道・交通専門用語集（用語・漢字・読み方・解説）</p>
      <div class="table-responsive">
        <table class="table table-striped table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th style="width: 25%;">Thuật ngữ Tiếng Việt</th>
              <th style="width: 25%;">日本語 (Japanese)</th>
              <th style="width: 20%;">Romaji (Cách đọc)</th>
              <th style="width: 30%;">Ý nghĩa / Giải thích</th>
            </tr>
          </thead>
          <tbody id="glossaryTableBody"></tbody>
        </table>
      </div>
    </div>
  </main>

  <footer class="bg-white border-top py-4 text-center text-secondary small">
    <div class="container">
      <p class="mb-1 fw-semibold text-dark">Bản Đồ Tuyến Metro Hà Nội & Bản Dịch Tiếng Nhật • ハノイ都市鉄道路線図＆日本語ガイド</p>
      <p class="mb-0">Dữ liệu bản đồ từ Google My Maps (mid: 1EGz0FziS6YrDj4HmHBtIFZSe0LWap9s). Được xây dựng với Bootstrap 5.</p>
    </div>
  </footer>

  <script>
    const lines = ${linesJson};
    const projects = ${projectsJson};
    const glossary = ${glossaryJson};

    let currentFilter = 'all';

    function renderLines(items) {
      const grid = document.getElementById('metroLinesGrid');
      const tableBody = document.getElementById('bilingualTableBody');
      grid.innerHTML = '';
      tableBody.innerHTML = '';

      document.getElementById('displayedCount').textContent = items.length;

      items.forEach(l => {
        let statusClass = 'status-pill-planning';
        if (l.status === 'operating') statusClass = 'status-pill-operating';
        if (l.status === 'construction') statusClass = 'status-pill-construction';

        const cardCol = document.createElement('div');
        cardCol.className = 'col-lg-6';
        cardCol.innerHTML = \`
          <div class="card card-metro h-100 bg-white p-3 p-md-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="d-flex align-items-center gap-3">
                <span class="line-badge" style="background-color: \${l.color}">\${l.number}</span>
                <div>
                  <h4 class="h6 fw-bold mb-0 text-dark">\${l.nameVi}</h4>
                  <div class="ja-text text-primary small fw-semibold">\${l.nameJa}</div>
                </div>
              </div>
              <span class="badge \${statusClass} px-2 py-1 small">\${l.statusVi}</span>
            </div>

            <div class="bg-light p-3 rounded-3 mb-3 border">
              <div class="mb-2">
                <strong class="text-secondary small d-block">Lộ trình (Tiếng Việt):</strong>
                <span class="text-dark small">\${l.routeVi}</span>
              </div>
              <div>
                <strong class="text-secondary small d-block ja-text">運行ルート (日本語):</strong>
                <span class="text-muted small ja-text">\${l.routeJa}</span>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2 mb-3 text-secondary small">
              <span class="badge bg-secondary-subtle text-secondary"><i class="bi bi-rulers me-1"></i>\${l.lengthKm} km</span>
              <span class="badge bg-secondary-subtle text-secondary"><i class="bi bi-geo-alt me-1"></i>\${l.stationsCount} Ga (駅)</span>
              <span class="badge bg-secondary-subtle text-secondary"><i class="bi bi-calendar3 me-1"></i>\${l.completionYear || 'Quy hoạch'}</span>
            </div>

            <div class="mb-2">
              <strong class="small text-secondary d-block mb-1">Các ga chính / 主な駅:</strong>
              <div>
                \${l.keyStationsVi.map((st, i) => \`<span class="station-tag">\${st} <small class="text-primary ja-text">(\${l.keyStationsJa[i] || ''})</small></span>\`).join('')}
              </div>
            </div>

            \${l.connectedProjectsVi && l.connectedProjectsVi.length ? \`
              <div class="mt-2 pt-2 border-top">
                <strong class="small text-secondary d-block mb-1">Dự án kết nối / 接続都市プロジェクト:</strong>
                <div class="small text-info-emphasis">
                  \${l.connectedProjectsVi.map((p, i) => \`<span class="badge bg-info-subtle text-info border me-1 mb-1">\${p} (\${l.connectedProjectsJa[i] || ''})</span>\`).join('')}
                </div>
              </div>
            \` : ''}
          </div>
        \`;
        grid.appendChild(cardCol);

        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td class="text-center">
            <span class="badge text-white px-2 py-1" style="background-color: \${l.color}">\${l.code}</span>
          </td>
          <td class="fw-semibold text-dark">\${l.nameVi}</td>
          <td class="ja-text text-primary">\${l.nameJa}</td>
          <td class="small text-secondary">\${l.routeVi}</td>
          <td class="small text-secondary ja-text">\${l.routeJa}</td>
          <td class="text-center">
            <span class="badge \${statusClass} small">\${l.statusVi}</span>
            <div class="ja-text small text-muted mt-1">\${l.statusJa}</div>
          </td>
        \`;
        tableBody.appendChild(tr);
      });
    }

    function renderProjects() {
      const container = document.getElementById('vinhomesGrid');
      container.innerHTML = '';
      projects.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = \`
          <div class="card h-100 p-3 bg-white border rounded-3 shadow-none">
            <h5 class="h6 fw-bold mb-1 text-dark">\${p.nameVi}</h5>
            <div class="ja-text text-info small fw-semibold mb-2">\${p.nameJa}</div>
            <div class="small text-secondary mb-2"><i class="bi bi-geo-alt me-1"></i>\${p.locationVi} (\${p.locationJa})</div>
            <div class="small text-muted mb-2">\${p.scaleVi}</div>
            <div class="mt-auto pt-2 border-top">
              <span class="small text-secondary">Tuyến kết nối: </span>
              \${p.connectedLines.map(code => \`<span class="badge bg-primary text-white me-1">\${code}</span>\`).join('')}
            </div>
          </div>
        \`;
        container.appendChild(col);
      });
    }

    function renderGlossary() {
      const tbody = document.getElementById('glossaryTableBody');
      tbody.innerHTML = '';
      glossary.forEach(g => {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td class="fw-semibold">\${g.vi}</td>
          <td class="ja-text text-primary fw-bold">\${g.ja}</td>
          <td class="font-monospace small text-secondary">\${g.romaji}</td>
          <td class="small text-secondary">\${g.meaningVi}</td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function filterLines() {
      const query = (document.getElementById('searchInput').value || '').toLowerCase().trim();
      const filtered = lines.filter(l => {
        if (currentFilter !== 'all' && l.status !== currentFilter) return false;
        if (!query) return true;
        const allText = (l.nameVi + ' ' + l.nameJa + ' ' + l.routeVi + ' ' + l.routeJa + ' ' + l.number + ' ' + l.code + ' ' + (l.nameJaRomaji || '')).toLowerCase();
        return allText.includes(query);
      });
      renderLines(filtered);
    }

    function setStatusFilter(status, btn) {
      currentFilter = status;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterLines();
    }

    document.addEventListener('DOMContentLoaded', () => {
      renderLines(lines);
      renderProjects();
      renderGlossary();
    });
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>`;
}
