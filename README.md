## 🏡 Kasa - Frontend

Le frontend de **Kasa** est une application web développée avec **Next.js et React** dans le cadre du projet OpenClassrooms.  
L'objectif est de proposer une plateforme moderne permettant de **consulter, réserver et gérer des logements** tout en offrant une **expérience utilisateur rapide, accessible et responsive**.

L'application consomme une **API REST fournie** qui gère les données liées aux utilisateurs, aux propriétés et aux interactions (affichage des propriétés, gestion des favories, etc.).

---

## ⚙️ Technologies utilisées

- **Next.js (App Router)** – Framework React optimisé pour les performances et le SEO
- **React** – Création de composants UI réutilisables
- **TypeScript** – Typage statique pour améliorer la robustesse du code
- **SCSS / CSS Modules** – Organisation et modularité du style
- **Lucide React** – Bibliothèque d’icônes modernes
- **Next/Image** – Optimisation automatique des images
- **Context API** – Gestion de l’état global (authentification, favoris)

---

## 🧱 Architecture du frontend

Le projet suit une architecture modulaire basée sur les principes suivants :

### Pages principales

- **Accueil**
  - Affichage des logements disponibles
  - Cartes de propriétés avec image, titre et prix

- **Détail d’une propriété**
  - Galerie d’images avec **carousel accessible** sur mobile
  - Informations sur le logement
  - Présentation de l’hôte
  - Bouton pour contacter l’hôte

- **Authentification**
  - Connexion utilisateur
  - Gestion du token d’authentification
  - Redirection automatique si l’utilisateur est déjà connecté

- **Favoris**
  - Sauvegarde des propriétés favorites

- **Messagerie**
  - Interface de conversation entre utilisateurs (Statique pour le moment)

- **Ajout de propriété**
  - Formulaire permettant aux propriétaires de publier un logement

---

## 🧩 Composants principaux

L’interface est construite avec des **composants réutilisables** :

- `Navbar` – Navigation principale
- `PropertyGrid` – Liste des propriétés
- `PropertyCard` – Carte individuelle d’un logement
- `Loader` – Indicateur de chargement
- `LinkButton` – Bouton de navigation stylisé

Cette approche permet de **maintenir un code clair, modulaire et facilement maintenable**.

---

## 🔐 Gestion de l’authentification

L’authentification est gérée via :

- **JWT (JSON Web Token)**
- **Context API React** pour partager l’état utilisateur
- Stockage sécurisé du token côté client

Cela permet :

- d’identifier l’utilisateur connecté
- de protéger certaines fonctionnalités
- d’adapter l’interface selon le rôle utilisateur.

---

## 🚀 Performance et bonnes pratiques

Plusieurs optimisations sont mises en place :

- **Next/Image** pour le lazy loading et l’optimisation des images
- **Composants client/server** avec Next.js App Router
- **Code splitting automatique**
- Respect des bonnes pratiques **SEO**
- Respect des règles **WCAG 2.1 (accessibilité)**

---

## 📱 Responsive Design

L’interface est entièrement **responsive** et s’adapte à différents formats d’écran :

- Desktop
- Tablette
- Mobile

Les composants sont conçus pour garantir une **expérience fluide et accessible sur tous les appareils**.

---

## 🎯 Objectifs du projet

Ce projet met en pratique plusieurs compétences essentielles du développement frontend moderne :

- Architecture d’application React
- Consommation d’API REST
- Gestion d’état globale
- Accessibilité et SEO
- Optimisation des performances
- Développement d’interfaces modulaires et maintenables

---

## 👨‍💻 Auteur

Projet réalisé dans le cadre de la formation  
**Développeur concepteur d'application (RNCP niveau 6)** chez **OpenClassrooms**.

Développé par **Alain Bonneau**.
