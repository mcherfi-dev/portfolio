# Portfolio

Étudiant en Master 2 Génie de l'Informatique Logicielle à Rouen. 
Je cherche un stage de 6 mois en développement full stack.

**Site** : https://mohamedcherfi.vercel.app

**CV** : [assets/CV_Mohamed_CHERFI.pdf](assets/CV_Mohamed_CHERFI.pdf)

**LinkedIn** : [cherfi-20192b372](https://www.linkedin.com/in/cherfi-20192b372)

## Ce que contient ce portfolio

Quatre projets présentés en détail, avec captures d'écran :

- **Qwish** · Marketplace multivendeur conçue et développée seul, d’avril à novembre 2026.
  Projet personnel en cours de développement : microservices, interfaces client/vendeur/admin,
  cinq services métier Spring Boot et une Gateway, frontend Next.js/React, tests automatisés
  et chaîne de validation GitLab. La galerie comprend 19 captures vérifiées le 7 novembre 2026,
  dont les espaces vendeur et administrateur, l’assistant et les analyses CI/SonarQube.
- **OllMark** · Studio de création de contenus marketing intégré à la
  plateforme e-commerce Ollca.
- **AGORA** · Plateforme web de jeux de société en ligne en temps réel.
- **Plateforme de jeux multijoueurs** · Plateforme web de jeux de société en ligne en temps réel.

## Comment je l'ai construit

Site statique, sans framework ni étape de build. HTML sémantique, CSS natif
(custom properties, grid, flexbox), JavaScript en modules ES. Le graphe
animé de l'en-tête est dessiné en Canvas 2D.

J'ai fait le choix de séparer les responsabilités : chaque module JavaScript
gère un comportement et un seul, et cible des attributs `data-*` plutôt que
des classes CSS. Comme ça, je peux refondre le CSS sans casser le JS.
Toutes les animations respectent `prefers-reduced-motion`.
