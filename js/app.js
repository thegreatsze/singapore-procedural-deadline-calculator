/**
 * Singapore Procedural Deadline Calculator — UI Controller
 * Uses inline data globals (SG_HOLIDAYS_DATA, SG_RULES_DATA) from data/data.js
 * so the app works when opened directly as a file:// URL with no server needed.
 */

(function () {
  'use strict';

  let calculator = null;
  let rulesData = null;
  let currentResults = null;
  let currentTriggerLabel = null;
  let currentTriggerDate = null;

  function init() {
    // Data is loaded as globals from data/data.js — no fetch needed
    if (typeof SG_HOLIDAYS_DATA === 'undefined' || typeof SG_RULES_DATA === 'undefined') {
      document.getElementById('loading-indicator').style.display = 'block';
      return;
    }

    rulesData = SG_RULES_DATA;
    calculator = new DeadlineCalculator(SG_HOLIDAYS_DATA);

    populateTriggerSelect(rulesData);
    bindEvents();
  }

  function populateTriggerSelect(rules) {
    const select = document.getElementById('trigger-select');

    const byCategory = {};
    for (const trigger of rules.triggers) {
      const cat = trigger.category || 'other';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(trigger);
    }

    for (const cat of rules.categories) {
      const triggers = byCategory[cat.id];
      if (!triggers || triggers.length === 0) continue;

      const group = document.createElement('optgroup');
      group.label = cat.label;

      for (const t of triggers) {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.label;
        group.appendChild(opt);
      }

      select.appendChild(group);
    }
  }

  function bindEvents() {
    document.getElementById('trigger-select').addEventListener('change', onTriggerChange);
    document.getElementById('calculate-btn').addEventListener('click', onCalculate);
    document.getElementById('export-btn').addEventListener('click', onExport);
  }

  function onTriggerChange() {
    const triggerId = document.getElementById('trigger-select').value;
    const noteEl = document.getElementById('trigger-note');

    if (!triggerId) {
      noteEl.className = 'trigger-note';
      noteEl.textContent = '';
      return;
    }

    const trigger = rulesData.triggers.find(t => t.id === triggerId);
    if (!trigger) return;

    const count = trigger.deadlines.length;
    const courtLabel = trigger.courtType === 'state' ? 'State Courts' : 'Supreme Court';
    noteEl.innerHTML =
      `<strong>${count} deadline${count > 1 ? 's' : ''} will be calculated.</strong> ` +
      `${courtLabel} &mdash; ${trigger.reference}.`;
    noteEl.className = 'trigger-note visible';

    clearResults();
  }

  function onCalculate() {
    const triggerId = document.getElementById('trigger-select').value;
    const triggerDateVal = document.getElementById('trigger-date').value;

    if (!triggerId) { showError('Please select a trigger event.'); return; }
    if (!triggerDateVal) { showError('Please enter the date of the trigger event.'); return; }

    const trigger = rulesData.triggers.find(t => t.id === triggerId);
    if (!trigger) { showError('Unknown trigger. Please reload the page.'); return; }

    const results = calculator.calculateAll(triggerDateVal, trigger);
    const court = trigger.courtType || 'supreme';
    const traces = trigger.deadlines.map(dl => calculator.traceDeadline(triggerDateVal, dl, court));

    currentResults = results;
    currentTriggerLabel = trigger.label;
    currentTriggerDate = triggerDateVal;

    renderResults(results, traces, trigger, triggerDateVal);
  }

  function renderResults(results, traces, trigger, triggerDateVal) {
    const section = document.getElementById('results-section');
    const container = document.getElementById('results-container');

    document.getElementById('results-trigger-label').textContent = trigger.label;
    document.getElementById('results-trigger-date').textContent =
      new Date(triggerDateVal + 'T00:00:00').toLocaleDateString('en-SG', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });

    container.innerHTML = '';

    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      const card = document.createElement('div');
      card.className = 'deadline-card';

      const isBefore = r.direction === 'before';
      const headerClass = isBefore ? 'deadline-card-header deadline-card-header--before' : 'deadline-card-header';

      const adjustmentHtml = r.wasAdjusted
        ? `<div class="adjustment-badge" title="${escapeHtml(r.adjustmentReason || '')}">
            &#9888; Adjusted &mdash; original: ${escapeHtml(r.rawDeadlineReadable)}
           </div>`
        : '';

      card.innerHTML = `
        <div class="${headerClass}">
          <span class="dl-label">${isBefore ? '&#x23F0; CUTOFF: ' : ''}${escapeHtml(r.label)}</span>
          <span class="dl-days-pill">${escapeHtml(r.periodLabel)}</span>
          <span class="dl-ref">${escapeHtml(r.reference)}</span>
        </div>
        <div class="deadline-card-body">
          <div class="dl-date-row">
            <span class="dl-date-primary">${escapeHtml(r.adjustedDeadlineReadable)}</span>
          </div>
          ${adjustmentHtml}
          <div class="dl-computation">${escapeHtml(r.computationMode)}</div>
          ${r.note ? `<div class="dl-note">${escapeHtml(r.note)}</div>` : ''}
        </div>
      `;

      container.appendChild(card);

      if (traces && traces[i]) {
        renderCalendar(traces[i], card);
      }
    }

    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    clearError();
  }

  function onExport() {
    if (!currentResults || !calculator) return;

    const icsContent = calculator.generateICS(
      currentResults,
      currentTriggerLabel,
      currentTriggerDate
    );

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SG-Court-Deadlines-${currentTriggerDate}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function clearResults() {
    const section = document.getElementById('results-section');
    section.style.display = 'none';
    currentResults = null;
  }

  function showError(msg) {
    const el = document.getElementById('error-msg');
    el.textContent = msg;
    el.style.display = 'block';
  }

  function clearError() {
    const el = document.getElementById('error-msg');
    el.style.display = 'none';
    el.textContent = '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ── Calendar visualization ────────────────────────────────────────────────

  function renderCalendar(trace, parentCard) {
    const { days, direction } = trace;
    if (!days || days.length === 0) return;

    const dayMap = new Map();
    for (const d of days) dayMap.set(d.dateStr, d);

    const monthKeys = [...new Set(days.map(d => d.dateStr.slice(0, 7)))].sort();

    const counted = days.filter(d => d.status === 'counted').length;
    const skippedWE  = days.filter(d => d.status === 'skipped-weekend').length;
    const skippedPH  = days.filter(d => d.status === 'skipped-holiday').length;
    const skippedCV  = days.filter(d => d.status === 'skipped-vacation').length;
    const totalSkipped = skippedWE + skippedPH + skippedCV;

    const wrap = document.createElement('div');
    wrap.className = 'cal-wrap';

    const toggle = document.createElement('button');
    toggle.className = 'cal-toggle';
    toggle.innerHTML = '&#9650;&nbsp; Hide calculation calendar';

    const inner = document.createElement('div');
    inner.className = 'cal-inner';
    inner.style.display = 'block';

    toggle.addEventListener('click', () => {
      const open = inner.style.display !== 'none';
      inner.style.display = open ? 'none' : 'block';
      toggle.innerHTML = open
        ? '&#9660;&nbsp; Show calculation calendar'
        : '&#9650;&nbsp; Hide calculation calendar';
    });

    // Legend
    const legend = document.createElement('div');
    legend.className = 'cal-legend';

    const presentStatuses = new Set(days.map(d => d.status));

    const legendDefs = [
      { cls: 'trigger',           label: 'Trigger date (Day 0)',          show: presentStatuses.has('trigger') },
      { cls: 'trigger-event',     label: 'Trigger / event date',          show: presentStatuses.has('trigger-event') },
      { cls: 'counted',           label: 'Day counted toward period',     show: presentStatuses.has('counted') },
      { cls: 'deadline',          label: 'Deadline',                      show: true },
      { cls: 'skipped-weekend',   label: 'Weekend (not counted)',         show: presentStatuses.has('skipped-weekend') },
      { cls: 'skipped-holiday',   label: 'Public holiday (not counted)',  show: presentStatuses.has('skipped-holiday') },
      { cls: 'skipped-vacation',  label: 'Court vacation (not counted)',  show: presentStatuses.has('skipped-vacation') },
    ];
    for (const { cls, label, show } of legendDefs) {
      if (!show) continue;
      const item = document.createElement('span');
      item.className = 'cal-legend-item';
      item.innerHTML = `<span class="cal-swatch cal-swatch--${cls}"></span>${escapeHtml(label)}`;
      legend.appendChild(item);
    }

    // Summary
    const summary = document.createElement('div');
    summary.className = 'cal-summary';
    if (direction === 'before') {
      summary.textContent = `${days.length - 2} calendar day${days.length - 2 !== 1 ? 's' : ''} between deadline and trigger event (pure calendar count).`;
    } else {
      const parts = [`${counted} day${counted !== 1 ? 's' : ''} counted`];
      if (totalSkipped > 0) {
        const skipParts = [];
        if (skippedWE > 0)  skipParts.push(`${skippedWE} weekend`);
        if (skippedPH > 0)  skipParts.push(`${skippedPH} public holiday`);
        if (skippedCV > 0)  skipParts.push(`${skippedCV} court vacation`);
        parts.push(`${totalSkipped} day${totalSkipped !== 1 ? 's' : ''} skipped (${skipParts.join(', ')})`);
      }
      summary.textContent = parts.join(' · ') + '.';
    }

    // Month grids
    const monthsWrap = document.createElement('div');
    monthsWrap.className = 'cal-months';
    for (const mk of monthKeys) {
      const [y, m] = mk.split('-').map(Number);
      monthsWrap.appendChild(buildMonthCalendar(y, m, dayMap));
    }

    inner.appendChild(legend);
    inner.appendChild(summary);
    inner.appendChild(monthsWrap);
    wrap.appendChild(toggle);
    wrap.appendChild(inner);
    parentCard.appendChild(wrap);
  }

  function buildMonthCalendar(year, month, dayMap) {
    const MONTH_NAMES = ['January','February','March','April','May','June',
                         'July','August','September','October','November','December'];
    const DOW_LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    const el = document.createElement('div');
    el.className = 'cal-month';

    const hdr = document.createElement('div');
    hdr.className = 'cal-month-hdr';
    hdr.textContent = `${MONTH_NAMES[month - 1]} ${year}`;
    el.appendChild(hdr);

    const dowRow = document.createElement('div');
    dowRow.className = 'cal-dow-row';
    for (const d of DOW_LABELS) {
      const cell = document.createElement('div');
      cell.className = 'cal-dow-cell';
      cell.textContent = d;
      dowRow.appendChild(cell);
    }
    el.appendChild(dowRow);

    const grid = document.createElement('div');
    grid.className = 'cal-day-grid';

    // Blank cells before the 1st (Mon-anchored)
    const firstDOW = (new Date(year, month - 1, 1).getDay() + 6) % 7;
    for (let i = 0; i < firstDOW; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-cell cal-cell--blank';
      grid.appendChild(blank);
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const data = dayMap.get(dateStr);

      const cell = document.createElement('div');
      cell.className = 'cal-cell';

      if (!data) {
        cell.classList.add('cal-cell--outside');
      } else {
        cell.classList.add(`cal-cell--${data.status}`);
        const tipParts = [dateStr];
        if (data.holidayName)  tipParts.push(data.holidayName);
        if (data.vacationName) tipParts.push(data.vacationName);
        cell.title = tipParts.join(' — ');

        if (data.status === 'skipped-holiday')  cell.setAttribute('data-badge', 'PH');
        if (data.status === 'skipped-vacation') cell.setAttribute('data-badge', 'CV');
      }

      const num = document.createElement('span');
      num.className = 'cal-cell-num';
      num.textContent = String(d);
      cell.appendChild(num);

      if (data) {
        let lbl = null;
        if (data.status === 'trigger' || data.status === 'trigger-event') lbl = 'Start';
        else if (data.status === 'deadline') lbl = 'Deadline';
        if (lbl) {
          const lblEl = document.createElement('span');
          lblEl.className = 'cal-cell-lbl';
          lblEl.textContent = lbl;
          cell.appendChild(lblEl);
        }
      }

      grid.appendChild(cell);
    }

    el.appendChild(grid);
    return el;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
