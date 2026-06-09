# IDPA Webshop Praesentationsvorbereitung

Stand: 08.06.2026  
Ziel: Vorbereitung fuer die IDPA-Praesentation am 09.06.2026  
Projekt: `Fretuks/IDPA26_WebShop`  
Teamannahme: Martin erklaert Backend, API, Datenbank und Security. Frederik erklaert Frontend, UX und Demo-Bedienung.

Diese Mappe ist eine Sprech- und Pruefungsunterlage. Code, Folien und Dokumentation bleiben unveraendert.

## 1. Der rote Faden in 60 Sekunden

Unser Projekt ist ein Webshop-Prototyp mit einer klar getrennten 3-Schichten-Architektur:

1. Frontend: React mit Vite, React Router, Context fuer Authentifizierung und Warenkorb.
2. Backend: Node.js mit Express als REST-API, aufgeteilt in Routes, Controller, Services, Repositories und Middleware.
3. Datenbank: PostgreSQL mit relationalem Schema fuer Benutzer, Adressen, Kategorien, Produkte, Warenkorb und Bestellungen.

Der wichtigste technische Gedanke: Das Frontend kennt die Datenbank nicht direkt. Es spricht nur per HTTP/JSON mit dem Backend. Das Backend prueft Eingaben, Rollen und Geschaeftslogik und kapselt die Datenbankzugriffe. Dadurch bleiben UI, Logik und Datenhaltung getrennt, wartbar und besser testbar.

Gute Kurzantwort, falls jemand fragt "Was habt ihr eigentlich gebaut?":

> Wir haben einen funktionsfaehigen Webshop-Prototyp gebaut. Kunden koennen sich registrieren, Produkte suchen, in den Warenkorb legen und Bestellungen ausloesen. Admins koennen Produkte, Kategorien, Benutzerrollen und Bestellstatus verwalten. Technisch ist das System in React-Frontend, Express-REST-API und PostgreSQL-Datenbank getrennt.

## 2. Praesentationsablauf fuer 15-20 Minuten

Empfohlenes Ziel: ca. 17 Minuten Vortrag plus 3 Minuten Puffer fuer Demo-Probleme und Fragen.

| Folie | Zeit | Sprecher | Kernbotschaft |
| --- | ---: | --- | --- |
| 1 Titel | 0:30 | Beide | Kurz vorstellen: Thema, Team, Rollen. |
| 2 Agenda | 0:40 | Martin | Vier Bloecke: Ziel, Organisation, Technik, Qualitaet/Demo/Fazit. |
| 3 Ausgangslage | 1:00 | Frederik | Warum Webshop: E-Commerce, UX, Sicherheit, Wartbarkeit. |
| 4 Ziele | 1:10 | Frederik | Funktionale Ziele + Qualitaetsziele. Nicht alles ist produktiv, aber Prototyp ist funktionsfaehig. |
| 5 Organisation | 1:00 | Martin | SPOC-Prinzip: Martin Backend/API/DB, Frederik Frontend/UX, gemeinsam Integration/Testing/Doku. |
| 6 IPERKA | 1:00 | Martin | Methode gab Struktur: zuerst Anforderungen und Architektur, dann Umsetzung, Kontrolle, Reflexion. |
| 7 Systemarchitektur | 1:20 | Martin | 3-Schichten-Modell: Frontend, Backend/API, PostgreSQL. Vorteile: Trennung, Wartbarkeit, paralleles Arbeiten. |
| 8 Datenmodell | 1:40 | Martin | Tabellen und Beziehungen: User, Address, Product, Category, Cart, Order. Constraints sichern Konsistenz. |
| 9 REST-API | 1:30 | Martin | Ressourcenorientierte Endpunkte, JSON, HTTP-Methoden, JWT bei geschuetzten Routen. |
| 10 Frontend & UX | 1:30 | Frederik | React-Komponenten, Seitenstruktur, AuthContext, CartContext, Produktfilter, Checkout-Flow. |
| 11 Backend-Struktur | 1:30 | Martin | Request-Weg: Route -> Middleware -> Controller -> Service -> Repository -> DB. |
| 12 Security | 1:20 | Martin | bcrypt, JWT, Rollenpruefung, serverseitige Validierung, DB-Constraints. |
| 13 Testing | 1:00 | Frederik | Node-Test-Runner, Backend-Services/Middleware, Frontend-Utilities, manuelle User-Flows. |
| 14 Herausforderungen | 1:10 | Beide | Schnittstellen, Zeitplanung, DB/Statusmodell, Integration. Nicht beschönigen, aber loesungsorientiert. |
| 15 Learnings | 1:00 | Beide | API-first, fruehes Datenmodell, klare Rollen, fruehere Tests waeren besser. |
| 16 Live-Demo | 3:00 | Frederik fuehrt, Martin erklaert API | Registrierung/Login, Produkte, Warenkorb, Checkout, Admin. |
| 17 Deployment | 0:50 | Martin | Frontend/Backend/Datenbank getrennt deploybar. Environment-Variablen fuer Produktivbetrieb. |
| 18 Zielerreichung | 0:50 | Frederik | Kernanforderungen erfuellt, Erweiterungen: echte Zahlung, E-Mail, CI/CD, Caching. |
| 19 Gesamtfazit | 0:40 | Beide | Projekt hat Fullstack, Planung und Teamarbeit verbunden. |
| 20 Danke | 0:20 | Beide | Ruhig abschliessen, Fragen aktiv einladen. |

Wichtig fuer die Rollen:

- Martin sollte bei allen Backend-Fragen sofort den Request-Weg erklaeren koennen.
- Frederik sollte bei allen UI-Fragen sofort Seiten, Contexts und API-Service erklaeren koennen.
- Beide muessen die Grenzen kennen: Prototyp, keine echte Zahlung, keine vollstaendige Produktionshaertung.

## 3. Code-Erklaerung nach Systemschichten

### 3.1 Repository-Struktur

Das Projekt ist in drei Bereiche gegliedert:

