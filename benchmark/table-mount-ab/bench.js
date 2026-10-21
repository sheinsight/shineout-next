/**
 * Table 改动前后（A/B）对比的被测页面：每次只加载一个产物，测量挂载和容器宽度变化
 *
 * URL 参数：
 *   slot=base|current     被测产物（基线 / 改动后）
 *   rows=500              行数
 *   mode=normal|stickyCss|stickyJs|virtual  渲染模式（virtual 时 height=500）
 *   noScrollX=1           不设置 width，表格不出现横向滚动（列宽随容器变化）
 *   summary=1 / memo=1 / expand=1   合计行 / rowMemo / 展开列
 *   auto=1                自动测量并把结果 postMessage 给 runner；不传则为手动模式
 *   iter / warmup         测量次数 / 预热次数
 *
 * 两个产物使用完全相同的 props、列定义、数据和测量代码。
 */
(function () {
  var params = new URLSearchParams(location.search);
  var SLOT = params.get('slot') === 'base' ? 'base' : 'current';
  var ROWS = Number(params.get('rows')) || 500;
  var MODE = params.get('mode') || 'normal';
  var NO_SCROLL_X = params.get('noScrollX') === '1';
  var SUMMARY = params.get('summary') === '1';
  var MEMO = params.get('memo') === '1';
  var EXPAND = params.get('expand') === '1';
  var AUTO = params.get('auto') === '1';
  var ITER = Number(params.get('iter')) || 10;
  var WARMUP = params.has('warmup') ? Number(params.get('warmup')) : 2;
  var SLOT_LABEL = SLOT === 'base' ? '基线' : '改动后';
  var CASE_LABEL = [ROWS + ' 行', MODE, NO_SCROLL_X && '无横向滚动', SUMMARY && '合计行', MEMO && 'rowMemo', EXPAND && '展开列']
    .filter(Boolean)
    .join(' | ');

  // 容器宽度：「改变容器宽度」在两者之间切换
  var WIDE = 1300;
  var NARROW = 1200;

  var h = React.createElement;
  var Table = window.Shineout && window.Shineout.Table;

  var logEl = document.getElementById('bench-log');
  var log = function (line) {
    logEl.textContent = line + (logEl.textContent ? '\n' + logEl.textContent : '');
  };
  var post = function (msg) {
    if (window.parent !== window) window.parent.postMessage(msg, '*');
  };
  window.addEventListener('error', function (e) {
    log('[error] ' + e.message);
    post({ type: 'bench-error', message: e.message });
  });
  if (!Table) {
    log('[error] 没有找到 Shineout.Table，请先执行 prepare.js');
    post({ type: 'bench-error', message: 'Shineout.Table not found' });
    return;
  }

  // ---------------- 数据与列：与 __example__/test-013-mount-render-once 保持一致 ----------------

  var IMG =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/></svg>';

  var DATA = Array.from({ length: ROWS }, function (_, i) {
    return {
      id: 'r_' + i,
      name: 'SPU_' + String(i).padStart(4, '0'),
      title: 'Product title ' + i + ' some long long description text',
      price: (10 + i).toFixed(2),
      stock: 100 + i,
      status: i % 3,
      time: '2026-10-20 12:00:00',
    };
  });

  // 「商品信息」列 render 的调用次数，约等于渲染的行数
  var renderCount = 0;
  var lastRenderAt = 0;

  var COLUMNS = [
    { type: 'checkbox', width: 50, fixed: 'left' },
    {
      title: '商品信息',
      width: 320,
      fixed: 'left',
      render: function (d) {
        renderCount += 1;
        lastRenderAt = performance.now();
        return h(
          'div',
          { style: { display: 'flex', gap: 8 } },
          h('img', { src: IMG, width: 40, height: 40, alt: '' }),
          h('div', null, h('div', { style: { fontWeight: 600 } }, d.name), h('div', null, d.title))
        );
      },
    },
    { title: 'SKC', width: 300, render: 'title' },
    { title: '销售价', width: 120, render: function (d) { return h('span', null, d.price + ' USD'); } },
    { title: '库存', width: 120, render: 'stock' },
    { title: '状态', width: 120, render: function (d) { return h('span', null, ['待审核', '在售', '下架'][d.status]); } },
    { title: '更新时间', width: 180, render: 'time' },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: function () {
        return h('div', { style: { display: 'flex', gap: 8 } }, h('a', null, '编辑'), h('a', null, '详情'), h('a', null, '下架'));
      },
    },
  ];
  if (EXPAND) {
    COLUMNS.unshift({
      type: 'expand',
      width: 48,
      fixed: 'left',
      render: function (d) {
        return function () {
          return h('div', { style: { padding: 16 } }, '展开内容：' + d.title);
        };
      },
    });
  }

  var SUMMARY_DATA = [
    [
      { render: function () { return '合计'; }, colSpan: 2 },
      { render: function () { return '-'; }, colSpan: 5 },
      { render: function () { return '-'; } },
    ],
  ];

  var App = function () {
    var selectedState = React.useState([]);
    var tableProps = {
      keygen: 'id',
      bordered: true,
      data: DATA,
      columns: COLUMNS,
      value: selectedState[0],
      onRowSelect: selectedState[1],
    };
    if (!NO_SCROLL_X) tableProps.width = 1700;
    if (MODE === 'stickyCss') tableProps.sticky = { top: 0, css: true };
    if (MODE === 'stickyJs') tableProps.sticky = { top: 0 };
    if (MODE === 'virtual') {
      tableProps.virtual = true;
      tableProps.height = 500;
    }
    if (SUMMARY) tableProps.summary = SUMMARY_DATA;
    if (MEMO) tableProps.rowMemo = true;
    return h(Table, tableProps);
  };

  // ---------------- 测量工具 ----------------

  var nextFrame = function () {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        resolve();
      });
    });
  };
  // rAF 回调之后的宏任务，此时本帧已完成样式、布局、绘制
  var afterPaint = function () {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        setTimeout(resolve, 0);
      });
    });
  };
  var sleep = function (ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  };
  var settle = function () {
    return nextFrame()
      .then(nextFrame)
      .then(function () {
        return sleep(50);
      });
  };

  // 逐帧等待，直到连续 3 帧没有新的 render（ResizeObserver 回调、passive effect 里的 setState 都会在之后的任务中渲染）。
  // 返回最后一次 render 之后那一帧绘制完成的时间点
  var waitRendersIdle = async function () {
    var paintedAt = 0;
    var idleFrames = 0;
    var count = renderCount;
    for (var i = 0; i < 60 && idleFrames < 3; i++) {
      var prevPaint = paintedAt;
      await afterPaint();
      var now = performance.now();
      if (!paintedAt || lastRenderAt > prevPaint) paintedAt = now;
      if (renderCount === count) idleFrames += 1;
      else idleFrames = 0;
      count = renderCount;
    }
    return paintedAt;
  };

  var container = document.getElementById('app');
  var wrap = document.getElementById('wrap');
  wrap.style.width = WIDE + 'px';
  var root = null;

  var bodyRows = function () {
    return Array.prototype.filter.call(container.querySelectorAll('tbody tr'), function (tr) {
      return tr.querySelector('input[type="checkbox"]');
    });
  };
  // 校验加载的产物：改动后的实现会在表体 table 上声明固定列的 CSS 变量
  var detectImpl = function () {
    return container.querySelector('table[style*="--soui-table-fixed"]') ? 'CSS 变量' : '内联偏移';
  };

  // 挂载：flushSync 同步完成 render + commit + layout effect（测量列宽后的 setState 也在其中同步重渲染）
  var mount = async function () {
    if (root) root.unmount();
    renderCount = 0;
    root = ReactDOM.createRoot(container);
    var t0 = performance.now();
    ReactDOM.flushSync(function () {
      root.render(h(App));
    });
    var js = performance.now() - t0;
    await afterPaint();
    var paint = performance.now() - t0;
    var renders = renderCount;
    await waitRendersIdle();
    return { js: js, paint: paint, renders: renders, rendersStable: renderCount };
  };

  var narrow = false;
  var resize = async function () {
    renderCount = 0;
    lastRenderAt = 0;
    narrow = !narrow;
    var t0 = performance.now();
    wrap.style.width = (narrow ? NARROW : WIDE) + 'px';
    var paintedAt = await waitRendersIdle();
    return { time: paintedAt - t0, renders: renderCount };
  };

  var hiddenDuringRun = document.hidden;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) hiddenDuringRun = true;
  });

  // ---------------- 自动模式 ----------------

  var runAuto = async function () {
    var samples = { mountJs: [], mountPaint: [], mountRenders: [], mountRendersStable: [], resizeTime: [], resizeRenders: [] };
    var impl = '';
    var domRows = 0;
    for (var i = 0; i < WARMUP + ITER; i++) {
      var m = await mount();
      impl = detectImpl();
      domRows = bodyRows().length;
      await settle();
      var r1 = await resize();
      await settle();
      var r2 = await resize();
      await settle();
      if (i >= WARMUP) {
        samples.mountJs.push(m.js);
        samples.mountPaint.push(m.paint);
        samples.mountRenders.push(m.renders);
        samples.mountRendersStable.push(m.rendersStable);
        samples.resizeTime.push(r1.time, r2.time);
        samples.resizeRenders.push(r1.renders, r2.renders);
      }
      post({ type: 'bench-progress', text: SLOT_LABEL + ' / ' + CASE_LABEL + ' / ' + (i + 1) + '/' + (WARMUP + ITER) });
    }
    root.unmount();
    post({
      type: 'bench-result',
      result: { slot: SLOT, impl: impl, domRows: domRows, samples: samples, hidden: hiddenDuringRun },
    });
  };

  // ---------------- 手动模式 ----------------

  var renderToolbar = function () {
    var bar = document.getElementById('bench-toolbar');
    var label = document.createElement('span');
    label.className = 'bench-label';
    label.textContent = SLOT_LABEL + ' | ' + CASE_LABEL;
    bar.appendChild(label);
    var addButton = function (text, onClick) {
      var btn = document.createElement('button');
      btn.textContent = text;
      btn.addEventListener('click', onClick);
      bar.appendChild(btn);
    };
    addButton('重新挂载', function () {
      mount().then(function (m) {
        log(
          '[' + SLOT_LABEL + '][' + detectImpl() + '] 挂载：JS ' + m.js.toFixed(1) + 'ms，首帧 ' + m.paint.toFixed(1) +
            'ms，render ' + m.renders + ' 次（稳定后 ' + m.rendersStable + ' 次），DOM 行数 ' + bodyRows().length
        );
      });
    });
    addButton('改变容器宽度', function () {
      resize().then(function (r) {
        log('[' + SLOT_LABEL + '] 容器宽度 → ' + wrap.style.width + '：render ' + r.renders + ' 次，变化→稳定 ' + r.time.toFixed(1) + 'ms');
      });
    });
  };

  if (AUTO) {
    runAuto().catch(function (err) {
      log('[error] ' + (err && err.stack ? err.stack : err));
      post({ type: 'bench-error', message: String(err && err.message ? err.message : err) });
    });
  } else {
    renderToolbar();
    log('点击「重新挂载」开始，可以在另一个标签页打开对照的产物');
  }
})();
