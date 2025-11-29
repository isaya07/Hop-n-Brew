# Todo List - Migration de l'application Hop'n Brew

Cette todo list détaille toutes les fonctionnalités à implémenter pour compléter la migration de l'ancienne application vers la nouvelle architecture Vue 3 + TypeScript + MongoDB avec approche offline-first.

## 1. Pages et composants d'interface utilisateur

### 1.1 Page d'accueil
- [ ] Créer une page d'accueil enrichie avec des indicateurs clés
- [ ] Ajouter des raccourcis vers les fonctionnalités principales
- [ ] Implémenter le message personnalisé ("Salut [nom utilisateur]")

### 1.2 Composants manquants
- [ ] Implémenter le composant MashList pour la gestion des profils de brassage
- [ ] Créer le composant User pour la gestion du profil utilisateur
- [ ] Créer le composant Test pour les fonctionnalités de test

## 2. Fonctionnalités de recettes

### 2.1 Import de recettes
- [ ] Implémenter l'import de recettes BeerXML
- [ ] Créer les parsers BeerXML pour les recettes
- [ ] Gérer les erreurs d'import et valider les données

### 2.2 Gestion des ingrédients dans les recettes
- [ ] Implémenter l'ajout d'ingrédients aux recettes
- [ ] Implémenter la suppression d'ingrédients des recettes
- [ ] Implémenter la modification des ingrédients dans les recettes
- [ ] Gérer les quantités et les unités pour chaque ingrédient

### 2.3 Calculs de brassage
- [ ] Intégrer les calculs d'IBU dans la nouvelle architecture
- [ ] Intégrer les calculs de couleur dans la nouvelle architecture
- [ ] Intégrer les calculs de densité dans la nouvelle architecture
- [ ] Intégrer les calculs d'alcool dans la nouvelle architecture
- [ ] Afficher les indicateurs dans les vues de recette

## 3. Fonctionnalités de brassage

### 3.1 Étapes de brassage (MashSteps)
- [ ] Créer la classe MashStep avec les propriétés nécessaires
- [ ] Implémenter l'ajout d'étapes de brassage
- [ ] Implémenter la modification des étapes de brassage
- [ ] Implémenter la suppression des étapes de brassage
- [ ] Gérer l'ordre des étapes de brassage

### 3.2 Profils de brassage
- [ ] Créer la classe MashProfile avec les propriétés nécessaires
- [ ] Gérer les profils de brassage complets avec les étapes de température
- [ ] Créer les composants UI pour la gestion des profils de brassage
- [ ] Intégrer les profils de brassage dans les recettes

### 3.3 Courbes de température
- [ ] Intégrer AreaChart dans le flux de recette
- [ ] Afficher les courbes de température du brassage
- [ ] Calculer les températures prévues pour chaque étape

## 4. Gestion des ingrédients

### 4.1 Suivi des stocks
- [ ] Implémenter le suivi des quantités en stock pour chaque ingrédient
- [ ] Créer les champs de stock dans les modèles
- [ ] Mettre à jour l'UI pour afficher les quantités en stock
- [ ] Gérer la mise à jour des stocks lors de l'utilisation dans les recettes

### 4.2 Import BeerXML
- [ ] Créer les parsers BeerXML pour les fermentables
- [ ] Créer les parsers BeerXML pour les houblons
- [ ] Créer les parsers BeerXML pour les levures
- [ ] Créer les parsers BeerXML pour les miscs
- [ ] Créer les parsers BeerXML pour les eaux

## 5. Systèmes d'interface utilisateur

### 5.1 Système de notification
- [ ] Créer le composant de notification (v-notif)
- [ ] Implémenter le système de notifications dans l'application
- [ ] Gérer les différents types de notifications (succès, erreur, info)

### 5.2 Système de progression
- [ ] Créer le composant de barre de progression (progress-bar)
- [ ] Intégrer la barre de progression dans les opérations longues
- [ ] Gérer les états de progression (démarrer, arrêter, pause)