| Bereich | Zweck |
| --- | --- |
| `frontend/` | React/Vite-App fuer Benutzeroberflaeche, Routing, Shop-Seiten und Admin-UI. |
| `backend/` | Express-API mit Auth, Warenkorb, Bestellungen, Admin-Funktionen und PostgreSQL-Zugriff. |
| `documentation/` | Technische Projektdokumentation und Projektstand. |

Im Backend ist die Struktur bewusst geschichtet:

| Ordner | Aufgabe |
| --- | --- |
| `routes/` | Definiert URLs und HTTP-Methoden. |
| `controllers/` | Nimmt Requests entgegen und formt Responses. |
| `services/` | Enthaelt Geschaeftslogik und prueft fachliche Regeln. |
| `repositories/` | Kapselt SQL-Queries und Datenbankzugriffe. |
| `middleware/` | Authentifizierung, Rollenpruefung, Validierung, Fehlerbehandlung. |
| `validators/` | Regeln fuer Request-Daten mit `express-validator`. |
| `config/` | Datenbank- und Umgebungsvariablen-Konfiguration. |
| `models/` | Enums fuer Rollen, Zahlungsarten und Bestellstatus. |

Sehr gute Antwort auf "Warum so viele Schichten?":

> Damit jede Datei eine klare Verantwortung hat. Routes wissen nur, welche URL wohin fuehrt. Controller kuemmern sich um HTTP. Services enthalten die Fachlogik. Repositories sprechen mit der Datenbank. Dadurch kann man Logik testen und spaeter einzelne Teile einfacher aendern.

### 3.2 Frontend: React, Routing und State

Technologien:

- React 18 fuer komponentenbasierte UI.
- Vite als schnelles Build-Tool und Dev-Server.
- React Router fuer Seiten wie `/products`, `/cart`, `/checkout`, `/admin`.
- CSS/Tailwind-nahe Klassen fuer Layout und Styling.

Zentrale Dateien:

| Datei | Aufgabe |
| --- | --- |
| `frontend/src/main.jsx` | Einstiegspunkt. Verpackt die App mit `BrowserRouter`, `AuthProvider` und `CartProvider`. |
| `frontend/src/App.jsx` | Definiert alle Routen der Single Page Application. |
| `frontend/src/services/api.js` | Zentrale API-Schicht fuer alle Fetch-Requests ans Backend. |
| `frontend/src/context/AuthContext.jsx` | Speichert Login-Status, Token, User und Rollenlogik. |
| `frontend/src/context/CartContext.jsx` | Verwaltet Warenkorbzustand und synchronisiert ihn mit der API. |

Frontend-Seiten:

| Seite | Route | Zweck |
| --- | --- | --- |
| `OverviewPage` | `/` | Startseite und Einstieg. |
| `ProductsPage` | `/products` | Produktliste mit Suche, Kategorien, Preisfilter, Sortierung und Pagination. |
| `ProductDetailPage` | `/products/:id` | Produktdetail mit Menge und Add-to-Cart. |
| `CartPage` | `/cart` | Warenkorb anzeigen, Mengen aendern, Artikel entfernen. |
| `CheckoutPage` | `/checkout` | Zahlungsart und Adresse waehlen, Bestellung erstellen. |
| `LoginPage` | `/login` | Anmeldung. |
| `RegisterPage` | `/register` | Registrierung inklusive Adresse. |
| `SettingsPage` | `/settings` | Profil, Passwort und Adressen verwalten. |
| `AdminPage` | `/admin` | Adminbereich fuer Produkte, Kategorien, Bestellungen und Benutzer. |

Was passiert bei einem API-Aufruf im Frontend?

1. Eine Seite oder Komponente ruft eine Methode aus `api.js` auf.
2. `api.js` baut die URL aus `VITE_API_BASE_URL` und dem API-Pfad.
3. Wenn `auth: true` gesetzt ist, wird das JWT aus `localStorage` als `Authorization: Bearer ...` mitgeschickt.
4. Die Response wird in frontendfreundliche Objekte umgewandelt, z.B. `category_id` zu `categoryId`.
5. Fehler werden als JavaScript-Error mit lesbarer Message geworfen.

Gute Antwort auf "Warum habt ihr `api.js` gebaut?":

> Damit die Komponenten nicht direkt Fetch-Details kennen muessen. Die API-Kommunikation ist an einem Ort gekapselt: Base-URL, Auth-Header, Fehlerbehandlung und Mapping von Datenbanknamen zu Frontendnamen.

### 3.3 AuthContext

`AuthContext` ist der globale Login-Zustand:

- Token wird unter `webshop_token` in `localStorage` gespeichert.
- User wird unter `webshop_user` gespeichert.
- `login()` ruft `/api/auth/login` auf und speichert Token/User.
- `register()` registriert zuerst und loggt danach automatisch ein.
- `logout()` loescht Token/User.
- `isAdmin` prueft, ob `user.role === 'ADMIN'`.

Pruefungsantwort zu `localStorage`:

> Fuer den Prototyp ist localStorage einfach und nachvollziehbar. Produktiv muesste man Security genauer betrachten, z.B. XSS-Schutz, HttpOnly-Cookies oder kuerzere Token-Laufzeiten.

### 3.4 CartContext

`CartContext` synchronisiert den Warenkorb mit dem Backend:

- Sobald ein Token vorhanden ist, wird `/api/cart` geladen.
- `addToCart(productId, quantity)` ruft `POST /api/cart/items`.
- `updateItem(itemId, quantity)` ruft `PUT /api/cart/items/:id`.
- `removeItem(itemId)` ruft `DELETE /api/cart/items/:id`.
- `count` und `total` werden aus dem aktuellen Cart berechnet.
- Bei 401 wird der Benutzer ausgeloggt, weil der Token ungueltig oder abgelaufen ist.

Wichtig:

- Der Warenkorb ist nicht nur rein lokal. Er wird ueber die Backend-API persistent verarbeitet.
- Ohne Login kann kein Produkt in den Warenkorb gelegt werden.

### 3.5 Backend: Express-App und Request-Weg

Einstieg:

