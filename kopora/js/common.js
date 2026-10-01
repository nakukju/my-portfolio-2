/* 한국초상권연구소 — 공통 헤더·푸터와 화면 그리기 도구 */
(function () {
  var page = document.body.getAttribute('data-page') || '';
  var cat = new URLSearchParams(location.search).get('cat') || '';

  var menu = [
    { href: 'about.html',           label: '연구소 소개', on: page === 'about' },
    { href: 'list.html?cat=law',    label: '법령과 사례', on: page === 'list' && cat === 'law' },
    { href: 'list.html?cat=works',  label: 'AI 창작관',   on: page === 'list' && cat === 'works' },
    { href: 'list.html?cat=column', label: '칼럼',        on: page === 'list' && cat === 'column' }
  ];

  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="wrap">' +
        '<a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true"></span>한국초상권연구소</a>' +
        '<nav class="gnb" id="gnb" aria-label="주 메뉴">' +
          menu.map(function (m) {
            return '<a href="' + m.href + '"' + (m.on ? ' class="on" aria-current="page"' : '') + '>' + m.label + '</a>';
          }).join('') +
        '</nav>' +
        '<button class="menu-toggle" type="button" aria-label="메뉴 열기" aria-expanded="false" aria-controls="gnb"><span></span><span></span><span></span></button>' +
        '<a class="btn-upload" href="submit.html"><span class="plus">+</span>작품 올리기</a>' +
      '</div>';

    var toggle = header.querySelector('.menu-toggle');
    var gnb = header.querySelector('.gnb');
    toggle.addEventListener('click', function () {
      var open = gnb.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="wrap">' +
        '<div><strong>한국초상권연구소</strong><br>초상권과 AI 창작물 저작권을 배우고, 창작물을 함께 즐기는 공간<br>' +
        '<small>법령·사례 자료는 정보 제공용이며 법률 자문이 아닙니다.</small></div>' +
        '<nav aria-label="하단 메뉴">' +
          menu.map(function (m) { return '<a href="' + m.href + '">' + m.label + '</a>'; }).join('') +
          '<a href="submit.html">작품 올리기</a>' +
        '</nav>' +
      '</div>';
  }
})();

var KPRI = {
  esc: function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  },
  date: function (d) { return d ? d.replace(/-/g, '.') : ''; },
  byCat: function (cat) {
    return window.KPRI_DATA
      .filter(function (it) { return it.cat === cat; })
      .sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  },
  find: function (id) {
    return window.KPRI_DATA.filter(function (it) { return it.id === id; })[0];
  },

  /* 법령·사례, 칼럼 한 줄 */
  postItem: function (it) {
    var e = KPRI.esc;
    var label = it.cat === 'law' ? it.country : it.topic;
    return '<li><a href="detail.html?id=' + e(it.id) + '">' +
      '<span class="tag' + (it.cat === 'law' ? ' tag-accent' : '') + '">' + e(label) + '</span>' +
      '<span><span class="post-title">' + e(it.title) + '</span>' +
      '<span class="post-sub">' + e(it.summary) + '</span></span>' +
      '<span class="post-meta">' + KPRI.date(it.date) + '</span>' +
    '</a></li>';
  },

  /* 작품 카드 */
  card: function (it) {
    var e = KPRI.esc;
    return '<a class="card" href="detail.html?id=' + e(it.id) + '">' +
      '<div class="thumb" style="background:' + e(it.thumb) + '">' +
        '<span class="glyph" aria-hidden="true">' + e(it.glyph) + '</span>' +
        '<span class="kind">' + e(it.kind) + '</span>' +
      '</div>' +
      '<h3>' + e(it.title) + '</h3>' +
      '<p class="by">' + e(it.by) + ' · ' + KPRI.date(it.date) + '</p>' +
    '</a>';
  },

  /* 본문: '## '는 소제목, '- '는 목록, 나머지는 문단 */
  body: function (lines) {
    var html = '', inList = false;
    (lines || []).forEach(function (line) {
      var isItem = line.indexOf('- ') === 0;
      if (inList && !isItem) { html += '</ul>'; inList = false; }
      if (line.indexOf('## ') === 0) html += '<h2>' + KPRI.esc(line.slice(3)) + '</h2>';
      else if (isItem) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += '<li>' + KPRI.esc(line.slice(2)) + '</li>';
      } else html += '<p>' + KPRI.esc(line) + '</p>';
    });
    if (inList) html += '</ul>';
    return html;
  }
};
