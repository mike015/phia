import { NETWORK, SITES, IXES, UPSTREAMS, BACKBONE } from './data/topology.js';
import { GEO } from './data/geo.js';
import { DemoSource, LiveSource, fmtBps, fmtSpeed } from './traffic.js';

// ---------------------------------------------------------------- config
const params = new URLSearchParams(location.search);
const source = params.get('live') === '1' ? new LiveSource() : new DemoSource();
const POLL_MS = source.demo ? 5000 : 60000;

const C = {
  sea: '#57C4E5', ink: '#1E2640', ink2: '#55608A', paper: '#FFFFFF', soft: '#EEF5FB', line: '#D5DEEC',
  me: '#FF4F9A', sun: '#FFD23F', ok: '#22C47A', warn: '#FFAA1F', bad: '#FF4D5E',
  land: '#FFF6CF', landOther: '#FFFCEF',
};
const FONT_D = '"Baloo 2", "Trebuchet MS", system-ui, sans-serif';
const FONT_B = 'Nunito, system-ui, sans-serif';

// ---------------------------------------------------------------- ports
// Every tube is a port; traffic is asked per port id.
const PORTS = new Map();
for (const p of IXES) PORTS.set(p.id, { ...p });
for (const p of UPSTREAMS) PORTS.set(p.id, { ...p });
for (const b of BACKBONE) PORTS.set(b.id, { ...b, kind: 'backbone', name: `${SITES[b.from].name} ↔ ${SITES[b.to].name}` });
const EXTERNAL = [...IXES, ...UPSTREAMS];
const traffic = new Map(); // id -> { inBps, outBps, speedBps }
let lastUpdate = null;

const util = (id) => {
  const t = traffic.get(id);
  if (!t || !(t.speedBps > 0)) return 0;
  return Math.max(t.inBps, t.outBps) / t.speedBps;
};
const utilColor = (u) => (u >= 0.85 ? C.bad : u >= 0.6 ? C.warn : C.ok);

// ---------------------------------------------------------------- geometry helpers
const DEG = Math.PI / 180;
const K = 100;
const proj = (lon, lat) => [(lon - 5) * Math.cos(52.2 * DEG) * K, -(lat - 52) * K];

function quad(a, c, b, n = 48) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, u = 1 - t;
    out.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]);
  }
  return out;
}

// Orthogonal polyline with rounded corners, densely sampled.
function rounded(points, r = 28) {
  const out = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const [p0, p1, p2] = [points[i - 1], points[i], points[i + 1]];
    const d1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), d2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const rr = Math.min(r, d1 / 2, d2 / 2);
    if (rr < 1) { out.push(p1); continue; }
    const a = [p1[0] + (p0[0] - p1[0]) * rr / d1, p1[1] + (p0[1] - p1[1]) * rr / d1];
    const b = [p1[0] + (p2[0] - p1[0]) * rr / d2, p1[1] + (p2[1] - p1[1]) * rr / d2];
    out.push(...quad(a, p1, b, 10));
  }
  out.push(points[points.length - 1]);
  return densify(out, 8);
}
function densify(pts, step) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1], pts[i]];
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let k = 1; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]);
  }
  return out;
}
function withLengths(pts) {
  const len = [0];
  for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, len, total: len[len.length - 1] };
}
function pointAt(path, f) {
  const d = f * path.total;
  let lo = 0, hi = path.len.length - 1;
  while (hi - lo > 1) { const m = (lo + hi) >> 1; if (path.len[m] < d) lo = m; else hi = m; }
  const seg = path.len[hi] - path.len[lo] || 1;
  const t = (d - path.len[lo]) / seg;
  const [a, b] = [path.pts[lo], path.pts[hi]];
  const nx = -(b[1] - a[1]), ny = b[0] - a[0], nl = Math.hypot(nx, ny) || 1;
  return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, nx: nx / nl, ny: ny / nl };
}
function distToPolyline(px, py, pts) {
  let best = Infinity;
  for (let i = 1; i < pts.length; i++) {
    const [a, b] = [pts[i - 1], pts[i]];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1)));
    best = Math.min(best, Math.hypot(px - a[0] - dx * t, py - a[1] - dy * t));
  }
  return best;
}

// ---------------------------------------------------------------- scenes
const CLOUD = { lon: 3.25, lat: 52.95 };

function buildOverview() {
  const nodes = Object.values(SITES).map((s) => ({ type: 'site', id: s.id, site: s, at: proj(s.lon, s.lat), r: s.id === 'ams' ? 20 : 14 }));
  const at = Object.fromEntries(nodes.map((n) => [n.id, n.at]));
  const tubes = BACKBONE.map((b) => {
    const [a, c] = [at[b.from], at[b.to]];
    const mx = (a[0] + c[0]) / 2, my = (a[1] + c[1]) / 2;
    const dx = c[0] - a[0], dy = c[1] - a[1], d = Math.hypot(dx, dy);
    const bend = b.id === 'bb-ams-rtm' ? 0.28 : 0.12;
    const ctrl = [mx - dy / d * d * bend, my + dx / d * d * bend];
    return { type: 'tube', id: b.id, path: withLengths(quad(a, ctrl, c)), width: 15 };
  });
  const cloudAt = proj(CLOUD.lon, CLOUD.lat);
  const a = at.ams;
  tubes.push({ type: 'tube', id: 'internet', path: withLengths(quad(cloudAt, [(cloudAt[0] + a[0]) / 2 + 10, cloudAt[1] - 5], a)), width: 22, aggregate: true });
  nodes.push({ type: 'cloud', id: 'internet', at: cloudAt, r: 40 });
  const xs = nodes.map((n) => n.at[0]), ys = nodes.map((n) => n.at[1]);
  const bounds = { x0: Math.min(...xs) - 40, x1: Math.max(...xs) + 40, y0: Math.min(...ys) - 50, y1: Math.max(...ys) + 50 };
  return { id: 'nl', nodes, tubes, bounds };
}

