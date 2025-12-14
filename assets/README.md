# Assets Directory

This directory contains static assets for the STELLA app.

## Structure

- `planets/` - Planet texture images (8k resolution recommended)
  - mercury.jpg
  - venus.jpg
  - earth.jpg
  - mars.jpg
  - jupiter.jpg
  - saturn.jpg
  - uranus.jpg

- `news/` - News article images
  - astronaut.jpg
  - saturn.jpg
  - mars.jpg
  - europa.jpg
  - galaxy.jpg

## Note

Currently, the app uses placeholder colors for planets. To use actual textures:
1. Add planet texture files to `assets/planets/`
2. Uncomment the `texture` require statements in `src/data/planets.js`
3. Update the `PlanetMesh.js` component to use textures instead of colors

