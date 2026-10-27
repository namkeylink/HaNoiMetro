export interface MetroLine {
  id: string;
  code: string;
  number: string;
  nameVi: string;
  nameJa: string;
  nameJaRomaji?: string;
  status: 'operating' | 'construction' | 'planning';
  statusVi: string;
  statusJa: string;
  routeVi: string;
  routeJa: string;
  startStationVi: string;
  startStationJa: string;
  endStationVi: string;
  endStationJa: string;
  lengthKm: number | string;
  stationsCount: number;
  color: string;
  bgLight: string;
  descriptionVi: string;
  descriptionJa: string;
  keyStationsVi: string[];
  keyStationsJa: string[];
  connectedProjectsVi: string[];
  connectedProjectsJa: string[];
  completionYear?: string;
}

export interface VinhomesProject {
  id: string;
  nameVi: string;
  nameJa: string;
  locationVi: string;
  locationJa: string;
  connectedLines: string[];
  scaleVi: string;
  scaleJa: string;
}

export interface AirportFacility {
  id: string;
  nameVi: string;
  nameJa: string;
  roleVi: string;
  roleJa: string;
  connectedLines: string[];
}

export interface TransitTerm {
  vi: string;
  ja: string;
  kanji?: string;
  romaji: string;
  meaningVi: string;
}

