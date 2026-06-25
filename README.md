# README.md

## Lokális tesztelés
Mivel a Service Worker kizárólag biztonságos kontextusban (HTTPS vagy localhost) fut, a `file://` protokoll használatával az alkalmazás nem fog megfelelően működni, és a PWA funkciók nem aktiválódnak.

A lokális teszteléshez indíts egy lokális webszervert a mappa gyökerében:
`python -m http.server 8080`

Ezután nyisd meg a böngészőben a `http://localhost:8080` címet.

## PWA telepítés lépései mobilon

### Google Chrome (Android)
1. Nyisd meg az alkalmazást az URL-en keresztül.
2. A képernyő tetején automatikusan megjelenik a "Telepítsd az appot a legjobb élményért" banner, vagy az "Adjd hozzá a kezdőképernyőhöz" kártya az Áttekintő nézeten.
3. Kattints a felkínált gombra, és erősítsd meg a telepítést a felugró rendszerablakban.
4. Az alkalmazás megjelenik a kezdőképernyőn és az app drawerben.

### Safari (iOS)
1. Nyisd meg az alkalmazást Safariban.
2. Érintsd meg a böngésző alsó menüsorában található **Megosztás** (négyzetből kifelé mutató nyíl) ikont.
3. Görgess le, és válaszd a **Főképernyőhöz adás** (Add to Home Screen) opciót.
4. A felugró ablakban erősítsd meg a "Hozzáadás" gombbal.
5. Az alkalmazás ikonja megjelenik a kezdőképernyőn, és teljes képernyős, standalone módban fog futni.

## OCR teszt
A beépített (on-device) `Tesseract.js` OCR motor teszteléséhez az alábbi paraméterek figyelembevétele ajánlott a legjobb pontosság érdekében:

- **Ajánlott képformátum:** `.jpg` vagy `.png`
- **Minimális felbontás:** Legalább 300 DPI, vagy 1000px szélesség a blokkhoz. A túl kicsi vagy homályos képeken a tizedesvesszők és pénznem-szimbólumok felismerése pontatlan lehet.
- **Megvilágítás és kontraszt:** Jól megvilágított, kontrasztos (lehetőleg fekete szöveg fehér alapon) nyugta vagy képernyőkép használata javasolt.
- **Kivonatolt adatok:** A rendszer a regex mintákat a kiválasztott pénznem (HUF/EUR/USD) formátumához igazítja. Az összeg és a dátum minden esetben manuális megerősítést igényel a mentés előtt.