import { planets } from './planets';

export const constellations = [
  { id: 'orion', name: 'Orion', type: 'constellation', description: 'The Hunter constellation', icon: '⭐' },
  { id: 'ursa-major', name: 'Ursa Major', type: 'constellation', description: 'The Great Bear', icon: '⭐' },
  { id: 'cassiopeia', name: 'Cassiopeia', type: 'constellation', description: 'The Queen constellation', icon: '⭐' },
  { id: 'leo', name: 'Leo', type: 'constellation', description: 'The Lion constellation', icon: '⭐' },
  { id: 'scorpius', name: 'Scorpius', type: 'constellation', description: 'The Scorpion constellation', icon: '⭐' },
];

export const stars = [
  { id: 'sirius', name: 'Sirius', type: 'star', description: 'The brightest star in the night sky', icon: '✨' },
  { id: 'vega', name: 'Vega', type: 'star', description: 'Fifth brightest star', icon: '✨' },
  { id: 'arcturus', name: 'Arcturus', type: 'star', description: 'Fourth brightest star', icon: '✨' },
  { id: 'capella', name: 'Capella', type: 'star', description: 'Sixth brightest star', icon: '✨' },
  { id: 'rigel', name: 'Rigel', type: 'star', description: 'Seventh brightest star', icon: '✨' },
];

export const allSearchItems = [
  ...planets.map(p => ({ ...p, type: 'planet' })),
  ...constellations,
  ...stars,
];

