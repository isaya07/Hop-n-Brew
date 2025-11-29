**Hop-n-Brew Next v1.0.0**

***

# Hop-n-Brew Next

## Objectif du projet

Hop-n-Brew Next est une refonte complète de l'application de brassage de bière Hop-n-Brew, migrée vers une stack moderne avec Vue 3, TypeScript, Vite, et une architecture offline-first.

### Objectifs principaux :
- Moderniser la stack technologique (Vue 3 + Vite + TypeScript)
- Améliorer les performances et l'expérience utilisateur
- Mettre en place une architecture offline-first avec Dexie.js et MongoDB Atlas
- Remplacer Firebase par MongoDB pour la synchronisation cloud
- Améliorer la maintenabilité avec une architecture modulaire
- Ajouter une couverture de tests complète
- Documenter le code avec TypeDoc

## Feuille de route détaillée

### Phase 1 : Setup initial
- [x] Initialiser le projet avec Vue 3 + Vite + TypeScript
- [x] Configurer le routing avec Vue Router 4
- [x] Configurer la gestion d'état avec Pinia
- [x] Intégrer Bulma 1.x avec Sass et variables personnalisées
- [x] Configurer l'internationalisation (i18n) si nécessaire
- [x] Configurer le linter et le formateur de code (ESLint + Prettier)
- [x] Mettre en place l'authentification avec MongoDB Atlas
- [x] Configurer le PWA avec Vite PWA
- [x] Créer les modèles de base de données (Dexie.js)
- [x] Mettre en place le système d'authentification (Pinia store)
- [x] Créer le SyncManager pour la synchronisation bidirectionnelle

### Phase 2 : Architecture de persistance
- [x] Intégrer Dexie.js pour la base de données locale IndexedDB
- [x] Créer les schémas de base de données Dexie complets (Users, Recipes, Ingredients, Profiles)
- [x] Intégrer MongoDB Atlas pour la synchronisation cloud
- [x] Développer le gestionnaire de synchronisation bidirectionnelle
- [x] Implémenter l'authentification avec MongoDB Atlas
- [x] Créer l'ApiManager pour une interface unifiée

### Phase 3 : Migration des composants
- [x] Recréer les composants UI avec Vue 3 Composition API
- [x] Transformer les composants existants en TypeScript
- [x] Adapter les composants à Bulma 1.x
- [x] Implémenter les composants de base (Button, Input, Select, Checkbox, Textarea, Card)
- [x] Recréer les composants spécifiques à la brasserie (RecipeForm)

### Phase 4 : Fonctionnalités principales
- [x] Recréer les vues principales (accueil, recettes, ingrédients)
- [x] Implémenter la gestion des recettes
- [x] Développer les fonctionnalités de calcul de brassage
- [x] Créer les formulaires d'ajout/édition d'ingrédients
- [x] Implémenter les graphiques et visualisations
- [x] Créer les vues de profils (styles, équipements, fermentation, carbonation, empâtage)
- [x] Intégrer les calculs de brassage existants (OG, FG, ABV, IBU, couleur, calories)
- [x] Créer l'interface utilisateur pour les calculs interactifs

### Phase 5 : Tests et qualité
- [ ] Configurer Vitest pour les tests unitaires
- [ ] Écrire des tests pour les composants critiques
- [ ] Tester la logique métier (recettes, calculs)
- [ ] Tester la persistance locale et la synchronisation
- [ ] Mettre en place des tests d'intégration
- [ ] Ajouter des tests pour les calculs de brassage
- [ ] Couverture de test pour les conversions d'unités

### Phase 6 : Documentation
- [ ] Configurer TypeDoc pour la documentation API
- [ ] Documenter les composants et classes TypeScript
- [ ] Créer un guide d'utilisation
- [ ] Documenter l'architecture offline-first
- [ ] Rédiger la documentation de l'API
- [ ] Documentation complète des calculs de brassage
- [ ] Guide de migration depuis l'ancienne version

### Phase 7 : Améliorations et optimisations
- [ ] Optimiser les performances
- [ ] Améliorer l'accessibilité
- [ ] Ajouter des animations et transitions
- [ ] Optimiser pour le mobile
- [ ] Mettre en place le PWA