export const METRO_LINES: MetroLine[] = [
  {
    id: 'line-1',
    code: 'M1',
    number: '1',
    nameVi: 'Tuyến Metro Số 1 (Ngọc Hồi - Yên Viên - Như Quỳnh)',
    nameJa: 'ハノイ都市鉄道1号線（ゴックホイ 〜 イエンヴィエン 〜 ニュークイン線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 1-gōsen (Ngoc Hoi - Yen Vien - Nhu Quynh)',
    status: 'planning',
    statusVi: 'Đang chuẩn bị đầu tư',
    statusJa: '投資準備・計画段階',
    routeVi: 'Ngọc Hồi - Giáp Bát - Ga Hà Nội - Long Biên - Gia Lâm - Yên Viên - Như Quỳnh',
    routeJa: 'ゴックホイ駅 〜 ザップバット駅 〜 ハノイ駅 〜 ロンビエン駅 〜 ザーラム駅 〜 イエンヴィエン駅 〜 ニュークイン駅',
    startStationVi: 'Ngọc Hồi (Thanh Trì)',
    startStationJa: 'ゴックホイ駅（タインチー県）',
    endStationVi: 'Như Quỳnh (Văn Lâm / Gia Lâm)',
    endStationJa: 'ニュークイン駅（ザーラム／ヴァンラム）',
    lengthKm: 38.7,
    stationsCount: 30,
    color: '#E11D48',
    bgLight: 'bg-rose-50 border-rose-200 text-rose-700',
    descriptionVi: 'Trục xương sống Bắc - Nam nối các ga đường sắt quốc gia trọng yếu (Ga Hà Nội, Giáp Bát, Gia Lâm, Yên Viên) và kết nối chuỗi đô thị ngoại vi.',
    descriptionJa: 'ハノイ市街地を南北に貫き、ハノイ駅、ザップバット駅、ザーラム駅、イエンヴィエン駅など国鉄主要ターミナルと郊外新都市を結ぶ基幹路線。',
    keyStationsVi: ['S1.01 Ngọc Hồi', 'S1.10 Giáp Bát', 'S1.14 Ga Hà Nội', 'S1.20 Long Biên', 'S1.23 Gia Lâm', 'S1.26 Yên Viên', 'S1.30 Như Quỳnh'],
    keyStationsJa: ['S1.01 ゴックホイ駅', 'S1.10 ザップバット駅', 'S1.14 ハノイ中央駅', 'S1.20 ロンビエン駅', 'S1.23 ザーラム駅', 'S1.26 イエンヴィエン駅', 'S1.30 ニュークイン駅'],
    connectedProjectsVi: ['Khu D - Vinhomes Olympic', 'Vinhomes Riverside', 'Vinhomes Ocean Park'],
    connectedProjectsJa: ['ビンホームズ・オリンピック（D区）', 'ビンホームズ・リバーサイド', 'ビンホームズ・オーシャンパーク'],
    completionYear: 'Dự kiến 2030+'
  },
  {
    id: 'line-2',
    code: 'M2',
    number: '2',
    nameVi: 'Tuyến Metro Số 2 (Nam Thăng Long - Trần Hưng Đạo - Thượng Đình)',
    nameJa: 'ハノイ都市鉄道2号線（ナムタンロン 〜 チャンフンダオ 〜 トゥオンディン線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 2-gōsen (Nam Thang Long - Tran Hung Dao - Thuong Dinh)',
    status: 'construction',
    statusVi: 'Đang triển khai thiết kế & chuẩn bị thi công',
    statusJa: '詳細設計見直し・建設準備中（JICA支援ODA）',
    routeVi: 'Nam Thăng Long (Ciputra) - Ngoại Giao Đoàn - Hồ Tây - Hàng Đậu - Bờ Hồ Hoàn Kiếm - Trần Hưng Đạo - Phố Huế - Bạch Mai - Thượng Đình',
    routeJa: 'ナムタンロン駅（シプトラ）〜 外交団地区 〜 ホータイ（西湖）駅 〜 ハンザウ駅 〜 ホアンキエム湖駅 〜 チャンフンダオ駅 〜 フォーフエ駅 〜 バクマイ駅 〜 トゥオンディン駅',
    startStationVi: 'Nam Thăng Long (Ciputra / Bắc Từ Liêm)',
    startStationJa: 'ナムタンロン駅（シプトラ国際都市／北トゥーリエム区）',
    endStationVi: 'Thượng Đình (Thanh Xuân)',
    endStationJa: 'トゥオンディン駅（タンスアン区）',
    lengthKm: 42,
    stationsCount: 41,
    color: '#2563EB',
    bgLight: 'bg-blue-50 border-blue-200 text-blue-700',
    descriptionVi: 'Tuyến metro ngầm xuyên qua lòng trung tâm lịch sử 36 Phố Phường và Hồ Hoàn Kiếm, được hỗ trợ vốn ODA từ Cơ quan Hợp tác Quốc tế Nhật Bản (JICA).',
    descriptionJa: 'ハノイ旧市街（36通り）やホアンキエム湖の地下を通過し、日本のJICA（国際協力機構）が支援する都市中枢の重要地下鉄路線。',
    keyStationsVi: ['S2.01 Nam Thăng Long', 'S2.03 Ngoại Giao Đoàn', 'S2.05 Tây Hồ', 'S2.07 Hàng Đậu', 'S2.09 Bờ Hồ (Hoàn Kiếm)', 'S2.10 Trần Hưng Đạo', 'S2.14 Thượng Đình'],
    keyStationsJa: ['S2.01 ナムタンロン駅', 'S2.03 外交団地区駅', 'S2.05 西湖（ホータイ）駅', 'S2.07 ハンザウ駅', 'S2.09 ホアンキエム湖駅', 'S2.10 チャンフンダオ駅', 'S2.14 トゥオンディン駅'],
    connectedProjectsVi: ['Ciputra Hà Nội', 'Khu đô thị Ngoại Giao Đoàn', 'Vinhomes Gallery Giảng Võ'],
    connectedProjectsJa: ['シプトラ・ハノイ国際都市', '外交団都市区', 'ビンホームズ・ギャラリー・ジャンボー'],
    completionYear: '2028-2030'
  },
  {
    id: 'line-2a',
    code: 'M2A',
    number: '2A',
    nameVi: 'Tuyến Metro Số 2A (Cát Linh - Hà Đông - Xuân Mai)',
    nameJa: 'ハノイ都市鉄道2A号線（カットリン 〜 ハドン 〜 スアンマイ線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 2A-gōsen (Cat Linh - Ha Dong - Xuan Mai)',
    status: 'operating',
    statusVi: 'Đang vận hành thương mại',
    statusJa: '正式商業運行中（開通済み）',
    routeVi: 'Cát Linh - La Thành - Thái Hà - Láng - Thượng Đình - Vành Đai 3 - Phùng Khoang - Văn Quán - Hà Đông - La Khê - Văn Khê - Yên Nghĩa',
    routeJa: 'カットリン駅 〜 ラタイン駅 〜 タイハー駅 〜 ラン駅 〜 トゥオンディン駅 〜 第3環状線駅 〜 フンコアン駅 〜 ヴァンクアン駅 〜 ハドン駅 〜 ラケー駅 〜 ヴァンケー駅 〜 イエンギア駅',
    startStationVi: 'Cát Linh (Đống Đa)',
    startStationJa: 'カットリン駅（吉霊／ドンダー区）',
    endStationVi: 'Yên Nghĩa (Hà Đông)',
    endStationJa: 'イエンギア駅（安義／ハドン区）',
    lengthKm: 13.05,
    stationsCount: 12,
    color: '#16A34A',
    bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    descriptionVi: 'Tuyến metro đầu tiên chính thức đi vào hoạt động tại Việt Nam từ ngày 06/11/2021, phục vụ hơn 35.000 lượt khách mỗi ngày với 12 ga trên cao tiện nghi.',
    descriptionJa: '2021年11月6日に開業したベトナム初の都市鉄道。全線高架12駅で運行され、1日平均3.5万人以上が利用するハノイ市民の主要通勤路線。',
    keyStationsVi: ['Cát Linh', 'La Thành', 'Thái Hà', 'Láng', 'Thượng Đình', 'Vành Đai 3', 'Phùng Khoang', 'Văn Quán', 'Hà Đông', 'La Khê', 'Văn Khê', 'Yên Nghĩa'],
    keyStationsJa: ['カットリン駅（吉霊）', 'ラタイン駅（羅城）', 'タイハー駅（泰河）', 'ラン駅（廊）', 'トゥオンディン駅（上亭）', '第3環状線駅', 'フンコアン駅（馮珖）', 'ヴァンクアン駅（文館）', 'ハドン駅（河東）', 'ラケー駅（羅渓）', 'ヴァンケー駅（文渓）', 'イエンギア駅（安義）'],
    connectedProjectsVi: ['Masterise Nguyễn Trãi', 'Vinhomes Royal City (lân cận Thượng Đình)'],
    connectedProjectsJa: ['マスタライズ・グエンチャイ', 'ビンホームズ・ロイヤルシティ（トゥオンディン駅近傍）'],
    completionYear: 'Khánh thành 11/2021'
  },
  {
    id: 'line-3',
    code: 'M3',
    number: '3',
    nameVi: 'Tuyến Metro Số 3 (Nhổn - Ga Hà Nội - Hoàng Mai)',
    nameJa: 'ハノイ都市鉄道3号線（ニョン 〜 ハノイ駅 〜 ホアンマイ線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 3-gōsen (Nhon - Ga Ha Noi - Hoang Mai)',
    status: 'operating',
    statusVi: 'Đã vận hành đoạn trên cao (Nhổn - Cầu Giấy), đang thi công đoạn ngầm',
    statusJa: '高架区間運行中（2024年8月開業）・地下区間建設中',
    routeVi: 'Nhổn - Minh Khai - Phú Diễn - Cầu Diễn - Lê Đức Thọ - Đại học Quốc gia - Chùa Hà - Cầu Giấy - Kim Mã - Cát Linh - Văn Miếu - Ga Hà Nội (- Tam Trinh - Yên Sở)',
    routeJa: 'ニョン駅 〜 ミンカイ駅 〜 フーディエン駅 〜 カウジエン駅 〜 レードゥックトー駅 〜 国家大学駅 〜 チュウハー駅 〜 カウザイ駅 〜 キムマー駅 〜 カットリン駅 〜 文廟駅 〜 ハノイ駅 〜（延伸計画：タムチン 〜 イエンソー）',
    startStationVi: 'Nhổn (Bắc Từ Liêm)',
    startStationJa: 'ニョン駅（北トゥーリエム区）',
    endStationVi: 'Ga Hà Nội / Yên Sở (Hoàng Mai)',
    endStationJa: 'ハノイ駅／イエンソー駅（ホアンマイ区）',
    lengthKm: 21.2,
    stationsCount: 19,
    color: '#D97706',
    bgLight: 'bg-amber-50 border-amber-200 text-amber-700',
    descriptionVi: 'Đoạn trên cao 8.5 km (Nhổn - Cầu Giấy) đã chính thức đón khách từ tháng 8/2024. Đoạn ngầm 4 km đến Ga Hà Nội đang được đào hầm robot TBM.',
    descriptionJa: '2024年8月にニョン〜カウザイ間の高架部（8.5km、8駅）が先行開業。ハノイ駅までの地下区間（4km、4駅）はフランス技術支援のもとTBMシールド掘削中。',
    keyStationsVi: ['Nhổn', 'Minh Khai', 'Phú Diễn', 'Cầu Diễn', 'Lê Đức Thọ', 'Đại học Quốc gia', 'Chùa Hà', 'Cầu Giấy', 'Kim Mã (ngầm)', 'Cát Linh (ngầm)', 'Văn Miếu (ngầm)', 'Ga Hà Nội (ngầm)'],
    keyStationsJa: ['ニョン駅', 'ミンカイ駅', 'フーディエン駅', 'カウジエン駅', 'レードゥックトー駅', '国家大学駅', 'チュウハー駅', 'カウザイ駅', 'キムマー駅（地下）', 'カットリン駅（地下）', '文廟駅（地下）', 'ハノイ中央駅（地下）'],
    connectedProjectsVi: ['Vinhomes Gardenia (Mỹ Đình)', 'Đại học Quốc gia Hà Nội', 'Sân vận động Mỹ Đình'],
    connectedProjectsJa: ['ビンホームズ・ガーデニア（ミーディン）', 'ベトナム国家大学ハノイ校', 'ミーディン国立競技場'],
    completionYear: 'Đoạn trên cao: 2024 | Toàn tuyến: 2027'
  },
  {
    id: 'line-4',
    code: 'M4',
    number: '4',
    nameVi: 'Tuyến Metro Số 4 (Mê Linh - Sài Đồng - Liên Hà)',
    nameJa: 'ハノイ都市鉄道4号線（メーリン 〜 サイゾン 〜 リエンハー 環状線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 4-gōsen (Me Linh - Sai Dong - Lien Ha)',
    status: 'planning',
    statusVi: 'Quy hoạch định hướng vành đai',
    statusJa: '環状路線計画構想段階',
    routeVi: 'Mê Linh - Đông Anh - Sài Đồng - Cầu Vĩnh Tuy - Vành đai 2.5 - Hoàng Mai - Thanh Xuân - Từ Liêm - Cổ Nhuế - Liên Hà',
    routeJa: 'メーリン駅 〜 ドンアイン駅 〜 サイゾン駅 〜 ヴィンツイ橋 〜 第2.5環状線 〜 ホアンマイ駅 〜 タンスアン駅 〜 トゥーリエム 〜 コニュエ駅 〜 リエンハー駅',
    startStationVi: 'Mê Linh',
    startStationJa: 'メーリン駅',
    endStationVi: 'Liên Hà (Đan Phượng)',
    endStationJa: 'リエンハー駅（ダンフオン県）',
    lengthKm: 53.1,
    stationsCount: 41,
    color: '#0D9488',
    bgLight: 'bg-teal-50 border-teal-200 text-teal-700',
    descriptionVi: 'Tuyến vành đai bán khép kín kết nối các trung tâm công nghiệp, đô thị mới phía Bắc Sông Hồng với các chuỗi đô thị phía Tây và Nam.',
    descriptionJa: '紅河北岸の工業・新興都市（メーリン、ドンアイン）と南部・西部都市群を結ぶ大規模セミサークル型環状路線。',
    keyStationsVi: ['Mê Linh', 'Đông Anh', 'Sài Đồng', 'Vĩnh Tuy', 'Vành Đai 2.5', 'Cổ Nhuế', 'Liên Hà'],
    keyStationsJa: ['メーリン駅', 'ドンアイン駅', 'サイゾン駅', 'ヴィンツイ駅', '第2.5環状線駅', 'コニュエ駅', 'リエンハー駅'],
    connectedProjectsVi: ['Vinhomes Global Gate Cổ Loa', 'Vinhomes Riverside', 'Vinhomes Wonder City Đan Phượng'],
    connectedProjectsJa: ['ビンホームズ・グローバルゲート・コーロア', 'ビンホームズ・リバーサイド', 'ビンホームズ・ワンダーシティ・ダンフオン'],
    completionYear: 'Tầm nhìn 2030-2035'
  },
  {
    id: 'line-5',
    code: 'M5',
    number: '5',
    nameVi: 'Tuyến Metro Số 5 (Văn Cao - Ngọc Khánh - Láng - Hòa Lạc)',
    nameJa: 'ハノイ都市鉄道5号線（ヴァンカオ 〜 ゴックカイン 〜 ラン 〜 ホアラ線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 5-gōsen (Van Cao - Ngoc Khanh - Lang - Hoa Lac)',
    status: 'construction',
    statusVi: 'Đang hoàn tất phê duyệt đầu tư & chuẩn bị khởi công',
    statusJa: '投資承認完了・着工準備中（優先推進路線）',
    routeVi: 'Văn Cao - Liễu Giai - Nguyễn Chí Thanh - Trần Duy Hưng - Vành đai 3 - Đại lộ Thăng Long - Nam An Khánh - Hòa Lạc',
    routeJa: 'ヴァンカオ駅 〜 リエウザーイ駅 〜 グエンチータイン駅 〜 チャンズアフン駅 〜 第3環状線駅 〜 タンロン大通り 〜 南アンカイン駅 〜 ホアラハイテクパーク駅',
    startStationVi: 'Văn Cao (Ba Đình)',
    startStationJa: 'ヴァンカオ駅（バーディン区）',
    endStationVi: 'Hòa Lạc (Thạch Thất)',
    endStationJa: 'ホアラ駅（ハイテクパーク／タックタット県）',
    lengthKm: 38.43,
    stationsCount: 21,
    color: '#7C3AED',
    bgLight: 'bg-purple-50 border-purple-200 text-purple-700',
    descriptionVi: 'Tuyến đường sắt đô thị tốc độ cao chiến lược nối trung tâm Ba Đình với Đô thị Vệ tinh & Khu công nghệ cao Hòa Lạc; chạy dọc trục Đại lộ Thăng Long.',
    descriptionJa: 'ハノイ中心街バーディン区と西部のホアラ・ハイテクパークおよび国家大学新キャンパスを結ぶ、タンロン大通り沿いの超重要高速連絡路線。',
    keyStationsVi: ['Văn Cao', 'Ngọc Khánh', 'Láng', 'Vành Đai 3', 'Mễ Trì', 'Vinhomes Smart City', 'An Khánh', 'Hòa Lạc'],
    keyStationsJa: ['ヴァンカオ駅', 'ゴックカイン駅', 'ラン駅', '第3環状線駅', 'メートリー駅', 'ビンホームズ・スマートシティ駅', 'アンカイン駅', 'ホアラ駅'],
    connectedProjectsVi: ['Vinhomes Smart City', 'Vinhomes Green Bay', 'Vinhomes Green Villas', 'Khu Công nghệ cao Hòa Lạc'],
    connectedProjectsJa: ['ビンホームズ・スマートシティ', 'ビンホームズ・グリーンベイ', 'ビンホームズ・グリーンヴィラズ', 'ホアラ・ハイテクパーク'],
    completionYear: '2026-2030'
  },
  {
    id: 'line-6',
    code: 'M6',
    number: '6',
    nameVi: 'Tuyến Metro Số 6 (Nội Bài - Phú Diễn - Hà Đông - Ngọc Hồi)',
    nameJa: 'ハノイ都市鉄道6号線（ノイバイ空港 〜 フーディエン 〜 ハドン 〜 ゴックホイ線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 6-gōsen (Noi Bai - Phu Dien - Ha Dong - Ngoc Hoi)',
    status: 'planning',
    statusVi: 'Quy hoạch đường sắt sân bay quốc tế',
    statusJa: '国際空港アクセス鉄道計画中',
    routeVi: 'Sân bay Quốc tế Nội Bài - Cầu Thăng Long - Phú Diễn - Mỹ Đình - Vành đai 3.5 - Hà Đông - Ngọc Hồi',
    routeJa: 'ノイバイ国際空港駅 〜 タンロン橋 〜 フーディエン駅 〜 ミーディン新都心駅 〜 第3.5環状線 〜 ハドン駅 〜 ゴックホイ南総合駅',
    startStationVi: 'Sân bay Quốc tế Nội Bài (Sóc Sơn)',
    startStationJa: 'ノイバイ国際空港駅（ソックソン県）',
    endStationVi: 'Ngọc Hồi (Thanh Trì)',
    endStationJa: 'ゴックホイ駅（タインチー県）',
    lengthKm: 43.0,
    stationsCount: 29,
    color: '#0284C7',
    bgLight: 'bg-sky-50 border-sky-200 text-sky-700',
    descriptionVi: 'Tuyến liên kết trực tiếp từ Cảng hàng không quốc tế Nội Bài sang phía Tây và Tây Nam Thủ đô, trung chuyển tại ga đường sắt tốc độ cao Ngọc Hồi.',
    descriptionJa: 'ノイバイ国際空港とハノイ西南部および南北高速鉄道ターミナル予定地（ゴックホイ駅）を直結する空港連絡鉄道路線。',
    keyStationsVi: ['Nội Bài Terminal 1 & 2', 'Bắc Thăng Long', 'Phú Diễn', 'Mỹ Đình', 'Hà Đông', 'Ngọc Hồi'],
    keyStationsJa: ['ノイバイ空港第1・第2ターミナル駅', '北タンロン駅', 'フーディエン駅', 'ミーディン駅', 'ハドン駅', 'ゴックホイ駅'],
    connectedProjectsVi: ['Cảng Hàng không Quốc tế Nội Bài', 'Khu D - Vinhomes Olympic'],
    connectedProjectsJa: ['ノイバイ国際空港（HAN）', 'ビンホームズ・オリンピック（D区）'],
    completionYear: 'Tầm nhìn 2030-2035'
  },
  {
    id: 'line-7',
    code: 'M7',
    number: '7',
    nameVi: 'Tuyến Metro Số 7 (Mê Linh - An Khánh - Dương Nội)',
    nameJa: 'ハノイ都市鉄道7号線（メーリン 〜 アンカイン新都市 〜 ズオンノイ線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 7-gōsen (Me Linh - An Khanh - Duong Noi)',
    status: 'planning',
    statusVi: 'Quy hoạch tuyến liên kết đô thị phía Tây',
    statusJa: '西部新興住宅都市連絡線・計画中',
    routeVi: 'Mê Linh - Cổ Nhuế - Nhổn - Vân Canh - Khu đô thị mới An Khánh - Dương Nội (Hà Đông)',
    routeJa: 'メーリン駅 〜 コニュエ駅 〜 ニョン駅 〜 ヴァンカイン駅 〜 アンカイン新都市駅 〜 ズオンノイ駅（ハドン）',
    startStationVi: 'Mê Linh',
    startStationJa: 'メーリン駅',
    endStationVi: 'Dương Nội (Hà Đông)',
    endStationJa: 'ズオンノイ駅（ハドン区）',
    lengthKm: 28.0,
    stationsCount: 23,
    color: '#EA580C',
    bgLight: 'bg-orange-50 border-orange-200 text-orange-700',
    descriptionVi: 'Kết nối chuỗi đô thị vệ tinh và đại dự án bất động sản dọc hành lang đường Vành Đai 3.5 và Vành Đai 4 phía Tây Hà Nội.',
    descriptionJa: 'ハノイ西部開発地域（第3.5環状線・第4環状線沿い）の新都市とアンカイン、ハドン地区を結ぶ地域交通路線。',
    keyStationsVi: ['Mê Linh', 'Cổ Nhuế', 'Nhổn (giao Tuyến 3)', 'Vân Canh', 'An Khánh (giao Tuyến 5)', 'Dương Nội'],
    keyStationsJa: ['メーリン駅', 'コニュエ駅', 'ニョン駅（3号線接続）', 'ヴァンカイン駅', 'アンカイン駅（5号線接続）', 'ズオンノイ駅'],
    connectedProjectsVi: ['Vinhomes Smart City (tiếp giáp)', 'Splendora Bắc An Khánh'],
    connectedProjectsJa: ['ビンホームズ・スマートシティ隣接エリア', 'スプレンドラ北アンカイン'],
    completionYear: 'Tầm nhìn 2035'
  },
  {
    id: 'line-8',
    code: 'M8',
    number: '8',
    nameVi: 'Tuyến Metro Số 8 (Sơn Đồng - Mai Dịch - Vành Đai 3 - Lĩnh Nam - Dương Xá)',
    nameJa: 'ハノイ都市鉄道8号線（ソンドン 〜 マイジック 〜 第3環状線 〜 リンナム 〜 ズオンサー線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 8-gōsen (Son Dong - Mai Dich - Ring 3 - Linh Nam - Duong Xa)',
    status: 'planning',
    statusVi: 'Quy hoạch chi tiết 55 ga (S8.01 - S8.55) trên bản đồ',
    statusJa: '詳細計画中（マップ上に55駅S8.01〜S8.55配置）',
    routeVi: 'Sơn Đồng - Hoài Đức - Mai Dịch - Vành Đai 3 - Thanh Xuân - Định Công - Lĩnh Nam - Vượt Sông Hồng - Gia Lâm - Dương Xá',
    routeJa: 'ソンドン駅（ホアイドゥック）〜 マイジック駅 〜 第3環状線 〜 タンスアン駅 〜 ディンコン駅 〜 リンナム駅 〜 紅河横断 〜 ザーラム駅 〜 ズオンサー駅（オーシャンパーク直結）',
    startStationVi: 'Sơn Đồng (Hoài Đức)',
    startStationJa: 'ソンドン駅（ホアイドゥック県）',
    endStationVi: 'Dương Xá (Gia Lâm / Vinhomes Ocean Park)',
    endStationJa: 'ズオンサー駅（ザーラム県／ビンホームズ・オーシャンパーク前）',
    lengthKm: 37.0,
    stationsCount: 55,
    color: '#9333EA',
    bgLight: 'bg-purple-50 border-purple-200 text-purple-700',
    descriptionVi: 'Tuyến đường sắt vành đai nội đô chiến lược với 55 ga được định vị chi tiết, chạy bám theo Vành Đai 3, kết nối xuyên tâm sang Gia Lâm và Vinhomes Ocean Park 1, 2, 3.',
    descriptionJa: '第3環状線に沿って都心を半周し紅河を越えてザーラム、ビンホームズ・オーシャンパーク1・2・3へ直結するハノイ屈指のメガ路線（55駅設置計画）。',
    keyStationsVi: ['S8.01 Sơn Đồng', 'S8.05 Mai Dịch', 'S8.15 Thanh Xuân', 'S8.28 Định Công', 'S8.38 Lĩnh Nam', 'S8.50 Gia Lâm', 'S8.55 Dương Xá (Ocean Park)'],
    keyStationsJa: ['S8.01 ソンドン駅', 'S8.05 マイジック駅', 'S8.15 タンスアン駅', 'S8.28 ディンコン駅', 'S8.38 リンナム駅', 'S8.50 ザーラム駅', 'S8.55 ズオンサー駅（オーシャンパーク）'],
    connectedProjectsVi: ['Vinhomes Ocean Park 1', 'Vinhomes Ocean Park 2', 'Vinhomes Ocean Park 3', 'Sân Vận Động Vinfast'],
    connectedProjectsJa: ['ビンホームズ・オーシャンパーク1', 'ビンホームズ・オーシャンパーク2', 'ビンホームズ・オーシャンパーク3', 'ビンファスト・スタジアム'],
    completionYear: 'Phân kỳ 2030-2035'
  },
  {
    id: 'line-8b',
    code: 'M8B',
    number: '8B',
    nameVi: 'Tuyến Metro Số 8B (Nhánh kết nối mở rộng Vành Đai 3 - C-ROAD)',
    nameJa: 'ハノイ都市鉄道8B号線（第3環状線延伸・C-ROAD支線接続ルート）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 8B-gōsen (Branch & Extended Feeder)',
    status: 'planning',
    statusVi: 'Quy hoạch bổ sung nhánh hỗ trợ',
    statusJa: '8号線補完支線・計画調査中',
    routeVi: 'Tuyến nhánh bổ trợ từ hành lang Vành Đai 3 kết nối vào các khu trung tâm dịch vụ công cộng Đông Nam',
    routeJa: '第3環状線回廊から南東部都市公共サービス拠点へ接続する補完フィーダー路線',
    startStationVi: 'Điểm nối Tuyến 8 (Hành lang Vành Đai 3)',
    startStationJa: '8号線分岐点（第3環状線回廊）',
    endStationVi: 'Khu dịch vụ trung tâm Đông Nam',
    endStationJa: '南東部新興都心サービス拠点',
    lengthKm: 14.5,
    stationsCount: 12,
    color: '#A855F7',
    bgLight: 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700',
    descriptionVi: 'Tuyến nhánh phân lưu hành khách, tăng mật độ tiếp cận metro cho các cực phát triển đô thị phía Đông Nam theo bản vẽ KML.',
    descriptionJa: '8号線の混雑緩和および南東部開発エリアの鉄道アクセス向上を目的に策定された支線ルート。',
    keyStationsVi: ['Nhánh Vành Đai 3', 'Khu liên hợp thể thao - đô thị', 'Điểm kết nối C-ROAD'],
    keyStationsJa: ['第3環状線分岐駅', '都市スポーツ複合施設駅', 'C-ROAD接続点'],
    connectedProjectsVi: ['Khu B, C - Vinhomes Olympic'],
    connectedProjectsJa: ['ビンホームズ・オリンピック（B区・C区）'],
    completionYear: 'Tầm nhìn 2035'
  },
  {
    id: 'line-9',
    code: 'M9',
    number: '9',
    nameVi: 'Tuyến Metro Số 9 (Sơn Tây - Hòa Lạc - Xuân Mai)',
    nameJa: 'ハノイ都市鉄道9号線（ソンタイ 〜 ホアラ 〜 スアンマイ線・西郊外連絡線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 9-gōsen (Son Tay - Hoa Lac - Xuan Mai)',
    status: 'planning',
    statusVi: 'Quy hoạch kết nối chuỗi đô thị vệ tinh',
    statusJa: '西部衛星都市間連絡路線・計画中',
    routeVi: 'Đô thị cổ Sơn Tây - Khu công nghệ cao Hòa Lạc - Đô thị vệ tinh Xuân Mai',
    routeJa: 'ソンタイ古城駅 〜 ホアラハイテクパーク駅 〜 スアンマイ衛星都市駅',
    startStationVi: 'Sơn Tây',
    startStationJa: 'ソンタイ駅',
    endStationVi: 'Xuân Mai (Chương Mỹ)',
    endStationJa: 'スアンマイ駅（チュオンミー県）',
    lengthKm: 45.0,
    stationsCount: 18,
    color: '#059669',
    bgLight: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    descriptionVi: 'Tuyến đường sắt liên kết chuỗi 3 đô thị vệ tinh lớn nhất phía Tây của Thủ đô Hà Nội, hỗ trợ giãn dân nội đô.',
    descriptionJa: 'ハノイ西部3大衛星都市（ソンタイ・ホアラ・スアンマイ）を縦断連携し、都心部の人口分散を促進する広域連絡鉄道路線。',
    keyStationsVi: ['Sơn Tây', 'Khu Công nghệ cao Hòa Lạc', 'Đại học Quốc gia Hòa Lạc', 'Xuân Mai'],
    keyStationsJa: ['ソンタイ駅', 'ホアラハイテクパーク駅', '国家大学ホアラ校舎駅', 'スアンマイ駅'],
    connectedProjectsVi: ['Khu CNC Hòa Lạc', 'Đô thị Đại học Quốc gia'],
    connectedProjectsJa: ['ホアラ・ハイテクパーク', 'ハノイ国家大学新都市キャンパス'],
    completionYear: 'Tầm nhìn 2035-2040'
  },
  {
    id: 'line-10',
    code: 'M10',
    number: '10',
    nameVi: 'Tuyến Metro Số 10 (Cát Linh - Mỹ Đình - Sân bay Quốc tế Gia Bình)',
    nameJa: 'ハノイ都市鉄道10号線（カットリン 〜 ミーディン 〜 ジャービン国際空港・北東部工業線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 10-gōsen (Cat Linh - My Dinh - Gia Binh Airport)',
    status: 'planning',
    statusVi: 'Quy hoạch chi tiết 31 ga (S10.01 - S10.31) trên bản đồ',
    statusJa: '詳細計画中（マップ上に31駅S10.01〜S10.31配置）',
    routeVi: 'Trục hướng tâm từ nội đô qua Mỹ Đình, vượt sông sang Đông Bắc kết nối chuỗi ga S10.01 đến S10.31 tới Sân bay Quốc tế Gia Bình',
    routeJa: 'ハノイ都心〜ミーディン〜紅海東岸を抜け、新設予定のジャービン国際空港・北東部地域を直結（S10.01〜S10.31駅網）',
    startStationVi: 'S10.01 Mỹ Đình / Trung tâm',
    startStationJa: 'S10.01 ミーディン／都心拠点駅',
    endStationVi: 'S10.31 Cảng hàng không Quốc tế Gia Bình',
    endStationJa: 'S10.31 ジャービン国際空港駅',
    lengthKm: 35.2,
    stationsCount: 31,
    color: '#2563EB',
    bgLight: 'bg-blue-50 border-blue-200 text-blue-700',
    descriptionVi: 'Tuyến metro hướng Đông Bắc với 31 ga định danh chi tiết, kết nối chuỗi đô thị hiện đại và đầu mối Cảng hàng không Quốc tế Gia Bình.',
    descriptionJa: 'ハノイ新都心ミーディンと新設構想中のジャービン国際空港を結ぶ31駅の北東部広域高規格都市鉄道。',
    keyStationsVi: ['S10.01 Mỹ Đình', 'S10.05 Cầu Giấy', 'S10.15 Long Biên', 'S10.25 Gia Lâm', 'S10.31 CHK QT Gia Bình'],
    keyStationsJa: ['S10.01 ミーディン駅', 'S10.05 カウザイ駅', 'S10.15 ロンビエン駅', 'S10.25 ザーラム駅', 'S10.31 ジャービン国際空港駅'],
    connectedProjectsVi: ['CHK QUỐC TẾ GIA BÌNH', 'Vinhomes Global Gate Cổ Loa', 'Vinhomes Riverside'],
    connectedProjectsJa: ['ジャービン国際空港（新設）', 'ビンホームズ・グローバルゲート・コーロア', 'ビンホームズ・リバーサイド'],
    completionYear: 'Tầm nhìn 2035'
  },
  {
    id: 'line-11',
    code: 'M11',
    number: '11',
    nameVi: 'Tuyến Metro Số 11 (Vành đai phía Nam - Thường Tín - Phú Xuyên)',
    nameJa: 'ハノイ都市鉄道11号線（南部広域接続線：トゥオンティン 〜 フースエン衛星都市線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 11-gōsen (Thuong Tin - Phu Xuyen Satellite)',
    status: 'planning',
    statusVi: 'Quy hoạch mở rộng vùng phía Nam',
    statusJa: '南部広域新都市構想線・計画中',
    routeVi: 'Kết nối từ trung tâm mở rộng về chuỗi đô thị vệ tinh phía Nam, khu công nghiệp hỗ trợ Nam Hà Nội và cảng cạn Phú Xuyên',
    routeJa: 'ハノイ南環状・新都心からトゥオンティン、フースエン工業衛星都市・内陸港湾地区を結ぶ南部連絡幹線',
    startStationVi: 'Thanh Trì / Ga Ngọc Hồi',
    startStationJa: 'タインチー／ゴックホイ駅',
    endStationVi: 'Đô thị vệ tinh Phú Xuyên',
    endStationJa: 'フースエン衛星都市駅',
    lengthKm: 32.5,
    stationsCount: 20,
    color: '#CA8A04',
    bgLight: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    descriptionVi: 'Tuyến thúc đẩy phát triển cụm công nghiệp hỗ trợ công nghệ cao và logistics lớn nhất khu vực Nam Thủ đô.',
    descriptionJa: 'ハノイ南部のハイテク裾野産業クラスターおよび大型物流拠点の発展を牽引する重要旅客鉄道。',
    keyStationsVi: ['Thanh Trì', 'Thường Tín', 'Văn Tự', 'Phú Xuyên Central'],
    keyStationsJa: ['タインチー駅', 'トゥオンティン駅', 'ヴァンツー駅', 'フースエン中央駅'],
    connectedProjectsVi: ['Khu công nghiệp hỗ trợ Nam Hà Nội', 'Khu A - Vinhomes Olympic'],
    connectedProjectsJa: ['ハノイ南部裾野産業団地', 'ビンホームズ・オリンピック（A区）'],
    completionYear: 'Tầm nhìn 2035-2040'
  },
  {
    id: 'line-12',
    code: 'M12',
    number: '12',
    nameVi: 'Tuyến Metro Số 12 (Bắc Sông Hồng - Đông Anh - Mê Linh - Sóc Sơn)',
    nameJa: 'ハノイ都市鉄道12号線（紅河北岸環状線：ドンアイン 〜 メーリン 〜 ソックソン線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 12-gōsen (North Red River Circular)',
    status: 'planning',
    statusVi: 'Quy hoạch liên kết thành phố phía Bắc Thủ đô',
    statusJa: '北部新都市横断環状連絡線・計画中',
    routeVi: 'Vành đai kết nối mạng lưới đô thị mới phía Bắc Sông Hồng: Đông Anh - Mê Linh - Sóc Sơn và các khu đô thị sinh thái',
    routeJa: '紅河北岸のメガ新都心（ドンアイン・メーリン・ソックソン）とスマートシティ構想地を結ぶ環状連絡網',
    startStationVi: 'Đông Anh Smart City',
    startStationJa: 'ドンアイン・スマートシティ駅',
    endStationVi: 'Sóc Sơn New Town',
    endStationJa: 'ソックソン・ニュータウン駅',
    lengthKm: 36.0,
    stationsCount: 24,
    color: '#0891B2',
    bgLight: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    descriptionVi: 'Phục vụ trực tiếp cho mô hình "Thành phố trong thành phố" phía Bắc sông Hồng theo đồ án quy hoạch tổng thể mới.',
    descriptionJa: 'ハノイ新総合都市計画に基づく「紅河北部スマート新都市」の骨格を形成する先進環状鉄道路線。',
    keyStationsVi: ['Đông Anh', 'Bắc Cổ Loa', 'Mê Linh Central', 'Kim Anh (Sóc Sơn)'],
    keyStationsJa: ['ドンアイン駅', '北コーロア駅', 'メーリン中央駅', 'キムアイン駅（ソックソン）'],
    connectedProjectsVi: ['Vinhomes Global Gate Cổ Loa', 'Thành phố Thông minh Bắc Hà Nội'],
    connectedProjectsJa: ['ビンホームズ・グローバルゲート・コーロア', '北ハノイ・スマートシティ'],
    completionYear: 'Tầm nhìn 2035'
  },
  {
    id: 'line-13',
    code: 'M13',
    number: '13',
    nameVi: 'Tuyến Metro Số 13 (Tuyến xuyên tâm Đông - Tây mới)',
    nameJa: 'ハノイ都市鉄道13号線（東西新軸直通クロスライン）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 13-gōsen (East-West Cross City Line)',
    status: 'planning',
    statusVi: 'Quy hoạch bổ sung đồ án mới',
    statusJa: '東西直通新幹線・改定マスタープラン検討中',
    routeVi: 'Kết nối từ Hoài Đức / Đan Phượng qua trung tâm mới Tây Hồ Tây, vượt sông sang khu đô thị Gia Lâm',
    routeJa: 'ダンフオン・ホアイドゥックから西湖西新都心を貫通し、紅河を渡りザーラム新都市群へ直通する新東西幹線',
    startStationVi: 'Đan Phượng',
    startStationJa: 'ダンフオン駅',
    endStationVi: 'Gia Lâm East',
    endStationJa: 'ザーラム東部新都心駅',
    lengthKm: 30.5,
    stationsCount: 22,
    color: '#4F46E5',
    bgLight: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    descriptionVi: 'Tuyến trục xuyên tâm Đông - Tây mới bổ sung khả năng di chuyển tốc độ cao, kết nối các siêu đô thị dọc 2 bờ sông Hồng.',
    descriptionJa: '東西軸の移動需要急増に対応するため新設検討された路線。紅河両岸の大型都市プロジェクト群を直結。',
    keyStationsVi: ['Đan Phượng', 'Tây Hồ Tây (Starlake)', 'Long Biên New Town', 'Gia Lâm'],
    keyStationsJa: ['ダンフオン駅', 'スターレイク西湖西駅', 'ロンビエン新都心駅', 'ザーラム駅'],
    connectedProjectsVi: ['Vinhomes Wonder City Đan Phượng', 'Starlake Tây Hồ Tây'],
    connectedProjectsJa: ['ビンホームズ・ワンダーシティ・ダンフオン', 'スターレイク西湖西'],
    completionYear: 'Tầm nhìn 2035'
  },
  {
    id: 'line-14',
    code: 'M14',
    number: '14',
    nameVi: 'Tuyến Metro Số 14 (Tuyến kết nối Sân bay Quốc tế Gia Bình & Hành lang Đông Bắc)',
    nameJa: 'ハノイ都市鉄道14号線（ジャービン国際空港アクセス＆北東部経済回廊線）',
    nameJaRomaji: 'Hanoi Toshi Tetsudō 14-gōsen (Gia Binh Airport Express Corridor)',
    status: 'planning',
    statusVi: 'Quy hoạch chi tiết 27 mốc ga (S14.01 - S14.26) trên bản đồ',
    statusJa: '詳細計画中（マップ上に27駅S14.01〜S14.26配置）',
    routeVi: 'Đường Line Tuyến 14 kết nối qua chuỗi các ga S14.01 đến S14.26 thẳng tới khu vực Cảng hàng không Quốc tế Gia Bình',
    routeJa: '14号線専用幹線ルート（S14.01〜S14.26駅網）を通じて、ジャービン国際空港および北東部回廊を直結',
    startStationVi: 'S14.01 Trung tâm Đông Anh / Long Biên',
    startStationJa: 'S14.01 ドンアイン／ロンビエン起点駅',
    endStationVi: 'S14.26 Khu vực Cảng hàng không Gia Bình',
    endStationJa: 'S14.26 ジャービン国際空港・経済特区駅',
    lengthKm: 34.0,
    stationsCount: 27,
    color: '#BE123C',
    bgLight: 'bg-rose-50 border-rose-200 text-rose-700',
    descriptionVi: 'Tuyến được định tuyến đặc biệt trên bản đồ My Maps với chuỗi ga S14.01 đến S14.26 và ranh giới sân bay quốc tế Gia Bình.',
    descriptionJa: 'My Maps上にS14.01〜S14.26の駅位置および空港境界線が詳細プロットされた、注目の新国際空港アクセス路線。',
    keyStationsVi: ['S14.01 Đầu Tuyến 14', 'S14.05', 'S14.10', 'S14.15', 'S14.20', 'S14.26 Ga CHK Gia Bình'],
    keyStationsJa: ['S14.01 14号線始発駅', 'S14.05駅', 'S14.10駅', 'S14.15駅', 'S14.20駅', 'S14.26 ジャービン空港駅'],
    connectedProjectsVi: ['CHK QUỐC TẾ GIA BÌNH', 'Vinhomes Global Gate Cổ Loa'],
    connectedProjectsJa: ['ジャービン国際空港（CHK QUỐC TẾ GIA BÌNH）', 'ビンホームズ・グローバルゲート・コーロア'],
    completionYear: 'Quy hoạch đồng bộ sân bay mới'
  }
];

