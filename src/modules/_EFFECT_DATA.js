export const _CHANGE_SKIN_EFF = {
  changeEff: {
    changeSkin: {
      sprite: './img/effects/changeAnimation.png',
      totalFrames: 6,
      fps: 12,
    },
  },
  heroSpellEff: {
    create: {
      sprite: './img/effects/heroSpells/Create.png',
      totalFrames: 14,
      fps: 28,
    },
    idle: {
      sprite: './img/effects/heroSpells/Idle.png',
      totalFrames: 4,
      fps: 5,
    },
    hit: {
      sprite: './img/effects/heroSpells/Shoot.png',
      totalFrames: 3,
      fps: 6,
    },
    explode: {
      sprite: './img/effects/heroSpells/Explode.png',
      totalFrames: 7,
      fps: 14,
    },
    heal: {
      sprite: './img/effects/spellanimations/heal.png',
      totalFrames: 11,
      fps: 9,
    },
    curse: {
      sprite: './img/effects/spellanimations/water.png',
      totalFrames: 10,
      fps: 9,
    },
  },
}

export const _BUFFS_DEBUFFS_NAMES = ['buffs', 'debuffs']
export const _BUFFS_DEBUFFS = {
  buffs: {
    heal: {
      sprite: './img/effects/spellanimations/heal.png',
      totalFrames: 11,
      fps: 9,
    },
  },
  debuffs: {
    curse: {
      sprite: './img/effects/spellanimations/water.png',
      totalFrames: 10,
      fps: 9,
      width: 496,
      height: 496,
    },
    burnGreen: {
      start: {
        sprite: './img/effects/spellanimations/fireGreen/burning_start_1.png',
        totalFrames: 4,
        fps: 4,
        width: 32,
        height: 32,
      },
      loop: {
        sprite: './img/effects/spellanimations/fireGreen/burning_loop_1.png',
        totalFrames: 8,
        fps: 7,
        width: 32,
        height: 32,
      },
      end: {
        sprite: './img/effects/spellanimations/fireGreen/burning_end_1.png',
        totalFrames: 5,
        fps: 4,
        width: 32,
        height: 32,
      },
    },
  },
}
// export const _EFFECTS = [
//   {
//     id: 'school_girl',
//     name: 'School girl',
//     skins: _SCHOOL_GIRL,
//     class: 'hero-container',
//     text: 'Не буду учится!',
//   },
// ]