function spread(n, w) { return Array.from({ length: n }, (_, i) => -w / 2 + (i + 0.5) * (w / n)); }

function buildSite(siteId) {
  const site = SITES[siteId];
  const ix = IXES.filter((p) => p.site === siteId);
  const up = UPSTREAMS.filter((p) => p.site === siteId);
  const bb = BACKBONE.filter((b) => b.from === siteId || b.to === siteId);
  const RW = 190, RH = 92; // router
  const racks = [], tubes = [], doors = [];
  const W = Math.max(720, Math.max(ix.length, up.length) * 150);
  const addRow = (list, y, kind) => {
    const xs = spread(list.length, W);
    const portXs = spread(list.length, RW - 40);
    list.forEach((p, i) => {
      const rack = { type: 'port', id: p.id, kind, x: xs[i], y, w: 128, h: 70, port: p };
      racks.push(rack);
      const sy = y < 0 ? -RH / 2 : RH / 2;
      const ry = y < 0 ? y + rack.h / 2 : y - rack.h / 2;
      const midY = y < 0 ? -RH / 2 - 60 : RH / 2 + 60;
      // path starts at the far end (rack) and ends at the router, so "in" packets flow towards the router
      tubes.push({ type: 'tube', id: p.id, width: 15,
        path: withLengths(rounded([[xs[i], ry], [xs[i], midY], [portXs[i], midY], [portXs[i], sy]])) });
    });
  };
  addRow(ix, -250, 'ix');
  addRow(up, 250, 'upstream');
  // backbone doors on the sides
  const left = [], right = [];
  bb.forEach((b, i) => (i % 2 === 0 ? right : left).push(b));
  for (const [side, list] of [[1, right], [-1, left]]) {
    const ys = spread(list.length, Math.min(260, list.length * 120));
    list.forEach((b, i) => {
      const other = b.from === siteId ? b.to : b.from;
      const dx = side * (W / 2 + 40);
      const door = { type: 'door', id: b.id, to: other, x: dx, y: ys[i], w: 120, h: 58 };
      doors.push(door);
      const sx = side * RW / 2, sy = list.length > 1 ? -RH / 4 + (i * RH / 2) / (list.length - 1) : 0;
      tubes.push({ type: 'tube', id: b.id, width: 15,
        path: withLengths(rounded([[dx - side * door.w / 2, ys[i]], [(dx + sx) / 2, ys[i]], [(dx + sx) / 2, sy], [sx, sy]])) });
    });
  }
  const router = { type: 'router', id: siteId, x: 0, y: 0, w: RW, h: RH, site };
  const halfW = W / 2 + 120;
  const bounds = { x0: -halfW, x1: halfW, y0: -340, y1: 330 };
  return { id: siteId, site, racks, tubes, doors, router, bounds, W };
}

const SCENES = { nl: buildOverview() };
for (const id of Object.keys(SITES)) SCENES[id] = buildSite(id);

// ---------------------------------------------------------------- canvas + camera
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = 1;
const cam = { x: 0, y: 0, z: 1 };
let camAnim = null;
let view = 'nl';
let selected = null; // { type, id }
let hover = null;
let animate = !matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  DPR = Math.min(2, window.devicePixelRatio || 1);
  W = innerWidth; H = innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
}
const toS = (x, y) => [(x - cam.x) * cam.z + W / 2, (y - cam.y) * cam.z + H / 2];
const toW = (sx, sy) => [(sx - W / 2) / cam.z + cam.x, (sy - H / 2) / cam.z + cam.y];

function fitCam(b) {
  const wide = W > 640;
  const padL = wide && !document.getElementById('left').classList.contains('closed') ? 336 : 24;
  const padR = wide && !document.getElementById('panel').hidden ? 410 : 24;
  const padT = wide ? 80 : 64, padB = wide ? 24 : 70;
  const z = Math.min((W - padL - padR) / (b.x1 - b.x0), (H - padT - padB) / (b.y1 - b.y0));
  const cx = (b.x0 + b.x1) / 2 - ((padL - padR) / 2) / z;
  const cy = (b.y0 + b.y1) / 2 - ((padT - padB) / 2) / z;
  return { x: cx, y: cy, z: Math.max(0.15, Math.min(z, 8)) };
}
function flyTo(target, ms = 450) {
  camAnim = { from: { ...cam }, to: target, t0: performance.now(), ms };
}
function fit(instant = false) {
  const t = fitCam(SCENES[view].bounds);
  if (instant) Object.assign(cam, t); else flyTo(t);
}

