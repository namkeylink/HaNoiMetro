import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { METRO_LINES, VINHOMES_PROJECTS, AIRPORT_FACILITIES } from '../data/metroData';
import geoData from '../data/metroGeoJson.json';
import { Layers, Eye, EyeOff, ZoomIn, ZoomOut, RotateCcw, MapPin, Sparkles } from 'lucide-react';

interface InteractiveBilingualMapProps {
  langMode?: 'bilingual' | 'ja' | 'vi';
}

export const InteractiveBilingualMap: React.FC<InteractiveBilingualMapProps> = ({
  langMode = 'bilingual'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{
    linesLayer: L.LayerGroup;
    stationsLayer: L.LayerGroup;
    projectsLayer: L.LayerGroup;
    airportsLayer: L.LayerGroup;
  } | null>(null);

  const [selectedLineId, setSelectedLineId] = useState<string>('all');
  const [showStations, setShowStations] = useState<boolean>(true);
  const [showProjects, setShowProjects] = useState<boolean>(true);
  const [showAirports, setShowAirports] = useState<boolean>(true);
  const [showLineLabels, setShowLineLabels] = useState<boolean>(true);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // initialize once

    // Initialize Leaflet map centered at Hanoi
    const map = L.map(mapContainerRef.current, {
      center: [21.0285, 105.8542],
      zoom: 11,
      minZoom: 9,
      maxZoom: 18,
      zoomControl: false
    });

    // Clean modern base map tiles (CartoDB Positron / OSM)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    const linesLayer = L.layerGroup().addTo(map);
    const stationsLayer = L.layerGroup().addTo(map);
    const projectsLayer = L.layerGroup().addTo(map);
    const airportsLayer = L.layerGroup().addTo(map);

    layersRef.current = {
      linesLayer,
      stationsLayer,
      projectsLayer,
      airportsLayer
    };

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map overlays whenever filters or langMode changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layersRef.current) return;

    const { linesLayer, stationsLayer, projectsLayer, airportsLayer } = layersRef.current;
    linesLayer.clearLayers();
    stationsLayer.clearLayers();
    projectsLayer.clearLayers();
    airportsLayer.clearLayers();

    // Map line number/name to color and info
    const lineMapByNumber: Record<string, typeof METRO_LINES[0]> = {};
    METRO_LINES.forEach((l) => {
      lineMapByNumber[l.number.toLowerCase()] = l;
      lineMapByNumber[l.code.toLowerCase()] = l;
      lineMapByNumber[l.nameVi.toLowerCase()] = l;
    });

    const getLineInfo = (name: string | null | undefined, folder: string | null | undefined) => {
      const safeName = (name || '').toString();
      const safeFolder = (folder || '').toString();
      const match = safeName.match(/Tuyến (?:Metro )?Số ([0-9A-Za-z]+)/i) || safeFolder.match(/Số ([0-9A-Za-z]+)/i);
      const num = match ? match[1].toLowerCase() : '';
      return (
        lineMapByNumber[num] ||
        METRO_LINES.find((l) => safeName.toLowerCase().includes(l.number.toLowerCase()) || safeName.toLowerCase().includes(l.code.toLowerCase())) ||
        METRO_LINES[0]
      );
    };

    // 1. Draw Lines
    const features = geoData as Array<{
      type: string;
      folder: string;
      name: string;
      description: string;
      coordinates: any;
    }>;

    features.forEach((feat) => {
      if (feat.type === 'LineString' && Array.isArray(feat.coordinates) && feat.coordinates.length > 1) {
        const lineInfo = getLineInfo(feat.name, feat.folder);
        if (selectedLineId !== 'all' && lineInfo.id !== selectedLineId) {
          return;
        }

        const isHighlighted = selectedLineId === lineInfo.id;
        const color = lineInfo.color || '#2563EB';

        // Outer glow/stroke
        const polyline = L.polyline(feat.coordinates, {
          color: color,
          weight: isHighlighted ? 7 : 4,
          opacity: isHighlighted ? 1.0 : 0.85,
          lineCap: 'round',
          lineJoin: 'round'
        });

        const tooltipContent = `
          <div style="font-family: 'Noto Sans JP', sans-serif; font-size: 12px; line-height: 1.4;">
            <div style="font-weight: 800; color: ${color};">
              ${lineInfo.nameVi}
            </div>
            <div style="font-weight: 700; color: #047857; margin-top: 2px;">
              ${lineInfo.nameJa}
            </div>
            <div style="font-size: 11px; color: #475569; margin-top: 3px;">
              <b>Lộ trình:</b> ${lineInfo.startStationVi} ⇄ ${lineInfo.endStationVi}
            </div>
            <div style="font-size: 11px; color: #065f46;">
              <b>起終点:</b> ${lineInfo.startStationJa} ⇄ ${lineInfo.endStationJa}
            </div>
            <div style="font-size: 10px; margin-top: 4px; padding: 2px 6px; border-radius: 4px; background: #f1f5f9; display: inline-block;">
              ${lineInfo.statusVi} • ${lineInfo.statusJa}
            </div>
          </div>
        `;

        polyline.bindTooltip(tooltipContent, {
          sticky: true,
          direction: 'top',
          className: 'bilingual-map-tooltip'
        });

        polyline.bindPopup(tooltipContent, {
          maxWidth: 320
        });

        linesLayer.addLayer(polyline);

        // Add a line name badge marker at middle point of line if enabled
        if (showLineLabels && feat.coordinates.length > 5) {
          const midIndex = Math.floor(feat.coordinates.length / 2);
          const midCoord = feat.coordinates[midIndex];
          if (midCoord && midCoord[0] && midCoord[1]) {
            const badgeHtml = `
              <div style="
                background: ${color};
                color: #ffffff;
                font-weight: 800;
                font-size: 11px;
                padding: 2px 6px;
                border-radius: 6px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                white-space: nowrap;
                border: 1.5px solid #ffffff;
                display: flex;
                align-items: center;
                gap: 3px;
              ">
                <span>${lineInfo.code}</span>
                <span style="font-size: 10px; opacity: 0.9;">${lineInfo.number}号線</span>
              </div>
            `;
            const labelIcon = L.divIcon({
              html: badgeHtml,
              className: 'custom-line-label',
              iconSize: [60, 20],
              iconAnchor: [30, 10]
            });
            const labelMarker = L.marker(midCoord, { icon: labelIcon, interactive: false });
            linesLayer.addLayer(labelMarker);
          }
        }
      }
    });

    // 2. Draw Stations if enabled
    if (showStations) {
      features.forEach((feat) => {
        if (feat.type === 'Point' && Array.isArray(feat.coordinates) && feat.coordinates.length >= 2) {
          // Check if station or boundary
          const isStation = (feat.folder || '').includes('GA METRO') || (feat.name || '').startsWith('S');
          if (isStation) {
            const lineInfo = getLineInfo(feat.name, feat.folder);
            if (selectedLineId !== 'all' && lineInfo.id !== selectedLineId) {
              return;
            }

            const marker = L.circleMarker([feat.coordinates[0], feat.coordinates[1]] as [number, number], {
              radius: 5,
              fillColor: '#ffffff',
              color: lineInfo.color || '#2563EB',
              weight: 2.5,
              opacity: 1,
              fillOpacity: 1
            });

            const stationTooltip = `
              <div style="font-family: 'Noto Sans JP', sans-serif; font-size: 11px; line-height: 1.3;">
                <div style="font-weight: 700; color: #0f172a;">
                  Ga ${feat.name}
                </div>
                <div style="font-weight: 600; color: #059669;">
                  ${feat.name}駅 (${lineInfo.number}号線)
                </div>
                <div style="font-size: 10px; color: #64748b; margin-top: 2px;">
                  Thuộc ${lineInfo.nameVi}
                </div>
              </div>
            `;

            marker.bindTooltip(stationTooltip, {
              direction: 'top',
              offset: [0, -5]
            });

            stationsLayer.addLayer(marker);
          }
        }
      });
    }

    // 3. Draw Vinhomes Projects if enabled
    if (showProjects) {
      VINHOMES_PROJECTS.forEach((proj) => {
        // Approximate project coordinates around Hanoi
        const projCoords: Record<string, [number, number]> = {
          'vh-ocean-park-1': [20.9950, 105.9450],
          'vh-ocean-park-2-3': [20.9700, 105.9800],
          'vh-smart-city': [20.9995, 105.7420],
          'vh-global-gate': [21.0850, 105.8650],
          'vh-wonder-city': [21.0950, 105.6950],
          'vh-gardenia': [21.0340, 105.7650],
          'vh-riverside': [21.0450, 105.9050],
          'vh-green-bay': [21.0060, 105.7820],
          'ciputra-hanoi': [21.0750, 105.8050],
          'vh-olympic': [20.9150, 105.8550]
        };

        const coord = projCoords[proj.id];
        if (coord) {
          const iconHtml = `
            <div style="
              background: #0284c7;
              color: #ffffff;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2px solid #ffffff;
              font-size: 11px;
              font-weight: bold;
            ">
              V
            </div>
          `;
          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-vh-icon',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          const pMarker = L.marker(coord, { icon: customIcon });
          const pTooltip = `
            <div style="font-family: 'Noto Sans JP', sans-serif; font-size: 12px; line-height: 1.4;">
              <div style="font-weight: 800; color: #0369a1;">
                ${proj.nameVi}
              </div>
              <div style="font-weight: 700; color: #0284c7;">
                ${proj.nameJa}
              </div>
              <div style="font-size: 11px; color: #475569; margin-top: 3px;">
                ${proj.locationVi}
              </div>
              <div style="font-size: 10px; margin-top: 4px;">
                <b>Tuyến kết nối:</b> ${proj.connectedLines.join(', ')}
              </div>
            </div>
          `;
          pMarker.bindTooltip(pTooltip, { direction: 'top', offset: [0, -10] });
          projectsLayer.addLayer(pMarker);
        }
      });
    }

    // 4. Draw Airports if enabled
    if (showAirports) {
      const airportCoords: Record<string, [number, number]> = {
        'airport-noi-bai': [21.2212, 105.8072],
        'airport-gia-binh': [21.0800, 106.1800]
      };

      AIRPORT_FACILITIES.forEach((air) => {
        const coord = airportCoords[air.id];
        if (coord) {
          const iconHtml = `
            <div style="
              background: #d97706;
              color: #ffffff;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 8px rgba(0,0,0,0.35);
              border: 2.5px solid #ffffff;
              font-size: 13px;
            ">
              ✈
            </div>
          `;
          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-air-icon',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
          });

          const aMarker = L.marker(coord, { icon: customIcon });
          const aTooltip = `
            <div style="font-family: 'Noto Sans JP', sans-serif; font-size: 12px; line-height: 1.4;">
              <div style="font-weight: 800; color: #b45309;">
                ${air.nameVi}
              </div>
              <div style="font-weight: 700; color: #92400e;">
                ${air.nameJa}
              </div>
              <div style="font-size: 11px; color: #475569; margin-top: 3px;">
                ${air.roleVi}
              </div>
              <div style="font-size: 10px; margin-top: 4px;">
                <b>Metro kết nối:</b> ${air.connectedLines.join(', ')}
              </div>
            </div>
          `;
          aMarker.bindTooltip(aTooltip, { direction: 'top', offset: [0, -12] });
          airportsLayer.addLayer(aMarker);
        }
      });
    }
  }, [selectedLineId, showStations, showProjects, showAirports, showLineLabels, langMode]);

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([21.0285, 105.8542], 11);
    }
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[620px] rounded-xl overflow-hidden border border-slate-200">
      {/* Map Interactive Toolbar */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-slate-200/90 text-xs flex flex-col gap-2 max-w-[260px] sm:max-w-xs">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Nhãn Song Ngữ Nhật - Việt (日越対訳)
          </span>
          <button
            type="button"
            onClick={handleResetView}
            className="p-1 hover:bg-slate-100 rounded text-slate-500"
            title="Đưa về vị trí trung tâm Hà Nội"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter by line */}
        <div>
          <label className="text-[11px] text-slate-500 font-medium block mb-1">
            Chọn tuyến xem nổi bật (路線選択):
          </label>
          <select
            value={selectedLineId}
            onChange={(e) => setSelectedLineId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">Tất cả 16 Tuyến Metro (全線表示)</option>
            {METRO_LINES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.code} - {l.nameVi} ({l.number}号線)
              </option>
            ))}
          </select>
        </div>

        {/* Layer Toggles */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setShowLineLabels(!showLineLabels)}
            className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
              showLineLabels
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {showLineLabels ? '✓' : ''} Tên tuyến (路線名)
          </button>
          <button
            type="button"
            onClick={() => setShowStations(!showStations)}
            className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
              showStations
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {showStations ? '✓' : ''} Nhà ga (駅)
          </button>
          <button
            type="button"
            onClick={() => setShowProjects(!showProjects)}
            className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
              showProjects
                ? 'bg-blue-50 text-blue-700 border-blue-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {showProjects ? '✓' : ''} Vinhomes
          </button>
          <button
            type="button"
            onClick={() => setShowAirports(!showAirports)}
            className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
              showAirports
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-slate-100 text-slate-500 border-slate-200'
            }`}
          >
            {showAirports ? '✓' : ''} Sân bay (空港)
          </button>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-[1000] bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200 text-xs text-slate-700 pointer-events-none">
        <span className="font-semibold text-emerald-700">💡 Mẹo tương tác:</span> Rê chuột hoặc chạm vào đường ray / trạm ga / biểu tượng để xem tên Tiếng Nhật & Tiếng Việt song song!
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
