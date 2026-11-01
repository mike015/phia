// Traffic sources.
//
// The map only ever calls `source.get(portId)` and gets back
//   { inBps, outBps, speedBps, ts, demo }
//
// - DemoSource: invented numbers, smooth and deterministic per port. Used for the concept.
// - LiveSource: reads /traffic/<portId>.json, which a small server-side job will write from
//   Zabbix 6.4 (so no Zabbix token ever reaches the browser). Expected file format:
//     { "port": "amsix", "in_bps": 1234567, "out_bps": 7654321, "speed_bps": 100000000000, "ts": 1761999999 }

const DEMO_SPEED_UNKNOWN = 10e9; // nominal size used to draw a tube whose real capacity is unknown

function hash(str) {
  let h = 2166136261;
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return (h >>> 0) / 4294967295;
}

export class DemoSource {
  constructor() { this.demo = true; }
  async get(portId, speedMbps) {
    const speedBps = speedMbps ? speedMbps * 1e6 : DEMO_SPEED_UNKNOWN;
    const seed = hash(portId);
    const t = Date.now() / 1000;
    // Day curve (busier in the evening, Europe/Amsterdam-ish) + slow wobble per port.
    const hour = ((t / 3600) + 1) % 24;
    const day = 0.55 + 0.45 * Math.sin(((hour - 14) / 24) * 2 * Math.PI);
    const wobble = 0.85 + 0.15 * Math.sin(t / (40 + seed * 50) + seed * 10);
    const base = 0.04 + seed * 0.45; // some tubes are quiet, some busy
    const inUtil = Math.min(0.97, base * day * wobble * 1.25); // "mostly inbound" (PeeringDB)
    const outUtil = Math.min(0.97, base * day * (2 - wobble) * 0.45);
    return { inBps: inUtil * speedBps, outBps: outUtil * speedBps, speedBps, ts: t, demo: true };
  }
}

export class LiveSource {
  constructor(base = '/traffic') { this.base = base; this.demo = false; }
  async get(portId) {
    const r = await fetch(`${this.base}/${encodeURIComponent(portId)}.json`, {
      cache: 'no-store', signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = await r.json();
    const num = (v) => (v == null || v === '' ? NaN : Number(v));
    return { inBps: num(j.in_bps), outBps: num(j.out_bps), speedBps: num(j.speed_bps), ts: num(j.ts), demo: false };
  }
}

export function fmtBps(bps) {
  if (!Number.isFinite(bps)) return '—';
  const u = ['bps', 'kbps', 'Mbps', 'Gbps', 'Tbps'];
  let i = 0;
  while (bps >= 1000 && i < u.length - 1) { bps /= 1000; i++; }
  return `${bps >= 100 ? bps.toFixed(0) : bps.toFixed(1)} ${u[i]}`;
}

export function fmtSpeed(mbps) {
  if (!mbps) return 'onbekend';
  return mbps >= 1000 ? `${mbps / 1000}G` : `${mbps}M`;
}