// ---------------------------------------------------------------- drawing
function roundRect(x, y, w, h, r) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, r);
}
function label(text, x, y, { size = 14, font = FONT_D, color = C.ink, bg = C.paper, pad = 6, border = true, align = 'center' } = {}) {
  ctx.font = `800 ${size}px ${font}`;
  const w = ctx.measureText(text).width + pad * 2, h = size + pad + 2;
  const x0 = align === 'center' ? x - w / 2 : align === 'end' ? x - w : x;
  if (bg) {
    roundRect(x0, y - h / 2, w, h, 8);
    ctx.fillStyle = bg; ctx.fill();
    if (border) { ctx.lineWidth = 2.5; ctx.strokeStyle = C.ink; ctx.stroke(); }
  }
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, x0 + w / 2, y + 1);
  return w;
}

function drawLand() {
  ctx.lineJoin = 'round';
  for (const [iso, rings] of Object.entries(GEO)) {
    ctx.beginPath();
    for (const r of rings) {
      r.forEach(([lon, lat], i) => { const [x, y] = toS(...proj(lon, lat)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.closePath();
    }
    ctx.fillStyle = iso === 'NLD' ? C.land : C.landOther;
    ctx.fill('evenodd');
    ctx.lineWidth = iso === 'NLD' ? 3 : 1.5;
    ctx.strokeStyle = iso === 'NLD' ? C.ink : 'rgba(30,38,64,.28)';
    ctx.stroke();
  }
  ctx.font = `800 ${Math.max(12, Math.min(22, cam.z * 9))}px ${FONT_D}`;
  ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.textAlign = 'center';
  const [nx, ny] = toS(...proj(3.0, 53.45)); ctx.fillText('Noordzee', nx, ny);
}

function drawTube(t, now) {
  const pts = t.path.pts.map(([x, y]) => toS(x, y));
  const wpx = view === 'nl' ? t.width : t.width * Math.max(0.55, Math.min(1.2, cam.z));
  const isSel = selected && selected.id === t.id;
  const isHov = hover && hover.id === t.id && hover.type === 'tube';
  const u = t.aggregate ? aggregateUtil() : util(t.id);
  const port = PORTS.get(t.id);
  const assumed = port?.assumed;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const path = () => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); };
  path();
  ctx.strokeStyle = isSel ? C.me : C.ink; ctx.lineWidth = wpx + (isSel || isHov ? 10 : 7); ctx.stroke();
  ctx.strokeStyle = C.paper; ctx.lineWidth = wpx; ctx.stroke();
  // liquid level: how full the tube is
  ctx.strokeStyle = utilColor(u); ctx.globalAlpha = 0.45;
  ctx.lineWidth = Math.max(3, (wpx - 4) * Math.min(1, u)); ctx.stroke();
  ctx.globalAlpha = 1;
  if (assumed) { ctx.setLineDash([2, 10]); ctx.strokeStyle = 'rgba(30,38,64,.35)'; ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); }
  // packets
  const tr = t.aggregate ? aggregateTraffic() : traffic.get(t.id);
  if (!tr) return;
  const screenLen = t.path.total * cam.z;
  const speedPx = 70; // px per second on screen
  for (const [dir, bps, color, off] of [['in', tr.inBps, C.paper, -1], ['out', tr.outBps, C.sun, 1]]) {
    const frac = tr.speedBps > 0 ? bps / tr.speedBps : 0;
    const n = Math.min(40, Math.round((screenLen / 26) * Math.min(1, frac * 1.6)) + (bps > 0 ? 1 : 0));
    const phase = animate ? (now / 1000) * speedPx / screenLen : 0;
    for (let i = 0; i < n; i++) {
      let f = (phase + i / n) % 1;
      // "in" travels from the far end towards the router (path start is the far end)
      if (dir === 'out') f = 1 - f;
      const p = pointAt(t.path, f);
      const [sx, sy] = toS(p.x, p.y);
      const o = off * wpx * 0.2;
      ctx.beginPath(); ctx.arc(sx + p.nx * o, sy + p.ny * o, Math.max(2.2, wpx * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill(); ctx.lineWidth = 1.6; ctx.strokeStyle = C.ink; ctx.stroke();
    }
  }
}

function aggregateTraffic() {
  let i = 0, o = 0, s = 0;
  for (const p of EXTERNAL) { const t = traffic.get(p.id); if (!t) continue; i += t.inBps; o += t.outBps; s += t.speedBps; }
  return s ? { inBps: i, outBps: o, speedBps: s } : null;
}
function aggregateUtil() { const t = aggregateTraffic(); return t ? Math.max(t.inBps, t.outBps) / t.speedBps : 0; }

function drawOverview(now) {
  const sc = SCENES.nl;
  drawLand();
  for (const t of sc.tubes) drawTube(t, now);
  for (const n of sc.nodes) {
    const [x, y] = toS(...n.at);
    const isSel = selected && selected.id === n.id;
    const isHov = hover && hover.id === n.id && hover.type === n.type;
    if (n.type === 'cloud') {
      ctx.beginPath();
      for (const [dx, dy, r] of [[-26, 6, 20], [0, -8, 26], [28, 4, 20], [6, 14, 18]]) ctx.moveTo(x + dx + r, y + dy), ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
      ctx.fillStyle = C.paper; ctx.fill('nonzero'); ctx.lineWidth = isHov ? 4.5 : 3; ctx.strokeStyle = C.ink; ctx.stroke();
      ctx.fillStyle = C.paper; ctx.beginPath();
      for (const [dx, dy, r] of [[-26, 6, 18.5], [0, -8, 24.5], [28, 4, 18.5], [6, 14, 16.5]]) ctx.moveTo(x + dx + r, y + dy), ctx.arc(x + dx, y + dy, r, 0, Math.PI * 2);
      ctx.fill();
      label('Internet', x, y + 2, { size: 16, bg: null });
      label(`${IXES.length} IX · ${UPSTREAMS.length} upstreams`, x, y + 44, { size: 12, bg: C.sun });
      continue;
    }
    const r = n.r;
    ctx.beginPath(); ctx.arc(x + 3, y + 3, r, 0, Math.PI * 2); ctx.fillStyle = C.ink; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = C.me; ctx.fill();
    ctx.lineWidth = isSel || isHov ? 4.5 : 3.5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, r * 0.42, 0, Math.PI * 2); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 2.5; ctx.stroke();
    const facs = n.site.facilities.length;
    const side = n.site.labelSide || 'below';
    const [lx, ly, al] = side === 'right' ? [x + r + 10, y - 9, 'start'] : side === 'left' ? [x - r - 10, y - 9, 'end'] : [x, y + r + 16, 'center'];
    label(n.site.name, lx, ly, { size: 15, align: al });
    label(facs > 1 ? `${facs} datacenters` : '1 datacenter', lx, ly + 21, { size: 11, font: FONT_B, bg: C.soft, align: al });
  }
}

function drawRack(r) {
  const [x, y] = toS(r.x - r.w / 2, r.y - r.h / 2);
  const w = r.w * cam.z, h = r.h * cam.z;
  const isSel = selected && selected.id === r.id;
  const isHov = hover && hover.id === r.id;
  const fill = r.kind === 'ix' ? C.sun : r.kind === 'upstream' ? C.sea : C.me;
  roundRect(x + 4, y + 4, w, h, 12); ctx.fillStyle = C.ink; ctx.fill();
  roundRect(x, y, w, h, 12); ctx.fillStyle = fill; ctx.fill();
  ctx.lineWidth = isSel ? 5 : isHov ? 4 : 3; ctx.strokeStyle = isSel ? C.me : C.ink; ctx.stroke();
  // little rack units
  ctx.fillStyle = 'rgba(30,38,64,.18)';
  for (let k = 0; k < 3; k++) { roundRect(x + w * 0.1, y + h * (0.56 + k * 0.13), w * 0.8, h * 0.07, 3); ctx.fill(); }
  const p = r.port || PORTS.get(r.id);
  const s = Math.max(9, Math.min(16, 14 * cam.z));
  ctx.font = `800 ${s}px ${FONT_D}`; ctx.fillStyle = r.kind === 'door' ? C.paper : C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(r.title || p.name, x + w / 2, y + h * 0.26);
  ctx.font = `800 ${Math.max(8, s * 0.72)}px ${FONT_B}`;
  ctx.fillText(r.sub || (p.kind === 'ix' ? `${fmtSpeed(p.speedMbps)} · AS${p.rsAsn}` : `AS${p.asn}`), x + w / 2, y + h * 0.45);
}

function drawRouter(rt, now) {
  const [x, y] = toS(rt.x - rt.w / 2, rt.y - rt.h / 2);
  const w = rt.w * cam.z, h = rt.h * cam.z;
  const isSel = selected && selected.type === 'router';
  const isHov = hover && hover.type === 'router';
  roundRect(x + 5, y + 5, w, h, 16); ctx.fillStyle = C.ink; ctx.fill();
  roundRect(x, y, w, h, 16); ctx.fillStyle = '#2D3658'; ctx.fill();
  ctx.lineWidth = isSel ? 5 : isHov ? 4.5 : 3.5; ctx.strokeStyle = isSel ? C.me : C.ink; ctx.stroke();
  roundRect(x, y, w, h * 0.3, [16, 16, 0, 0]); ctx.fillStyle = C.me; ctx.fill(); ctx.stroke();
  const s = Math.max(10, 17 * cam.z);
  ctx.font = `800 ${s}px ${FONT_D}`; ctx.fillStyle = C.paper; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(rt.site.router.name, x + w / 2, y + h * 0.16);
  // blinking port LEDs
  const n = 12;
  for (let i = 0; i < n; i++) {
    const on = !animate || Math.sin(now / (90 + i * 17) + i * 3) > -0.2;
    ctx.beginPath(); ctx.arc(x + w * (0.12 + 0.76 * i / (n - 1)), y + h * 0.62, Math.max(2, 4 * cam.z), 0, Math.PI * 2);
    ctx.fillStyle = on ? C.ok : '#3D476E'; ctx.fill();
  }
  ctx.font = `800 ${Math.max(8, 11 * cam.z)}px ${FONT_B}`; ctx.fillStyle = 'rgba(255,255,255,.75)';
  ctx.fillText('looking glass ▸', x + w / 2, y + h * 0.85);
}

function drawSite(now) {
  const sc = SCENES[view];
  // floor
  ctx.fillStyle = C.soft; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(30,38,64,.06)'; ctx.lineWidth = 1;
  const g = 40 * cam.z;
  if (g > 6) {
    const [ox, oy] = toS(0, 0);
    for (let x = ox % g; x < W; x += g) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = oy % g; y < H; y += g) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  }
  // title
  const [tx, ty] = toS(0, sc.bounds.y0 + 20);
  label(sc.site.name, tx, ty, { size: Math.max(14, 26 * cam.z), bg: null });
  const list = sc.site.facilities;
  const facs = list.length > 2 ? `${list.length} datacenters · klik op de router voor de lijst` : list.map((f) => f.name).join(' · ');
  ctx.font = `700 ${Math.max(9, 12 * cam.z)}px ${FONT_B}`; ctx.fillStyle = C.ink2; ctx.textAlign = 'center';
  ctx.fillText(facs, tx, ty + Math.max(16, 26 * cam.z));
  // row captions
  if (sc.racks.some((r) => r.kind === 'ix')) { const [x, y] = toS(-sc.W / 2 - 60, -250); label('IX', x, y, { size: 12, bg: C.sun }); }
  if (sc.racks.some((r) => r.kind === 'upstream')) { const [x, y] = toS(-sc.W / 2 - 60, 250); label('Upstream', x, y, { size: 12, bg: C.sea }); }
  if (!sc.racks.length) {
    const [x, y] = toS(0, 210);
    ctx.font = `700 ${Math.max(10, 13 * cam.z)}px ${FONT_B}`; ctx.fillStyle = C.ink2; ctx.textAlign = 'center';
    ctx.fillText('Geen exchanges of upstreams bekend op deze locatie (PeeringDB).', x, y);
  }
  for (const t of sc.tubes) drawTube(t, now);
  for (const r of sc.racks) drawRack(r);
  for (const d of sc.doors) drawRack({ ...d, kind: 'door', title: `${d.x < 0 ? '◂ ' : ''}${SITES[d.to].name}${d.x > 0 ? ' ▸' : ''}`, sub: 'backbone' });
  drawRouter(sc.router, now);
}

