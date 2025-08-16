const STORAGE_KEY = 'playerData'
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
  },
}

export function getFullStore() {
  return store
}
export function getPickedHero() {
  return store.pickedHero
}
export function setPickedHero(data) {
  store.pickedHero = {...store.pickedHero, ...data}
}

export function getStoreHero() {
  return store.storeHero
}
export function setStoreHero(data) {
  store.storeHero = {...store.storeHero, ...data}
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
  updateStoreHero(heroData) {
    const data = this.get() || {
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
      },
    }
    data.storeHero = heroData
    this.save(data)
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
    const data = this.get()
    if (!data) return
    data.wins++
    this.save(data)
  },

  addLoss() {
    const data = this.get()
    if (!data) return
    data.losses++
    this.save(data)
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
