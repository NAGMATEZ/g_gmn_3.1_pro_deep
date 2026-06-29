# Budget Manager PWA

Egy teljesen offline, szerver nélküli, mobil-első PWA személyes költségvetés kezelésére.

## Lokális tesztelés

A service worker regisztrációja és a lokális tárolók működése biztonságos kontextust (HTTPS vagy localhost) igényel. A `file://` protokollon keresztül nem fog működni.

A futtatáshoz navigálj a fájlok könyvtárába terminálból, és indíts egy egyszerű szervert:

```bash
python -m http.server 8080