function frame(now) {
  if (camAnim) {
    const k = Math.min(1, (now - camAnim.t0) / camAnim.ms), e = 1 - Math.pow(1 - k, 3);
    for (const key of ['x', 'y']) cam[key] = camAnim.from[key] + (camAnim.to[key] - camAnim.from[key]) * e;
    cam.z = Math.exp(Math.log(camAnim.from.z) + (Math.log(camAnim.to.z) - Math.log(camAnim.from.z)) * e);
    if (k >= 1) camAnim = null;
  }
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = C.sea; ctx.fillRect(0, 0, W, H);
  if (view === 'nl') drawOverview(now); else drawSite(now);
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------- hit testing
function hitTest(sx, sy) {
  const sc = SCENES[view];
  const [wx, wy] = toW(sx, sy);
  const inBox = (o) => Math.abs(wx - o.x) <= o.w / 2 && Math.abs(wy - o.y) <= o.h / 2;
  if (view === 'nl') {
    for (const n of sc.nodes) { const [x, y] = toS(...n.at); if (Math.hypot(sx - x, sy - y) <= n.r + 8) return { type: n.type, id: n.id }; }
  } else {
    if (inBox(sc.router)) return { type: 'router', id: sc.router.id };
    for (const r of sc.racks) if (inBox(r)) return { type: 'tube', id: r.id };
    for (const d of sc.doors) if (inBox(d)) return { type: 'door', id: d.id, to: d.to };
  }
  for (const t of sc.tubes) {
    const pts = t.path.pts.map(([x, y]) => toS(x, y));
    if (distToPolyline(sx, sy, pts) <= t.width / 2 + 6) return { type: 'tube', id: t.id };
  }
  return null;
}

// ---------------------------------------------------------------- views + selection
const $ = (id) => document.getElementById(id);

function go(next, instant = false) {
  view = next;
  $('backBtn').hidden = view === 'nl';
  if (!instant) {
    // zoom "into" the city a bit before the scene swap feels less abrupt
    const t = fitCam(SCENES[view].bounds);
    Object.assign(cam, { ...t, z: t.z * (view === 'nl' ? 1.6 : 0.6) });
    flyTo(t, 420);
  } else fit(true);
  renderList();
}

function select(sel) {
  selected = sel;
  const wasHidden = $('panel').hidden;
  $('panel').hidden = !sel;
  if (sel) renderPanel();
  renderList();
  // keep the scene clear of the panel on wide screens
  if (wasHidden !== $('panel').hidden && innerWidth > 640) fit();
}

function onClick(hit) {
  if (!hit) { select(null); return; }
  if (view === 'nl' && hit.type === 'site') { go(hit.id); select({ type: 'router', id: hit.id }); return; }
  if (view === 'nl' && hit.type === 'cloud') { go('ams'); select({ type: 'internet', id: 'internet' }); return; }
  if (hit.type === 'door') { go(hit.to); select({ type: 'tube', id: hit.id }); return; }
  select(hit);
}

// ---------------------------------------------------------------- panel
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  if (typeof attrs === 'string') el.className = attrs;
  else if (attrs) for (const [k, v] of Object.entries(attrs)) k === 'class' ? (el.className = v) : el.setAttribute(k, v);
  for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k)));
  return el;
}
const tag = (cls, txt) => h('span', `tag ${cls}`, txt);

