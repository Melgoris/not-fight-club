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

    text: 'Arrrrhg!',
    count: 0,
    id: '_skeleton',
  },
}
export const _BOSES_DATA = [
  {sprites: _SKELETON, name: 'Skeleton King'},
  {sprites: _GOLLUX, name: 'Gollux'},
  {sprites: _WEREWOLF, name: 'Were'},
]
