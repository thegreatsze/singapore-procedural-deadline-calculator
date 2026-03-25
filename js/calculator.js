/**
 * Singapore Procedural Deadline Calculator — Core Engine
 * Rules of Court 2021 (ROC 2021, S 914/2021) + Interpretation Act (Cap 1)
 *
 * DAY-COUNTING RULES (O 2 rr 2–4, ROC 2021; Interpretation Act s 50):
 *
 *  RULE 1 — Trigger day excluded (Interpretation Act s 50(a))
 *    The day of the triggering event is NOT counted. Time runs from the next day.
 *
 *  RULE 2 — Periods of 5 days or fewer (O 2 r 3, ROC 2021)
 *    Saturdays, Sundays, and public holidays are EXCLUDED from the count.
 *
 *  RULE 3 — Vacation exclusion for Supreme Court (O 2 r 4, ROC 2021)
 *    For SC proceedings where the period is ≤14 days: court vacation days are also
 *    excluded from the count (clock pauses during vacation).
 *    For periods >14 days: vacation days count; last-day rule still applies.
 *
 *  RULE 4 — Last-day rule (Interpretation Act s 50(b))
 *    If the last day falls on a Saturday, Sunday, public holiday, or (SC) vacation
 *    day, the deadline extends to the next Registry-open day.
 *
 *  RULE 5 — "Before" deadlines (e.g. 14 days before trial)
 *    If the cutoff falls on a non-filing day, it advances BACKWARDS to the
 *    preceding filing day (you must act before the cut-off, not after it).
 *
 *  PERIOD UNITS:
 *    "days"   — calendar days (default)
 *    "weeks"  — converted to days (×7), then same rules apply
 *    "months" — calendar months (setMonth); always treated as >14 days, no vacation exclusion
 *
 *  NOTE ON STATE COURTS:
 *    The vacation exclusion rule (Rule 3) does NOT apply to State Courts proceedings.
 */

class DeadlineCalculator {
  constructor(holidaysData) {
    this._holidayMap = new Map();
    this.publicHolidays = this._buildHolidaySet(holidaysData.publicHolidays);
    this.courtVacations = this._buildVacationList(holidaysData.courtVacations);
  }

  // ─── Data loading ─────────────────────────────────────────────────────────

  _buildHolidaySet(phByYear) {
    const set = new Set();
    for (const year of Object.values(phByYear)) {
      for (const h of year) {
        set.add(h.date);
        this._holidayMap.set(h.date, h.name);
      }
    }
    return set;
  }

  _buildVacationList(vacByYear) {
    const list = [];
    const seen = new Set();
    for (const year of Object.values(vacByYear)) {
      for (const v of year) {
        const key = v.start + '_' + v.end;
        if (!seen.has(key)) {
          seen.add(key);
          list.push({ name: v.name, start: this._parseDate(v.start), end: this._parseDate(v.end) });
        }
      }
    }
    list.sort((a, b) => a.start - b.start);
    return list;
  }

  // ─── Date utilities ────────────────────────────────────────────────────────

  _parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  _formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  _formatReadable(date) {
    return date.toLocaleDateString('en-SG', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  _dateAddDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  /** Add N calendar months (exact calendar-month arithmetic) */
  _dateAddMonths(date, n) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + n);
    return d;
  }

  // ─── Day-type predicates ───────────────────────────────────────────────────

  _isWeekend(date)       { const d = date.getDay(); return d === 0 || d === 6; }
  _isPublicHoliday(date) { return this.publicHolidays.has(this._formatDate(date)); }
  _isNonWorkingDay(date) { return this._isWeekend(date) || this._isPublicHoliday(date); }

  _isInVacation(date) {
    return this.courtVacations.some(v => date >= v.start && date <= v.end);
  }

  _getVacation(date) {
    return this.courtVacations.find(v => date >= v.start && date <= v.end) || null;
  }

  _isNonFilingDaySC(date)    { return this._isNonWorkingDay(date) || this._isInVacation(date); }
  _isNonFilingDayState(date) { return this._isNonWorkingDay(date); }

  // ─── Day-counting methods ─────────────────────────────────────────────────

  /**
   * MODE A — Working-day count (periods ≤5 days)
   * Skips weekends, public holidays, and (SC) vacation days.
   */
  _addWorkingDays(triggerDate, n, courtType) {
    const skip = courtType === 'supreme'
      ? d => this._isNonFilingDaySC(d)
      : d => this._isNonFilingDayState(d);
    let d = new Date(triggerDate);
    let counted = 0;
    while (counted < n) {
      d.setDate(d.getDate() + 1);
      if (!skip(d)) counted++;
    }
    return d;
  }