- `backend/server.js` leitet an `backend/src/server.js` weiter.
- `backend/src/server.js` startet Express auf `env.port`.
- `backend/src/app.js` erstellt die App, aktiviert CORS und JSON-Parsing, registriert Routen und Error-Handling.

Registrierte API-Bereiche:

| Bereich | Route | Aufgabe |
| --- | --- | --- |
| Health | `/health` | Prueft, ob API laeuft. |
| Auth | `/api/auth` | Registrierung und Login. |
| Products | `/api/products` | Produkte lesen, Admin-CRUD fuer Produkte. |
| Categories | `/api/categories` | Kategorien lesen, Admin-CRUD fuer Kategorien. |
| Cart | `/api/cart` | Geschuetzter Warenkorb. |
| Orders | `/api/orders` | Checkout und eigene Bestellungen. |
| Admin | `/api/admin` | Adminlisten, Status- und Rollenverwaltung. |
| Users | `/api/users` | Profil, Passwort, Adressen. |

Request-Weg Beispiel "Produkt erstellen":

1. `POST /api/products`
2. `authMiddleware` prueft JWT.
3. `roleMiddleware(UserRole.ADMIN)` prueft Adminrolle.
4. `productValidator` und `validateRequest` pruefen Daten.
5. `productController.create()` nimmt HTTP-Request entgegen.
6. `productService.create()` prueft z.B. Kategorie und Lagerbestand.
7. `productRepository.create()` fuehrt SQL-INSERT aus.
8. Response: HTTP 201 mit Produktdaten.

Merksatz:

> Route entscheidet, Controller uebersetzt HTTP, Service entscheidet fachlich, Repository spricht SQL.

### 3.6 Middleware und Security

`authMiddleware`:

- Erwartet Header `Authorization: Bearer <token>`.
- Verifiziert JWT mit `JWT_SECRET`.
- Legt Payload auf `req.user`.
- Gibt 401 bei fehlendem oder ungueltigem Token.

`roleMiddleware`:

- Prueft, ob `req.user.role` in den erlaubten Rollen ist.
- Gibt 403, wenn Benutzer zwar erkannt ist, aber nicht berechtigt ist.

`validateRequest`:

- Sammelt Fehler aus `express-validator`.
- Gibt 400 mit Details, falls Eingaben ungueltig sind.

`errorHandler`:

- Gibt bei bekannten fachlichen Fehlern die echte Message aus.
- Versteckt unerwartete Fehler hinter `Internal server error`.

Security-Kernaussagen:

- Passwoerter werden mit `bcrypt` und `BCRYPT_ROUNDS=12` gehasht.
- JWT ist stateless: Das Backend muss keine Session speichern.
- Admin-Routen sind doppelt geschuetzt: Token plus Rolle.
- Servervalidierung verhindert, dass sich das Backend auf Frontend-Validierung verlassen muss.
- Datenbank-Constraints sichern zusaetzlich technische Integritaet.

Praezise Formulierung:

> Wir haben grundlegende Sicherheitsmechanismen fuer einen Prototyp umgesetzt: Passwort-Hashing, JWT-Authentifizierung, rollenbasierte Autorisierung, serverseitige Eingabevalidierung und Datenbank-Constraints. Fuer Produktion waeren weitere Massnahmen noetig.

### 3.7 Datenmodell: Tabellen und Beziehungen

Zentrale Tabellen:

| Tabelle | Zweck | Wichtige Felder |
| --- | --- | --- |
| `users` | Benutzerkonten | `firstname`, `lastname`, `email`, `password_hash`, `role`, Default-Adressen |
| `addresses` | Liefer-/Rechnungsadressen | `user_id`, `street`, `house_number`, `zip`, `city`, `country` |
| `categories` | Produktgruppen | `name`, `description` |
| `products` | Shop-Produkte | `name`, `description`, `price`, `stock`, `category_id`, `active` |
| `carts` | Warenkorb pro Benutzer | `user_id` mit `UNIQUE` |
| `cart_items` | Warenkorbpositionen | `cart_id`, `product_id`, `quantity` |
| `orders` | Bestellungen | `user_id`, `total_amount`, `payment_method`, `status`, Adress-Snapshots |
| `order_items` | Bestellpositionen | `order_id`, `product_id`, `quantity`, `price_at_purchase` |

Beziehungen:

- Ein User kann mehrere Adressen haben.
- Ein User hat genau einen Cart, technisch erzwungen durch `UNIQUE(user_id)`.
- Ein Cart enthaelt mehrere CartItems.
- Ein Product gehoert genau zu einer Category.
- Eine Category hat mehrere Products.
- Ein User kann mehrere Orders haben.
- Eine Order enthaelt mehrere OrderItems.
- Ein Product kann in vielen CartItems und OrderItems vorkommen.

Wichtige Constraints:

- `users.email` ist `UNIQUE`.
- `users.role` ist auf `CUSTOMER` oder `ADMIN` beschraenkt.
- `products.price > 0`.
- `products.stock >= 0`.
- `cart_items.quantity > 0`.
- `UNIQUE(cart_id, product_id)` verhindert doppelte Produktpositionen im selben Warenkorb.
- Foreign Keys sichern Beziehungen zwischen Tabellen.

Adress-Snapshots:

- In `orders` werden `shipping_address_snapshot` und `billing_address_snapshot` als JSONB gespeichert.
- Grund: Wenn ein Kunde spaeter seine Adresse aendert, bleibt die alte Bestellung trotzdem historisch korrekt.

Sehr gute Antwort auf "Warum PostgreSQL?":

> Die Daten haben klare Beziehungen: Benutzer, Produkte, Kategorien, Warenkoerbe und Bestellungen. Ein relationales System passt gut, weil wir mit Foreign Keys, Constraints und Transaktionen Konsistenz absichern koennen.

### 3.8 REST-API im Projekt

REST-Idee:

- Ressourcen werden ueber URLs angesprochen.
- HTTP-Methoden beschreiben die Aktion.
- JSON ist das Austauschformat.
- Statuscodes zeigen Erfolg oder Fehler.

Wichtige Endpunkte:

