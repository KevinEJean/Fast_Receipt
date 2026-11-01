# 🏗️ Architecture de système de bout en bout - Nano Boost

## Description

<p align="justify">Une application mobile intelligente qui simplifie la gestion et la visualisation des dépenses. L'utilisateur prend simplement une photo de son reçu papier, et un modèle d'apprentissage automatique (ML) analyse et extrait instantanément les données clés (marchand, date, articles, taxes, total), accompagné d'un tableau de bord frontend qui génère en temps réel des graphiques interactifs, des suivis de budget et des rapports financiers détaillés.</p>

## Langue et services utilisés

- Python
- TypeScript
- JavaScript
- [PaddleOCR](https://github.com/PADDLEPADDLE/PADDLEOCR)
- [Pandas](https://pandas.pydata.org/)
- [Render](https://render.com/)

## Fonctionnalité primaire

- Frontend adapté aux différents écrans d'appareils mobiles
- Lecture (`scraping`) des données d'une facture
- Structurer les données
- Afficher les données structurées (Dashboard, Tableau)
- Automatiser ce pipeline de données (`ETL`)
- Sécuriser l'API (`injection NoSQL`, `rate limiting`, `CORS`, authentification, journalisation)
- Déployer l'application sur un serveur en continu (migrer vers HTTPS)

## Fonctionnalité optionnelle

- Fonctionnalité de l'application sur ordinateur
- Conversion de données semi-structurées (`JSON`, `CSV`) en données structurées (Dashboard, Tableau)
- Génération de fichier `.excel` avec les données structurées

## Ce que j'ai appris

- Pipeline ETL (*Extract-Transform-Load*)
- Automation de pipeline CI/CD (Jenkins, Git, PostgreSQL *Webhooks/Triggers*)
- Machine Learning (Python/OCR)
- Event Streaming (Kafka)
- Développement d'une application mobile

## Architecture

> Frontend: React + Vite

> Backend: Python Flask

> Base de donnees: Supabase, MongoDB

> Pipelines CI\CD: Docker, Jenkins, Git

> Test: Postman

## Schémas UML

> Use case

> Diagramme d'architecture (front-end, back-end, persistance)

> Normalisation de base de données (1FN, 2FN, 3FN)

> Stratégie de test

## Flux de données

> Diagramme du flux de données

> Relation des classes