function gauge(tr) {
  if (!tr) return h('p', 'lead', 'Nog geen verkeersdata.');
  const pct = (v) => (tr.speedBps > 0 ? Math.min(100, (v / tr.speedBps) * 100) : 0);
  const mk = (name, v, color) => h('div', 'gauge',
    h('div', 'bar', Object.assign(h('i'), { style: `width:${pct(v)}%;background:${color}` })),
    h('div', 'lbl', h('span', null, `${name}: ${fmtBps(v)}`), h('span', null, `${pct(v).toFixed(0)}%`)));
  return h('div', null, mk('In', tr.inBps, utilColor(tr.inBps / tr.speedBps)), mk('Uit', tr.outBps, utilColor(tr.outBps / tr.speedBps)));
}

function renderPanel() {
  const body = $('panelBody');
  body.replaceChildren();
  if (!selected) return;
  const demoNote = source.demo ? tag('demo', 'demo-verkeer') : null;
  if (selected.type === 'router') {
    const s = SITES[selected.id];
    body.append(
      h('div', 'eyebrow', 'Router · ', s.name),
      h('h2', null, s.router.name),
      h('div', null, tag('me', 'AS201290'), ' ', s.router.assumed ? tag('assumed', 'naam is een aanname') : null),
      h('p', 'lead', 'Datacenters op deze locatie (PeeringDB):'),
      h('dl', 'kv', ...s.facilities.flatMap((f) => [h('dt', null, f.name), h('dd', null, f.addr)])),
      h('p', 'note', 'Looking glass: nog niet gekoppeld. Straks kun je hier de echte router vragen hoe hij ergens komt (route, ping, traceroute).'),
      h('div', 'links', ...s.facilities.map((f) => h('a', { class: 'b sm ghost', href: `https://www.peeringdb.com/fac/${f.pdb}`, target: '_blank', rel: 'noopener' }, `PeeringDB: ${f.name.split(' ')[0]}`))),
    );
    return;
  }
  if (selected.type === 'internet') {
    const tr = aggregateTraffic();
    body.append(
      h('div', 'eyebrow', 'Het internet'),
      h('h2', null, 'Alles wat buiten AS201290 ligt'),
      h('div', null, demoNote),
      h('p', 'lead', `Samen: ${IXES.length} internet exchanges en ${UPSTREAMS.length} upstreams. De tube is de som van al die poorten.`),
      gauge(tr),
      h('p', 'lead', 'Klik in Amsterdam op een rack om een enkele tube te bekijken.'),
    );
    return;
  }
  const p = PORTS.get(selected.id);
  if (!p) return;
  const tr = traffic.get(p.id);
  if (p.kind === 'ix') {
    body.append(
      h('div', 'eyebrow', 'Internet exchange · ', SITES[p.site].name),
      h('h2', null, p.name),
      h('div', null, tag('ix', 'IX'), ' ', demoNote),
      gauge(tr),
      h('dl', 'kv',
        h('dt', null, 'Poort'), h('dd', null, fmtSpeed(p.speedMbps)),
        h('dt', null, 'IPv4'), h('dd', null, h('code', null, p.v4)),
        h('dt', null, 'IPv6'), h('dd', null, h('code', null, p.v6)),
        h('dt', null, 'Route server'), h('dd', null, `AS${p.rsAsn}`),
        h('dt', null, 'Locatie'), h('dd', null, `${SITES[p.site].name} `, tag('assumed', 'aanname'))),
      h('div', 'links',
        h('a', { class: 'b sm', href: `https://www.peeringdb.com/ix/${p.pdbIx}`, target: '_blank', rel: 'noopener' }, 'PeeringDB'),
        h('a', { class: 'b sm ghost', href: p.url, target: '_blank', rel: 'noopener' }, 'Website')),
    );
  } else if (p.kind === 'upstream') {
    body.append(
      h('div', 'eyebrow', 'Upstream · ', SITES[p.site].name),
      h('h2', null, p.name),
      h('div', null, tag('up', `AS${p.asn}`), ' ', tag('assumed', 'waargenomen'), ' ', demoNote),
      gauge(tr),
      h('p', 'note', 'Gezien als buur aan de upstream-kant in openbare BGP-data (RIPEstat). Of dit een transitcontract is, en de capaciteit en locatie van de poort, zijn nog niet bevestigd.'),
      h('div', 'links',
        h('a', { class: 'b sm', href: `https://bgp.tools/as/${p.asn}`, target: '_blank', rel: 'noopener' }, 'bgp.tools'),
        h('a', { class: 'b sm ghost', href: `https://www.peeringdb.com/asn/${p.asn}`, target: '_blank', rel: 'noopener' }, 'PeeringDB')),
    );
  } else if (p.kind === 'backbone') {
    body.append(
      h('div', 'eyebrow', 'Backbone'),
      h('h2', null, p.name),
      h('div', null, tag('me', 'eigen netwerk'), ' ', tag('assumed', 'aanname'), ' ', demoNote),
      gauge(tr),
      h('p', 'note', 'Deze verbinding is een aanname voor het concept. Capaciteit en route nog te bevestigen.'),
      h('div', 'links',
        h('button', { class: 'b sm', type: 'button', 'data-go': p.from }, `◂ ${SITES[p.from].name}`),
        h('button', { class: 'b sm', type: 'button', 'data-go': p.to }, `${SITES[p.to].name} ▸`)),
    );
  }
}
$('panelBody').addEventListener('click', (e) => {
  const b = e.target.closest('[data-go]');
  if (b) { go(b.dataset.go); select({ type: 'router', id: b.dataset.go }); }
});
$('panelClose').addEventListener('click', () => select(null));

