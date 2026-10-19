/**
 * Table 性能对比的被测页面（每次只加载一个版本）
 *
 * URL 参数：
 *   lib=v2|v3     被测版本
 *   memo=1        仅 v3 有效，开启 rowMemo
 *   rows=100      行数
 *   root=concurrent|legacy  使用 createRoot 还是 ReactDOM.render（两个版本保持一致）
 *   auto=1        自动跑完所有场景并把结果 postMessage 给 runner；不传则为手动模式
 *   iter / warmup 每个场景的测量次数 / 预热次数
 *
 * 两个版本使用完全相同的 Table props、列定义、数据和测量代码；
 * 只有 v3 + memo=1 时额外传 rowMemo。
 */
(function () {
  var params = new URLSearchParams(location.search);
  var LIB = params.get('lib') === 'v2' ? 'v2' : 'v3';
  var MEMO = LIB === 'v3' && params.get('memo') === '1';
  var ROWS = Number(params.get('rows')) || 100;
  var ROOT_MODE = params.get('root') === 'legacy' ? 'legacy' : 'concurrent';
  var AUTO = params.get('auto') === '1';
  var ITER = Number(params.get('iter')) || 10;
  var WARMUP = params.has('warmup') ? Number(params.get('warmup')) : 2;
  var LABEL = LIB === 'v2' ? '2.x' : MEMO ? '3.x + rowMemo' : '3.x';

  var h = React.createElement;
  var useState = React.useState;
  var useMemo = React.useMemo;
  var useRef = React.useRef;
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

  // ---------------- 数据与列：与 __example__/test-0012-row-memo-inp 保持一致 ----------------

  var IMG =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="%23ddd"/></svg>';

  var makeRows = function (n, page) {
    return Array.from({ length: n }, function (_, i) {
      return {
        id: 'p' + page + '_' + i,
        name: 'SPU_' + page + '_' + String(i).padStart(4, '0'),
        title: 'Product title ' + page + '-' + i + ' some long long description text',
        category: 'Women / Clothing / Dresses',
        status: i % 3,
        price: (10 + i).toFixed(2),
        stock: 100 + i,
        time: '2026-10-16 12:00:00',
        skcs: Array.from({ length: 4 }, function (__, k) {
          return { skc: 'skc' + i + '_' + k, color: 'Black', size: 'S/M/L' };
        }),
      };
    });
  };

  // 本次交互期间「商品信息」列 render 的调用次数，约等于重渲染的行数
  var renderCount = 0;

  var createColumns = function () {
    return [
      { type: 'checkbox', width: 50, fixed: 'left' },
      {
        title: '商品信息',
        width: 320,
        fixed: 'left',
        render: function (d) {
          renderCount += 1;
          return h(
            'div',
            { style: { display: 'flex', gap: 8 } },
            h('img', { src: IMG, width: 60, height: 60, alt: '' }),
            h(
              'div',
              null,
              h('div', { style: { fontWeight: 600 } }, d.name),
              h('div', null, d.title),
              h('div', null, h('span', null, d.category), ' ', h('span', null, 'Tag A'), ' ', h('span', null, 'Tag B'))
            )
          );
        },
      },
      {
        title: 'SKC',
        width: 300,
        render: function (d) {
          return h(
            'div',
            null,
            d.skcs.map(function (s) {
              return h(
                'div',
                { key: s.skc, style: { display: 'flex', gap: 6, alignItems: 'center' } },
                h('img', { src: IMG, width: 24, height: 24, alt: '' }),
                h('span', null, s.skc),
                h('span', null, s.color),
                h('span', null, s.size)
              );
            })
          );
        },
      },
      { title: '销售价', group: '销售信息', width: 120, render: function (d) { return h('span', null, d.price + ' USD'); } },
      { title: '库存', group: '销售信息', width: 120, render: function (d) { return h('span', null, d.stock); } },
      { title: '状态', width: 120, render: function (d) { return h('span', null, ['待审核', '在售', '下架'][d.status]); } },
      { title: '更新时间', width: 180, render: 'time' },
      {
        title: '操作',
        width: 200,
        fixed: 'right',
        render: function () {
          return h(
            'div',
            { style: { display: 'flex', gap: 8 } },
            h('a', null, '编辑'),
            h('a', null, '详情'),
            h('a', null, '下架'),
            h('a', null, '更多')
          );
        },
      },
    ];
  };

  // 渲染后最新的状态，供场景校验使用
  var appState = null;

  var App = function () {
    var pageState = useState(0);
    var dataState = useState(function () {
      return makeRows(ROWS, 0);
    });
    var selectedState = useState([]);
    var tickState = useState(0);
    var page = pageState[0];
    var data = dataState[0];
    var selected = selectedState[0];
    var tick = tickState[0];
    var stateRef = useRef();

    var baseColumns = useMemo(createColumns, []);
    // 模拟业务包装层：每次渲染都 map 出新的列对象（render 引用不变）
    var columns = baseColumns.map(function (c) {
      return Object.assign({}, c);
    });

    stateRef.current = { page: page, data: data, selected: selected, tick: tick };
    appState = stateRef.current;

    // 两个版本完全相同的 props：
    // fixed='x' 在 2.x 中是「固定列 + 渲染全部行」的写法（不传时 2.x 不支持固定列）；
    // 3.x 中 fixed='x' 同样走非虚拟列表，与 2.x 渲染的行数、DOM 结构一致
    var tableProps = {
      keygen: 'id',
      bordered: true,
      width: 1700,
      fixed: 'x',
      data: data,
      columns: columns,
      sticky: { top: 0, css: true },
      value: selected,
      onRowSelect: selectedState[1],
    };
    if (MEMO) tableProps.rowMemo = true;

    return h(
      'div',
      null,
      h(
        'div',
        { className: 'bench-toolbar' },
        h('span', { className: 'bench-label' }, LABEL + ' | ' + ROWS + ' 行 | ' + ROOT_MODE),
        h(
          'button',
          {
            id: 'btn-parent',
            onClick: function () {
              tickState[1](tick + 1);
            },
          },
          '父组件无关 state 更新'
        ),
        h(
          'button',
          {
            id: 'btn-update',
            onClick: function () {
              dataState[1](
                data.map(function (d, i) {
                  return i === 0 ? Object.assign({}, d, { stock: d.stock + 1 }) : d;
                })
              );
            },
          },
          '第 1 行库存 +1'
        ),
        h(
          'button',
          {
            id: 'btn-next',
            onClick: function () {
              pageState[1](page + 1);
              dataState[1](makeRows(ROWS, page + 1));
              selectedState[1]([]);
            },
          },
          '下一页（整页换数据）'
        ),
        h('span', null, '已勾选 ' + selected.length + ' 行，tick ' + tick)
      ),
      h(Table, tableProps)
    );
  };

  // ---------------- 测量工具 ----------------

  var nextFrame = function () {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        resolve();
      });
    });
  };
  // rAF 回调之后的宏任务，此时本帧已完成样式、布局、绘制（与 INP 的 presentation 终点近似）
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

  // 等 DOM 连续 quiet ms 没有变化，返回最后一次变化的时间点（用于首屏：包含挂载后测量列宽等二次渲染）
  var waitDomStable = function (quiet, max) {
    return new Promise(function (resolve) {
      var last = performance.now();
      var start = last;
      var mo = new MutationObserver(function () {
        last = performance.now();
      });
      mo.observe(document.getElementById('app'), { subtree: true, childList: true, attributes: true, characterData: true });
      var check = function () {
        var now = performance.now();
        if (now - last >= quiet || now - start >= max) {
          mo.disconnect();
          resolve(last);
        } else {
          setTimeout(check, 16);
        }
      };
      setTimeout(check, 16);
    });
  };

  // 每次测量之间等待副作用（passive effect、ResizeObserver、延迟 setState）跑完，避免互相叠加
  var settle = function () {
    return nextFrame()
      .then(nextFrame)
      .then(function () {
        return sleep(50);
      });
  };

  // 模拟一次真实点击：pointer/mouse 按下抬起 + click
  var simulateClick = function (el) {
    var opts = { bubbles: true, cancelable: true, view: window };
    el.dispatchEvent(new PointerEvent('pointerdown', opts));
    el.dispatchEvent(new MouseEvent('mousedown', opts));
    el.dispatchEvent(new PointerEvent('pointerup', opts));
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.click();
  };

  var bodyRows = function () {
    return Array.prototype.filter.call(document.querySelectorAll('#app tbody tr'), function (tr) {
      return tr.querySelector('input[type="checkbox"]');
    });
  };
  var firstRowCheckbox = function () {
    var tr = bodyRows()[0];
    return tr && tr.querySelector('input[type="checkbox"]');
  };
  var headCheckbox = function () {
    return document.querySelector('#app thead input[type="checkbox"]');
  };
  var rowHasCellText = function (tr, text) {
    return Array.prototype.some.call(tr.querySelectorAll('td'), function (td) {
      return td.textContent.trim() === text;
    });
  };

  // 每个场景：target 返回要点击的元素，check 校验交互确实生效（防止某个版本因为选择器不对而「测了个寂寞」）
  var SCENARIOS = [
    {
      key: 'parent',
      name: '父组件无关 state 更新',
      target: function () {
        return document.getElementById('btn-parent');
      },
      check: function (before) {
        return appState.tick === before.tick + 1;
      },
    },
    {
      key: 'check-row',
      name: '勾选/取消第 1 行',
      target: firstRowCheckbox,
      check: function (before) {
        return appState.selected.length !== before.selected.length;
      },
    },
    {
      key: 'check-all',
      name: '全选/取消全选',
      target: headCheckbox,
      check: function (before) {
        var n = appState.selected.length;
        return n !== before.selected.length && (n === 0 || n === ROWS);
      },
    },
    {
      key: 'update-row',
      name: '第 1 行库存 +1',
      target: function () {
        return document.getElementById('btn-update');
      },
      check: function (before) {
        var tr = bodyRows()[0];
        return tr && rowHasCellText(tr, String(before.data[0].stock + 1));
      },
    },
    {
      key: 'next-page',
      name: '下一页（整页换数据）',
      target: function () {
        return document.getElementById('btn-next');
      },
      check: function (before) {
        var tr = bodyRows()[0];
        return tr && tr.textContent.indexOf('SPU_' + (before.page + 1) + '_0000') > -1;
      },
    },
  ];

  // 分段计时：
  // - js：点击任务 + 其后的微任务（React 18 对非受控元素的点击更新在微任务中 flush），到下一个宏任务或下一帧 rAF 为止
  // - render：下一帧 rAF 开始 → 本帧样式/布局/绘制完成（含 ResizeObserver 回调及其触发的同步重渲染）
  // - busy = js + render：主线程实际占用，排除了等待 vsync 的空闲时间，比 paint 更稳定
  // - paint：点击 → 下一帧绘制完成的总耗时（近似 INP，包含等待 vsync 的随机空闲）
  var measureOnce = function (scenario) {
    var el = scenario.target();
    if (!el) return Promise.resolve({ ok: false, reason: '找不到交互元素' });
    var before = appState;
    renderCount = 0;
    return new Promise(function (resolve) {
      var tTask = 0;
      var tRaf = 0;
      var channel = new MessageChannel();
      channel.port1.onmessage = function () {
        tTask = performance.now();
      };
      var t0 = performance.now();
      simulateClick(el);
      channel.port2.postMessage(null);
      requestAnimationFrame(function () {
        tRaf = performance.now();
        setTimeout(function () {
          var tEnd = performance.now();
          var jsEnd = tTask && tTask < tRaf ? tTask : tRaf;
          var js = jsEnd - t0;
          var render = tEnd - tRaf;
          var ok = scenario.check(before);
          resolve({
            ok: ok,
            reason: ok ? '' : '交互未生效',
            js: js,
            render: render,
            busy: js + render,
            paint: tEnd - t0,
            renders: renderCount,
          });
        }, 0);
      });
    });
  };

  // ---------------- 挂载 ----------------

  var container = document.getElementById('app');
  var hiddenDuringRun = document.hidden;
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) hiddenDuringRun = true;
  });

  var mount = async function () {
    var t0 = performance.now();
    if (ROOT_MODE === 'legacy') {
      ReactDOM.render(h(App), container);
    } else {
      ReactDOM.createRoot(container).render(h(App));
    }
    await afterPaint();
    var firstPaint = performance.now() - t0;
    var stableAt = await waitDomStable(300, 5000);
    return { firstPaint: firstPaint, stable: Math.max(stableAt - t0, firstPaint) };
  };

  // ---------------- 自动模式 ----------------

  var runAuto = async function () {
    var mountInfo = await mount();
    await sleep(300);
    var result = {
      lib: LIB,
      memo: MEMO,
      label: LABEL,
      rows: ROWS,
      root: ROOT_MODE,
      domRows: bodyRows().length,
      mount: mountInfo,
      scenarios: {},
    };
    log('[' + LABEL + '] 挂载完成：首帧 ' + mountInfo.firstPaint.toFixed(1) + 'ms，稳定 ' + mountInfo.stable.toFixed(1) + 'ms，DOM 行数 ' + result.domRows);

    for (var s = 0; s < SCENARIOS.length; s++) {
      var scenario = SCENARIOS[s];
      var samples = [];
      var errors = [];
      for (var i = 0; i < WARMUP + ITER; i++) {
        var r = await measureOnce(scenario);
        if (!r.ok) errors.push(r.reason);
        else if (i >= WARMUP) samples.push({ js: r.js, render: r.render, busy: r.busy, paint: r.paint, renders: r.renders });
        await settle();
      }
      result.scenarios[scenario.key] = { name: scenario.name, samples: samples, errors: errors };
      log('[' + LABEL + '] ' + scenario.name + '：完成 ' + samples.length + ' 次' + (errors.length ? '，失败 ' + errors.length + ' 次（' + errors[0] + '）' : ''));
      post({ type: 'bench-progress', text: LABEL + ' / ' + ROWS + ' 行 / ' + scenario.name });
    }
    result.hidden = hiddenDuringRun;
    post({ type: 'bench-result', result: result });
  };

  // ---------------- 手动模式：记录真实点击的 INP 相关指标 ----------------

  var runManual = async function () {
    var mountInfo = await mount();
    log('[' + LABEL + '] 挂载：首帧 ' + mountInfo.firstPaint.toFixed(1) + 'ms，稳定 ' + mountInfo.stable.toFixed(1) + 'ms，DOM 行数 ' + bodyRows().length);

    // Event Timing：浏览器给出的真实交互耗时（即 INP 的计算来源），只对真实用户输入生效
    if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.indexOf('event') > -1) {
      var seen = {};
      new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (e) {
          if (!e.interactionId || e.name !== 'click') return;
          if (seen[e.interactionId]) return;
          seen[e.interactionId] = true;
          var inputDelay = e.processingStart - e.startTime;
          var processing = e.processingEnd - e.processingStart;
          var presentation = e.startTime + e.duration - e.processingEnd;
          log(
            '[' + LABEL + '] Event Timing：' + e.duration + 'ms（输入延迟 ' + inputDelay.toFixed(1) + ' / 处理 ' + processing.toFixed(1) + ' / 呈现 ' + presentation.toFixed(1) + '）'
          );
        });
      }).observe({ type: 'event', durationThreshold: 16, buffered: true });
    }

    document.addEventListener(
      'click',
      function (e) {
        if (!e.isTrusted || logEl.contains(e.target)) return;
        renderCount = 0;
        var start = e.timeStamp;
        var target = e.target;
        var btn = target.closest('button');
        var label = btn ? btn.textContent : target.closest('td, th') ? '表格内点击' : '其它';
        afterPaint().then(function () {
          log('[' + LABEL + '] ' + label + '：render ' + renderCount + ' 次，点击→绘制 ' + (performance.now() - start).toFixed(1) + 'ms');
        });
      },
      true
    );
  };

  (AUTO ? runAuto() : runManual()).catch(function (err) {
    log('[error] ' + (err && err.stack ? err.stack : err));
    post({ type: 'bench-error', message: String(err && err.message ? err.message : err) });
  });
})();
