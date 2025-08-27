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
const _ORC_WARRIOR = {
  skin: {
    attack: {
      sprite: './img/enemys/orcWar/attack.png',
      totalFrames: 4,
      fps: 6,
    },
    idle: {
      sprite: './img/enemys/orcWar/Idle.png',
      totalFrames: 5,
      fps: 3,
    },
    walk: {
      sprite: './img/enemys/orcWar/Walk.png',
      totalFrames: 7,
      fps: 6,
    },
    protect: {
      sprite: './img/enemys/orcWar/Hurt.png',
      totalFrames: 2,
      fps: 4,
    },
    dead: {
      sprite: './img/enemys/orcWar/Dead.png',
      totalFrames: 4,
      fps: 3,
    },
  },
  options: {
    text: 'За орду!',
    count: 0,
    frameWidth: 96,
    frameHeight: 96,
    hp: 250,
    maxHp: 250,
    damage: 17,
    wrapperId: '_orcWar',
    abilities: [],
    crit: 0.2,
  },
}
const _KITSUNE = {
  skin: {
    attack: {
      sprite: './img/enemys/kitsune/Attack.png',
      totalFrames: 10,
      fps: 7,
      endFrame: 6,
    },
    idle: {
      sprite: './img/enemys/kitsune/Idle.png',
      totalFrames: 8,
      fps: 5,
    },
    walk: {
      sprite: './img/enemys/kitsune/Walk.png',
      totalFrames: 8,
      fps: 6,
    },
    protect: {
      sprite: './img/enemys/kitsune/Hurt.png',
      totalFrames: 2,
      fps: 4,
    },
    dead: {
      sprite: './img/enemys/kitsune/Dead.png',
      totalFrames: 10,
      fps: 7,
    },
  },
  options: {
    text: 'Это мой лес!',
    count: 0,
    frameWidth: 128,
    frameHeight: 128,
    hp: 270,
    maxHp: 270,
    damage: 9,
    wrapperId: '_orcWar',
    abilities: [],
    crit: 0.4,
  },
}
const _TENGU = {
  skin: {
    attack: {
      sprite: './img/enemys/tengu/Attack.png',
      totalFrames: 6,
      fps: 5,
      // endFrame: 6,
    },
    idle: {
      sprite: './img/enemys/tengu/Idle.png',
      totalFrames: 6,
      fps: 5,
    },
    walk: {
      sprite: './img/enemys/tengu/Walk.png',
      totalFrames: 8,
      fps: 6,
    },
    protect: {
      sprite: './img/enemys/tengu/Hurt.png',
      totalFrames: 3,
      fps: 4,
    },
    dead: {
      sprite: './img/enemys/tengu/Dead.png',
      totalFrames: 6,
      fps: 4,
    },
  },
  options: {
    text: 'Кто тут ходит в наших лесах!',
    count: 0,
    frameWidth: 128,
    frameHeight: 128,
    hp: 200,
    maxHp: 200,
    damage: 17,
    wrapperId: '_orcWar',
    abilities: [],
    crit: 0.3,
  },
}
const _MINOTAUR = {
  skin: {
    attack: {
      sprite: './img/enemys/minotaur/Attack.png',
      totalFrames: 5,
      fps: 4,
      // endFrame: 6,
    },
    idle: {
      sprite: './img/enemys/minotaur/Idle.png',
      totalFrames: 10,
      fps: 7,
    },
    walk: {
      sprite: './img/enemys/minotaur/Walk.png',
      totalFrames: 12,
      fps: 7,
    },
    protect: {
      sprite: './img/enemys/minotaur/Hurt.png',
      totalFrames: 3,
      fps: 4,
    },
    dead: {
      sprite: './img/enemys/minotaur/Dead.png',
      totalFrames: 5,
      fps: 4,
    },
  },
  options: {
    text: 'Молочко будешь?',
    count: 0,
    frameWidth: 128,
    frameHeight: 128,
    hp: 400,
    maxHp: 400,
    damage: 3,
    wrapperId: '_minotaur',
    abilities: [],
    crit: 0.5,
  },
}
export const _BOSES_DATA = [
  {data: _KITSUNE, name: 'Kitsune', index: 0},
  {data: _MINOTAUR, name: 'Minotaur', index: 1},
  {data: _TENGU, name: 'Tengu', index: 2},
  {data: _OGRE, name: 'Ogre', index: 3},
  {data: _ORC_WARRIOR, name: 'Orc Warrior', index: 4},
  {data: _WEREWOLF, name: 'Werewolf', index: 5},
]
