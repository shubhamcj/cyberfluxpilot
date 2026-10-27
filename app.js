(function () {
  var Q = [
    // Governance & policy
    ['Governance & policy', 'Do you have written information security policies approved by leadership?', 'Covers acceptable use, access, data handling and incident response.', 3, ['SOC 2', 'ISO 27001'], 'Draft and get leadership sign-off on a core policy set (security, acceptable use, access control, incident response), and review it annually.'],
    ['Governance & policy', 'Is someone formally responsible for security and compliance?', 'A named owner, even if it is part of another role.', 2, ['SOC 2', 'ISO 27001', 'GDPR'], 'Assign a named security and privacy owner and document the role and responsibilities.'],
    ['Governance & policy', 'Do you perform a documented risk assessment at least once a year?', 'Identify risks, rate them and decide how to treat them.', 3, ['SOC 2', 'ISO 27001'], 'Run a structured annual risk assessment and keep a risk register with owners and treatment decisions.'],
    ['Governance & policy', 'Do all employees complete security awareness training?', 'At onboarding and at least annually.', 2, ['SOC 2', 'ISO 27001', 'GDPR'], 'Roll out onboarding and annual security and privacy training and keep completion records.'],
    // Access control
    ['Access control', 'Is multi-factor authentication enforced on email, cloud and admin accounts?', 'Enforced, not just available.', 3, ['SOC 2', 'ISO 27001'], 'Enforce MFA for all staff on email, SSO, cloud consoles and admin tools, starting with privileged accounts.'],
    ['Access control', 'Is access granted on a least-privilege, role-based basis?', 'People only have what they need for their job.', 3, ['SOC 2', 'ISO 27001', 'GDPR'], 'Define roles, remove standing admin rights and grant access through approved requests.'],
    ['Access control', 'Do you review user access to critical systems at least quarterly?', 'Including removing accounts no longer needed.', 2, ['SOC 2', 'ISO 27001'], 'Schedule quarterly access reviews for critical systems and keep evidence of reviewer sign-off.'],
    ['Access control', 'Is access removed the same day someone leaves or changes role?', 'A repeatable offboarding checklist.', 3, ['SOC 2', 'ISO 27001'], 'Create an onboarding/offboarding checklist tied to HR events and verify access is revoked within 24 hours.'],
    // Data protection
    ['Data protection', 'Is sensitive data encrypted at rest and in transit?', 'Disk/database encryption and TLS everywhere.', 3, ['SOC 2', 'ISO 27001', 'GDPR'], 'Enable encryption at rest on databases, storage and laptops, and enforce TLS 1.2+ for all traffic.'],
    ['Data protection', 'Do you maintain an inventory of what personal data you hold and where?', 'Systems, data types, purposes and retention.', 3, ['GDPR', 'ISO 27001'], 'Build a data inventory (record of processing) covering systems, data categories, purposes, recipients and retention.'],
    ['Data protection', 'Are backups taken regularly and restores tested?', 'A backup you have never restored is a guess.', 2, ['SOC 2', 'ISO 27001'], 'Automate backups, store them separately and test a restore at least twice a year.'],
    ['Data protection', 'Can you handle data subject requests (access, deletion) within a month?', 'A defined process and owner.', 2, ['GDPR'], 'Document a data subject request process with an owner, identity checks and a 30-day response target.'],
    // Secure operations
    ['Secure operations', 'Are systems patched on a defined schedule?', 'Critical fixes within days, not months.', 3, ['SOC 2', 'ISO 27001'], 'Define patch SLAs (e.g. critical within 7 days) and automate updates for servers, endpoints and dependencies.'],
    ['Secure operations', 'Do you run vulnerability scans, and penetration tests at least annually?', 'Internal or external, with findings tracked to closure.', 2, ['SOC 2', 'ISO 27001'], 'Run regular vulnerability scans and commission an annual penetration test, tracking remediation.'],
    ['Secure operations', 'Are security-relevant events logged, retained and monitored?', 'Authentication, admin actions, production access.', 2, ['SOC 2', 'ISO 27001'], 'Centralize logs for key systems, retain them for at least a year and alert on suspicious activity.'],
    ['Secure operations', 'Are code and infrastructure changes reviewed and approved before release?', 'Pull requests, approvals, separation of duties.', 2, ['SOC 2', 'ISO 27001'], 'Require peer review and approval for production changes and keep the audit trail in your repo or ticketing tool.'],
    // Incident response
    ['Incident response', 'Do you have a documented incident response plan?', 'Roles, severity levels and communication steps.', 3, ['SOC 2', 'ISO 27001', 'GDPR'], 'Write an incident response plan with severity levels, roles, escalation paths and contact lists.'],
    ['Incident response', 'Could you notify a regulator of a personal data breach within 72 hours?', 'Know who decides and how to report.', 3, ['GDPR'], 'Add a breach assessment and notification procedure with a decision owner and regulator contact details.'],
    ['Incident response', 'Have you tested your incident response plan in the past year?', 'Tabletop exercise or real incident review.', 2, ['SOC 2', 'ISO 27001'], 'Run an annual tabletop exercise and record the lessons learned and follow-up actions.'],
    ['Incident response', 'Do you run post-incident reviews and track corrective actions?', 'Learning loop after every significant incident.', 1, ['SOC 2', 'ISO 27001'], 'Hold blameless post-incident reviews and track corrective actions to completion.'],
    // Vendors & people
    ['Vendors & people', 'Do you assess the security of vendors that handle your or your customers\' data?', 'Questionnaires, reports or certifications reviewed.', 3, ['SOC 2', 'ISO 27001', 'GDPR'], 'Keep a vendor list, rate each by data sensitivity and review security reports or questionnaires for critical vendors.'],
    ['Vendors & people', 'Do you have data processing agreements with vendors that process personal data?', 'Required under GDPR Article 28.', 3, ['GDPR'], 'Put a data processing agreement in place with every processor and track them in your vendor list.'],
    ['Vendors & people', 'Are background checks performed for staff with access to sensitive data?', 'As permitted by local law.', 1, ['SOC 2', 'ISO 27001'], 'Introduce proportionate, lawful pre-employment screening for roles with sensitive access.'],
    ['Vendors & people', 'Do employees and contractors sign confidentiality and security commitments?', 'In contracts or a signed acknowledgment.', 2, ['SOC 2', 'ISO 27001', 'GDPR'], 'Add confidentiality and acceptable-use acknowledgments to employment and contractor onboarding.']
  ];
  var OPTS = [['Yes', 1], ['Partially', 0.5], ['No', 0]];
  var ans = new Array(Q.length).fill(null), i = 0;
  var $ = function (id) { return document.getElementById(id); };

  function show() {
    var q = Q[i];
    $('qd').textContent = q[0] + ' · ' + (i + 1) + ' of ' + Q.length;
    $('qt').textContent = q[1];
    $('qh').textContent = q[2];
    $('bar').style.width = (i / Q.length * 100) + '%';
    var box = $('opts'); box.innerHTML = '';
    OPTS.forEach(function (o, k) {
      var b = document.createElement('button');
      b.className = 'opt' + (ans[i] === k ? ' sel' : '');
      b.textContent = o[0];
      b.onclick = function () { ans[i] = k; if (i < Q.length - 1) { i++; show(); } else { finish(); } };
      box.appendChild(b);
    });
    $('back').style.visibility = i === 0 ? 'hidden' : 'visible';
    $('next').style.visibility = ans[i] === null ? 'hidden' : 'visible';
    $('next').textContent = i === Q.length - 1 ? 'See results' : 'Next';
  }

  function color(p) { return p >= 80 ? 'var(--ok)' : p >= 50 ? 'var(--warn)' : 'var(--bad)'; }
  function label(p) { return p >= 80 ? 'Strong' : p >= 50 ? 'Developing' : 'Early stage'; }

  function finish() {
    var tot = 0, got = 0, dom = {}, fw = {}, gaps = [];
    Q.forEach(function (q, n) {
      var v = OPTS[ans[n]][1], w = q[3];
      tot += w; got += w * v;
      var d = dom[q[0]] = dom[q[0]] || [0, 0]; d[0] += w * v; d[1] += w;
      q[4].forEach(function (f) { var x = fw[f] = fw[f] || [0, 0]; x[0] += w * v; x[1] += w; });
      if (v < 1) gaps.push({ q: q, v: v, score: w * (1 - v) });
    });
    gaps.sort(function (a, b) { return b.score - a.score; });
    var pct = Math.round(got / tot * 100);
    $('quiz').classList.add('hidden');
    var r = $('results'); r.classList.remove('hidden');
    var h = '<p class="q-domain">Your results</p><div class="score" style="color:' + color(pct) + '">' + pct + '%</div>' +
      '<p class="q-text">' + label(pct) + ' readiness</p>' +
      '<p class="note">Based on ' + Q.length + ' answers · ' + new Date().toLocaleDateString() + '</p>';
    h += '<h2 style="margin-top:34px">By control area</h2>';
    Object.keys(dom).forEach(function (k) {
      var p = Math.round(dom[k][0] / dom[k][1] * 100);
      h += '<div class="row"><span>' + k + '</span><div class="bar"><i style="width:' + p + '%;background:' + color(p) + '"></i></div><b>' + p + '%</b></div>';
    });
    h += '<h2 style="margin-top:34px">By framework</h2>';
    Object.keys(fw).forEach(function (k) {
      var p = Math.round(fw[k][0] / fw[k][1] * 100);
      h += '<div class="row"><span>' + k + '</span><div class="bar"><i style="width:' + p + '%;background:' + color(p) + '"></i></div><b>' + p + '%</b></div>';
    });
    h += '<h2 style="margin-top:34px">Prioritized action plan</h2>';
    if (!gaps.length) h += '<p>No gaps identified. Great work — keep evidence current and retest regularly.</p>';
    gaps.forEach(function (g, n) {
      var hi = g.q[3] === 3 && g.v === 0;
      h += '<div class="gap' + (hi ? ' high' : '') + '"><b>' + (n + 1) + '. ' + g.q[5] + '</b><small>' +
        (hi ? 'High priority · ' : '') + g.q[0] + (g.v === 0.5 ? ' · partially in place' : '') + '</small><br>' +
        g.q[4].map(function (f) { return '<span class="tag">' + f + '</span>'; }).join('') + '</div>';
    });
    h += '<p class="note" style="margin-top:26px">This assessment is general guidance, not legal advice or a certification. Your answers were processed in your browser and were not stored or sent anywhere.</p>' +
      '<div class="noprint" style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px"><button class="btn" onclick="window.print()">Print / save as PDF</button><button class="btn ghost" onclick="location.reload()">Retake assessment</button></div>';
    r.innerHTML = h;
    window.scrollTo(0, 0);
  }

  $('back').onclick = function () { if (i > 0) { i--; show(); } };
  $('next').onclick = function () { if (ans[i] !== null) { if (i < Q.length - 1) { i++; show(); } else finish(); } };
  $('start').onclick = function () { $('intro').classList.add('hidden'); $('quiz').classList.remove('hidden'); show(); };
})();
