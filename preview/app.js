const app = document.querySelector('#app');

app.innerHTML = `
  <section class="mobile-app">
    <header class="app-header">
      <div><h1 class="wordmark">口袋漫游<small>POCKET QUEST</small></h1></div>
      <div class="profile-pixel" aria-label="旅行者档案">▟▙</div>
    </header>
    <section class="empty-shell surface-card">
      <div>
        <p class="eyebrow">REAL TRIPS, READY TO MAKE YOURS</p>
        <h2>旅程正在装载</h2>
        <p>下一步会带来完整旅行的发现、收藏与复制。</p>
      </div>
    </section>
  </section>
  <nav class="bottom-nav" aria-label="主导航">
    <div class="bottom-nav-inner">
      <button class="nav-item active" type="button"><span class="nav-icon">⌕</span>发现</button>
      <button class="nav-item" type="button"><span class="nav-icon">♡</span>收藏</button>
      <button class="nav-item" type="button"><span class="nav-icon">▤</span>我的行程</button>
      <button class="nav-item" type="button"><span class="nav-icon">◉</span>我的</button>
    </div>
  </nav>`;