  /**
   * MODE B — Calendar days, excluding vacation (6–14 day SC periods)
   * Counts calendar days but skips vacation days.
   */
  _addCalendarDaysExcludingVacation(triggerDate, n) {
    let d = new Date(triggerDate);
    let counted = 0;
    while (counted < n) {
      d.setDate(d.getDate() + 1);
      if (!this._isInVacation(d)) counted++;
    }
    return d;
  }

  /**
   * MODE C — Pure calendar days (periods >14 days, or State Courts periods >5 days)
   */
  _addCalendarDays(triggerDate, n) {
    const d = new Date(triggerDate);
    d.setDate(d.getDate() + n);
    return d;
  }

  // ─── Last-day adjustment (Rule 4) ─────────────────────────────────────────

  /**
   * Apply the last-day rule: advance to next filing day if the date is blocked.
   * Returns { adjusted, wasAdjusted, reason }.
   */
  _applyLastDayRule(rawDate, courtType) {
    const isNonFiling = courtType === 'supreme'
      ? d => this._isNonFilingDaySC(d)
      : d => this._isNonFilingDayState(d);

    let d = new Date(rawDate);
    if (!isNonFiling(d)) return { adjusted: d, wasAdjusted: false, reason: null };

    const originalReadable = this._formatReadable(rawDate);
    const reasons = [];

    while (isNonFiling(d)) {
      if (this._isWeekend(d)) {
        reasons.push('weekend');
        d.setDate(d.getDate() + 1);
      } else if (this._isPublicHoliday(d)) {
        reasons.push(this._holidayMap.get(this._formatDate(d)) || 'public holiday');
        d.setDate(d.getDate() + 1);
      } else if (this._isInVacation(d)) {
        const vac = this._getVacation(d);
        reasons.push(vac ? vac.name : 'court vacation');
        d = this._dateAddDays(vac.end, 1); // jump to day after vacation
      }
    }

    const reasonStr = `Original deadline (${originalReadable}) fell on: ${[...new Set(reasons)].join(', ')}`;
    return { adjusted: d, wasAdjusted: true, reason: reasonStr };
  }

  /**
   * Apply the "before" last-day rule: retreat to previous filing day if blocked.
   * Used for deadlines like "14 days before trial" — if cutoff is a non-filing day,
   * the last opportunity is the filing day before it.
   */
  _applyLastDayRuleBefore(rawDate, courtType) {
    const isNonFiling = courtType === 'supreme'
      ? d => this._isNonFilingDaySC(d)
      : d => this._isNonFilingDayState(d);

    let d = new Date(rawDate);
    if (!isNonFiling(d)) return { adjusted: d, wasAdjusted: false, reason: null };

    const originalReadable = this._formatReadable(rawDate);
    while (isNonFiling(d)) {
      d.setDate(d.getDate() - 1);
    }

    const reasonStr = `Original cutoff (${originalReadable}) was a non-filing day; retreated to preceding filing day`;
    return { adjusted: d, wasAdjusted: true, reason: reasonStr };
  }

  // ─── Main public API ───────────────────────────────────────────────────────

