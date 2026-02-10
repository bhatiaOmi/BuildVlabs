// ===== DOM =====
const $ = id => document.getElementById(id);
const algoSelect = $('algoSelect'), arrayType = $('arrayType'), runBtn = $('runBtn'), resetBtn = $('resetBtn');
const autoRunBtn = $('autoRun'), originalArrayEl = $('originalArray');
const stepIndex = $('stepIndex'), stepTotal = $('stepTotal'), prevStep = $('prevStep'), nextStep = $('nextStep');
const pseudoContainer = $('pseudoContainer'), factsText = $('factsText'), nRange = $('nRange'), nValue = $('nValue');
const speedMenu = $('speedMenu'), advancedAnalysisBox = $('advancedAnalysisBox'), advancedBtn = $('advancedBtn');
const customInputContainer = $('customInputContainer'), customArrayInput = $('customArrayInput');
const overlay = $('graphOverlay'), modal = $('graphModal'), closeBtn = $('closeGraphBtn');
const inputSizeDropdown = $('inputSizeDropdown'), canvas = $('scalabilityCanvas'), graphMessage = $('graphMessage');
const treeContainer = $('treeContainer'), treeCanvas = $('treeCanvas');
const opDetail = $('opDetail'), opLabel = $('opLabel'), opCells = $('opCells');
const speedButtons = speedMenu.querySelectorAll('button');

let autoRunSpeed = null, comparisonCount = 0, baseArray = [], originalArray = [], steps = [], curStep = -1, stepCounter = 0, autoRunInterval = null, treeData = null;
let selectedAlgoName = '';

const PSEUDO_CODE = {
  merge: [
    "function mergeSort(arr)",
    "  if length <= 1: return arr",
    "  mid = floor(length / 2)",
    "  L = mergeSort(leftHalf)",
    "  R = mergeSort(rightHalf)",
    "  return merge(L, R)"
  ],
  quick: [
    "function quickSort(arr, l, r)",
    "  if l >= r: return",
    "  p = partition(arr, l, r)",
    "  quickSort(arr, l, p - 1)",
    "  quickSort(arr, p + 1, r)"
  ]
};

function renderPseudocode(algo) {
  pseudoContainer.innerHTML = '';
  if (!PSEUDO_CODE[algo]) return;
  PSEUDO_CODE[algo].forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 'pseudo-line';
    div.dataset.line = i + 1;
    div.innerHTML = `<span class="pseudo-arrow">➤</span><span class="ln">${i + 1}.</span> ${line}`;
    pseudoContainer.appendChild(div);
  });
}

algoSelect.value = "";
factsText.textContent = 'Select an algorithm to view facts.';
nRange.value = 0; nValue.textContent = '0';
nRange.addEventListener('input', () => { nValue.textContent = nRange.value });

algoSelect.addEventListener('change', () => {
  if (!algoSelect.value) return;
  selectedAlgoName = algoSelect.value === 'merge' ? 'Merge Sort' : 'Quick Sort';
  renderPseudocode(algoSelect.value);
  setFacts();
});

arrayType.addEventListener('change', () => {
  if (arrayType.value === 'custom') { customInputContainer.classList.remove('hidden'); nRange.disabled = true; nValue.parentElement.style.opacity = '0.5' }
  else { customInputContainer.classList.add('hidden'); nRange.disabled = false; nValue.parentElement.style.opacity = '1' }
});

function randArr(n) { return Array.from({ length: n }, () => Math.floor(Math.random() * 99) + 1) }
function mkNode(arr) { return { arr: arr.slice(), left: null, right: null, merged: null } }

