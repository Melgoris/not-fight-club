const STORAGE_KEY = 'playerData'

export const PlayerStorage = {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null
  },

  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
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

  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}
