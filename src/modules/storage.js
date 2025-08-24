const STORAGE_KEY = 'playerData'
const COMBAT_STORAGE_KEY = 'arenaData'
const STATS_STORAGE_KEY = 'statsData'
// const HERO_STORAGE_KEY = 'heroData'
const store = {
  pickedHero: {
    pickedHeroData: null,
    heroUi: null,
  },
  storeHero: {
    class: '',
    id: null,
    name: '',
    skins: null,
    text: '',
    currentSkin: null,
  },
  arenaUi: {
    heroHp: null,
    heroMaxHp: null,
    heroMana: null,
    heroMaxMana: null,
    bossHp: null,
    bossMaxHp: null,
    bossId: null,
    locationName: null,
    location: null,
  },
  stats: {
    wins: 0,
    losses: 0,
  },
}

export function getFullStore() {
  return store
}
export function getPickedHero() {
  return store.pickedHero
}
export function getCombatData() {
  return store.arenaUi
}
export function setPickedHero(data) {
  store.pickedHero = {...store.pickedHero, ...data}
}

export function getStoreHero() {
  return store.storeHero
}
export function setStoreHero(data) {
  store.storeHero = {...store.storeHero, ...data}
  PlayerStorage.save(store)
}

export function resetPickedHero() {
  store.pickedHero = {pickedHeroData: null, heroUi: null}
}

export const PlayerStorage = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
  },
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },
  getArena() {
    return JSON.parse(localStorage.getItem(COMBAT_STORAGE_KEY)) || null
  },
  saveArena(data) {
    localStorage.setItem(COMBAT_STORAGE_KEY, JSON.stringify(data))
  },
  getStats() {
    return JSON.parse(localStorage.getItem(STATS_STORAGE_KEY)) || null
  },
  saveStats(data) {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(data))
  },

  updateStoreHero(heroData) {
    const data = this.get() || store
    data.storeHero = heroData
    this.save(data)
  },

  updateCombatData(heroData) {
    store.arenaUi = {...store.arenaUi, ...heroData}
    this.saveArena(store.arenaUi)
  },
  clearCombatStore() {
    store.arenaUi = {}
    this.saveArena(store.arenaUi)
  },

  setName(name) {
    const data = this.get() || {
      username: '',
      wins: 0,
      losses: 0,
      character: null,
    }
    data.username = name
    this.save(data)
  },

  addWin() {
    const data = this.getStats() || store.stats
    if (!data) return
    data.wins = (data.wins || 0) + 1
    store.stats = {...store.stats, ...data}
    this.saveStats(data)
  },

  addLoss() {
    const data = this.getStats() || store.stats
    if (!data) return
    data.losses = (data.losses || 0) + 1
    store.stats = {...store.stats, ...data}
    this.saveStats(data)
  },

  setCharacter(char) {
    const data = this.get()
    if (!data) return
    data.character = char
    this.save(data)
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}
