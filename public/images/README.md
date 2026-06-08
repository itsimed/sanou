# Images Assets

## Hero Background Image

**Fichier requis:** `hero-bg.jpg`

### Instructions de placement:

1. **Télécharger/Placer l'image** du concert dans ce dossier (`/public/images/`)
2. **Renommer le fichier** en `hero-bg.jpg` (format JPG)
3. **Optimiser l'image** :
   - Dimension recommandée: 1920x1080px minimum
   - Taille du fichier: < 500KB (utiliser TinyJPG ou similaire)
   - Format: JPG/JPEG pour les photos

### Recommandations:

- L'image doit avoir une bonne profondeur de champ (sujet au centre, arrière-plan flou)
- Les couleurs sombres/saturées fonctionnent mieux avec l'overlay
- L'image s'affichera avec un overlay gradient pour la légibilité du texte
- Elle sera responsive et adapté à tous les écrans

### Overlay appliqué:

```
Gradient de gauche à droite:
- Gauche: 85% opaque (pour les titres)
- Centre: 75% opaque
- Droite: 20% opaque (moins d'overlay)
```

### Chemin dans le code:

```
/images/hero-bg.jpg
```