### Phase 8 : Déploiement
- [ ] Configurer les builds pour différents environnements
- [ ] Mettre en place l'intégration continue
- [ ] Préparer la documentation de déploiement
- [ ] Tester la migration des données existantes
- [ ] Planifier la mise en production

## Technologies utilisées

- **Framework** : Vue 3 avec Composition API
- **Build tool** : Vite
- **Langage** : TypeScript
- **UI** : Bulma 1.x avec Sass
- **State management** : Pinia
- **Routing** : Vue Router 4
- **Persistance locale** : Dexie.js (IndexedDB)
- **Synchronisation cloud** : MongoDB Atlas
- **Authentification** : MongoDB Atlas
- **Tests** : Vitest
- **Documentation** : TypeDoc
- **PWA** : Vite PWA
- **Graphiques** : Chart.js
- **Calculs de brassage** : Formules éprouvées (Tinseth, Rager, Morey, etc.)

## Structure du projet

```
src/
├── components/     # Composants Vue réutilisables
├── views/          # Pages de l'application
├── composables/    # Fonctions réutilisables Vue 3
├── stores/         # Stores Pinia
├── lib/            # Services et utilitaires
├── types/          # Définitions TypeScript
├── router/         # Configuration Vue Router
├── assets/         # Ressources statiques
└── App.vue         # Composant racine
```

## Architecture détaillée

### Calculs de brassage (`src/lib/brew-calculator.ts`)
- **OG (Densité Initiale)** : `calculateOriginalGravity()`
- **FG (Densité Finale)** : `calculateFinalGravity()`
- **ABV (Alcool par Volume)** : `calculateABV()` (formule originale)
- **IBU (Amertume)** : `calculateIBU()` (Tinseth + Rager)
- **Couleur (SRM)** : `calculateColor()` (Morey)
- **Calories** : `calculateCalories()` (formule originale)
- **Efficacité** : `calculateEfficiency()`

### Utilitaires (`src/lib/utils.ts`)
- **Conversions d'unités** : kg↔lb, L↔gal, °C↔°F, etc.
- **Conversions de densité** : SG↔Plato
- **Conversions de couleur** : SRM↔EBC
- **Fonctions utilitaires** : Arrondi, formatage

### Persistance offline-first
```
Frontend (Vue 3 + TS + Vite + PWA)
├── Auth (MongoDB Atlas)
├── State (Pinia)
├── Local DB (Dexie.js)
├── Sync (SyncManager)
└── Cloud DB (MongoDB Atlas)
```

## Prérequis

- Node.js 16+ 
- npm ou yarn

## Installation

```bash
npm install
```

## Développement

```bash
# Copier le fichier .env.example et le renommer en .env
cp .env.example .env

# Éditer .env et ajouter votre chaîne de connexion MongoDB Atlas
VITE_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Lancer le serveur de développement
npm run dev
```

## Build

```bash
npm run build
```

## Tests

```bash
# Lancer tous les tests
npm run test

# Lancer les tests en mode watch
npm run test:watch

# Générer le rapport de couverture
npm run test:coverage
```

## Documentation

```bash
# Générer la documentation TypeDoc
npm run docs

# Générer la documentation et l'ouvrir dans le navigateur
npm run docs:serve
```

## Fonctionnalités implémentées

### Calculs de brassage
- ✅ **OG (Densité Initiale)** : Calcul basé sur les fermentables et l'efficacité
- ✅ **FG (Densité Finale)** : Calcul basé sur l'atténuation
- ✅ **ABV (Alcool par Volume)** : Formule originale avec correction de température
- ✅ **IBU (Amertume)** : Méthodes Tinseth et Rager
- ✅ **Couleur (SRM)** : Formule de Morey avec conversions EBC/Lovibond
- ✅ **Calories** : Calcul basé sur OG/FG et densité
- ✅ **Efficacité** : Calcul de l'efficacité du brassage