// ===== MERGE SORT =====
function mergeSortTrace(arr) {
  treeData = mkNode(arr);
  function rec(a, node) {
    steps.push({
      type: 'split', desc: `Subarray: [${a.join(', ')}]`, tree: { node, phase: 'split' },
      vis: { cells: a.map((v, i) => ({ val: v })), label: 'SUBARRAY' }, step: ++stepCounter
    });
    if (a.length <= 1) {
      node.merged = a.slice();
      steps.push({
        type: 'base', desc: `Base case: [${a.join(', ')}]`, tree: { node, phase: 'base' },
        vis: { cells: a.map(v => ({ val: v, cls: 'hl-placed', top: '✓' })), label: 'BASE CASE' }, step: ++stepCounter
      });
      return a;
    }
    const mid = Math.floor(a.length / 2), L = a.slice(0, mid), R = a.slice(mid);
    node.left = mkNode(L); node.right = mkNode(R);
    // Divide step: left=blue, right=green
    const dc = [];
    for (let i = 0; i < mid; i++)dc.push({ val: a[i], cls: 'hl-left', top: i === 0 ? 'LEFT' : '' });
    dc.push({ sep: '|' });
    for (let i = mid; i < a.length; i++)dc.push({ val: a[i], cls: 'hl-right', top: i === mid ? 'RIGHT' : '' });
    steps.push({
      type: 'divide', desc: `Divide → Left [${L.join(', ')}] | Right [${R.join(', ')}]`,
      tree: { node, phase: 'divide' }, vis: { cells: dc, label: 'DIVIDE' }, step: ++stepCounter
    });

    const sL = rec(L, node.left), sR = rec(R, node.right);

    // Merge start
    const mc = [];
    sL.forEach((v, i) => mc.push({ val: v, cls: 'hl-left', top: i === 0 ? 'LEFT' : '' }));
    mc.push({ sep: '+' });
    sR.forEach((v, i) => mc.push({ val: v, cls: 'hl-right', top: i === 0 ? 'RIGHT' : '' }));
    steps.push({
      type: 'merge-start', desc: `Merging [${sL.join(', ')}] and [${sR.join(', ')}]`,
      tree: { node, phase: 'merge-start' }, vis: { cells: mc, label: 'MERGE' }, step: ++stepCounter
    });

    const merged = []; let i = 0, j = 0;
    while (i < sL.length && j < sR.length) {
      comparisonCount++;
      const cc = [];
      sL.forEach((v, k) => cc.push({ val: v, cls: k === i ? 'hl-compare' : '', top: k === i ? 'i' : '' }));
      cc.push({ sep: 'vs' });
      sR.forEach((v, k) => cc.push({ val: v, cls: k === j ? 'hl-compare' : '', top: k === j ? 'j' : '' }));
      if (merged.length) { cc.push({ sep: '→' }); merged.forEach(v => cc.push({ val: v, cls: 'hl-placed' })) }
      steps.push({
        type: 'compare', desc: `Compare ${sL[i]} vs ${sR[j]}`,
        tree: { node, phase: 'merging' }, vis: { cells: cc, label: 'COMPARE' }, step: ++stepCounter
      });
      if (sL[i] <= sR[j]) merged.push(sL[i++]); else merged.push(sR[j++]);
      // Place step
      const pc = [];
      sL.forEach((v, k) => pc.push({ val: v, cls: k === i ? 'hl-compare' : '', top: k === i ? 'i' : '' }));
      pc.push({ sep: '+' });
      sR.forEach((v, k) => pc.push({ val: v, cls: k === j ? 'hl-compare' : '', top: k === j ? 'j' : '' }));
      pc.push({ sep: '→' }); merged.forEach(v => pc.push({ val: v, cls: 'hl-placed' }));
      steps.push({
        type: 'place', desc: `Placed ${merged[merged.length - 1]} into merged array`,
        tree: { node, phase: 'merging' }, vis: { cells: pc, label: 'PLACING' }, step: ++stepCounter
      });
    }
    while (i < sL.length) merged.push(sL[i++]);
    while (j < sR.length) merged.push(sR[j++]);
    node.merged = merged.slice();
    for (let k = 0; k < merged.length; k++)a[k] = merged[k];

    steps.push({
      type: 'merge-done', desc: `Merged result → [${merged.join(', ')}]`,
      tree: { node, phase: 'merged' },
      vis: { cells: merged.map(v => ({ val: v, cls: 'hl-placed', top: '' })), label: 'MERGED RESULT' }, step: ++stepCounter
    });
    return merged;
  }
  rec(arr, treeData);
}