// ---------------------------------------------------------------- left list
let leftTab = 'tubes';
function renderTabs() {
  const tabs = [['tubes', 'Tubes'], ['noc', 'NOC'], ['about', 'Over']];
  $('leftTabs').replaceChildren(...tabs.map(([id, name]) => {
    const b = h('button', { type: 'button', role: 'tab', 'aria-selected': String(leftTab === id) }, name);
    if (id === 'noc') { const n = nocIssues().length; if (n) b.append(h('span', 'cnt', n)); }
    b.onclick = () => { leftTab = id; renderTabs(); renderList(); };
    return b;
  }));
}
function row(id, name, sub, color, onclick) {
  const u = util(id);
  const r = h('div', `row${selected && selected.id === id ? ' sel' : ''}`,
    Object.assign(h('span', 'dot'), { style: `background:${color}` }),
    h('span', 'nm', name, h('small', null, sub)),
    h('span', 'pct', traffic.has(id) ? `${Math.round(u * 100)}%` : '—'));
  r.onclick = onclick; return r;
}
function nocIssues() { return [...PORTS.values()].filter((p) => util(p.id) >= 0.85); }
function renderList() {
  const body = $('leftBody');
  body.replaceChildren();
  if (leftTab === 'tubes') {
    for (const s of Object.values(SITES)) {
      const ports = [...IXES, ...UPSTREAMS].filter((p) => p.site === s.id);
      const bbs = BACKBONE.filter((b) => b.from === s.id);
      const g = h('div', 'group', h('h4', null, s.name, ' ', h('button', { class: 'b sm ghost', type: 'button' }, 'naar binnen ▸')));
      g.querySelector('button').onclick = () => { go(s.id); select({ type: 'router', id: s.id }); };
      for (const p of ports) g.append(row(p.id, p.name, p.kind === 'ix' ? `IX · ${fmtSpeed(p.speedMbps)}` : `upstream · AS${p.asn}`, p.kind === 'ix' ? C.sun : C.sea,
        () => { if (view !== p.site) go(p.site); select({ type: 'tube', id: p.id }); }));
      for (const b of bbs) g.append(row(b.id, `→ ${SITES[b.to].name}`, 'backbone · aanname', C.me,
        () => { if (view !== b.from) go(b.from); select({ type: 'tube', id: b.id }); }));
      body.append(g);
    }
  } else if (leftTab === 'noc') {
    const issues = nocIssues();
    body.append(h('p', 'lead', issues.length ? 'Deze tubes zitten (bijna) vol:' : 'Alles rustig. Geen enkele tube zit boven 85%.'));
    for (const p of issues) body.append(row(p.id, p.name, p.kind, C.bad, () => { if (p.site && view !== p.site) go(p.site); if (p.from && view !== p.from) go(p.from); select({ type: 'tube', id: p.id }); }));
    if (source.demo) body.append(h('p', 'note', 'Let op: in deze demo is het verkeer gesimuleerd, dus ook de meldingen.'));
  } else {
    body.append(
      h('h4', null, 'Waar komt het vandaan'),
      h('p', 'lead', 'Datacenters, internet exchanges en IX-poorten: ', h('a', { href: `https://www.peeringdb.com/net/${NETWORK.pdbNet}`, target: '_blank', rel: 'noopener' }, 'PeeringDB'), '. Upstreams en prefixen: ', h('a', { href: 'https://stat.ripe.net/AS201290', target: '_blank', rel: 'noopener' }, 'RIPEstat'), '. Kustlijn: ', h('a', { href: 'https://www.naturalearthdata.com/', target: '_blank', rel: 'noopener' }, 'Natural Earth'), '.'),
      h('p', 'note', source.demo
        ? 'Concept: het verkeer is gesimuleerd. Straks komt het poortverkeer uit Zabbix. Backbone-verbindingen, routernamen en de locatie van upstreams zijn aannames.'
        : 'Poortverkeer komt uit Zabbix.'),
      h('p', 'lead', 'De look is geleend, met liefde, van ', h('a', { href: 'https://seriesoftub.es', target: '_blank', rel: 'noopener' }, 'Series of Tubes'), ', het browserspel van Frederic Jung (', h('a', { href: 'https://github.com/fjaeckel/seriesoftubes', target: '_blank', rel: 'noopener' }, 'GitHub'), ', MIT).'),
    );
  }
}