| Methode | Endpoint | Zweck | Schutz |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Benutzer registrieren | oeffentlich |
| POST | `/api/auth/login` | Login, JWT erhalten | oeffentlich |
| GET | `/api/products` | aktive Produkte abrufen | oeffentlich |
| GET | `/api/products/:id` | Produktdetail | oeffentlich |
| POST | `/api/products` | Produkt erstellen | Admin |
| PUT | `/api/products/:id` | Produkt aktualisieren | Admin |
| DELETE | `/api/products/:id` | Produkt loeschen | Admin |
| GET | `/api/categories` | Kategorien abrufen | oeffentlich |
| POST | `/api/categories` | Kategorie erstellen | Admin |
| GET | `/api/cart` | eigenen Warenkorb abrufen | Login |
| POST | `/api/cart/items` | Artikel hinzufuegen | Login |
| PUT | `/api/cart/items/:id` | Menge aendern | Login |
| DELETE | `/api/cart/items/:id` | Artikel entfernen | Login |
| POST | `/api/orders/checkout` | Bestellung erstellen | Login |
| GET | `/api/orders` | eigene Bestellungen | Login |
| GET | `/api/admin/orders` | alle Bestellungen | Admin |
| PATCH | `/api/admin/orders/:id/status` | Bestellstatus aendern | Admin |
| GET | `/api/admin/users` | Benutzerliste | Admin |
| PATCH | `/api/admin/users/:id/role` | Benutzerrolle aendern | Admin |
| GET | `/api/users/me` | eigenes Profil | Login |
| PATCH | `/api/users/me` | Profil aktualisieren | Login |
| GET | `/api/users/me/addresses` | eigene Adressen | Login |

Unterschied Statuscodes:

- 200: Anfrage erfolgreich, Daten zurueck.
- 201: Neue Ressource erstellt, z.B. Registrierung oder Bestellung.
- 204: Erfolgreich ohne Response-Body, z.B. Loeschen.
- 400: Validierungsfehler oder fachlich ungueltige Anfrage.
- 401: Nicht eingeloggt oder Token ungueltig.
- 403: Eingeloggt, aber Rolle reicht nicht.
- 404: Ressource nicht gefunden.
- 409: Konflikt, z.B. E-Mail bereits registriert.

## 4. Kernfunktionen: Was passiert im Code?

### 4.1 Registrierung

Flow:

1. User fuellt im Frontend Register-Formular aus.
2. Frontend prueft Basisdaten: E-Mail, Passwortlaenge, Passwortbestaetigung, Adresse, Terms.
3. `AuthContext.register()` ruft `api.register()`.
4. Backend-Route `POST /api/auth/register`.
5. `registerValidator` prueft Daten serverseitig.
6. `authService.register()` prueft, ob E-Mail bereits existiert.
7. Passwort wird mit `bcrypt.hash()` gehasht.
8. User wird in `users` erstellt.
9. Adresse wird in `addresses` erstellt.
10. Adresse wird als Standard-Liefer- und Rechnungsadresse gesetzt.
11. Frontend loggt danach automatisch ein.

Kurzantwort:

> Registrierung erstellt nicht nur den Benutzer, sondern auch direkt eine erste Adresse und setzt diese als Standardadresse. Das erleichtert spaeter den Checkout.

### 4.2 Login und JWT

Flow:

1. Frontend sendet E-Mail und Passwort an `/api/auth/login`.
2. Backend sucht User per E-Mail.
3. `bcrypt.compare()` vergleicht eingegebenes Passwort mit dem Hash.
4. Bei Erfolg wird ein JWT signiert.
5. Token enthaelt `sub` als User-ID, `role` und `email`.
6. Frontend speichert Token und User im `localStorage`.
7. Geschuetzte API-Calls senden den Token als Bearer-Header.

Kurzantwort:

> Das Passwort wird nie entschluesselt. Wir vergleichen nur den Hash mit `bcrypt.compare`. Bei erfolgreichem Login gibt es ein JWT, das spaeter bei geschuetzten Requests mitgeschickt wird.

### 4.3 Produktkatalog und Suche

Flow:

1. `ProductsPage` laedt Produkte und Kategorien parallel.
2. Produkte kommen ueber `GET /api/products`.
3. Backend gibt nur aktive Produkte zurueck.
4. Frontend filtert clientseitig nach Suchtext, Kategorie, Preisbereich und Lagerbestand.
5. Sortierung und Pagination passieren ebenfalls im Frontend.

Kurzantwort:

> Die Produktdaten kommen vom Backend, aber die interaktive Suche und Filterung passiert im Frontend, damit die UI schnell reagiert und fuer den Prototyp keine komplexen Query-Parameter noetig sind.

### 4.4 Warenkorb

Flow:

1. User klickt "In den Warenkorb".
2. `CartContext.addToCart()` ruft `POST /api/cart/items`.
3. Backend prueft JWT.
4. `cartService.addItem()` holt oder erstellt den Warenkorb fuer den User.
5. Produkt wird geladen und auf `active` und Lagerbestand geprueft.
6. Falls das Produkt bereits im Cart ist, wird die Menge addiert.
7. Falls nicht, wird eine neue Position erstellt.
8. Backend gibt den aktualisierten Cart inklusive Total zurueck.

Kurzantwort:

> Der Warenkorb ist userbezogen und persistent. Das Backend stellt sicher, dass die Menge nicht groesser als der Lagerbestand wird und dass jedes Produkt nur einmal als CartItem vorkommt.

### 4.5 Checkout

Flow:

1. User waehlt Zahlungsart und Adresse.
2. Frontend ruft `POST /api/orders/checkout`.
3. Backend prueft Token, Zahlungsart und optional Adress-IDs.
4. `orderService.checkout()` holt Standard- oder angegebene Liefer-/Rechnungsadresse.
5. Backend prueft, ob die Adresse wirklich dem User gehoert.
6. Datenbank-Transaktion beginnt mit `BEGIN`.
7. CartItems werden mit Produkten geladen und per `FOR UPDATE` gesperrt.
8. Backend prueft aktive Produkte und Lagerbestand.
9. Bestellung wird erstellt.
10. Fuer jede Position wird ein OrderItem erstellt.
11. Lagerbestand wird reduziert.
12. Warenkorb wird geleert.
13. Bei Erfolg `COMMIT`, bei Fehler `ROLLBACK`.