// ===== QUICK SORT =====
function quickSortTrace(arr) {
  treeData = mkNode(arr);
  function rec(a, l, r, node) {
    const sub = a.slice(l, r + 1);
    steps.push({
      type: 'q-split', desc: `QuickSort on [${sub.join(', ')}]`, tree: { node, phase: 'split' },
      vis: { cells: sub.map(v => ({ val: v })), label: 'QUICKSORT SUBARRAY' }, step: ++stepCounter
    });
    if (l > r) { node.merged = []; return }
    if (l === r) {
      node.merged = [a[l]];
      steps.push({
        type: 'base', desc: `Single element: ${a[l]}`, tree: { node, phase: 'base' },
        vis: { cells: [{ val: a[l], cls: 'hl-placed', top: '✓' }], label: 'BASE CASE' }, step: ++stepCounter
      });
      return;
    }
    if (r - l === 1) {
      if (a[l] > a[r]) {
        [a[l], a[r]] = [a[r], a[l]];
        steps.push({
          type: 'swap', desc: `Swap ${a[r]} ↔ ${a[l]}`, tree: { node, phase: 'partition' },
          vis: { cells: [{ val: a[l], cls: 'hl-swap', top: 'swap' }, { val: a[r], cls: 'hl-swap', top: 'swap' }], label: 'DIRECT SWAP' }, step: ++stepCounter
        });
      }
      node.merged = a.slice(l, r + 1);
      steps.push({
        type: 'base', desc: `Sorted: [${a.slice(l, r + 1).join(', ')}]`, tree: { node, phase: 'base' },
        vis: { cells: a.slice(l, r + 1).map(v => ({ val: v, cls: 'hl-placed' })), label: 'SORTED' }, step: ++stepCounter
      });
      return;
    }

    // Median of three - labels ABOVE cells, no overlap
    const c = Math.floor((l + r) / 2);
    const motCells = a.slice(l, r + 1).map((v, k) => {
      const idx = k + l;
      if (idx === l) return { val: v, cls: 'hl-left', top: `First [${l}]` };
      if (idx === c) return { val: v, cls: 'hl-pivot', top: `Mid [${c}]` };
      if (idx === r) return { val: v, cls: 'hl-right', top: `Last [${r}]` };
      return { val: v };
    });
    steps.push({
      type: 'pivot-sel', desc: `Median-of-Three: arr[${l}]=${a[l]}, arr[${c}]=${a[c]}, arr[${r}]=${a[r]}`,
      tree: { node, phase: 'partition' }, vis: { cells: motCells, label: 'PIVOT SELECTION — MEDIAN OF THREE' }, step: ++stepCounter
    });

    if (a[l] > a[c]) [a[l], a[c]] = [a[c], a[l]];
    if (a[l] > a[r]) [a[l], a[r]] = [a[r], a[l]];
    if (a[c] > a[r]) [a[c], a[r]] = [a[r], a[c]];
    [a[c], a[r - 1]] = [a[r - 1], a[c]];

    const pi = r - 1, pv = a[pi];
    const pvCells = a.slice(l, r + 1).map((v, k) => {
      if (k + l === pi) return { val: v, cls: 'hl-pivot', top: 'PIVOT' };
      return { val: v };
    });
    steps.push({
      type: 'pivot', desc: `Pivot = ${pv} (placed at index ${pi})`, tree: { node, phase: 'partition' },
      vis: { cells: pvCells, label: `PIVOT SELECTED: ${pv}` }, step: ++stepCounter
    });

    let i = l + 1, j = r - 2;
    while (true) {
      while (i <= j && a[i] < pv) {
        comparisonCount++;
        steps.push({
          type: 'moveP', desc: `i moves right → i=${i} (${a[i]} < pivot ${pv})`, tree: { node, phase: 'partition' },
          vis: { cells: mkQSCells(a, l, r, pi, i, j, 'i'), label: `SCANNING i→  (${a[i]} < ${pv})` }, step: ++stepCounter
        });
        i++;
      }
      while (i <= j && a[j] > pv) {
        comparisonCount++;
        steps.push({
          type: 'moveQ', desc: `j moves left ← j=${j} (${a[j]} > pivot ${pv})`, tree: { node, phase: 'partition' },
          vis: { cells: mkQSCells(a, l, r, pi, i, j, 'j'), label: `SCANNING ←j  (${a[j]} > ${pv})` }, step: ++stepCounter
        });
        j--;
      }
      if (i < j) {
        steps.push({
          type: 'swap', desc: `Swap arr[${i}]=${a[i]} ↔ arr[${j}]=${a[j]}`, tree: { node, phase: 'partition' },
          vis: { cells: mkQSCells(a, l, r, pi, i, j, 'swap'), label: `SWAP indices ${i} and ${j}` }, step: ++stepCounter
        });
        [a[i], a[j]] = [a[j], a[i]];
        i++; j--;
      } else break;
    }

    [a[pi], a[i]] = [a[i], a[pi]];
    const fpCells = a.slice(l, r + 1).map((v, k) => {
      if (k + l === i) return { val: v, cls: 'hl-pivot', top: 'PIVOT ✓' };
      return { val: v };
    });
    steps.push({
      type: 'pivot-place', desc: `Pivot ${pv} placed at final position ${i}`, tree: { node, phase: 'partition' },
      vis: { cells: fpCells, label: `PIVOT ${pv} AT FINAL POSITION` }, step: ++stepCounter
    });

    const leftSub = a.slice(l, i), rightSub = a.slice(i + 1, r + 1);
    node.left = mkNode(leftSub); node.right = mkNode(rightSub);

    const splitCells = [];
    leftSub.forEach((v, k) => splitCells.push({ val: v, cls: 'hl-left', top: k === 0 ? 'LEFT' : '' }));
    splitCells.push({ val: pv, cls: 'hl-pivot', top: 'P' });
    rightSub.forEach((v, k) => splitCells.push({ val: v, cls: 'hl-right', top: k === 0 ? 'RIGHT' : '' }));
    steps.push({
      type: 'divide', desc: `Divide: [${leftSub.join(', ')}] | ${pv} | [${rightSub.join(', ')}]`, tree: { node, phase: 'divide' },
      vis: { cells: splitCells, label: 'DIVIDE AROUND PIVOT' }, step: ++stepCounter
    });

    rec(a, l, i - 1, node.left);
    rec(a, i + 1, r, node.right);
    node.merged = a.slice(l, r + 1);
    steps.push({
      type: 'combine', desc: `Combined: [${node.merged.join(', ')}]`, tree: { node, phase: 'merged' },
      vis: { cells: node.merged.map(v => ({ val: v, cls: 'hl-placed' })), label: 'COMBINED' }, step: ++stepCounter
    });
  }
  rec(arr, 0, arr.length - 1, treeData);
}

