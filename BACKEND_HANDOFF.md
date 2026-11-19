# First Delivery — handoff frontend / backend

Ce document décrit le frontend existant et la surface d'API proposée pour que l'équipe backend puisse construire les services puis raccorder les écrans. Le contrat reste ajustable si le backend a déjà des conventions différentes.

## Démarrage frontend

- Servir le dossier avec Live Server ou un serveur statique (`npx serve .`).
- Ouvrir `index.html`; l'application est en HTML/CSS/JavaScript natifs, sans étape de build.
- `api-client.js` est chargé avant `app.js` et expose `window.FirstDeliveryAPI`.
- Pour viser un backend local, modifier `api-config.js` et définir `window.FD_API_BASE_URL = "http://localhost:3000/api"`. La valeur par défaut est `/api`.
- En l'absence de backend, l'application continue à fonctionner avec ses données de démonstration dans `localStorage`.

## État actuel et frontière de travail

Le frontend couvre les espaces client, partenaire, coursier et responsable. Les actions de la démonstration — commandes, candidatures, incidents, réclamations, tarifs et horaires — modifient encore l'état local de `app.js`; elles ne font pas d'appels réseau. `FirstDeliveryAPI` fournit le client HTTP et les méthodes de ressources pour le raccordement, sans déclencher de requêtes au chargement.

Les données, les comptes, les coordonnées, la carte, le paiement, les messages OTP, les avis et les décisions affichés par la démonstration ne doivent pas être traités comme des données de production. Le code OTP `123456` et le code de remise affiché dans le parcours sont uniquement des fixtures.

## Surface d'API proposée

Toutes les routes ci-dessous sont relatives à `FD_API_BASE_URL`. Les identifiants dans les URL doivent être encodés. Les listes devraient accepter `page`, `pageSize`, `sort` et les filtres indiqués.

| Parcours | Méthode exposée dans `FirstDeliveryAPI` | Route proposée |
| --- | --- | --- |
| OTP | `auth.requestOtp`, `auth.verifyOtp`, `auth.me`, `auth.logout` | `POST /auth/otp/request`, `POST /auth/otp/verify`, `GET /auth/me`, `POST /auth/logout` |
| Découverte | `restaurants.list`, `restaurants.get`, `restaurants.products` | `GET /restaurants`, `GET /restaurants/:id`, `GET /restaurants/:id/products` |
| Commandes | `orders.list`, `orders.get`, `orders.create`, `orders.cancel`, `orders.confirmDelivery` | `GET/POST /orders`, `GET /orders/:id`, `POST /orders/:id/cancel`, `POST /orders/:id/confirm-delivery` |
| Support client | `customer.complaints`, `customer.createComplaint`, `customer.createReview` | `GET /me/complaints`, `POST /orders/:id/complaints`, `POST /orders/:id/reviews` |
| Dossier partenaire | `partner.apply`, `partner.profile`, `partner.updateProfile` | `POST /partner/applications`, `GET/PATCH /partner/profile` |
| Opérations partenaire | `partner.orders`, `partner.updateOrder`, `partner.openingHours`, `partner.updateOpeningHours`, `partner.setAvailability` | `GET /partner/orders`, `PATCH /partner/orders/:id`, `GET/PUT /partner/opening-hours`, `PATCH /partner/availability` |
| Missions coursier | `courier.apply`, `courier.missions`, `courier.acceptMission`, `courier.updateMissionStep` | `POST /courier/applications`, `GET /courier/missions`, `POST /courier/missions/:id/accept`, `POST /courier/missions/:id/steps` |
| Incidents coursier | `courier.reportIncident`, `courier.uploadIncidentEvidence` | `POST /courier/incidents`, `POST /courier/incidents/:id/evidence` (multipart) |
| Cash coursier | `courier.cashSummary`, `courier.submitDeposit` | `GET /courier/cash/summary`, `POST /courier/cash/deposits` |
| Supervision | `manager.dashboard`, `manager.dispatch` | `GET /admin/dashboard`, `GET /admin/dispatch` |
| Validation et litiges | `manager.applications`, `manager.reviewApplication`, `manager.complaints`, `manager.resolveComplaint`, `manager.incidents`, `manager.resolveIncident` | `GET /admin/applications`, `POST /admin/applications/:id/review`, `GET /admin/complaints`, `POST /admin/complaints/:id/resolution`, `GET /admin/incidents`, `POST /admin/incidents/:id/resolution` |
| Zones et finance | `manager.zones`, `manager.updateZone`, `manager.financeSummary`, `manager.recordDeposit` | `GET/PATCH /admin/zones`, `GET /admin/finance/summary`, `POST /admin/finance/deposits` |

