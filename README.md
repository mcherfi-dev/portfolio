# Portfolio · Mohamed Cherfi

Portfolio personnel. Site statique, sans framework ni dépendance d'exécution.

**En ligne :** https://mohamedcherfi.vercel.app

## Stack

HTML sémantique, CSS natif (custom properties, grid, flexbox), JavaScript en modules ES.
Aucune librairie tierce, aucune étape de build. Le graphe animé du hero est dessiné en Canvas 2D.

## Structure

```
.
├── index.html
├── vercel.json                 en-têtes de sécurité et cache
└── assets/
    ├── css/
    │   ├── main.css            point d'entrée, importe les feuilles ci-dessous
    │   ├── tokens.css          variables de design (couleurs, typo, espacements)
    │   ├── base.css            reset, styles globaux, conteneurs
    │   ├── components.css      éléments réutilisables (boutons, chips, reveal)
    │   ├── nav.css
    │   ├── hero.css
    │   ├── about.css
    │   ├── projects.css
    │   ├── skills.css
    │   ├── contact.css
    │   └── footer.css
    └── js/
        ├── main.js             point d'entrée, orchestre les modules
        ├── utils/
        │   └── motion.js       détection des préférences utilisateur
        └── modules/
            ├── nav.js          menu mobile et état au scroll
            ├── scroll-progress.js
            ├── scroll-spy.js   lien de navigation actif
            ├── reveal.js       apparition des blocs au scroll
            ├── pointer-effects.js
            └── node-graph.js   animation Canvas du hero
```

## Principes

- **Une responsabilité par module.** Chaque fichier JS gère un comportement et un seul.
  `main.js` orchestre, il ne connaît que les fonctions d'initialisation.
- **Découplage HTML / JS.** Les modules ciblent des attributs `data-*` et non des classes
  de style, ce qui permet de refondre le CSS sans casser le JavaScript.
- **Extension sans modification.** Ajouter un projet consiste à dupliquer un bloc
  `<article class="project">` et à incrémenter le numéro. Aucun code existant n'est touché.
- **Accessibilité.** Structure sémantique, focus clavier visible, `prefers-reduced-motion`
  respecté : toutes les animations sont désactivées si l'utilisateur le demande.
- **Performance.** Le Canvas s'arrête quand l'onglet est masqué ou quand le hero sort du
  viewport.

## Développement local

Les modules ES exigent un serveur HTTP. Ouvrir `index.html` par double-clic ne fonctionne pas.

```bash
npx serve .
```

Puis ouvrir l'adresse affichée dans le terminal.

## Déploiement

Push sur `main`. Vercel redéploie automatiquement.
