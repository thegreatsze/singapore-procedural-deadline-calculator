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

    currentResults = results;
    currentTriggerLabel = trigger.label;
    currentTriggerDate = triggerDateVal;

    renderResults(results, trigger, triggerDateVal);
  }

  function renderResults(results, trigger, triggerDateVal) {
    const section = document.getElementById('results-section');
    const container = document.getElementById('results-container');

    document.getElementById('results-trigger-label').textContent = trigger.label;
    document.getElementById('results-trigger-date').textContent =
      new Date(triggerDateVal + 'T00:00:00').toLocaleDateString('en-SG', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });

    container.innerHTML = '';

    for (const r of results) {
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

  document.addEventListener('DOMContentLoaded', init);
})();