### 5.3 Filtres et recherche avancée
- [ ] Implémenter le filtre "In Stock" pour les listes d'ingrédients
- [ ] Améliorer les fonctionnalités de tri et recherche
- [ ] Gérer la persistance des filtres entre les sessions

## 6. Composants UI manquants

### 6.1 Composants de base
- [ ] Créer le composant UnitieInput pour la gestion des unités
- [ ] Créer le composant SearchInput pour la recherche
- [ ] Créer le composant Select avec options dynamiques
- [ ] Créer le composant DatePicker pour la sélection de dates

### 6.2 Composants avancés
- [ ] Créer le composant ProfilSelect pour la sélection de profils
- [ ] Créer le composant Tabs pour les onglets
- [ ] Créer le composant AreaChart pour les graphiques
- [ ] Créer le composant BarGraph pour les indicateurs de brassage

## 7. Fonctionnalités de fermentation et carbonation

### 7.1 Gestion des profils de fermentation
- [ ] Créer les champs pour la gestion des températures
- [ ] Créer les champs pour la gestion des durées
- [ ] Créer les champs pour la gestion des étapes
- [ ] Intégrer les profils de fermentation dans les recettes

### 7.2 Gestion de la carbonation
- [ ] Créer les champs pour la gestion des méthodes de carbonation
- [ ] Créer les champs pour la gestion des températures de carbonation
- [ ] Intégrer la carbonation dans les recettes

## 8. Fonctionnalités de mash (brassage)

### 8.1 Gestion des étapes de brassage
- [ ] Créer les champs pour la gestion des températures
- [ ] Créer les champs pour la gestion des durées
- [ ] Créer les champs pour la gestion des méthodes
- [ ] Intégrer les étapes de brassage dans les recettes

### 8.2 Calculs de brassage
- [ ] Créer les calculs de volume d'empâtage
- [ ] Créer les calculs de températures de brassage
- [ ] Créer les calculs de volume d'eau de rinçage
- [ ] Créer les calculs de température d'eau de rinçage

## 9. Système de persistance offline

### 9.1 Synchronisation avec MongoDB
- [ ] Implémenter le système de synchronisation offline-first avec MongoDB
- [ ] Gérer les conflits de synchronisation
- [ ] Créer les mécanismes de retry pour les échecs de synchronisation
- [ ] Implémenter la gestion des erreurs de connexion

### 9.2 Gestion des données locales
- [ ] Créer les mécanismes de persistance locale avec Dexie.js
- [ ] Gérer la synchronisation automatique en arrière-plan
- [ ] Créer les indicateurs de statut de synchronisation

## 10. Authentification et gestion des utilisateurs

### 10.1 Mise à jour du profil utilisateur
- [ ] Créer les champs pour la modification du nom
- [ ] Créer les champs pour la modification de l'email
- [ ] Créer les champs pour la modification de la photo de profil
- [ ] Gérer la validation des modifications

### 10.2 Gestion des rôles et permissions
- [ ] Créer le système de rôles dans la base de données
- [ ] Implémenter les vérifications de permissions
- [ ] Gérer l'accès aux différentes fonctionnalités selon les rôles

## 11. Tests et documentation

### 11.1 Tests unitaires
- [ ] Écrire des tests unitaires pour chaque nouvelle fonctionnalité
- [ ] Mettre à jour les tests existants pour les modifications apportées
- [ ] Créer des tests d'intégration pour les flux complets

### 11.2 Documentation
- [ ] Documenter chaque nouvelle fonctionnalité dans la documentation existante
- [ ] Mettre à jour les exemples d'utilisation
- [ ] Créer des guides d'utilisation pour les nouvelles fonctionnalités

## 12. Optimisations et améliorations

### 12.1 Performance
- [ ] Optimiser les requêtes de données
- [ ] Mettre en place le lazy loading pour les composants lourds
- [ ] Optimiser le chargement des listes d'ingrédients/recettes

### 12.2 Expérience utilisateur
- [ ] Améliorer les transitions entre les pages
- [ ] Ajouter des animations pour les interactions
- [ ] Optimiser l'interface pour les appareils mobiles