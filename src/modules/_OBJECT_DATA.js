export const _GIRL_DEALER = {
  defoult: {
    idle: {
      sprite: './img/object/dressShop/crow-front.png',
      totalFrames: 3,
      fps: 3,
    },
  },
}
export const _HOME_LOCATION_OBJ_NAMES = ['tent', 'map', 'stone']
export const _HOME_LOCATION_OBJ = {
  tent: {
    id: '_tent',
    className: 'tent',
    // parent: homeUi,
    x: 658,
    y: 700,
    top: false,
  },

  map: {
    id: '_map',
    className: 'map',
    // parent: homeUi,
    x: 911,
    y: 580,
    top: false,
  },

  stone: {
    id: '_stone',
    className: 'stone',
    // parent: homeUi,
    x: 450,
    y: 757,
    top: false,
  },
}

export const _CLOUDS_NAME = [
  'cloudOne',
  'cloudTwo',
  'cloudThree',
  'cloudFour',
  'fogOne',
  'portalFogOne',
  'portalFogTwo',
]
export const _CLOUDS_DATA = {
  cloudOne: {
    src: './img/backgrounds/clouds/cloudOne.png',
    width: 200,
    height: 200,
    id: '_cloudBOne',
    x: 200,
    y: 125,
  },
  cloudTwo: {
    src: './img/backgrounds/clouds/cloudTwo.png',
    width: 200,
    height: 200,
    id: '_cloudTwo',
    x: 600,
    y: 14,
  },
  cloudThree: {
    src: './img/backgrounds/clouds/cloudThree.png',
    width: 200,
    height: 200,
    id: '_cloudThree',
    x: 1392,
    y: 100,
  },
  cloudFour: {
    src: './img/backgrounds/clouds/cloudFour.png',
    width: 300,
    height: 300,
    id: '_cloudFour',
    x: 1086,
    y: -70,
  },
  fogOne: {
    src: './img/backgrounds/clouds/fog-two.png',
    width: 1700,
    height: 619,
    id: '_fogOne',
    x: 71,
    y: 275,
  },
  portalFogOne: {
    src: './img/backgrounds/clouds/portalFogOne.png',
    width: 400,
    height: 253,
    id: '_portalFogOne',
    x: 1050,
    y: 575,
  },
  portalFogTwo: {
    src: './img/backgrounds/clouds/portalFogTwoRed.png',
    width: 130,
    height: 120,
    id: '_portalFogTwo',
    x: 1236,
    y: 660,
  },
}

export const _DUNGEONS = [
  {name: 'Swamps', src: './img/dungeons/swamps.jpg', id: '_swamps'},
  {name: 'Cemetery', src: './img/dungeons/cemetery.jpg', id: '_cemetery'},
  {
    name: 'Сatacombs',
    src: './img/dungeons/catacombs.jpg',
    id: '_catacombs',
  },
  {
    name: 'Wasteland',
    src: './img/dungeons/wasteland.jpg',
    id: '_wasteland',
  },
  {name: 'Forest', src: './img/dungeons/forest.jpg', id: '_forest'},
  {name: 'Tunnel', src: './img/dungeons/tunnel.jpg', id: '_tunnel'},
]
export const _DUNGEONS_LOCATION_DATA = {
  swamps: {name: 'Swamps', src: './img/dungeons/swampArena.jpg'},
  cemetery: {name: 'Cemetery', src: './img/dungeons/cemeteryArena.webp'},
  сatacombs: {
    name: 'Сatacombs',
    src: './img/dungeons/catacombArena.webp',
  },
  wasteland: {
    name: 'Wasteland',
    src: './img/dungeons/WastelandArena.webp',
  },
  forest: {name: 'Forest', src: './img/dungeons/forestArena.webp'},
  tunnel: {name: 'Tunnel', src: './img/dungeons/tunnelArena.webp'},
}