Sehr gute Antwort auf "Warum Transaktion?":

> Checkout besteht aus mehreren zusammenhaengenden Datenbankoperationen: Bestellung erstellen, Positionen speichern, Lager reduzieren und Warenkorb leeren. Eine Transaktion garantiert, dass entweder alles erfolgreich passiert oder nichts dauerhaft gespeichert wird.

### 4.6 Adminbereich

Frontend:

- `/admin` ist nur erreichbar, wenn `isAuthenticated` und `isAdmin` wahr sind.
- AdminPage laedt Produkte, Kategorien, Bestellungen und Benutzer parallel.
- Sections: Dashboard, Products, Categories, Orders, Users.

Backend:

- Alle `/api/admin`-Routen nutzen `router.use(auth, role(UserRole.ADMIN))`.
- Admin kann Produkte und Kategorien verwalten.
- Admin kann Bestellstatus aendern.
- Admin kann Benutzerrollen aendern.
- Eigene Adminrolle kann nicht entfernt werden, damit man sich nicht aussperrt.

Kurzantwort:

> Der Adminbereich ist im Frontend versteckt und im Backend geschuetzt. Entscheidend ist der Backend-Schutz, weil Frontend-Schutz allein leicht umgangen werden koennte.

## 5. Testing und Qualitaet

Tatsaechlicher Testansatz im Code:

- Backend: nativer Node-Test-Runner mit `node --test`.
- Frontend: ebenfalls `node --test` fuer Utility-Funktionen.
- Assertions ueber `node:assert/strict`.
- Kein Jest im aktuellen Code.
- Kein Supertest im aktuellen Code.
- Kein vollstaendiges End-to-End-Browser-Testing im aktuellen Code.

Backend-Tests decken ab:

- `GET /health`
- unbekannte Routen und Validierung
- Auth-Middleware
- Role-Middleware
- Request-Validation
- Error-Handler
- Services fuer Auth, Cart, Order, Product, User, Address

Frontend-Tests decken ab:

- Profilvalidierung
- Adressvalidierung
- Versandkostenlogik

Manuelle Tests:

- Registrierung und Login
- Produktuebersicht, Suche und Filter
- Warenkorb: Hinzufuegen, Mengen aendern, Entfernen
- Checkout
- Adminfunktionen

Gute Pruefungsantwort:

> Wir haben den Testfokus bewusst auf Services, Middleware und Utility-Logik gelegt, weil dort die fachlichen Regeln liegen. Zusaetzlich wurden die wichtigsten User-Flows manuell getestet. Ein naechster Schritt waeren E2E-Tests mit Browser-Automatisierung.

## 6. Demo-Plan

Vorbereitung vor der Praesentation:

1. App vor der Praesentation starten und eingeloggt bereithalten.
2. Keine `.env` oder Secrets zeigen.
3. Browser-Zoom pruefen, damit Tabellen und Buttons lesbar sind.
4. Demo-Daten bereithalten.
5. Einen Fallback haben: Falls Netzwerk/Backend nicht geht, Demo anhand Folien erklaeren und Codefluss beschreiben.

Lokale Seed-Logins aus `seed.js`:

- Admin: `admin@webshop.local` / `Admin1234!`
- Kunde: `test@webshop.local` / `Test1234!`

Diese Logins nur verwenden, wenn die lokale Seed-Datenbank benutzt wird. Keine produktiven Secrets zeigen.

### Demo in 3 Minuten

1. Startseite/Produktliste zeigen.
   - Frederik: "Hier sieht man den Shop aus Kundensicht."
   - Suche, Kategorie und Preisfilter kurz zeigen.

2. Produkt in Warenkorb legen.
   - Martin: "Im Hintergrund geht ein POST auf `/api/cart/items`. Das Backend prueft Login, Produktstatus und Lagerbestand."

3. Warenkorb zeigen.
   - Menge aendern oder Artikel entfernen.
   - Martin: "Der Warenkorb wird serverseitig gespeichert und danach neu zurueckgegeben."

4. Checkout zeigen.
   - Zahlungsart waehlen.
   - Bestellung ausloesen.
   - Martin: "Hier ist die Transaktion wichtig: Order, OrderItems, Lagerbestand und Cart-Clear gehoeren zusammen."

5. Adminbereich zeigen.
   - Login/Admin oder bereits eingeloggt.
   - Produkte/Kategorien/Bestellungen/Benutzer kurz zeigen.
   - Frederik: "UI-seitig sind Kundenbereich und Adminbereich getrennt."
   - Martin: "API-seitig sind Admin-Routen mit Auth plus Rolle geschuetzt."

Demo-Fallback-Satz:

> Falls die Live-Umgebung gerade nicht reagiert, beschreiben wir den Flow anhand der Architektur: Frontend-Interaktion, API-Request, Backend-Validierung, Service-Logik, SQL-Operation und JSON-Response.

## 7. Heikle Aussagen sauber formulieren

Diese Punkte nicht offensiv ausbreiten, aber bei Fragen korrekt beantworten.

| Thema | Sichere Formulierung |
| --- | --- |
| Frontend-Technologie | "Das Frontend ist mit React und Vite umgesetzt." |
| Validierung | "Serverseitig validieren wir mit `express-validator`." |
| Tests | "Im aktuellen Code verwenden wir den nativen Node-Test-Runner." |
| Zahlung | "Mehrere Zahlungsarten werden als Auswahl und Bestellfeld modelliert; echte Zahlungsabwicklung ist abgegrenzt." |
| JWT Expiry | "Der aktuelle Default ist 12h; produktiv wuerden wir kuerzere Lifetimes und Refresh/HttpOnly-Cookies genauer betrachten." |
| CORS | "Im Prototyp ist CORS einfach konfiguriert; produktiv wuerden erlaubte Origins eingeschraenkt." |
| Secrets | "Secrets gehoeren produktiv in Environment-Variablen und nicht ins Repository." |
| Bestellstatus | "Das Statusmodell ist ein bekanntes Verbesserungsfeld: Code und DB sollten vollstaendig synchronisiert werden." |
| CRUD | "Produkte und Kategorien haben vollstaendiges CRUD; Bestellungen und Benutzer sind fachlich eingeschraenkt, z.B. Status/Rolle statt komplettes Loeschen." |
| Sicherheit | "Grundschutz ist umgesetzt, aber kein vollstaendig produktionsgehaertetes Shopsystem." |