### Conversions d'unités
- ✅ **Poids** : kg, g, oz, lb
- ✅ **Volume** : L, mL, gal, qt, pt, cup, fl-oz
- ✅ **Température** : °C, °F
- ✅ **Couleur** : SRM, EBC, Lovibond
- ✅ **Densité** : SG, Plato
- ✅ **Pression** : bar, psi, kPa
- ✅ **Ratios** : qt/lb, L/kg

### Interface utilisateur
- ✅ **Dashboard** : Vue d'accueil avec statistiques
- ✅ **Recettes** : CRUD complet avec calculs en temps réel
- ✅ **Ingrédients** : Gestion des fermentables, houblons, levures, divers, eaux
- ✅ **Profils** : Styles, fermentation, carbonation, équipements, empâtage
- ✅ **Calculateur interactif** : Interface pour les calculs de brassage
- ✅ **Graphiques** : Visualisations des données de brassage
- ✅ **Responsive** : Design adapté à tous les appareils

### Persistance et synchronisation
- ✅ **Offline-first** : Fonctionne entièrement hors ligne
- ✅ **Synchronisation automatique** : Sync bidirectionnelle avec MongoDB Atlas
- ✅ **Authentification** : Gestion des utilisateurs avec MongoDB
- ✅ **PWA** : Application web progressive installable

## Tests unitaires

### Couverture des tests
- [ ] **BrewCalculator** : Toutes les méthodes de calcul
- [ ] **Utils** : Toutes les fonctions utilitaires
- [ ] **Composants Vue** : Composants de base et UI
- [ ] **Stores Pinia** : Gestion d'état
- [ ] **ApiManager** : Interface unifiée pour les opérations
- [ ] **SyncManager** : Synchronisation bidirectionnelle

### Exécution des tests
```bash
# Lancer tous les tests
npm run test

# Lancer les tests avec rapport de couverture
npm run test:coverage

# Lancer les tests en mode watch
npm run test:watch
```

## Documentation

La documentation est générée automatiquement avec TypeDoc :

```bash
# Générer la documentation
npm run docs

# Générer et servir la documentation
npm run docs:serve
```

### Contenu de la documentation
- [ ] **API complète** : Toutes les classes et méthodes
- [ ] **Composants Vue** : Documentation des props, events, slots
- [ ] **Stores Pinia** : États, getters, actions
- [ ] **Calculs de brassage** : Explication détaillée des formules
- [ ] **Architecture** : Diagrammes et explications
- [ ] **Migration** : Guide de migration depuis l'ancienne version

## Migration depuis l'ancien projet

### Éléments conservés
- ✅ **Formules de calcul** : Toutes les formules originales ont été conservées
- ✅ **Unités de mesure** : Support complet des unités métriques et impériales
- ✅ **Structure de données** : Schémas de base de données compatibles
- ✅ **Fonctionnalités principales** : Tous les calculs de brassage essentiels

### Améliorations apportées
- ✅ **Architecture moderne** : Vue 3 + TypeScript + Vite
- ✅ **Performance** : Chargement plus rapide, moins de dépendances
- ✅ **Maintenabilité** : Code mieux structuré et documenté
- [ ] **Tests** : Couverture complète des tests unitaires
- ✅ **Sécurité** : Typage strict avec TypeScript
- ✅ **Accessibilité** : Interface conforme aux standards WCAG
- ✅ **Responsive** : Design adaptable à tous les écrans

## Déploiement

### Environnements supportés
- ✅ **Développement local** : `npm run dev`
- ✅ **Production** : `npm run build`
- [ ] **Staging** : Configuration personnalisable
- [ ] **CI/CD** : Intégration continue prête

### Variables d'environnement
```bash
VITE_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
VITE_APP_TITLE=Hop-n-Brew Next
```

## Contribution

### Processus de développement
1. Fork du dépôt
2. Création d'une branche feature
3. Développement et tests
4. Pull Request avec description détaillée
5. Revue de code
6. Merge dans la branche principale

### Standards de codage
- ✅ **TypeScript strict** : Typage explicite partout
- ✅ **ESLint/Prettier** : Formatage automatique
- [ ] **Tests unitaires** : Couverture > 80%
- [ ] **Documentation** : JSDoc pour toutes les fonctions publiques
- [ ] **Git hooks** : Pre-commit hooks pour qualité