export const VINHOMES_PROJECTS: VinhomesProject[] = [
  {
    id: 'vh-ocean-park-1',
    nameVi: 'Vinhomes Ocean Park (Gia Lâm)',
    nameJa: 'ビンホームズ・オーシャンパーク1（ザーラム県）',
    locationVi: 'Huyện Gia Lâm, Hà Nội',
    locationJa: 'ハノイ市ザーラム県',
    connectedLines: ['M8', 'M1'],
    scaleVi: '420 ha, thành phố biển hồ với hơn 100.000 cư dân, Đại học VinUni, Vincom Mega Mall',
    scaleJa: '総面積420ヘクタール、人工海・湖を有するメガ都市。VinUni大学、大型商業施設併設'
  },
  {
    id: 'vh-ocean-park-2-3',
    nameVi: 'Vinhomes Ocean Park 2 & 3',
    nameJa: 'ビンホームズ・オーシャンパーク2 & 3（オーシャンシティ）',
    locationVi: 'Văn Giang & Văn Lâm, Hưng Yên (liền kề Gia Lâm)',
    locationJa: 'フンイエン省ヴァンザン／ヴァンラム（ザーラム隣接）',
    connectedLines: ['M8', 'M8B', 'M1'],
    scaleVi: 'Hơn 1.200 ha (quần thể Ocean City), công viên sóng nhân tạo lớn nhất thế giới, Grand World',
    scaleJa: '総面積1,200ヘクタール超（オーシャンシティ複合体）、世界最大級の人工波プール、グランドワールド'
  },
  {
    id: 'vh-smart-city',
    nameVi: 'Vinhomes Smart City (Tây Mỗ)',
    nameJa: 'ビンホームズ・スマートシティ（タイモー）',
    locationVi: 'Nam Từ Liêm, Hà Nội (Đại lộ Thăng Long)',
    locationJa: 'ハノイ市南トゥーリエム区（タンロン大通り沿い）',
    connectedLines: ['M5', 'M6', 'M7'],
    scaleVi: '280 ha, giao lộ kim cương của 3 tuyến Metro số 5, 6, 7; Vườn Nhật Zen Park 6,1 ha',
    scaleJa: '総面積280ヘクタール。メトロ5・6・7号線が交差する結節点。東南アジア最大級の日本庭園（6.1ha）'
  },
  {
    id: 'vh-global-gate',
    nameVi: 'Vinhomes Global Gate Cổ Loa',
    nameJa: 'ビンホームズ・グローバルゲート・コーロア（東英）',
    locationVi: 'Đông Anh, Hà Nội',
    locationJa: 'ハノイ市ドンアイン県',
    connectedLines: ['M4', 'M10', 'M12', 'M14'],
    scaleVi: '385 ha, Trung tâm Hội chợ Triển lãm Quốc gia lớn nhất Đông Nam Á, công viên giải trí',
    scaleJa: '総面積385ヘクタール。東南アジア最大規模の国家展示コンベンションセンター併設'
  },
  {
    id: 'vh-wonder-city',
    nameVi: 'Vinhomes Wonder City Đan Phượng',
    nameJa: 'ビンホームズ・ワンダーシティ・ダンフオン',
    locationVi: 'Đan Phượng, Hà Nội',
    locationJa: 'ハノイ市ダンフオン県',
    connectedLines: ['M4', 'M13'],
    scaleVi: '133 ha, khu đô thị sinh thái cao cấp phía Tây Bắc Thủ đô',
    scaleJa: '総面積133ヘクタール。ハノイ北西部の高級エコ新興住宅都市'
  },
  {
    id: 'vh-gardenia',
    nameVi: 'Vinhomes Gardenia',
    nameJa: 'ビンホームズ・ガーデニア（ミーディン）',
    locationVi: 'Hàm Nghi, Nam Từ Liêm, Hà Nội',
    locationJa: 'ハノイ市南トゥーリエム区ハムギー通り',
    connectedLines: ['M3', 'M8'],
    scaleVi: '17.6 ha, khu đô thị hiện đại gần Sân vận động Quốc gia Mỹ Đình và ga Metro số 3',
    scaleJa: '総面積17.6ヘクタール。ミーディン国立競技場およびメトロ3号線駅至近'
  },
  {
    id: 'vh-riverside',
    nameVi: 'Vinhomes Riverside & The Harmony',
    nameJa: 'ビンホームズ・リバーサイド & ハーモニー（ロンビエン）',
    locationVi: 'Long Biên, Hà Nội',
    locationJa: 'ハノイ市ロンビエン区',
    connectedLines: ['M1', 'M4', 'M10'],
    scaleVi: '183 ha, khu biệt thự ven sông sinh thái kiểu Venice đẳng cấp bậc nhất Hà Nội',
    scaleJa: '総面積183ヘクタール。ヴェネツィア風の運河が巡るハノイ屈指の最高級リバーサイド別荘街'
  },
  {
    id: 'vh-green-bay',
    nameVi: 'Vinhomes Green Bay & Green Villas (Mễ Trì)',
    nameJa: 'ビンホームズ・グリーンベイ & グリーンヴィラズ（メートリー）',
    locationVi: 'Số 7 Đại lộ Thăng Long, Mễ Trì, Nam Từ Liêm',
    locationJa: 'ハノイ市南トゥーリエム区タンロン大通り7番地',
    connectedLines: ['M5'],
    scaleVi: '31.8 ha, vịnh xanh giữa lòng phố với hồ điều hòa 8 ha đối diện Trung tâm Hội nghị Quốc gia',
    scaleJa: '総面積31.8ヘクタール。国家会議センター向かい、8ヘクタールの湖水公園を囲む複合高級都市'
  },
  {
    id: 'ciputra-hanoi',
    nameVi: 'Khu đô thị Quốc tế Ciputra Hà Nội',
    nameJa: 'シプトラ・ハノイ国際都市（ナムタンロン）',
    locationVi: 'Tây Hồ & Bắc Từ Liêm, Hà Nội',
    locationJa: 'ハノイ市タイホー区／北トゥーリエム区',
    connectedLines: ['M2', 'M6'],
    scaleVi: '301 ha, đô thị quốc tế kiểu mẫu, nơi đặt ga đầu tuyến Ga Nam Thăng Long (S2.01)',
    scaleJa: '総面積301ヘクタール。外国人駐在員が多く暮らす国際都市。2号線始発駅（S2.01）直結'
  },
  {
    id: 'vh-olympic',
    nameVi: 'Vinhomes Olympic (Khu A, B, C, D) & King Park',
    nameJa: 'ビンホームズ・オリンピック（各区 A・B・C・D） & キングパーク',
    locationVi: 'Thanh Trì & Thường Tín, Hà Nội',
    locationJa: 'ハノイ市タインチー県／トゥオンティン県',
    connectedLines: ['M1', 'M6', 'M8B', 'M11'],
    scaleVi: 'Quần thể đô thị - thể thao sinh thái quy mô lớn nằm dọc theo ga đầu mối Ngọc Hồi',
    scaleJa: '南北高速鉄道ゴックホイ総合駅に隣接する大規模スポーツ・複合新都市開発エリア'
  }
];