## 8. Wahrscheinliche Pruefungsfragen mit Musterantworten

### Architektur

1. Warum habt ihr eine 3-Schichten-Architektur gewaehlt?
   - Weil Frontend, Geschaeftslogik und Datenhaltung getrennt bleiben. Das erleichtert Teamarbeit, Wartung, Fehlersuche und spaetere Erweiterungen.

2. Was ist der groesste Vorteil der Trennung von Frontend und Backend?
   - Das Frontend muss die Datenbank nicht kennen. Es kann ueber eine stabile API arbeiten, waehrend Backend und Datenbank intern angepasst werden koennen.

3. Warum REST statt direkter Datenbankzugriff aus dem Frontend?
   - Direkter DB-Zugriff aus dem Browser waere unsicher und schlecht wartbar. Die REST-API kontrolliert Auth, Validierung, Rollen und Geschaeftslogik.

4. Was bedeutet "ressourcenorientiert" bei eurer API?
   - Zentrale Dinge wie Produkte, Kategorien, Warenkorb, Bestellungen und Benutzer werden als Ressourcen modelliert und mit HTTP-Methoden angesprochen.

5. Warum Node.js und Express?
   - Express ist schlank, gut geeignet fuer REST-APIs und erlaubt eine klare Struktur mit Routen, Middleware und Services. Ausserdem passte JavaScript gut zum React-Frontend.

6. Warum React?
   - React eignet sich fuer wiederverwendbare Komponenten, dynamische UIs und klar getrennte Seiten wie Produktliste, Warenkorb, Checkout und Adminbereich.

7. Warum Vite?
   - Vite startet schnell, hat Hot Module Replacement und ist fuer moderne React-Projekte angenehm in der Entwicklung.

### Datenbank

8. Warum PostgreSQL statt NoSQL?
   - Der Webshop hat stark relationale Daten: User, Produkte, Kategorien, Warenkorb und Bestellungen. Foreign Keys, Constraints und Transaktionen sind hier sehr nuetzlich.

9. Was ist der Zweck von Foreign Keys?
   - Sie sichern Beziehungen zwischen Tabellen, z.B. dass ein Produkt nur auf eine existierende Kategorie verweist.

10. Warum gibt es `cart_items` und `order_items`?
   - Ein Warenkorb oder eine Bestellung kann mehrere Produkte enthalten. Die Item-Tabellen bilden diese 1:n-Beziehungen ab.

11. Warum speichert ihr `price_at_purchase` in `order_items`?
   - Damit eine Bestellung historisch korrekt bleibt, auch wenn sich der Produktpreis spaeter aendert.

12. Warum speichert ihr Adress-Snapshots in der Bestellung?
   - Damit eine Bestellung die damalige Liefer- und Rechnungsadresse behaelt, auch wenn der User spaeter seine Adresse aendert.

13. Was verhindert `UNIQUE(cart_id, product_id)`?
   - Dass dasselbe Produkt mehrfach als separate Position im gleichen Warenkorb auftaucht. Stattdessen wird die Menge aktualisiert.

14. Warum braucht Checkout eine Transaktion?
   - Weil mehrere Schritte zusammengehoeren. Ohne Transaktion koennte z.B. eine Bestellung entstehen, obwohl Lagerbestand oder Warenkorb nicht korrekt aktualisiert wurden.

### Backend und API

15. Erklaere den Weg eines Requests im Backend.
   - Route nimmt URL/Methode, Middleware prueft Auth/Validierung, Controller verarbeitet HTTP, Service fuehrt Fachlogik aus, Repository spricht mit PostgreSQL.

16. Was macht ein Service?
   - Er enthaelt fachliche Regeln, z.B. Lagerbestand pruefen, E-Mail-Duplikate verhindern oder Checkout atomar ausfuehren.

17. Was macht ein Repository?
   - Es kapselt SQL-Queries, damit Services nicht direkt SQL ueberall im Code verteilen.

18. Warum trennt ihr Controller und Services?
   - Controller bleiben schlank und HTTP-nah. Services sind besser testbar und enthalten die eigentliche Logik.

19. Wie behandelt ihr Fehler?
   - Fachliche Fehler werden als `AppError` geworfen und vom globalen Error-Handler in strukturierte HTTP-Responses uebersetzt.

20. Was passiert bei einer unbekannten Route?
   - Die App gibt 404 mit einer Fehlermeldung zurueck.

21. Was passiert, wenn ein normaler Kunde eine Adminroute aufruft?
   - JWT kann gueltig sein, aber `roleMiddleware` erkennt fehlende Adminrolle und gibt 403 Forbidden.

### Security

22. Wie werden Passwoerter gespeichert?
   - Nie im Klartext. Beim Registrieren wird mit bcrypt gehasht. Beim Login wird das eingegebene Passwort mit dem Hash verglichen.

23. Was ist ein JWT?
   - Ein signierter Token, der Informationen wie User-ID und Rolle enthaelt. Das Backend kann ihn pruefen, ohne serverseitige Session speichern zu muessen.

24. Warum reicht Frontend-Rollenschutz nicht?
   - Frontend-Code kann manipuliert werden. Sicherheit muss im Backend durch Auth- und Rollenmiddleware durchgesetzt werden.

25. Was validiert ihr serverseitig?
   - Login- und Registrierungsdaten, Produktdaten, Kategorien, Warenkorbmenge, Zahlungsart, Adressen, IDs, Rollen und Bestellstatus.