function mkQSCells(a, l, r, pi, i, j, mode) {
  return a.slice(l, r + 1).map((v, k) => {
    const idx = k + l;
    if (idx === pi) return { val: v, cls: 'hl-pivot', top: 'P' };
    if (mode === 'swap' && idx === i) return { val: v, cls: 'hl-swap', top: 'i (swap)' };
    if (mode === 'swap' && idx === j) return { val: v, cls: 'hl-swap', top: 'j (swap)' };
    if (idx === i) return { val: v, cls: 'hl-compare', top: 'i →' };
    if (idx === j) return { val: v, cls: 'hl-compare', top: '← j' };
    return { val: v };
  });
}

// ===== RENDER OP DETAIL =====
function renderOpDetail(s) {
  opLabel.textContent = s.vis ? s.vis.label : '';
  opCells.innerHTML = '';
  if (!s.vis || !s.vis.cells) return;
  s.vis.cells.forEach(c => {
    if (c.sep) {
      const sp = document.createElement('span'); sp.className = 'op-separator'; sp.textContent = c.sep;
      opCells.appendChild(sp); return;
    }
    const wrap = document.createElement('span'); wrap.className = 'op-cell-wrapper';
    const topLbl = document.createElement('span'); topLbl.className = 'op-cell-top-label'; topLbl.textContent = c.top || '';
    if (c.cls === 'hl-pivot') topLbl.style.color = '#92400e';
    else if (c.cls === 'hl-left') topLbl.style.color = '#1e40af';
    else if (c.cls === 'hl-right') topLbl.style.color = '#065f46';
    else if (c.cls === 'hl-swap') topLbl.style.color = '#991b1b';
    else if (c.cls === 'hl-compare') topLbl.style.color = '#9a3412';
    wrap.appendChild(topLbl);
    const cell = document.createElement('span'); cell.className = 'op-cell'; cell.textContent = c.val;
    if (c.cls) cell.classList.add(c.cls);
    wrap.appendChild(cell);
    opCells.appendChild(wrap);
  });
}

// ===== RENDER TREE =====
function getTreeState(upTo) {
  const m = new Map(); let act = null;
  for (let i = 0; i <= upTo && i < steps.length; i++) { const s = steps[i]; if (s.tree) { m.set(s.tree.node, s.tree.phase); act = s.tree.node } }
  return { states: m, active: act };
}

// Map phase to a descriptive tag label and CSS class
function phaseToTag(phase) {
  switch (phase) {
    case 'split': return { cls: 'ph-split', text: 'SPLIT' };
    case 'divide': return { cls: 'ph-split', text: 'DIVIDE' };
    case 'partition': return { cls: 'ph-partition', text: 'PARTITION' };
    case 'merge-start': return { cls: 'ph-merge', text: 'MERGING' };
    case 'merging': return { cls: 'ph-compare', text: 'COMPARING' };
    case 'merged': return { cls: 'ph-sorted', text: 'SORTED ✓' };
    case 'base': return { cls: 'ph-sorted', text: 'SORTED ✓' };
    default: return { cls: 'ph-split', text: phase.toUpperCase() };
  }
}