export const AIRPORT_FACILITIES: AirportFacility[] = [
  {
    id: 'airport-noi-bai',
    nameVi: 'Cảng Hàng không Quốc tế Nội Bài (HAN)',
    nameJa: 'ノイバイ国際空港（HAN / Noi Bai International Airport）',
    roleVi: 'Sân bay quốc tế lớn nhất miền Bắc, cửa ngõ đối ngoại hàng đầu của Thủ đô Hà Nội',
    roleJa: 'ベトナム北部最大の国際空港。ハノイ首都圏の最重要玄関口',
    connectedLines: ['M2', 'M6']
  },
  {
    id: 'airport-gia-binh',
    nameVi: 'Cảng Hàng không Quốc tế Gia Bình (Được vẽ trong bản đồ)',
    nameJa: 'ジャービン国際空港（地図上に境界線明記・新空港構想）',
    roleVi: 'Cảng hàng không quốc tế chuyên dụng mới thuộc khu vực Gia Bình - Bắc Ninh, kết nối hành lang Đông Bắc',
    roleJa: 'バクニン省ジャービン地区に計画される新国際空港。10号線・14号線と直結',
    connectedLines: ['M10', 'M14']
  }
];

export const TRANSIT_GLOSSARY: TransitTerm[] = [
  {
    vi: 'Tuyến Metro / Đường sắt đô thị',
    ja: 'メトロ・都市鉄道',
    kanji: '都市鉄道',
    romaji: 'Toshi Tetsudō / Metoro',
    meaningVi: 'Hệ thống vận tải hành khách công cộng khối lượng lớn tốc độ cao chạy trên đường ray riêng biệt'
  },
  {
    vi: 'Ga trên cao',
    ja: '高架駅',
    kanji: '高架駅',
    romaji: 'Kōka-eki',
    meaningVi: 'Nhà ga được xây dựng trên cầu cạn bê tông cốt thép'
  },
  {
    vi: 'Ga ngầm',
    ja: '地下駅',
    kanji: '地下駅',
    romaji: 'Chika-eki',
    meaningVi: 'Nhà ga nằm sâu dưới lòng đất được thi công bằng phương pháp đào mở hoặc máy đào hầm TBM'
  },
  {
    vi: 'Ga chuyển tuyến / Ga trung chuyển',
    ja: '乗換駅',
    kanji: '乗換駅',
    romaji: 'Norikae-eki',
    meaningVi: 'Nhà ga giao cắt nơi hành khách có thể chuyển đổi giữa các tuyến metro hoặc giữa metro và xe buýt, đường sắt quốc gia'
  },
  {
    vi: 'Điểm đầu / Điểm cuối',
    ja: '始発駅・終着駅',
    kanji: '始発駅・終着駅',
    romaji: 'Shihatsu-eki / Shūchaku-eki',
    meaningVi: 'Ga xuất phát và ga kết thúc của một tuyến đường sắt'
  },
  {
    vi: 'Đang vận hành thương mại',
    ja: '商業運行中（開通済み）',
    kanji: '運行中',
    romaji: 'Shōgyō unkō-chū',
    meaningVi: 'Tuyến đã chính thức mở cửa đón khách và bán vé dịch vụ'
  },
  {
    vi: 'Đang thi công xây dựng',
    ja: '建設工事中',
    kanji: '建設中',
    romaji: 'Kensetsu kōji-chū',
    meaningVi: 'Dự án đang trong quá trình đào hầm, đổ trụ cẩu dầm hoặc lắp đặt thiết bị ray'
  },
  {
    vi: 'Đang chuẩn bị đầu tư / Quy hoạch',
    ja: '投資準備中・計画段階',
    kanji: '計画中',
    romaji: 'Keikaku dankai / Tōshi junbi-chū',
    meaningVi: 'Đang trong giai đoạn lập báo cáo tiền khả thi, thu xếp nguồn vốn hoặc đền bù giải phóng mặt bằng'
  },
  {
    vi: 'Máy đào hầm TBM (Tunnel Boring Machine)',
    ja: 'シールド掘削機（TBM）',
    kanji: '掘削機',
    romaji: 'Shīrudo kussakuki',
    meaningVi: 'Robot công nghệ cao khoan ngầm tự động lắp vỏ hầm dưới lòng đất như đang triển khai tại Tuyến số 3'
  },
  {
    vi: 'Vé thẻ thông minh IC / Vé lượt',
    ja: 'ICカード乗車券・切符',
    kanji: '乗車券',
    romaji: 'Aishī kādo jōshaken / Kippu',
    meaningVi: 'Phương tiện thanh toán tự động qua cổng soát vé thông minh AFC'
  }
];