26. Was waere fuer Produktion noch noetig?
   - Secrets aus dem Repo entfernen, CORS einschraenken, Token-Speicherung haerten, Rate-Limiting, Logging/Monitoring, echte Payment-Security, bessere Deployment-Haertung.

27. Warum sind Secrets im Repository problematisch?
   - Wer Zugriff auf das Repository hat, kann damit auf externe Dienste zugreifen. Produktiv sollten Secrets nur in geschuetzten Environment-Variablen liegen.

### Frontend und UX

28. Wie ist das Frontend strukturiert?
   - `pages` enthalten ganze Seiten, `components` wiederverwendbare UI-Bausteine, `context` globale Zustaende und `services/api.js` die Backend-Kommunikation.

29. Warum verwendet ihr Context?
   - Authentifizierung und Warenkorb werden an vielen Stellen gebraucht. Context verhindert, dass man diese Daten durch viele Komponenten durchreichen muss.

30. Warum findet die Produktsuche clientseitig statt?
   - Fuer den Prototyp ist das einfach, schnell und reaktiv. Bei sehr vielen Produkten wuerde man serverseitige Suche und Pagination ergaenzen.

31. Was passiert, wenn das Backend einen Fehler liefert?
   - `api.js` liest die JSON-Response, erzeugt eine lesbare Error-Message und die UI zeigt Feedback an.

32. Wie schuetzt ihr die Adminseite im Frontend?
   - `AdminPage` leitet nicht eingeloggte User zum Login und Nicht-Admins zur Startseite. Der eigentliche Schutz liegt aber im Backend.

33. Was war die UX-Idee beim Checkout?
   - Eingabe und Bestelluebersicht sollen nah beieinander sein, damit Benutzer ihre Daten und Kosten kontrollieren koennen.

### Testing, Projektmanagement und Reflexion

34. Was habt ihr getestet?
   - Backend-Services, Middleware, kleine App-Endpunkte, Frontend-Utilities und manuell die zentralen User-Flows.

35. Warum keine vollstaendigen E2E-Tests?
   - Wegen Zeit und Projektumfang. Fuer den Prototyp lag der Fokus auf fachlicher Logik und manuellen Hauptflows. E2E waere eine sinnvolle Erweiterung.

36. Was war die groesste technische Herausforderung?
   - Die saubere Integration zwischen Frontend und API: gleiche Datenformate, Auth-Header, Fehlerbehandlung und Checkout-Logik.

37. Was war methodisch wichtig?
   - IPERKA und SPOC: erst informieren/planen, dann entscheiden und umsetzen. Klare Verantwortlichkeiten halfen bei paralleler Arbeit.

38. Was wuerdet ihr rueckblickend anders machen?
   - Frueher Tests integrieren, API-Vertrag noch formaler dokumentieren, Secrets konsequent auslagern und Statusmodell frueher zwischen Code und DB abgleichen.

39. Welche Ziele wurden nicht vollstaendig erreicht?
   - Vollstaendiges CRUD fuer Benutzer und Bestellungen ist eingeschraenkt. Echte Zahlung und produktive Sicherheits-/Deployment-Haertung sind bewusst abgegrenzt.

40. Warum ist das Projekt trotzdem erfolgreich?
   - Die Kernanforderungen funktionieren: Produkte, Kategorien, Login, Rollen, Warenkorb, Checkout, Bestellungen, Adminbereich und saubere technische Schichtung.

### Tiefergehende Codefragen

41. Warum prueft das Backend beim Checkout, ob die Adresse dem User gehoert?
   - Sonst koennte ein Benutzer theoretisch eine fremde Adress-ID verwenden. Diese fachliche Regel kann die Datenbank nicht vollstaendig erzwingen, also prueft sie der Service.

42. Warum nutzt Checkout `FOR UPDATE`?
   - Damit die betroffenen Cart-/Produktdaten waehrend der Transaktion konsistent bleiben und Lagerbestand nicht parallel widerspruechlich veraendert wird.

43. Warum wird ein Cart mit `getOrCreateByUserId` geholt?
   - Damit jeder eingeloggte Benutzer automatisch einen Warenkorb bekommt, sobald er ihn braucht.

44. Warum wird beim Admin-Rollenwechsel verhindert, dass man sich selbst die Adminrolle nimmt?
   - Sonst koennte der letzte oder aktuelle Admin sich versehentlich aussperren.

45. Was passiert, wenn ein Produkt inaktiv ist?
   - Oeffentliche Produktlisten zeigen nur aktive Produkte. Cart/Checkout pruefen ebenfalls, ob Produkte aktiv sind.

46. Was ist der Unterschied zwischen 401 und 403?
   - 401 bedeutet nicht authentifiziert oder Token ungueltig. 403 bedeutet authentifiziert, aber nicht berechtigt.

47. Warum habt ihr `active` bei Produkten statt nur Delete?
   - Produkte koennen fuer Kunden ausgeblendet werden, ohne dass man fachliche Daten sofort loeschen muss. Im aktuellen Adminbereich gibt es aber auch Delete fuer Produkte.

48. Was passiert mit Lagerbestand beim Checkout?
   - Der Service berechnet die Bestellung, erstellt OrderItems und reduziert den Produktbestand innerhalb derselben Transaktion.

49. Warum gibt es `mapProduct`, `mapOrder`, `mapUser` im Frontend?
   - Sie uebersetzen Backend-/Datenbank-Feldnamen in frontendfreundliche Objekte und normalisieren Zahlen oder optionale Werte.

50. Was ist ein guter naechster technischer Schritt?
   - API-Vertrag dokumentieren, Statusmodell bereinigen, Secrets auslagern, CI/CD mit Tests vor Merge, E2E-Tests und echte Payment-Integration.

## 9. Kurze Sprechtexte pro Themenblock

### Ausgangslage und Ziele

> Wir wollten keinen fertigen Shop konfigurieren, sondern einen Webshop technisch nachvollziehbar selbst aufbauen. Deshalb lag der Fokus auf typischen Kernprozessen: Produkte anzeigen, Benutzer registrieren, Warenkorb, Checkout und Adminfunktionen. Gleichzeitig wollten wir zeigen, dass Frontend, Backend und Datenbank sauber getrennt sind.