function renderTree(upTo) {
  treeCanvas.innerHTML = '';

  // Algo heading inside tree
  if (selectedAlgoName) {
    const h = document.createElement('div'); h.className = 'tree-heading';
    h.textContent = selectedAlgoName;
    treeCanvas.appendChild(h);
  }

  if (!treeData) { const ph = document.createElement('div'); ph.className = 'tree-placeholder'; ph.textContent = 'Generate array and step through'; treeCanvas.appendChild(ph); return }
  const { states, active } = getTreeState(upTo);
  const levels = []; let q = [treeData];
  while (q.length) {
    const lv = []; const nq = [];
    for (const n of q) { if (states.has(n)) { lv.push(n); if (n.left && states.has(n.left)) nq.push(n.left); if (n.right && states.has(n.right)) nq.push(n.right) } }
    if (lv.length) levels.push(lv); q = nq
  }
  if (!levels.length) { const ph = document.createElement('div'); ph.className = 'tree-placeholder'; ph.textContent = 'Step through to build tree'; treeCanvas.appendChild(ph); return }

  const tot = levels.length;
  levels.forEach((lv, li) => {
    // Arrows
    if (li > 0) {
      const ad = document.createElement('div'); ad.className = 'tree-arrows-row';
      const prev = levels[li - 1];
      prev.forEach(p => {
        const hasL = p.left && states.has(p.left), hasR = p.right && states.has(p.right);
        if (hasL || hasR) {
          const g = document.createElement('span'); g.className = 'tree-arrow-pair';
          g.style.minWidth = (p.arr.length * 36) + 'px'; g.style.justifyContent = 'center';
          if (hasL) { const a = document.createElement('span'); a.textContent = '↙'; g.appendChild(a) }
          if (hasR) { const a = document.createElement('span'); a.textContent = '↘'; g.appendChild(a) }
          ad.appendChild(g);
        } else {
          const sp = document.createElement('span'); sp.className = 'tree-arrow-pair';
          sp.style.minWidth = (p.arr.length * 36) + 'px'; sp.style.visibility = 'hidden';
          sp.textContent = '↙'; ad.appendChild(sp);
        }
      });
      treeCanvas.appendChild(ad);
    }
    // Level
    const ld = document.createElement('div'); ld.className = 'tree-level';
    lv.forEach(node => {
      const st = states.get(node);
      const box = document.createElement('div'); box.className = 'tree-node';
      if (node === active) box.classList.add('active');
      if (st === 'merged' || st === 'base') box.classList.add('merged');
      const disp = (st === 'merged' || st === 'base') && node.merged ? node.merged : node.arr;
      disp.forEach(v => { const c = document.createElement('div'); c.className = 'tree-cell'; c.textContent = v; box.appendChild(c) });
      ld.appendChild(box);
    });
    // Per-level tag: pick the most specific phase among nodes
    if (tot > 1) {
      // Get dominant phase for this level
      const phases = lv.map(n => states.get(n));
      // Priority: partition > merging > merge-start > divide > split > merged/base
      let pick = phases[0];
      const pri = ['base', 'merged', 'split', 'divide', 'merge-start', 'merging', 'partition'];
      phases.forEach(p => { if (pri.indexOf(p) > pri.indexOf(pick)) pick = p });
      const info = phaseToTag(pick);
      const tag = document.createElement('span'); tag.className = 'phase-tag ' + info.cls;
      tag.textContent = info.text;
      ld.appendChild(tag);
    }
    treeCanvas.appendChild(ld);
  });

  // Final result row
  if (treeData.merged && states.get(treeData) === 'merged') {
    const ad = document.createElement('div'); ad.className = 'tree-arrows-row';
    ad.innerHTML = '<span class="tree-arrow-pair"><span style="font-size:22px;color:#059669">⇩</span></span>';
    treeCanvas.appendChild(ad);
    const ld = document.createElement('div'); ld.className = 'tree-level';
    const box = document.createElement('div'); box.className = 'tree-node merged'; box.style.borderColor = '#059669'; box.style.borderWidth = '3px';
    treeData.merged.forEach(v => { const c = document.createElement('div'); c.className = 'tree-cell'; c.style.color = '#059669'; c.style.fontWeight = '800'; c.textContent = v; box.appendChild(c) });
    ld.appendChild(box);
    const tag = document.createElement('span'); tag.className = 'phase-tag ph-final'; tag.textContent = 'FINAL RESULT ✓'; ld.appendChild(tag);
    treeCanvas.appendChild(ld);
  }
}

