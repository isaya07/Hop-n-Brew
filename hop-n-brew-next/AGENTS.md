# Architecture du système Hop-n-Brew

## Vue d'ensemble

Le système Hop-n-Brew est une application de brassage de bière conçue avec une approche **offline-first** en utilisant MongoDB et Dexie.js pour la persistance locale. L'architecture est modulaire et orientée objet, permettant une gestion complète des recettes de bière, des ingrédients, et des profils de brassage.

## Principes de conception

### 1. Approche Offline-First
- L'application fonctionne complètement hors ligne
- Utilisation de Dexie.js (wrapper IndexedDB) pour la persistance locale
- Synchronisation intelligente avec MongoDB en arrière-plan
- Gestion des conflits de données

### 2. Architecture Modulaire
- Découpage par domaines métiers
- Classes autonomes pour chaque type d'ingrédient
- API modulaire pour l'accès aux données
- Stores Pinia pour la gestion d'état

### 3. Persistance Hybride
- Base de données MongoDB pour le stockage serveur
- IndexedDB (via Dexie.js) pour le stockage local
- Synchronisation automatique
- Gestion des erreurs de réseau

## Structure des Classes

### Recettes
- `Recipe`: Gestion complète des recettes de bière
- `RecipeUtils`: Calculs liés aux recettes (IBU, couleur, densité, etc.)

### Ingrédients
- `Fermentable`: Ingrédients fermentescibles (grains, sucres, extraits)
- `Hop`: Houblons avec méthodes de calcul d'amertume
- `Yeast`: Levures avec propriétés d'atténuation
- `Misc`: Ingrédients divers (épices, agents de collage, etc.)
- `Water`: Caractéristiques de l'eau avec calculs de dureté

### Profils de Brassage
- `MashProfile`: Profils d'empâtage avec étapes de température
- `MashStep`: Étapes spécifiques d'empâtage
- `Equipment`: Équipements de brassage
- `Style`: Styles de bière (BJCP)
- `Fermentation`: Profils de fermentation
- `Carbonation`: Méthodes de carbonatation

## Persistance et Synchronisation

### Modèle de Données
Toutes les classes implémentent les propriétés suivantes pour la persistance :
- `id`: Identifiant numérique (local)
- `_id`: Identifiant MongoDB (serveur)
- `createdAt`: Date de création
- `updatedAt`: Date de dernière modification

### Synchronisation
- `SyncManager`: Gestion de la synchronisation MongoDB/IndexedDB
- Détection des conflits
- Mécanismes de retry
- Indicateurs de statut de synchronisation

## API et Accès aux Données

### Structure Modulaire
L'API est organisée en modules spécifiques :
- `api/fermentables/`: Gestion des fermentescibles
- `api/hops/`: Gestion des houblons
- `api/yeasts/`: Gestion des levures
- `api/miscs/`: Gestion des ingrédients divers
- `api/waters/`: Gestion de l'eau
- `api/recipes/`: Gestion des recettes
- `api/profiles/`: Gestion des profils (empâtage, fermentation, etc.)

### Gestion d'État
- Stores Pinia pour chaque domaine
- Gestion centralisée des données
- Accès réactif aux données

## Calculs et Algorithmes

### Calculs de Brassage
- Calculs d'IBU (Tinseth, Rager, Garetz)
- Calculs de couleur (EBC, SRM)
- Calculs de densité initiale et finale
- Calculs d'alcool (ABV)
- Calculs de dureté de l'eau
- Calculs d'empâtage

### Convertisseur d'Unités
- `UnitConverter`: Gestion des conversions entre unités
- Support pour poids, volume, température, densité
- Interface extensible pour de nouvelles unités

## Approche TypeScript

### Typage Fort
- Interfaces strictes pour chaque type d'objet
- Validation des types à la compilation
- Support IDE amélioré
- Réduction des erreurs d'exécution

### Documentation
- JSDoc pour chaque méthode et classe
- Documentation générée automatiquement
- Exemples d'utilisation
- Spécifications détaillées

## Approche de Test

### Tests Unitaires
- Tests pour chaque classe métier
- Tests pour les algorithmes de brassage
- Tests pour les conversions d'unités
- Couverture de code ciblée

### Tests d'Intégration
- Tests pour les flux complets
- Tests de persistance
- Tests de synchronisation
- Tests de l'interface utilisateur

## Architecture Frontend

### Vue 3 + Vite
- Composition API
- Composants réactifs
- Gestion d'état avec Pinia
- Routage avec Vue Router

### Interface Utilisateur
- Design responsive avec Bulma 1.x
- Composants réutilisables
- Expérience utilisateur optimisée
- Navigation intuitive

## Sécurité et Permissions

### Gestion des Utilisateurs
- Système d'authentification
- Rôles et permissions
- Gestion des profils utilisateurs
- Sécurité des données

## Performance et Optimisation

### Chargement et Rendu
- Lazy loading des composants
- Pagination des listes
- Mise en cache des données
- Optimisation des requêtes

### Stockage
- Indexation efficace dans MongoDB
- Optimisation des transactions IndexedDB
- Compression des données
- Gestion de la mémoire

## Conclusion

Cette architecture modulaire et orientée objet permet une évolutivité et une maintenance faciles. L'approche offline-first garantit une expérience utilisateur fluide même sans connexion réseau, tandis que la synchronisation intelligente assure la cohérence des données à travers les appareils.