# Kaboom

Jeu de bombes multijoueur entre amis, dans le navigateur. Le dernier debout gagne la manche ; il faut 5 manches pour gagner la partie.

- Un seul fichier de jeu : `index.html` (canvas, connexion directe entre joueurs avec PeerJS et un relais TURN).
- Application installable (PWA) : `manifest.webmanifest`, `sw.js` et les icônes dans `icons/`.
- Pensé pour le téléphone en paysage, jouable aussi sur ordinateur (clavier et souris).

## Mettre en ligne avec GitHub Pages

1. Sur GitHub, dans le dépôt : **Settings → Pages**.
2. *Source* : **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
3. Le jeu est en ligne au bout d'une minute environ à l'adresse `https://<ton-compte>.github.io/kaboom/`.

## Installer l'application

- **iPhone (Safari)** : bouton Partager → **Sur l'écran d'accueil**.
- **Android (Chrome)** : menu ⋮ → **Installer l'application**.
- **Ordinateur (Chrome, Edge)** : icône d'installation dans la barre d'adresse.

## Mettre à jour

Remplacer `index.html`, puis augmenter `VERSION` dans `sw.js` (par exemple `kaboom-v121`) pour que les téléphones récupèrent la nouvelle version.