// ===== SHOW STEP =====
function highlightPseudo(stepType) {
  pseudoContainer.querySelectorAll('.pseudo-line').forEach(l => l.classList.remove('highlight'));
  let lineToHighlight = 1;
  const isMerge = algoSelect.value === 'merge';

  if (isMerge) {
    if (['split', 'base'].includes(stepType)) lineToHighlight = 2;
    else if (stepType === 'divide') lineToHighlight = 3;
    else if (['merge-start', 'compare', 'place', 'merge-done'].includes(stepType)) lineToHighlight = 6;
  } else {
    if (['q-split', 'base'].includes(stepType)) lineToHighlight = 2;
    else if (['pivot-sel', 'pivot', 'moveP', 'moveQ', 'swap', 'pivot-place'].includes(stepType)) lineToHighlight = 3;
    else if (stepType === 'divide') lineToHighlight = 4;
    else if (stepType === 'combine') lineToHighlight = 5;
  }

  const el = pseudoContainer.querySelector(`.pseudo-line[data-line="${lineToHighlight}"]`);
  if (el) el.classList.add('highlight');
}

function showStep(i, highlightHistory = true) {
  if (!steps || i < 0 || i >= steps.length) return;
  const s = steps[i];
  stepIndex.textContent = i + 1; stepTotal.textContent = steps.length;
  if (s.vis) renderOpDetail(s); else { opLabel.textContent = ''; opCells.innerHTML = '' }
  renderTree(i);
  treeContainer.scrollTop = treeContainer.scrollHeight;

  highlightPseudo(s.type);

  if (s.type === 'done') { advancedAnalysisBox.classList.remove('hidden'); setFacts() }
}

function removeLastLog() {
  // Not needed for pseudo-based UI, keeping empty to avoid errors
}

// ===== CONTROLS =====
resetBtn.addEventListener('click', resetAll);
runBtn.addEventListener('click', () => {
  if (!algoSelect.value) { alert("Select algorithm first"); return }
  const n = Number(nRange.value), t = arrayType.value;
  if (t === 'custom') {
    const p = customArrayInput.value.split(/[\s,]+/).filter(v => v.trim() !== '').map(Number);
    if (!p.length) { alert("Enter at least one number"); return }
    if (p.some(isNaN)) { alert("Enter valid numbers only"); return }
    if (p.length > 20) { alert("Max 20 elements"); return }
    baseArray = p; nRange.value = p.length; nValue.textContent = p.length;
  } else {
    if (n <= 0) { alert("Select N > 0"); return }
    baseArray = t === 'random' ? randArr(n) : t === 'asc' ? Array.from({ length: n }, (_, i) => i + 1) : Array.from({ length: n }, (_, i) => n - i);
  }
  originalArray = baseArray.slice();
  originalArrayEl.textContent = '[' + originalArray.join(', ') + ']';
  pseudoContainer.innerHTML = '';
  renderPseudocode(algoSelect.value);
  steps = []; curStep = -1; stepCounter = 0; comparisonCount = 0;
  stepIndex.textContent = 0; stepTotal.textContent = 0;
  advancedAnalysisBox.classList.add('hidden'); treeData = null;
  opLabel.textContent = ''; opCells.innerHTML = '';
  selectedAlgoName = algoSelect.value === 'merge' ? 'Merge Sort' : 'Quick Sort';
  treeCanvas.innerHTML = '';
  const ph = document.createElement('div'); ph.className = 'tree-heading'; ph.textContent = selectedAlgoName; treeCanvas.appendChild(ph);
  const plc = document.createElement('div'); plc.className = 'tree-placeholder'; plc.textContent = 'Use Next / Auto Run to step through'; treeCanvas.appendChild(plc);
  prepareSteps();
});

prevStep.addEventListener('click', () => { if (curStep > 0) { curStep--; removeLastLog(); showStep(curStep, false) } });
nextStep.addEventListener('click', () => { if (curStep < steps.length - 1) { curStep++; showStep(curStep, true) } });

autoRunBtn.addEventListener('click', () => { if (autoRunInterval) { stopAutoRun(); return } speedMenu.classList.toggle('hidden') });
speedButtons.forEach(b => {
  b.addEventListener('click', () => {
    autoRunSpeed = Number(b.dataset.speed); speedMenu.classList.add('hidden');
    if (!steps || !steps.length) { alert("Generate array first"); return } startAutoRun()
  })
});

function startAutoRun() {
  autoRunBtn.textContent = '⏸ Pause'; autoRunBtn.classList.remove('primary'); autoRunBtn.classList.add('danger');
  prevStep.disabled = true; nextStep.disabled = true;
  autoRunInterval = setInterval(() => { if (curStep < steps.length - 1) { curStep++; showStep(curStep, true) } else stopAutoRun() }, autoRunSpeed);
}
function stopAutoRun() {
  clearInterval(autoRunInterval); autoRunInterval = null;
  autoRunBtn.textContent = 'Auto Run'; autoRunBtn.classList.remove('danger'); autoRunBtn.classList.add('primary');
  prevStep.disabled = false; nextStep.disabled = false;
}

