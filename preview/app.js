import { sceneSvg, routeSvg, trips } from './data.js';
import { createInitialState, currentTrip, toggleSavedTrip, skipTrip } from './store.js';

const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
let state = createInitialState();
let detailTripId = null;

function showToast(message) { toast.textContent = message; toast.classList.add('visible'); window.setTimeout(() => toast.classList.remove('visible'), 2200); }
function nav() { return `<nav class="bottom-nav" aria-label="主导航"><div class="bottom-nav-inner">
  ${[['discover','⌕','发现'],['saved','♡','收藏'],['my-trip','▤','我的行程'],['profile','◉','我的']].map(([id, icon, label]) => `<button class="nav-item ${state.tab === id ? 'active' : ''}" data-tab="${id}" type="button"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}
</div></nav>`; }

function card(trip) { const saved = state.savedTripIds.includes(trip.id); return `<article class="trip-card surface-card"><div class="trip-art">${sceneSvg(trip.scenery)}<span class="trip-badge">真实旅行 · 已完成</span><span class="style-badge">${trip.style}</span></div>
  <div class="trip-body"><div class="contributor"><span class="mini-avatar">▟</span><span><b>${trip.contributor} 的旅行</b><small>实际记录</small></span></div><h2>${trip.title}</h2><p>${trip.summary}</p>
  <div class="trip-meta"><span><b>RM ${trip.actualBudget}</b><small>实际总花费</small></span><span><b>${trip.stops.length} 个地点</b><small>完整路线</small></span><span><b>${trip.transport}</b><small>轻松慢游</small></span></div>
  <div class="route-strip"><span>路线概览</span>${routeSvg(trip)}</div><button class="route-link" type="button" data-action="view-detail" data-trip-id="${trip.id}">查看完整路书 ↗</button>
  <div class="card-actions"><button class="square-action" type="button" data-action="skip" data-trip-id="${trip.id}" aria-label="跳过 ${trip.title}">×</button><button class="save-action" type="button" data-action="save" data-trip-id="${trip.id}" aria-pressed="${saved}" aria-label="${saved ? '取消收藏' : '收藏'} ${trip.title}">${saved ? '已收藏 ♡' : '收藏这趟旅行 ♡'}</button></div></div></article>`; }

function filters() { return `<section class="filters"><label class="search"><span>⌕</span><input id="search" value="${state.filters.search}" placeholder="想去哪里？" aria-label="搜索旅行"></label>
  <div class="filter-row"><select data-filter="region" aria-label="地区"><option>全部地区</option><option>东南亚</option></select><select data-filter="duration" aria-label="天数"><option>不限天数</option><option>2–3 天</option><option>4–5 天</option></select><select data-filter="budget" aria-label="预算"><option>不限预算</option><option>RM 600 以下</option><option>RM 800 以下</option><option>RM 1000 以下</option></select><select data-filter="style" aria-label="旅行风格"><option>不限风格</option><option>城市漫游</option><option>自然疗愈</option><option>文化美食</option></select></div></section>`; }

function renderDiscover() { const trip = currentTrip(state); return `<section class="mobile-app"><header class="app-header"><div><h1 class="wordmark">口袋漫游<small>POCKET QUEST</small></h1></div><div class="profile-pixel" aria-label="旅行者档案">▟▙</div></header><p class="eyebrow">DISCOVER REAL TRIPS</p><h2 class="hero-title">别人的旅程，<br>你的下一站。</h2><p class="hero-copy">发现真实路线，改成自己的旅行</p>${filters()}${trip ? `<section class="deck">${card(trip)}</section>` : `<section class="empty-state surface-card"><h2>还没有符合的旅行</h2><p>换一个筛选条件，或者重置后再看看。</p><button class="pixel-button secondary" data-action="reset-filters">重置筛选</button></section>`}</section>${nav()}`; }

function renderTripDetail(tripId) {
  const trip = trips.find((item) => item.id === tripId);
  if (!trip) return renderDiscover();
  const saved = state.savedTripIds.includes(trip.id);
  const days = Array.from({ length: trip.days }, (_, index) => index + 1);
  return `<section class="mobile-app detail-page"><button class="back-link" type="button" data-action="back">← 返回发现</button><p class="eyebrow">${trip.contributor.toUpperCase()} 的已完成旅程 · ORIGINAL ROUTE</p><h1>${trip.title}</h1><p class="hero-copy">${trip.summary}</p>
    <div class="detail-art surface-card">${sceneSvg(trip.scenery)}</div><section class="route-summary surface-card"><div><b>RM ${trip.actualBudget}</b><small>实际总花费</small></div><div><b>${trip.transport}</b><small>交通方式</small></div><div><b>${trip.stops.length} 个地点</b><small>完整路线</small></div></section>
    <section class="detail-section"><div class="section-heading"><h2>每天怎么走</h2><span>完整原始路书</span></div>${days.map((day) => `<section class="day-block surface-card"><h3>第 ${day} 天</h3>${trip.stops.filter((stop) => stop.day === day).map((stop) => `<article class="stop-row"><time>${stop.time}</time><div><b>${stop.name}</b><p>${stop.note}</p></div><span>RM ${stop.cost}</span></article>`).join('') || '<p class="rest-day">留给随心探索的一天</p>'}</section>`).join('')}</section>
    <section class="tips surface-card"><h2>旅行者提醒</h2>${trip.tips.map((tip) => `<p>✦ ${tip}</p>`).join('')}</section><section class="detail-route"><h2>路线概览</h2>${routeSvg(trip)}</section>
    <div class="detail-actions"><button class="pixel-button secondary" type="button" data-action="save" data-trip-id="${trip.id}" aria-pressed="${saved}">${saved ? '已收藏' : '收藏路线'}</button><button class="pixel-button" type="button" data-pending="copy">复制这趟旅行 ↗</button></div></section>`;
}

function syncFilterValues() { document.querySelectorAll('[data-filter]').forEach((select) => { select.value = state.filters[select.dataset.filter]; }); }
function render({ focusSearch = false } = {}) { app.innerHTML = detailTripId ? renderTripDetail(detailTripId) : renderDiscover(); syncFilterValues(); if (focusSearch) { const input = document.querySelector('#search'); input?.focus(); input?.setSelectionRange(input.value.length, input.value.length); } }

document.addEventListener('input', (event) => { if (event.target.id === 'search') { state.filters.search = event.target.value; state.activeTripId = null; render({ focusSearch: true }); } });
document.addEventListener('change', (event) => { if (event.target.dataset.filter) { state.filters[event.target.dataset.filter] = event.target.value; state.activeTripId = null; render(); } });
document.addEventListener('click', (event) => { const button = event.target.closest('button'); if (!button) return;
  if (button.dataset.action === 'reset-filters') { state.filters = createInitialState().filters; render(); }
  if (button.dataset.action === 'view-detail') { detailTripId = button.dataset.tripId; render(); }
  if (button.dataset.action === 'back') { detailTripId = null; render(); }
  if (button.dataset.action === 'skip') { state = skipTrip(state, button.dataset.tripId); render(); showToast('已跳过这趟旅行'); }
  if (button.dataset.action === 'save') { const wasSaved = state.savedTripIds.includes(button.dataset.tripId); state = toggleSavedTrip(state, button.dataset.tripId); render(); showToast(wasSaved ? '已移出收藏' : '已收藏这趟旅行'); }
  if (button.dataset.pending) showToast('这个功能将在接下来的功能提交中上线。');
});
render();