Les méthodes de `api-client.js` acceptent le payload métier en argument. Garder le calcul des montants, les permissions, l'affectation et les transitions de statut côté backend; le frontend ne doit envoyer que les entrées utilisateur et les identifiants nécessaires.

## Forme de réponse

Le client accepte une réponse JSON directe ou enveloppée dans `data` :

```json
{ "data": { "id": "FD-2841", "status": "accepted" } }
```

Pour une erreur, retourner un statut HTTP adapté et un objet lisible :

```json
{ "code": "VALIDATION_ERROR", "message": "Adresse invalide", "details": { "address": "required" } }
```

Les erreurs HTTP et réseau deviennent `FirstDeliveryAPI.ApiError` (`status`, `code`, `details`). Une réponse `204` devient `null`. Les listes devraient retourner `{ "items": [], "total": 0, "page": 1, "pageSize": 20 }`.

## Champs métier à stabiliser

- **Restaurant** : `id`, `name`, `category`, `address`, `area`, `latitude`, `longitude`, `rating`, `preparationMinutes`, `isOpen`.
- **Commande** : `id`, `customerId`, `partnerId`, `courierId`, `items[]`, `deliveryAddress`, `subtotal`, `deliveryFee`, `total`, `paymentMethod`, `status`, `createdAt`, `updatedAt`.
- **Réclamation** : `id`, `orderId`, `customerId`, `type` (`restaurant`, `delivery`, `courier`), `reason`, `comment`, `status`, `createdAt`, `resolution`, `staffNote`.
- **Incident coursier** : `id`, `orderId`, `courierId`, `type`, `reason`, `comment`, `contactAttempted`, `evidence[]`, `status`, `createdAt`, `resolution`.
- **Candidature partenaire** : identité du commerce, catégorie, adresse et coordonnées GPS, contacts, reversement, délai de préparation, pièces justificatives et statut de revue.
- **Mission** : `id`, `orderIds[]`, `stops[]` ordonnés, coordonnées, distance et durée estimées, statut et étapes horodatées.

Utiliser des identifiants stables, des dates ISO 8601 UTC et des montants en unités explicites (recommandation : millimes entiers en base, montants décimaux dans l'API avec devise `TND`). Ne pas déduire l'autorisation du rôle sélectionné dans l'interface : le serveur doit vérifier le compte et chaque accès.

## Raccordement écran par écran

1. Remplacer les fixtures de `app.js` par des chargements asynchrones des ressources; ajouter états de chargement, erreur et nouvelle tentative.
2. Remplacer les mutations `state` dans le gestionnaire de soumission par `FirstDeliveryAPI` puis actualiser l'écran avec la réponse serveur.
3. Ajouter une couche de traduction entre les statuts API et les libellés UI; ne pas envoyer les libellés français comme valeurs de statut.
4. Remplacer l'authentification de démonstration par la session backend et protéger les pages selon le compte confirmé par `/auth/me`.
5. Utiliser l'upload multipart pour les justificatifs et preuves; transmettre les URL retournées au backend dans les demandes.
6. Alimenter les cartes avec les coordonnées et itinéraires fournis par un service autorisé; la position GPS ne doit être demandée qu'après action explicite du coursier.
7. Vérifier les contrats avec des données de test du backend, notamment les règles COD, les refus, les annulations, les litiges et les incidents.

## Configuration et sécurité

- En développement multi-origine, configurer CORS sur l'origine Live Server et autoriser les credentials si l'authentification utilise un cookie `HttpOnly`.
- Si l'API utilise Bearer, fournir un `getToken` à `FirstDeliveryAPI.configure`; éviter de conserver les tokens sensibles dans `localStorage`.
- Ne pas exposer de secret backend dans les fichiers statiques.
- Valider les pièces jointes, types MIME, taille et autorisation côté serveur. Les liens et noms de fichiers de la démo ne constituent pas une preuve stockée.
- Les tuiles OpenStreetMap et le calcul d'itinéraire de démonstration sont des services externes distincts du backend applicatif.