function prepareSteps() {
  steps = []; curStep = -1; stepCounter = 0; comparisonCount = 0;
  const arr = baseArray.slice();
  if (algoSelect.value === 'merge') mergeSortTrace(arr);
  else if (algoSelect.value === 'quick') quickSortTrace(arr);
  steps.push({
    type: 'done', desc: 'Sorting complete! ✓', tree: treeData ? { node: treeData, phase: 'merged' } : null,
    vis: { cells: arr.map(v => ({ val: v, cls: 'hl-placed' })), label: 'FINAL SORTED ARRAY' }, step: ++stepCounter
  });
  stepTotal.textContent = steps.length; stepIndex.textContent = 0; setFacts();
}

function resetAll() {
  if (autoRunInterval) { clearInterval(autoRunInterval); autoRunInterval = null; autoRunBtn.textContent = 'Auto Run'; autoRunBtn.classList.remove('danger'); autoRunBtn.classList.add('primary') }
  prevStep.disabled = false; nextStep.disabled = false;
  speedMenu.classList.add('hidden'); autoRunSpeed = null;
  baseArray = []; originalArray = []; steps = []; curStep = -1; stepCounter = 0; comparisonCount = 0;
  originalArrayEl.textContent = '-'; pseudoContainer.innerHTML = '';
  stepIndex.textContent = 0; stepTotal.textContent = 0;
  nRange.value = 0; nValue.textContent = '0'; nRange.disabled = false; nValue.parentElement.style.opacity = '1';
  arrayType.value = "random"; customInputContainer.classList.add('hidden'); customArrayInput.value = "";
  algoSelect.value = ""; selectedAlgoName = '';
  advancedAnalysisBox.classList.add('hidden');
  factsText.textContent = 'Select an algorithm to view facts.';
  treeData = null; treeCanvas.innerHTML = ''; opLabel.textContent = ''; opCells.innerHTML = '';
}

function setFacts() {
  if (!algoSelect.value) { factsText.textContent = 'Select an algorithm to view facts.'; return }
  const ct = curStep === steps.length - 1 ? comparisonCount : 'After completion';
  if (algoSelect.value === 'quick') {
    factsText.innerHTML = `<strong>Quick Sort (Median-of-Three):</strong>
    <ul style="margin:6px 0;padding-left:18px;font-size:12px"><li><b>Time:</b> Avg O(n log n), Worst O(n²)</li>
    <li><b>Space:</b> O(log n) in-place</li><li><b>Stable:</b> No</li><li><b>Comparisons:</b> ${ct}</li></ul>`;
  } else {
    factsText.innerHTML = `<strong>Merge Sort:</strong>
    <ul style="margin:6px 0;padding-left:18px;font-size:12px"><li><b>Time:</b> O(n log n) always</li>
    <li><b>Space:</b> O(n) extra</li><li><b>Stable:</b> Yes</li><li><b>Comparisons:</b> ${ct}</li></ul>`;
  }
}

// ===== GRAPH =====
advancedBtn.addEventListener('click', () => openGraphModal());
closeBtn.addEventListener('click', closeGraphModal);
overlay.addEventListener('click', closeGraphModal);
inputSizeDropdown.addEventListener('change', () => drawScalabilityGraph());

function openGraphModal() {
  if (!algoSelect.value) { graphMessage.textContent = 'Select algorithm first.'; graphMessage.classList.remove('hidden'); canvas.style.display = 'none' }
  else { graphMessage.classList.add('hidden'); canvas.style.display = 'block'; inputSizeDropdown.value = ''; canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height) }
  overlay.classList.remove('hidden'); modal.classList.remove('hidden'); document.body.classList.add('modal-open');
}
function closeGraphModal() {
  overlay.classList.add('hidden'); modal.classList.add('hidden'); document.body.classList.remove('modal-open');
  inputSizeDropdown.value = ''; canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}