### Organisation

> Wir haben mit dem SPOC-Prinzip gearbeitet. Martin war hauptsaechlich fuer Backend, REST-API und Datenbank verantwortlich. Frederik war hauptsaechlich fuer Frontend, UX und die Oberflaeche verantwortlich. Integration, Tests und Dokumentation haben wir gemeinsam abgestimmt.

### Architektur

> Die Architektur besteht aus drei Schichten. Das Frontend laeuft im Browser und stellt die UI dar. Das Backend stellt die REST-API bereit, validiert Eingaben, prueft Rollen und fuehrt die Geschaeftslogik aus. Die PostgreSQL-Datenbank speichert die Daten persistent. Diese Trennung war wichtig, damit beide Projektteile unabhaengiger entwickelt und getestet werden konnten.

### REST-API

> Unsere API ist ressourcenorientiert. Produkte, Kategorien, Warenkorb, Bestellungen und Benutzer sind eigene API-Bereiche. Das Frontend sendet JSON-Requests, das Backend antwortet mit JSON und HTTP-Statuscodes. Geschuetzte Endpunkte benoetigen ein JWT, Admin-Endpunkte zusaetzlich die Adminrolle.

### Datenmodell

> Das Datenmodell bildet die Shop-Prozesse ab: Benutzer haben Adressen und einen Warenkorb, Produkte gehoeren zu Kategorien, Warenkoerbe und Bestellungen haben Positionen. Wichtige Konsistenzregeln werden in PostgreSQL mit Foreign Keys, Unique-Constraints und Check-Constraints abgesichert.

### Security

> Sicherheit wurde fuer den Prototyp auf den wichtigsten Ebenen umgesetzt: Passwort-Hashing mit bcrypt, JWT fuer Authentifizierung, Rollenpruefung fuer Adminfunktionen, serverseitige Validierung und Datenbank-Constraints. Fuer einen echten produktiven Shop muessten weitere Massnahmen ergaenzt werden.

### Testing

> Wir haben vor allem die fachliche Logik getestet: Services, Middleware und Utility-Funktionen. Dazu kamen manuelle Tests der wichtigsten User-Flows wie Login, Warenkorb, Checkout und Adminbereich. Rueckblickend waere eine fruehere und breitere Testintegration eine sinnvolle Verbesserung.

### Fazit

> Insgesamt haben wir einen funktionsfaehigen Webshop-Prototyp gebaut, der die wichtigsten Anforderungen erfuellt und eine klare Architektur zeigt. Besonders gelernt haben wir, wie wichtig ein fruehes Datenmodell, klare API-Schnittstellen und regelmaessige Abstimmung im Team sind.

## 10. Mini-Spickzettel fuer Martin

Wenn du nervoes wirst, immer diesen Weg erklaeren:

> Frontend klickt -> `api.js` sendet HTTP/JSON -> Express-Route -> Middleware prueft Auth/Validierung -> Controller -> Service mit Fachlogik -> Repository mit SQL -> PostgreSQL -> JSON zurueck.

Drei starke Backend-Beispiele:

1. Login:
   - E-Mail suchen, bcrypt compare, JWT signieren, Token zurueck.

2. Warenkorb:
   - Cart holen/erstellen, Produkt pruefen, Menge gegen Lagerbestand pruefen, Cart aktualisieren.

3. Checkout:
   - Adresse pruefen, Transaktion starten, Items sperren, Bestellung und Positionen erstellen, Lager reduzieren, Cart leeren, Commit/Rollback.

Drei ehrliche Verbesserungsfelder:

1. Secrets gehoeren nicht in Repository-Dateien.
2. Statusmodell zwischen Backend-Enum und DB-Constraint sollte konsistent gemacht werden.
3. Produktiv braeuchte es mehr Security-Haertung und E2E-/CI-Testing.

## 11. Mini-Spickzettel fuer Frederik

Wenn du Frontend erklaerst:

> React ist in Seiten, wiederverwendbare Komponenten, Contexts und API-Service geteilt. Seiten steuern den Flow, Komponenten machen UI wiederverwendbar, Context speichert Auth und Cart, `api.js` kapselt Backend-Kommunikation.

Drei starke Frontend-Beispiele:

1. Produktliste:
   - Produkte/Kategorien laden, Suche/Filter/Sortierung im Frontend, Add-to-Cart ueber Context.

2. Auth:
   - Login/Register ueber AuthContext, Token/User speichern, Adminstatus ableiten.

3. AdminPage:
   - Geschuetzte Seite, Daten parallel laden, Sections fuer Dashboard/Produkte/Kategorien/Bestellungen/Benutzer.

Drei UX-Gedanken:

1. Produktfilter helfen beim schnellen Finden.
2. Warenkorb zeigt Kontrolle ueber Menge und Total.
3. Adminbereich ist tabellarischer und funktionaler, weil dort Verwaltung wichtiger ist als Produktpraesentation.

## 12. Abschlussformel fuer Fragen

Wenn ihr eine Frage nicht sofort wisst:

> Ich wuerde das anhand der Schichten einordnen: Im Frontend passiert ..., im Backend wuerde die Logik in den Service gehoeren, und die Datenbank wuerde es ueber ... absichern. Im aktuellen Prototyp ist ... umgesetzt; fuer Produktion wuerden wir ... ergaenzen.

Das klingt ruhig, ehrlich und fachlich.

## 13. Quellen, die fuer diese Mappe abgeglichen wurden

- Lokale ZIP: `C:\Users\Len_T14s_MH\Downloads\IDPA26_WebShop-main.zip`
- Praesentationsfolien: `C:\Users\Len_T14s_MH\Downloads\Webshop-mit-REST-API.pptx`
- Praesentations-PDF: `C:\Users\Len_T14s_MH\Downloads\Webshop-mit-REST-API.pdf`
- Dokumentation: `C:\Users\Len_T14s_MH\Downloads\Dokumentation_IDPA26_Webshop.pdf`
- GitHub-Repo: `https://github.com/Fretuks/IDPA26_WebShop`

