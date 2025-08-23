const _SKELETON = {
  skin: {
    attack: {
      sprite: './img/enemys/skeleton/attack.png',
      totalFrames: 23,
      fps: 10,
    },
    idle: {
      sprite: './img/enemys/skeleton/Idle.png',
      totalFrames: 8,
      fps: 6,
    },
    walk: {
      sprite: './img/enemys/skeleton/move.png',
      totalFrames: 10,
      fps: 8,
    },
    protect: {
      sprite: './img/enemys/skeleton/hurt.png',
      totalFrames: 3,
      fps: 5,
    },
    die: {
      sprite: './img/enemys/skeleton/die.png',
      totalFrames: 17,
      fps: 15,
    },

    text: 'Arrrrhg!',
    count: 0,
    id: '_skeleton',
  },
}
const _GOLLUX = {
  skin: {
    attack: {
      sprite: './img/enemys/gollux/attack-fix.png',
      totalFrames: 17,
      fps: 10,
    },
    idle: {
      sprite: './img/enemys/gollux/idle.png',
      totalFrames: 5,
      fps: 6,
    },
    walk: {
      sprite: './img/enemys/gollux/walk.png',
      totalFrames: 8,
      fps: 8,
    },
    protect: {
      sprite: './img/enemys/gollux/protect.png',
      totalFrames: 3,
      fps: 5,
    },
    die: {
      sprite: './img/enemys/skeleton/die.png',
      totalFrames: 17,
      fps: 15,
    },

    text: 'Arrrrhg!',
    count: 0,
    id: '_skeleton',
  },
}
const _WEREWOLF = {
  skin: {
    attack: {
      sprite: './img/enemys/werewolf/werewolf-jump.png',
      totalFrames: 2,
      fps: 10,
    },
    idle: {
      sprite: './img/enemys/werewolf/werewolf-idle.png',
      totalFrames: 5,
      fps: 6,
    },
    walk: {
      sprite: './img/enemys/werewolf/werewolf-run.png',
      totalFrames: 6,
      fps: 8,
    },
    protect: {
      sprite: './img/enemys/werewolf/werewolf-fall.png',
      totalFrames: 2,
      fps: 3,
    },
  },
  options: {
    text: 'Arrrrhg!',
    count: 0,
    frameWidth: 96,
    frameHeight: 76,
    hp: 200,
    maxHp: 200,
    damage: 20,
    wrapperId: '_werewolf',
    abilities: [],
  },
}
const _OGRE = {
  skin: {
    attack: {
      sprite: './img/enemys/ogre/attack.png',
      totalFrames: 7,
      fps: 10,
    },
    idle: {
      sprite: './img/enemys/ogre/idle.png',
      totalFrames: 4,
      fps: 3,
    },
    walk: {
      sprite: './img/enemys/ogre/walk.png',
      totalFrames: 6,
      fps: 8,
    },
    protect: {
      sprite: './img/enemys/ogre/protect.png',
      totalFrames: 4,
      fps: 3,
    },
  },
  options: {
    text: 'Моя бить!',
    count: 0,
    frameWidth: 144,
    frameHeight: 80,
    hp: 300,
    maxHp: 300,
    damage: 15,
    wrapperId: '_ogre',
    abilities: [],
  },
}
export const _BOSES_DATA = [
  {data: _OGRE, name: 'Ogre', index: 1},
  {data: _WEREWOLF, name: 'Werewolf', index: 0},
  {sprites: _GOLLUX, name: 'Gollux'},
  {data: _WEREWOLF, name: 'Werewolf', index: 3},
]
