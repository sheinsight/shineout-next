/**
 * Table 2.x vs 3.x 性能对比 runner：按轮次逐个用 iframe 加载 bench.html，汇总各配置的测量结果
 */
(function () {
  var META = window.BENCH_META;
  var CONFIGS = {
    v2: { key: 'v2', label: '2.x', query: { lib: 'v2' } },
    v3: { key: 'v3', label: '3.x', query: { lib: 'v3' } },
    v3memo: { key: 'v3memo', label: '3.x + rowMemo', query: { lib: 'v3', memo: '1' } },
  };
  var SCENARIO_ORDER = ['parent', 'check-row', 'check-all', 'update-row', 'next-page'];
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
  var sleep = function (ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  };

  // ---------------- 产物信息 ----------------

  var renderMeta = function () {
    var box = $('#meta');
    if (!META) {
      box.innerHTML = '<div class="warn">没有找到 vendor/meta.js，请先执行 <code>node benchmark/table-v2-vs-v3/prepare.js</code></div>';
      $('#start').disabled = true;
      return;
    }
    var line = function (key, m) {
      return (
        '<div>' + key + '：shineout@' + escapeHtml(m.version) + '，' + escapeHtml(m.branch) + '@' + escapeHtml(m.commit) +
        (m.dirty ? '（有未提交改动）' : '') + '，构建于 ' + escapeHtml(m.builtAt) + '</div>'
      );
    };
    var html =
      '<div class="meta"><div>React ' + escapeHtml(META.react) + '（production UMD），产物准备于 ' + escapeHtml(META.preparedAt) + '</div>' +
      line('2.x', META.v2) + line('3.x', META.v3) + '</div>';
    var warnings = []
      .concat(META.v2.warnings.map(function (w) { return '2.x：' + w; }))
      .concat(META.v3.warnings.map(function (w) { return '3.x：' + w; }));
    if (warnings.length) {
      html += '<div class="warn">' + warnings.map(escapeHtml).join('<br/>') + '</div>';
    }
    box.innerHTML = html;
  };

  var renderManualLinks = function () {
    var rows = checkedValues('rows')[0] || '100';
    var root = checkedValues('root')[0] || 'concurrent';
    $('#manual-links').innerHTML = Object.keys(CONFIGS)
      .map(function (key) {
        var c = CONFIGS[key];
        var qs = new URLSearchParams(Object.assign({}, c.query, { rows: rows, root: root })).toString();
        return '<a href="bench.html?' + qs + '" target="_blank" rel="noopener">' + c.label + '（' + rows + ' 行）</a>';
      })
      .join(' · ');
  };

  // ---------------- 执行 ----------------

  var runJob = function (job, opts) {
    return new Promise(function (resolve, reject) {
      var box = $('#frame-box');
      var iframe = document.createElement('iframe');
      var qs = new URLSearchParams(
        Object.assign({}, CONFIGS[job.config].query, {
          rows: job.rows,
          root: opts.root,
          auto: '1',
          iter: opts.iter,
          warmup: opts.warmup,
        })
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
      box.appendChild(iframe);
    });
  };

  var start = async function () {
    var configs = checkedValues('config');
    var rowsList = checkedValues('rows').map(Number);
    if (!configs.length || !rowsList.length) {
      $('#progress').textContent = '请至少选择一个版本和一个行数';
      return;
    }
    var opts = {
      root: checkedValues('root')[0],
      iter: Math.max(1, Number($('#iter').value) || 10),
      warmup: Math.max(0, Number($('#warmup').value) || 0),
      rounds: Math.max(1, Number($('#rounds').value) || 1),
    };

    // 每轮轮换版本的执行顺序，抵消 JIT 预热、温度等与先后顺序相关的偏差
    var jobs = [];
    for (var r = 0; r < opts.rounds; r++) {
      rowsList.forEach(function (rows) {
        var order = configs.slice(r % configs.length).concat(configs.slice(0, r % configs.length));
        order.forEach(function (config) {
          jobs.push({ round: r, rows: rows, config: config });
        });
      });
    }

    $('#start').disabled = true;
    $('#frame-box').hidden = false;
    $('#results').innerHTML = '';
    var results = [];
    var failures = [];
    for (var i = 0; i < jobs.length; i++) {
      var job = jobs[i];
      job.prefix = '[' + (i + 1) + '/' + jobs.length + '] 第 ' + (job.round + 1) + ' 轮 · ';
      $('#progress').textContent = job.prefix + CONFIGS[job.config].label + ' / ' + job.rows + ' 行 加载中';
      try {
        var result = await runJob(job, opts);
        result.config = job.config;
        results.push(result);
      } catch (err) {
        failures.push(CONFIGS[job.config].label + ' / ' + job.rows + ' 行 / 第 ' + (job.round + 1) + ' 轮：' + err.message);
      }
      // 让上一个 iframe 的资源回收完再开始下一个
      await sleep(800);
    }
    $('#frame-box').hidden = true;
    $('#start').disabled = false;
    $('#progress').textContent = '完成，共 ' + results.length + ' 组' + (failures.length ? '，失败 ' + failures.length + ' 组' : '');
    renderResults(results, configs, rowsList, opts, failures);
  };

  // ---------------- 统计与展示 ----------------

  var quantile = function (arr, q) {
    if (!arr.length) return NaN;
    var sorted = arr.slice().sort(function (a, b) {
      return a - b;
    });
    var idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil(q * sorted.length) - 1));
    return sorted[idx];
  };
  var fmt = function (n) {
    return isNaN(n) ? '-' : n.toFixed(1);
  };
  var diffText = function (value, base) {
    if (isNaN(value) || isNaN(base) || !base) return '';
    var pct = ((value - base) / base) * 100;
    return (pct > 0 ? '+' : '') + pct.toFixed(0) + '%';
  };

  // 汇总：rows -> config -> metric -> 样本（多轮合并）
  var aggregate = function (results) {
    var agg = {};
    results.forEach(function (res) {
      var byRows = (agg[res.rows] = agg[res.rows] || {});
      var a = (byRows[res.config] = byRows[res.config] || {
        mountFirst: [],
        mountStable: [],
        domRows: [],
        hidden: false,
        scenarios: {},
      });
      a.mountFirst.push(res.mount.firstPaint);
      a.mountStable.push(res.mount.stable);
      a.domRows.push(res.domRows);
      a.hidden = a.hidden || res.hidden;
      Object.keys(res.scenarios).forEach(function (key) {
        var s = res.scenarios[key];
        var target = (a.scenarios[key] = a.scenarios[key] || { busy: [], paint: [], js: [], render: [], renders: [], errors: 0 });
        s.samples.forEach(function (x) {
          target.busy.push(x.busy);
          target.paint.push(x.paint);
          target.js.push(x.js);
          target.render.push(x.render);
          target.renders.push(x.renders);
        });
        target.errors += s.errors.length;
      });
    });
    return agg;
  };

  // 与 bench.js 中 SCENARIOS 的 key / name 对应
  var SCENARIO_NAMES = {
    parent: '父组件无关 state 更新',
    'check-row': '勾选/取消第 1 行',
    'check-all': '全选/取消全选',
    'update-row': '第 1 行库存 +1',
    'next-page': '下一页（整页换数据）',
  };

  var buildRowsData = function (byRows, configs) {
    var lines = [];
    lines.push({
      name: '挂载（首帧）',
      cells: configs.map(function (c) {
        var a = byRows[c];
        return a ? { main: quantile(a.mountFirst, 0.5), sub: 'n=' + a.mountFirst.length } : null;
      }),
    });
    lines.push({
      name: '挂载（DOM 稳定）',
      cells: configs.map(function (c) {
        var a = byRows[c];
        return a ? { main: quantile(a.mountStable, 0.5), sub: '含挂载后测量列宽等二次渲染' } : null;
      }),
    });
    SCENARIO_ORDER.forEach(function (key) {
      lines.push({
        name: SCENARIO_NAMES[key],
        cells: configs.map(function (c) {
          var a = byRows[c];
          var s = a && a.scenarios[key];
          if (!s) return null;
          return {
            main: quantile(s.busy, 0.5),
            paint: quantile(s.paint, 0.5),
            p75: quantile(s.paint, 0.75),
            js: quantile(s.js, 0.5),
            render: quantile(s.render, 0.5),
            renders: quantile(s.renders, 0.5),
            errors: s.errors,
            n: s.busy.length,
          };
        }),
      });
    });
    return lines;
  };

  var renderResults = function (results, configs, rowsList, opts, failures) {
    var agg = aggregate(results);
    var html = '<h2>结果（中位数，单位 ms）</h2>';
    var md = [];
    md.push('## Table 2.x vs 3.x 性能对比');
    md.push('');
    if (META) {
      md.push('- React ' + META.react + ' production UMD，' + (opts.root === 'legacy' ? 'ReactDOM.render' : 'createRoot'));
      md.push('- 2.x：shineout@' + META.v2.version + '（' + META.v2.branch + '@' + META.v2.commit + '）');
      md.push('- 3.x：shineout@' + META.v3.version + '（' + META.v3.branch + '@' + META.v3.commit + '）');
    }
    md.push('- 每场景 ' + opts.iter + ' 次（预热 ' + opts.warmup + ' 次）× ' + opts.rounds + ' 轮，取中位数；' + navigator.userAgent);
    md.push('');

    rowsList.forEach(function (rows) {
      var byRows = agg[rows];
      if (!byRows) return;
      var lines = buildRowsData(byRows, configs);
      var baseIdx = configs.indexOf('v2');

      html += '<h2>' + rows + ' 行</h2>';
      var domRowsText = configs
        .map(function (c) {
          var a = byRows[c];
          return CONFIGS[c].label + ' ' + (a ? a.domRows.join('/') : '-');
        })
        .join('，');
      html += '<div class="sub">实际渲染行数：' + escapeHtml(domRowsText) + '</div>';
      var hiddenConfigs = configs.filter(function (c) {
        return byRows[c] && byRows[c].hidden;
      });
      if (hiddenConfigs.length) {
        html += '<div class="warn">' + hiddenConfigs.map(function (c) { return CONFIGS[c].label; }).join('、') + ' 测试期间页面曾切到后台，数据不可信</div>';
      }
      html += '<div class="table-wrap"><table class="result"><thead><tr><th>场景</th>';
      configs.forEach(function (c) {
        html += '<th>' + CONFIGS[c].label + '</th>';
      });
      html += '</tr></thead><tbody>';

      md.push('### ' + rows + ' 行');
      md.push('');
      md.push('| 场景 | ' + configs.map(function (c) { return CONFIGS[c].label; }).join(' | ') + ' |');
      md.push('| --- | ' + configs.map(function () { return '---'; }).join(' | ') + ' |');

      lines.forEach(function (line) {
        var baseCell = baseIdx > -1 ? line.cells[baseIdx] : null;
        html += '<tr><td>' + escapeHtml(line.name) + '</td>';
        var mdCells = [];
        line.cells.forEach(function (cell, idx) {
          if (!cell) {
            html += '<td>-</td>';
            mdCells.push('-');
            return;
          }
          var isBase = idx === baseIdx || !baseCell;
          var diffHtml = function (value, base) {
            var d = isBase ? '' : diffText(value, base);
            return d ? ' <span class="' + (d[0] === '-' ? 'good' : 'bad') + '">' + d + '</span>' : '';
          };
          var diffMd = function (value, base) {
            var d = isBase ? '' : diffText(value, base);
            return d ? '（' + d + '）' : '';
          };
          if (cell.sub) {
            // 挂载
            html += '<td><b>' + fmt(cell.main) + '</b>' + diffHtml(cell.main, baseCell && baseCell.main) + '<div class="sub">' + escapeHtml(cell.sub) + '</div></td>';
            mdCells.push(fmt(cell.main) + diffMd(cell.main, baseCell && baseCell.main));
            return;
          }
          html +=
            '<td>主线程 <b>' + fmt(cell.main) + '</b>' + diffHtml(cell.main, baseCell && baseCell.main) +
            '<br/>点击→绘制 <b>' + fmt(cell.paint) + '</b>' + diffHtml(cell.paint, baseCell && baseCell.paint) +
            '<div class="sub">JS ' + fmt(cell.js) + ' · 渲染 ' + fmt(cell.render) + ' · 绘制 p75 ' + fmt(cell.p75) + '</div>' +
            '<div class="sub">render ' + cell.renders + ' 次 · n=' + cell.n + '</div>' +
            (cell.errors ? '<div class="bad">交互失败 ' + cell.errors + ' 次</div>' : '') + '</td>';
          var mdCell =
            fmt(cell.main) + diffMd(cell.main, baseCell && baseCell.main) + ' / ' + fmt(cell.paint) + diffMd(cell.paint, baseCell && baseCell.paint) +
            '<br/>render ' + cell.renders;
          if (cell.errors) mdCell += '<br/>⚠️ 失败 ' + cell.errors + ' 次';
          mdCells.push(mdCell);
        });
        html += '</tr>';
        md.push('| ' + line.name + ' | ' + mdCells.join(' | ') + ' |');
      });
      html += '</tbody></table></div>';
      md.push('');
      md.push('> 场景单元格：主线程耗时 / 点击→绘制耗时（ms，中位数），括号内为相对 2.x 的变化');
      md.push('');
    });

    if (failures.length) {
      html += '<div class="warn">' + failures.map(escapeHtml).join('<br/>') + '</div>';
    }
    html += '<h2>Markdown</h2><textarea readonly>' + escapeHtml(md.join('\n')) + '</textarea>';
    $('#results').innerHTML = html;
  };

  renderMeta();
  renderManualLinks();
  document.querySelectorAll('input[name="rows"], input[name="root"]').forEach(function (el) {
    el.addEventListener('change', renderManualLinks);
  });
  $('#start').addEventListener('click', start);
})();
