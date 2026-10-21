/**
 * Table 改动前后对比 runner：按轮次逐个用 iframe 加载 bench.html，汇总基线与改动后的测量结果
 */
(function () {
  var META = window.BENCH_META;
  var SLOTS = ['base', 'current'];
  var SLOT_NAMES = { base: '基线', current: '改动后' };
  // 期望的实现：用来确认两个槽位没有放错产物
  var EXPECTED_IMPL = { base: '内联偏移', current: 'CSS 变量' };
  var MODE_NAMES = { normal: '普通', stickyCss: 'sticky（css）', stickyJs: 'sticky（js）', virtual: '虚拟列表' };
  var VARIANT_NAMES = { '': '默认', noScrollX: '无横向滚动', summary: '合计行', memo: 'rowMemo', expand: '展开列' };
  var METRICS = [
    { key: 'mountJs', name: '挂载 JS（ms）', digits: 1 },
    { key: 'mountPaint', name: '挂载→首帧（ms）', digits: 1 },
    { key: 'mountRenders', name: '挂载 render 次数', digits: 0 },
    { key: 'resizeTime', name: '容器宽度变化→稳定（ms）', digits: 1 },
    { key: 'resizeRenders', name: '容器宽度变化 render 次数', digits: 0 },
  ];
  var JOB_TIMEOUT = 5 * 60 * 1000;

  var $ = function (sel) {
    return document.querySelector(sel);
  };
  var checkedValues = function (name) {
    return Array.prototype.map.call(document.querySelectorAll('input[name="' + name + '"]:checked'), function (el) {
      return el.value;
    });
  };
  var escapeHtml = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var median = function (arr) {
    if (!arr.length) return NaN;
    var s = arr.slice().sort(function (a, b) {
      return a - b;
    });
    var mid = s.length >> 1;
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  };

  // ---------------- 产物信息 ----------------

  var renderMeta = function () {
    var box = $('#meta');
    var missing = SLOTS.filter(function (slot) {
      return !META || !META[slot];
    });
    if (missing.length) {
      box.innerHTML =
        '<div class="warn">缺少 ' + missing.map(function (s) { return SLOT_NAMES[s]; }).join('、') +
        ' 产物，请按 README 执行 <code>node benchmark/table-mount-ab/prepare.js &lt;base|current&gt;</code></div>';
      $('#start').disabled = true;
      return;
    }
    var line = function (slot) {
      var m = META[slot];
      var src = m.commit ? m.branch + '@' + m.commit + (m.dirty ? '（含未提交改动）' : '') : m.source;
      return '<div>' + SLOT_NAMES[slot] + '：' + escapeHtml(src) + '，构建于 ' + escapeHtml(m.builtAt) + '</div>';
    };
    var html = '<div class="meta"><div>React ' + escapeHtml(META.react) + '（production UMD）</div>' + SLOTS.map(line).join('') + '</div>';
    var warnings = [];
    SLOTS.forEach(function (slot) {
      (META[slot].warnings || []).forEach(function (w) {
        warnings.push(SLOT_NAMES[slot] + '：' + w);
      });
    });
    if (warnings.length) html += '<div class="warn">' + warnings.map(escapeHtml).join('<br/>') + '</div>';
    box.innerHTML = html;
  };

  // ---------------- 配置 ----------------

  var buildCases = function () {
    var cases = [];
    checkedValues('rows').forEach(function (rows) {
      checkedValues('mode').forEach(function (mode) {
        checkedValues('variant').forEach(function (variant) {
          var query = { rows: rows, mode: mode };
          if (variant) query[variant] = '1';
          cases.push({
            key: rows + '|' + mode + '|' + variant,
            label: rows + ' 行 / ' + MODE_NAMES[mode] + ' / ' + VARIANT_NAMES[variant],
            query: query,
          });
        });
      });
    });
    return cases;
  };

  var renderManualLinks = function () {
    var c = buildCases()[0];
    if (!c) {
      $('#manual-links').textContent = '请选择配置';
      return;
    }
    $('#manual-links').innerHTML =
      SLOTS.map(function (slot) {
        var qs = new URLSearchParams(Object.assign({ slot: slot }, c.query)).toString();
        return '<a href="bench.html?' + qs + '" target="_blank" rel="noopener">' + SLOT_NAMES[slot] + '</a>';
      }).join(' · ') + '（' + escapeHtml(c.label) + '）';
  };

  // ---------------- 执行 ----------------

  var runJob = function (job, opts) {
    return new Promise(function (resolve, reject) {
      var iframe = document.createElement('iframe');
      var qs = new URLSearchParams(
        Object.assign({ slot: job.slot, auto: '1', iter: opts.iter, warmup: opts.warmup }, job.case.query)
      ).toString();
      // 所有配置使用同样大小的视口
      iframe.width = '1440';
      iframe.height = '900';
      iframe.src = 'bench.html?' + qs;

      var cleanup = function () {
        clearTimeout(timer);
        window.removeEventListener('message', onMessage);
        iframe.remove();
      };
      var timer = setTimeout(function () {
        cleanup();
        reject(new Error('超时'));
      }, JOB_TIMEOUT);
      var onMessage = function (e) {
        if (e.source !== iframe.contentWindow || !e.data) return;
        if (e.data.type === 'bench-progress') {
          $('#progress').textContent = job.prefix + e.data.text;
        } else if (e.data.type === 'bench-result') {
          cleanup();
          resolve(e.data.result);
        } else if (e.data.type === 'bench-error') {
          cleanup();
          reject(new Error(e.data.message));
        }
      };
      window.addEventListener('message', onMessage);
      $('#frame-box').appendChild(iframe);
    });
  };

  var start = async function () {
    var cases = buildCases();
    if (!cases.length) {
      $('#progress').textContent = '请至少选择一个行数、渲染模式和配置';
      return;
    }
    var opts = {
      iter: Math.max(1, Number($('#iter').value) || 10),
      warmup: Math.max(0, Number($('#warmup').value) || 0),
      rounds: Math.max(1, Number($('#rounds').value) || 1),
    };

    // 每轮轮换基线 / 改动后的执行顺序，抵消与先后顺序相关的偏差
    var jobs = [];
    for (var r = 0; r < opts.rounds; r++) {
      cases.forEach(function (c) {
        var order = r % 2 ? SLOTS.slice().reverse() : SLOTS;
        order.forEach(function (slot) {
          jobs.push({ round: r, case: c, slot: slot });
        });
      });
    }

    var results = {};
    var warnings = [];
    $('#start').disabled = true;
    for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i];
      job.prefix = '[' + (i + 1) + '/' + jobs.length + '] 第 ' + (job.round + 1) + ' 轮 ';
      try {
        var res = await runJob(job, opts);
        var bucket = (results[job.case.key] = results[job.case.key] || { case: job.case, slots: {} });
        var slotRes = (bucket.slots[job.slot] = bucket.slots[job.slot] || { impl: res.impl, domRows: res.domRows, samples: {} });
        METRICS.forEach(function (m) {
          slotRes.samples[m.key] = (slotRes.samples[m.key] || []).concat(res.samples[m.key] || []);
        });
        if (res.impl !== EXPECTED_IMPL[job.slot]) {
          warnings.push(job.case.label + '：' + SLOT_NAMES[job.slot] + ' 的实现为「' + res.impl + '」，与预期不符，请检查 vendor 产物');
        }
        if (res.hidden) warnings.push(job.case.label + '：' + SLOT_NAMES[job.slot] + ' 运行期间页面进入后台，结果不可信');
      } catch (err) {
        warnings.push(job.case.label + '：' + SLOT_NAMES[job.slot] + ' 失败（' + err.message + '）');
      }
      renderResults(cases, results, warnings);
    }
    $('#progress').textContent = '完成';
    $('#start').disabled = false;
  };

  // ---------------- 结果 ----------------

  var formatDiff = function (base, cur) {
    if (!isFinite(base) || !isFinite(cur)) return { text: '-', cls: '' };
    if (base === 0) return { text: cur === 0 ? '0%' : '+∞', cls: cur === 0 ? '' : 'bad' };
    var pct = ((cur - base) / base) * 100;
    return {
      text: (pct > 0 ? '+' : '') + pct.toFixed(1) + '%',
      cls: pct <= -3 ? 'good' : pct >= 3 ? 'bad' : '',
    };
  };

  var renderResults = function (cases, results, warnings) {
    $('#result-warn').innerHTML = warnings.length ? '<div class="warn">' + warnings.map(escapeHtml).join('<br/>') + '</div>' : '';
    var rowsHtml = [];
    var md = ['| 配置 | 指标 | 基线 | 改动后 | 变化 |', '| --- | --- | ---: | ---: | ---: |'];
    cases.forEach(function (c) {
      var bucket = results[c.key];
      if (!bucket) return;
      METRICS.forEach(function (m, mi) {
        var vals = SLOTS.map(function (slot) {
          var s = bucket.slots[slot];
          return s ? median(s.samples[m.key]) : NaN;
        });
        var diff = formatDiff(vals[0], vals[1]);
        var fmt = function (v) {
          return isFinite(v) ? v.toFixed(m.digits) : '-';
        };
        rowsHtml.push(
          '<tr>' +
            (mi === 0 ? '<td rowspan="' + METRICS.length + '">' + escapeHtml(c.label) + '</td>' : '') +
            '<td class="metric">' + m.name + '</td><td>' + fmt(vals[0]) + '</td><td>' + fmt(vals[1]) + '</td>' +
            '<td class="' + diff.cls + '">' + diff.text + '</td></tr>'
        );
        md.push('| ' + (mi === 0 ? c.label : '') + ' | ' + m.name + ' | ' + fmt(vals[0]) + ' | ' + fmt(vals[1]) + ' | ' + diff.text + ' |');
      });
    });
    $('#result').innerHTML = rowsHtml.length
      ? '<table class="result"><thead><tr><th>配置</th><th>指标（中位数）</th><th>基线</th><th>改动后</th><th>变化</th></tr></thead><tbody>' +
        rowsHtml.join('') + '</tbody></table>'
      : '运行中…';
    $('#markdown').value = md.join('\n');
  };

  renderMeta();
  renderManualLinks();
  document.querySelectorAll('.form input').forEach(function (el) {
    el.addEventListener('change', renderManualLinks);
  });
  $('#start').addEventListener('click', start);
})();
