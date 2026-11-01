// Topology of AS201290 (BlackGATE B.V.)
//
// CONCEPT: built from public data only.
//  - Sites / facilities: PeeringDB netfac for net_id 11569 (coordinates from PeeringDB fac records).
//  - IX ports + speed:   PeeringDB netixlan for net_id 11569.
//  - Upstreams:          RIPEstat asn-neighbours ("left" neighbours with the highest power).
//                        These are OBSERVED in public BGP data, not confirmed transit contracts.
//  - Backbone links between sites and router names are ASSUMPTIONS (assumed: true) and must be
//    confirmed by BlackGATE before going live.
//
// Every port has an `id`; that id is what the traffic source (demo now, Zabbix later) is asked for.

export const NETWORK = {
  asn: 201290,
  name: 'BlackGATE',
  holder: 'BlackGATE B.V.',
  website: 'https://blackgate.nl',
  asSet: 'AS-BLACKGATE',
  pdbNet: 11569,
  // Snapshot of announced prefixes (RIPEstat, 2026-11-01). Refreshed live in the browser when possible.
  prefixes: { v4: 26, v6: 3 },
};

export const SITES = {
  ams: {
    id: 'ams', name: 'Amsterdam', lat: 52.37, lon: 4.85, labelSide: 'right',
    router: { name: 'ams-rtr', assumed: true },
    facilities: [
      { pdb: 18, name: 'NIKHEF Amsterdam', addr: 'Science Park 105' },
      { pdb: 104, name: 'Digital Realty AMS9', addr: 'Science Park 121' },
      { pdb: 1320, name: 'Equinix AM3', addr: 'Science Park 610' },
      { pdb: 63, name: 'Global Switch Amsterdam', addr: 'Johan Huizingalaan 759' },
      { pdb: 1083, name: 'NorthC Amsterdam 1', addr: 'Kabelweg 48 A' },
      { pdb: 374, name: 'Iron Mountain AMS-1', addr: 'J.W. Lucasweg 35, Haarlem' },
    ],
  },
  dhg: {
    id: 'dhg', name: 'Den Haag', lat: 52.0807, lon: 4.3359, labelSide: 'left',
    router: { name: 'dhg-rtr', assumed: true },
    facilities: [{ pdb: 10813, name: 'Cellnex Datacenter Den Haag', addr: 'Louise Henriëttestraat 385' }],
  },
  rtm: {
    id: 'rtm', name: 'Rotterdam', lat: 51.9301, lon: 4.414, labelSide: 'right',
    router: { name: 'rtm-rtr', assumed: true },
    facilities: [{ pdb: 2437, name: 'Eurofiber Datacenter Rotterdam 2', addr: 'Schuttevaerweg 48' }],
  },
  lux: {
    id: 'lux', name: 'Bettembourg', lat: 49.5049, lon: 6.1135,
    router: { name: 'lux-rtr', assumed: true },
    facilities: [{ pdb: 909, name: 'LuxConnect DC1.1', addr: 'Z.a.e. Wolser F 202' }],
  },
};

// Internet exchanges (PeeringDB netixlan). Which site each port lands in is assumed (all Amsterdam).
export const IXES = [
  { id: 'amsix', name: 'AMS-IX', kind: 'ix', site: 'ams', pdbIx: 26, rsAsn: 6777, speedMbps: 100000,
    v4: '80.249.213.100', v6: '2001:7f8:1:0:a500:20:1290:2', url: 'https://www.ams-ix.net' },
  { id: 'nlix', name: 'NL-ix', kind: 'ix', site: 'ams', pdbIx: 64, rsAsn: 34307, speedMbps: 100000,
    v4: '193.239.117.153', v6: '2001:7f8:13::a520:1290:1', url: 'https://www.nl-ix.net' },
  { id: 'frysix', name: 'Frys-IX', kind: 'ix', site: 'ams', pdbIx: 3512, rsAsn: 56393, speedMbps: 100000,
    v4: '185.1.160.75', v6: '2001:7f8:10f::3:124a:75', url: 'https://www.frys-ix.net' },
];

// Upstream neighbours observed by RIPEstat. Capacity and site are unknown (null / assumed).
export const UPSTREAMS = [
  { id: 'as20562', name: 'Open Peering', asn: 20562, kind: 'upstream', site: 'ams', speedMbps: null },
  { id: 'as3356', name: 'Lumen (Level 3)', asn: 3356, kind: 'upstream', site: 'ams', speedMbps: null },
  { id: 'as8455', name: 'Atom86', asn: 8455, kind: 'upstream', site: 'ams', speedMbps: null },
  { id: 'as6939', name: 'Hurricane Electric', asn: 6939, kind: 'upstream', site: 'ams', speedMbps: null },
  { id: 'as2914', name: 'NTT', asn: 2914, kind: 'upstream', site: 'ams', speedMbps: null },
  { id: 'as24785', name: 'Joint Transit', asn: 24785, kind: 'upstream', site: 'ams', speedMbps: null },
];

// Backbone between own sites. ALL ASSUMED until confirmed.
export const BACKBONE = [
  { id: 'bb-ams-dhg', from: 'ams', to: 'dhg', speedMbps: null, assumed: true },
  { id: 'bb-dhg-rtm', from: 'dhg', to: 'rtm', speedMbps: null, assumed: true },
  { id: 'bb-ams-rtm', from: 'ams', to: 'rtm', speedMbps: null, assumed: true },
  { id: 'bb-ams-lux', from: 'ams', to: 'lux', speedMbps: null, assumed: true },
];