function msSmp(a) { if (a.length <= 1) return a; const m = Math.floor(a.length / 2); return mgSmp(msSmp(a.slice(0, m)), msSmp(a.slice(m))) }
function mgSmp(l, r) { const res = []; let i = 0, j = 0; while (i < l.length && j < r.length) { if (l[i] <= r[j]) res.push(l[i++]); else res.push(r[j++]) } return res.concat(l.slice(i)).concat(r.slice(j)) }
function qsSmp(a, l, r) { if (l >= r) return; const p = a[Math.floor((l + r) / 2)]; let i = l, j = r; while (i <= j) { while (a[i] < p) i++; while (a[j] > p) j--; if (i <= j) { [a[i], a[j]] = [a[j], a[i]]; i++; j-- } } qsSmp(a, l, j); qsSmp(a, i, r) }
function measureTime(n) {
  let t; if (arrayType.value === 'random') t = Array.from({ length: n }, () => Math.floor(Math.random() * 99) + 1);
  else if (arrayType.value === 'asc') t = Array.from({ length: n }, (_, i) => i + 1); else t = Array.from({ length: n }, (_, i) => n - i);
  const a = [...t]; const R = 20; let tot = 0;
  for (let i = 0; i < R; i++) {
    const tmp = [...a]; const s = performance.now();
    if (algoSelect.value === 'merge') msSmp(tmp); else qsSmp(tmp, 0, tmp.length - 1); tot += performance.now() - s
  }
  return tot / R;
}
function drawScalabilityGraph() {
  if (!algoSelect.value) { graphMessage.textContent = 'Select algorithm.'; graphMessage.classList.remove('hidden'); canvas.style.display = 'none'; return }
  if (!inputSizeDropdown.value) { graphMessage.textContent = 'Select N value.'; graphMessage.classList.remove('hidden'); canvas.style.display = 'none'; return }
  graphMessage.classList.add('hidden'); canvas.style.display = 'block';
  const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height);
  const maxN = Number(inputSizeDropdown.value); const step = maxN / 10; const nVals = [];
  for (let i = 1; i <= 10; i++)nVals.push(Math.round(i * step));
  const tVals = []; let prev = 0; nVals.forEach(n => { let t = measureTime(n); if (t < prev) t = prev + 0.001; prev = t; tVals.push(t) });
  const lm = 80, rm = 40, tm = 70, bm = 60; const w = canvas.width - lm - rm, h = canvas.height - tm - bm; const maxT = Math.max(...tVals) * 1.1;
  const an = algoSelect.value === 'merge' ? 'Merge Sort' : 'Quick Sort';
  ctx.fillStyle = '#1e293b'; ctx.font = 'bold 18px Arial'; ctx.textAlign = 'center'; ctx.fillText(`${an} - Input Size vs Time`, canvas.width / 2, 30);
  ctx.beginPath(); ctx.moveTo(lm, tm); ctx.lineTo(lm, canvas.height - bm); ctx.lineTo(canvas.width - rm, canvas.height - bm); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; for (let i = 0; i <= 5; i++) { const y = canvas.height - bm - (h * i) / 5; ctx.beginPath(); ctx.moveTo(lm, y); ctx.lineTo(canvas.width - rm, y); ctx.stroke() }
  ctx.strokeStyle = '#ee2f2f'; ctx.lineWidth = 3; ctx.beginPath();
  tVals.forEach((t, i) => { const x = lm + (w * (i + 1)) / 11; const y = canvas.height - bm - (t / maxT) * h; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) }); ctx.stroke();
  ctx.fillStyle = '#ef4444'; tVals.forEach((t, i) => { const x = lm + (w * (i + 1)) / 11; const y = canvas.height - bm - (t / maxT) * h; ctx.beginPath(); ctx.arc(x, y, 6, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2; ctx.stroke() });
  ctx.fillStyle = '#080a0e'; ctx.font = '12px Arial'; ctx.textAlign = 'center'; ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2;
  nVals.forEach((n, i) => { const x = lm + (w * (i + 1)) / 11; const y = canvas.height - bm; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 6); ctx.stroke(); ctx.fillText(n.toString(), x, y + 25) });
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  for (let i = 0; i <= 5; i++) { const y = canvas.height - bm - (h * i) / 5; const v = (maxT * i / 5).toFixed(2); ctx.strokeStyle = '#0c0f15'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(lm - 6, y); ctx.lineTo(lm, y); ctx.stroke(); ctx.fillText(v, lm - 10, y) }
  ctx.fillStyle = '#060709'; ctx.font = 'bold 14px Arial'; ctx.textAlign = 'center'; ctx.fillText('Input Size (n)', lm + w / 2, canvas.height - 20);
  ctx.save(); ctx.translate(25, tm + h / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('Execution Time (ms)', 0, 0); ctx.restore();
  graphMessage.innerHTML = algoSelect.value === 'quick' ? '<strong>Quick Sort: O(n log n) avg with pivot variation.</strong>' : '<strong>Merge Sort: predictable O(n log n) growth.</strong>';
  graphMessage.classList.remove('hidden');
}
