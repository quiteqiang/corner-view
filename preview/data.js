export const trips = [
  {
    id: 'bangkok-river', title: '曼谷 4 天 3 夜', contributor: 'Sky', destination: '曼谷', region: '东南亚', days: 4,
    actualBudget: 850, style: '城市漫游', transport: '公共交通', scenery: 'bangkok',
    summary: '寺庙、街头美食与河畔日落', tips: ['下午 4 点后郑王庙光线更柔和。', '码头入口附近有洗手间。'],
    stops: [
      { id: 'bkk-1', day: 1, time: '09:00', name: '大皇宫', cost: 150, note: '开门后先参观，人最少。' },
      { id: 'bkk-2', day: 1, time: '15:30', name: '郑王庙', cost: 100, note: '搭船过河，傍晚更舒服。' },
      { id: 'bkk-3', day: 2, time: '18:00', name: '唐人街', cost: 220, note: '从主街慢慢吃到小巷。' },
      { id: 'bkk-4', day: 3, time: '10:30', name: '恰图恰市集', cost: 180, note: '周末上午摊位最完整。' },
    ],
    optionalStops: [{ id: 'bkk-o1', day: 3, time: '16:00', name: '湄南河日落船', cost: 160, note: '天气好时加入。' }],
  },
  {
    id: 'ubud-slow', title: '乌布慢游 3 天', contributor: 'Lina', destination: '乌布', region: '东南亚', days: 3,
    actualBudget: 780, style: '自然疗愈', transport: '包车与步行', scenery: 'ubud',
    summary: '清晨稻田、咖啡香与山谷晚餐', tips: ['梯田在上午 8 点前最安静。', '下午常下小雨，随身带薄外套。'],
    stops: [
      { id: 'ubd-1', day: 1, time: '07:30', name: '德格拉朗梯田', cost: 75, note: '清晨散步，不走最热门入口。' },
      { id: 'ubd-2', day: 1, time: '12:30', name: '乌布皇宫', cost: 0, note: '附近午餐选择很多。' },
      { id: 'ubd-3', day: 2, time: '09:00', name: '圣泉寺', cost: 80, note: '准备一套可下水的衣物。' },
    ],
    optionalStops: [{ id: 'ubd-o1', day: 2, time: '17:00', name: '坎普汉山脊', cost: 0, note: '适合日落前一小时。' }],
  },
  {
    id: 'chiangmai-walk', title: '清迈散步 2 天', contributor: 'Ming', destination: '清迈', region: '东南亚', days: 2,
    actualBudget: 540, style: '文化美食', transport: '双条车与步行', scenery: 'chiangmai',
    summary: '寺庙、夜市与一碗很好的咖喱面', tips: ['周日夜市傍晚前到，最好走。', '寺庙进入正殿前记得脱鞋。'],
    stops: [
      { id: 'cnx-1', day: 1, time: '08:30', name: '帕辛寺', cost: 50, note: '早晨阳光穿过金色屋檐。' },
      { id: 'cnx-2', day: 1, time: '13:00', name: '宁曼路', cost: 130, note: '把咖啡安排在午后。' },
      { id: 'cnx-3', day: 1, time: '18:30', name: '周日夜市', cost: 200, note: '预留时间慢慢逛。' },
    ],
    optionalStops: [{ id: 'cnx-o1', day: 2, time: '08:00', name: '素贴山双龙寺', cost: 120, note: '云少时视野很好。' }],
  },
];

export function sceneSvg(kind) {
  const scenes = {
    bangkok: ['#52c9e8', '#94cdb0', '#347f74', '#e6b057'],
    ubud: ['#69cde1', '#afd078', '#638d52', '#d0a66f'],
    chiangmai: ['#60cae1', '#b7cc85', '#6b9560', '#d38a5d'],
  };
  const [sky, hill, green, roof] = scenes[kind] || scenes.bangkok;
  return `<svg viewBox="0 0 380 188" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="380" height="188" fill="${sky}"/><circle cx="305" cy="33" r="17" fill="#fff7cf"/>
    <g fill="#fffdf5"><path d="M20 43c12-20 35-18 43 0 18-8 30 8 28 19H0c0-12 9-20 20-19Z"/><path d="M225 67c13-20 37-16 42 0 18-8 32 6 31 20h-90c0-13 8-20 17-20Z"/></g>
    <path d="M0 109 55 72l45 35 51-50 62 48 56-42 111 48v77H0Z" fill="${hill}"/>
    <path d="M0 133 68 107l70 31 66-17 73 26 103-26v67H0Z" fill="${green}"/>
    <path d="M0 158h380v30H0z" fill="#87af63"/>
    <path d="M40 136h92M41 150h110M242 142h99M218 158h124" stroke="#d8df99" stroke-width="5"/>
    <g transform="translate(242 68)"><rect x="15" y="46" width="57" height="38" fill="#f5e4ba"/><path d="M5 48 43 15l40 33Z" fill="${roof}"/><rect x="37" y="62" width="12" height="22" fill="#305a57"/></g>
    <g transform="translate(175 120)"><circle cx="12" cy="9" r="5" fill="#e5ab79"/><path d="M6 15h12l5 22H2Z" fill="#df774c"/><path d="M4 37h7v14H4zm10 0h7v14h-7z" fill="#163f4e"/><rect x="-2" y="19" width="6" height="16" fill="#567160"/></g>
  </svg>`;
}

export function routeSvg(trip) {
  const stops = trip.stops.slice(0, 3);
  const positions = [[58, 52], [190, 86], [318, 50]];
  return `<svg viewBox="0 0 380 124" preserveAspectRatio="none" aria-label="${trip.destination} 路线概览">
    <rect width="380" height="124" rx="14" fill="#e0edc9"/><path d="M0 74c54-27 74 12 134-8s85-2 111-17 78-12 135 15" fill="none" stroke="#71c6d1" stroke-width="23" opacity=".85"/>
    <path d="M58 52C100 52 125 85 190 86s73-36 128-36" fill="none" stroke="#0a6b78" stroke-width="4" stroke-dasharray="7 5"/>
    ${stops.map((stop, index) => { const [x, y] = positions[index]; return `<circle cx="${x}" cy="${y}" r="15" fill="#0a485b"/><text x="${x}" y="${y + 5}" text-anchor="middle" fill="#fffdf5" font-size="13" font-family="monospace">${index + 1}</text><text x="${x}" y="${y + 31}" text-anchor="middle" fill="#0a485b" font-size="10" font-family="sans-serif">${stop.name}</text>`; }).join('')}
  </svg>`;
}