// ---------------------------------------------------------------- HUD
function updateHud() {
  const t = aggregateTraffic();
  $('hTraffic').textContent = t ? `${fmtBps(t.inBps)} · ${fmtBps(t.outBps)}` : '—';
  $('hTrafficBar').style.width = t ? `${Math.min(100, (Math.max(t.inBps, t.outBps) / t.speedBps) * 100)}%` : '0';
  $('hPeered').textContent = `${IXES.length} IX`;
  const issues = nocIssues();
  $('hNoc').classList.toggle('alarm', issues.length > 0);
  $('hNocVal').textContent = issues.length ? `${issues.length} tube${issues.length > 1 ? 's' : ''} vol` : 'Alles rustig';
  $('hMode').textContent = source.demo ? 'Demo' : 'Live';
  if (lastUpdate) $('hTime').textContent = new Intl.DateTimeFormat('nl-NL', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam' }).format(lastUpdate);
}
function setPrefixes(v4, v6) { $('hPrefixes').textContent = `${v4} v4 · ${v6} v6`; }

async function poll() {
  await Promise.all([...PORTS.values()].map(async (p) => {
    try { traffic.set(p.id, await source.get(p.id, p.speedMbps)); } catch { /* keep old value */ }
  }));
  lastUpdate = new Date();
  updateHud();
  renderTabs();
  if (selected) renderPanel();
  if (leftTab !== 'about') renderList();
}

async function loadPrefixes() {
  setPrefixes(NETWORK.prefixes.v4, NETWORK.prefixes.v6);
  try {
    const r = await fetch(`https://stat.ripe.net/data/announced-prefixes/data.json?resource=AS${NETWORK.asn}`, { signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    const list = j.data.prefixes.map((p) => p.prefix);
    setPrefixes(list.filter((p) => !p.includes(':')).length, list.filter((p) => p.includes(':')).length);
  } catch { /* snapshot stays */ }
}

function toast(text, kind = '') {
  const el = h('div', `toast ${kind}`, text);
  $('toasts').append(el);
  setTimeout(() => el.remove(), 4000);
}

// ---------------------------------------------------------------- input
let drag = null;
canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  drag = { x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, moved: false };
});
canvas.addEventListener('pointermove', (e) => {
  if (drag) {
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 4) drag.moved = true;
    if (drag.moved) { camAnim = null; cam.x = drag.cx - dx / cam.z; cam.y = drag.cy - dy / cam.z; canvas.classList.add('drag'); }
    return;
  }
  hover = hitTest(e.clientX, e.clientY);
  canvas.classList.toggle('hover', !!hover);
});
canvas.addEventListener('pointerup', (e) => {
  if (drag && !drag.moved) onClick(hitTest(e.clientX, e.clientY));
  drag = null; canvas.classList.remove('drag');
});
canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0015));
}, { passive: false });
function zoomAt(sx, sy, f) {
  camAnim = null;
  const [wx, wy] = toW(sx, sy);
  cam.z = Math.max(0.15, Math.min(12, cam.z * f));
  cam.x = wx - (sx - W / 2) / cam.z; cam.y = wy - (sy - H / 2) / cam.z;
}
$('zoomIn').onclick = () => zoomAt(W / 2, H / 2, 1.3);
$('zoomOut').onclick = () => zoomAt(W / 2, H / 2, 1 / 1.3);
$('fitBtn').onclick = () => fit();
$('animBtn').onclick = () => {
  animate = !animate;
  $('animBtn').textContent = animate ? '❚❚' : '▶';
  $('animBtn').setAttribute('aria-label', animate ? 'Pauzeer de pakketjes' : 'Speel de pakketjes af');
};
$('helpBtn').onclick = () => $('welcome').showModal();
$('backBtn').onclick = () => { go('nl'); select(null); };
$('hNoc').onclick = () => { leftTab = 'noc'; $('left').classList.remove('closed'); renderTabs(); renderList(); };
$('leftToggle').onclick = () => $('left').classList.toggle('closed');
addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || $('welcome').open) return;
  if (selected) select(null); else if (view !== 'nl') go('nl');
});
addEventListener('resize', () => { resize(); fit(true); });

$('welcome').addEventListener('close', () => {
  if ($('welcome').returnValue === 'inside') { go('ams'); select({ type: 'router', id: 'ams' }); }
});

// ---------------------------------------------------------------- start
resize();
if (innerWidth <= 640) $('left').classList.add('closed');
const start = params.get('site');
if (start && SITES[start]) view = start;
$('backBtn').hidden = view === 'nl';
fit(true);
renderTabs();
renderList();
requestAnimationFrame(frame);
poll();
setInterval(poll, POLL_MS);
loadPrefixes();
if (source.demo) setTimeout(() => toast('Concept: het verkeer is gesimuleerd. Live data uit Zabbix volgt.', 'goal'), 600);
if (!params.has('nowelcome')) $('welcome').showModal();
