# Series of Tubes – AS201290 (BlackGATE)

Een live kaart van AS201290 als een serie tubes, naar het voorbeeld van
[tubes.bgp.rodeo](https://tubes.bgp.rodeo/) (AS202585). De look is geleend van
[Series of Tubes](https://seriesoftub.es) van Frederic Jung
([GitHub](https://github.com/fjaeckel/seriesoftubes), MIT).

**Status: concept.** Het verkeer is gesimuleerd.

## Bekijken

Statische site, geen build-stap:

```sh
cd tubes
python3 -m http.server 8000
# open http://localhost:8000
```

URL-opties: `?nowelcome` (geen welkomstscherm), `?site=ams|dhg|rtm|lux` (start in een datacenter),
`?live=1` (lees `/traffic/<poort>.json` in plaats van demo-data).

## Waar de data vandaan komt

| Wat | Bron | Zeker? |
| --- | --- | --- |
| Datacenters + adressen | PeeringDB `netfac` (net 11569) | ja |
| IX-poorten (AMS-IX, NL-ix, Frys-IX, 100G) + IP's | PeeringDB `netixlan` | ja |
| Upstreams (AS20562, 3356, 8455, 6939, 2914, 24785) | RIPEstat `asn-neighbours` | waargenomen, niet bevestigd |
| Prefix-telling | RIPEstat `announced-prefixes` (live in de browser) | ja |
| Backbone tussen sites, routernamen, locatie van IX/upstream-poorten | — | **aanname** |
| Verkeer | demo-generator | **gesimuleerd** |
| Kustlijn | Natural Earth 1:10m (public domain) | ja |

Alles staat in `data/topology.js`; aannames zijn daar gemarkeerd met `assumed: true`.

## Live data (volgende stap: Zabbix 6.4)

De browser praat nooit direct met Zabbix (dan zou het API-token openbaar zijn).
Een klein server-side script schrijft per poort een bestand `traffic/<poort-id>.json`:

```json
{ "port": "amsix", "in_bps": 12800000000, "out_bps": 7900000000, "speed_bps": 100000000000, "ts": 1761999999 }
```

De poort-id's zijn de `id`'s uit `data/topology.js` (bijv. `amsix`, `nlix`, `as3356`, `bb-ams-dhg`).
Met `?live=1` gebruikt de kaart deze bestanden.

## Bestanden

- `index.html`, `style.css` – opmaak (kleuren/fonts volgens Series of Tubes)
- `app.js` – kaart, datacenterweergave, panelen
- `traffic.js` – demo- en live-bron
- `data/topology.js` – het netwerk
- `data/geo.js` – kustlijn/grenzen
- `fonts/` – Baloo 2 en Nunito (SIL Open Font License, via Fontsource)
