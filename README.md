# Portfolio · Mohamed Cherfi

Je m'appelle Mohamed Cherfi, étudiant en Master 2 Génie de l'Informatique
Logicielle à Rouen. Je cherche un stage de 6 mois en développement full stack.

**Site** : https://mohamedcherfi.vercel.app

**CV** : [assets/cv-mohamed-cherfi.pdf](assets/cv-mohamed-cherfi.pdf)

**LinkedIn** : [cherfi-20192b372](https://www.linkedin.com/in/cherfi-20192b372)

## Ce que contient ce portfolio

Trois projets présentés en détail, avec captures d'écran :

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