  /**
   * Calculate the adjusted deadline for one rule entry.
   *
   * Rule object fields:
   *   days      {number}  — size of period
   *   unit      {string}  — "days" (default) | "weeks" | "months"
   *   direction {string}  — "after" (default) | "before"
   *   label, reference, note — display fields
   *
   * @param {string} triggerDateStr - "YYYY-MM-DD"
   * @param {object} rule
   * @param {string} courtType - "supreme" | "state"
   */
  calculate(triggerDateStr, rule, courtType) {
    const trigger = this._parseDate(triggerDateStr);
    const court = courtType || 'supreme';
    const unit = rule.unit || 'days';
    const direction = rule.direction || 'after';

    // Normalise to effective days for mode selection
    const effectiveDays = unit === 'months' ? Infinity
      : unit === 'weeks' ? rule.days * 7
      : rule.days;

    let rawDeadline;
    let computationMode;

    if (direction === 'before') {
      // "Before" deadline — count back from trigger date
      const subtractDays = unit === 'months'
        ? (() => { const d = this._dateAddMonths(trigger, -rule.days); return d; })()
        : this._dateAddDays(trigger, -(effectiveDays));
      rawDeadline = subtractDays;
      computationMode = unit === 'months'
        ? `${rule.days} calendar month${rule.days !== 1 ? 's' : ''} before trigger`
        : `${effectiveDays} calendar days before trigger`;
    } else if (unit === 'months') {
      // Calendar months — always pure calendar, no day-exclusion modes
      rawDeadline = this._dateAddMonths(trigger, rule.days);
      computationMode = `${rule.days} calendar month${rule.days !== 1 ? 's' : ''}`;
    } else if (effectiveDays <= 5) {
      rawDeadline = this._addWorkingDays(trigger, effectiveDays, court);
      computationMode = court === 'supreme'
        ? 'Working days (excluding weekends, public holidays, and court vacations)'
        : 'Working days (excluding weekends and public holidays)';
    } else if (effectiveDays <= 14 && court === 'supreme') {
      rawDeadline = this._addCalendarDaysExcludingVacation(trigger, effectiveDays);
      computationMode = 'Calendar days (court vacation days excluded — O 2 r 4, ROC 2021)';
    } else {
      rawDeadline = this._addCalendarDays(trigger, effectiveDays);
      computationMode = unit === 'weeks'
        ? `Calendar days (${rule.days} weeks = ${effectiveDays} days)`
        : 'Calendar days';
    }

    // Apply last-day rule
    const adjustFn = direction === 'before'
      ? () => this._applyLastDayRuleBefore(rawDeadline, court)
      : () => this._applyLastDayRule(rawDeadline, court);
    const { adjusted, wasAdjusted, reason } = adjustFn();

    // Build period label
    const periodLabel = unit === 'months'
      ? `${rule.days} month${rule.days !== 1 ? 's' : ''}`
      : unit === 'weeks'
        ? `${rule.days} week${rule.days !== 1 ? 's' : ''} (${effectiveDays} days)`
        : `${rule.days} day${rule.days !== 1 ? 's' : ''}`;

    return {
      triggerDate: triggerDateStr,
      triggerReadable: this._formatReadable(trigger),
      rawDeadline: this._formatDate(rawDeadline),
      rawDeadlineReadable: this._formatReadable(rawDeadline),
      adjustedDeadline: this._formatDate(adjusted),
      adjustedDeadlineReadable: this._formatReadable(adjusted),
      wasAdjusted,
      adjustmentReason: reason,
      computationMode,
      periodLabel,
      direction,
      courtType: court,
      label: rule.label,
      reference: rule.reference,
      note: rule.note,
    };
  }

  calculateAll(triggerDateStr, triggerRule) {
    const court = triggerRule.courtType || 'supreme';
    return triggerRule.deadlines.map(dl => this.calculate(triggerDateStr, dl, court));
  }

  // ─── ICS export ───────────────────────────────────────────────────────────

  generateICS(results, triggerLabel, triggerDateStr) {
    const stamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

    const foldLine = str => {
      const out = [];
      let line = '';
      for (const char of str) {
        if ((line + char).length > 75) { out.push(line); line = ' ' + char; }
        else line += char;
      }
      if (line) out.push(line);
      return out.join('\r\n');
    };

    const events = results.map((r, i) => {
      const dateStr = r.adjustedDeadline.replace(/-/g, '');
      const uid = `sg-deadline-${triggerDateStr}-${i}-${Date.now()}@sg-courts-calc`;
      const directionNote = r.direction === 'before' ? ' (LAST DAY BEFORE)' : '';
      const descLines = [
        `Trigger: ${triggerLabel} on ${r.triggerReadable}`,
        `Period: ${r.periodLabel} ${r.direction === 'before' ? 'before' : 'after'} trigger (${r.computationMode})`,
        `Rule: ${r.reference}`,
        r.wasAdjusted ? `Adjustment: ${r.adjustmentReason}.` : '',
        r.note ? `Note: ${r.note}` : '',
        '',
        'DISCLAIMER: Verify all deadlines against current Rules of Court 2021.',
        'This tool does not constitute legal advice.',
      ].filter(Boolean);

      return [
        'BEGIN:VEVENT',
        foldLine(`UID:${uid}`),
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${dateStr}`,
        `DTEND;VALUE=DATE:${dateStr}`,
        foldLine(`SUMMARY:DEADLINE${directionNote}: ${r.label}`),
        foldLine('DESCRIPTION:' + descLines.join('\\n')),
        'CATEGORIES:Legal Deadline',
        'TRANSP:TRANSPARENT',
        'BEGIN:VALARM',
        'TRIGGER:-P7D',
        'ACTION:DISPLAY',
        foldLine(`DESCRIPTION:7-day reminder: ${r.label}`),
        'END:VALARM',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        foldLine(`DESCRIPTION:Tomorrow: ${r.label}`),
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n');
    });

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Singapore Procedural Deadline Calculator//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:SG Court Deadlines',
      'X-WR-TIMEZONE:Asia/Singapore',
      ...events,
      'END:VCALENDAR',
    ].join('\r\n');
  }
}
