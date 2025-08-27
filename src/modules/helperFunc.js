export const delay = ms => new Promise(res => setTimeout(res, ms))
export const addHeroCloud = ({parentContainer, src, text}) => {
  const cloud = document.createElement('div')
  const cloudImg = document.createElement('img')
  const textContainer = document.createElement('p')
  cloudImg.src = src
  cloud.classList.add('cloud-container')
  textContainer.classList.add('cloud-text')
  textContainer.textContent = text
  parentContainer.appendChild(cloud)
  cloud.appendChild(cloudImg)
  cloud.appendChild(textContainer)
}
export const destroyInactiveWindows = () => {
  document.querySelectorAll('.current-screan > div').forEach(screen => {
    if (!screen.classList.contains('active')) {
      screen.innerHTML = ''
    }
  })
}
export const addCloudText = (id, text, duration = 2000) => {
  const container = document.querySelector(`#${id} .cloud-container`)
  document.querySelector(`#${id} .cloud-container p`).textContent = text
  if (container.style.opacity === '1') {
    return
  }
  container.style.opacity = '1'

  setTimeout(() => {
    container.style.opacity = '0'
  }, duration)
}

export const addHeroLightContainer = containerId => {
  const heroLight = document.createElement('div')
  heroLight.classList.add('hero-light')
  document.querySelector(`#${containerId}`).appendChild(heroLight)
}

export const clearHeroLight = () => {
  document
    .querySelectorAll('.hero-container')
    .forEach(h => h.classList.remove('selected'))
}

export const heroLightActive = id => {
  clearHeroLight()
  document.querySelector(`#${id}`).classList.add('selected')
}

export const moveHeroToPortal = heroEl => {
  const portalEl = document.querySelector('#portal')
  const heroRect = heroEl.getBoundingClientRect()
  const portalRect = portalEl.getBoundingClientRect()
  let deltaX = portalRect.left - heroRect.left
  let deltaY = portalRect.top - heroRect.top
  if (heroEl.id === 'gorgon') deltaX = deltaX - 45
  heroEl.style.transition = 'transform 3s linear'
  heroEl.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  setTimeout(() => {
    heroEl.style.transition = 'transform 0.5s ease-out'
    heroEl.style.transform = `translate(${deltaX}px, ${deltaY - 15}px)`
  }, 3000)
}
export const moveHeroToObject = (heroEl, objEl, shift = 0) => {
  const heroRect = heroEl.getBoundingClientRect()
  const objRect = objEl.getBoundingClientRect()
  let deltaX = objRect.left - heroRect.left - shift
  if (heroEl.id === 'gorgon') deltaX = deltaX - 45
  heroEl.style.transition = 'transform 3s linear'
  heroEl.style.transform = `translate(${deltaX}px)`
}
export const createSceneObjectElement = ({
  id,
  className,
  parent,
  x,
  y,
  top = true,
}) => {
  const el = document.createElement('div')
  el.id = id
  el.classList.add('building', className)
  el.style.position = 'absolute'
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  // top ? (el.style.top = `${y}px`) : (el.style.bottom = `${y}px`)

  parent.appendChild(el)
  return el
}

export const createWeatherElement = ({
  id,
  src,
  x = 0,
  y = 0,
  width,
  height,
}) => {
  const el = document.createElement('div')
  el.id = id
  el.classList.add('weather-element')
  el.style.backgroundImage = `url(${src})`
  el.style.width = `${width}px`
  el.style.height = `${height}px`
  el.style.left = `${x}px`
  el.style.top = `${y}px`
  return el
}
export const createModalMenu = ({id, name, parent}) => {
  const el = document.createElement('div')
  el.id = id
  el.classList.add('modal-menu', name)
  parent.appendChild(el)
  return el
}
export const createModalMenuBtn = ({src, text}) => {
  const el = document.createElement('div')
  const img = document.createElement('img')

  img.src = src
  el.classList.add('modal-menu-buttons')
  el.appendChild(img)
  if (text) {
    const t = document.createElement('p')
    t.textContent = text
    el.appendChild(t)
  }
  // el.style.backgroundImage = `url(${src})`
  return el
}
export const createBtn = (btnClass, id, text) => {
  const wrapper = document.createElement('div')
  const btn = document.createElement('button')
  wrapper.classList.add('button-wrapper')
  btn.id = id
  btn.classList.add(btnClass)
  btn.textContent = text
  wrapper.appendChild(btn)
  return wrapper
}
export const toogleMenus = (el, status) => {
  el.classList.toggle('open', status)
}

export const moveSpellToTarget = (fromTarget, toTarget, shift = 0) => {
  const fromTargetRect = fromTarget.getBoundingClientRect()
  const toTargetRect = toTarget.getBoundingClientRect()
  let deltaX = toTargetRect.left - fromTargetRect.left - shift
  if (fromTarget.id === 'gorgon') deltaX = deltaX - 45

  // heroEl.style.transition = 'transform 3s linear'
  // heroEl.style.transform = `translate(${deltaX}px)`
}

export const buttleHeroUi = (mainContainer, spellMass) => {
  const wrapper = document.createElement('div')
  const spellsPanel = document.createElement('div')
  spellsPanel.classList.add('spells-panel')
  wrapper.classList.add('battle-hero-ui')
  const fightBtn = createBtn('choose-hero-button', 'choose-hero-btn', 'Attack!')
  fightBtn.classList.add('arena-button')
  wrapper.appendChild(spellsPanel)
  wrapper.appendChild(fightBtn)
  let selectedSpellData = null
  const spellContainers = []
  spellMass.map((spell, i) => {
    const spellCont = document.createElement('div')
    spellCont.classList.add('spell-container')
    const ico = document.createElement('img')
    const pName = document.createElement('p')
    const pDescrip = document.createElement('p')
    pName.classList.add('spell-name')
    pDescrip.classList.add('spell-description')
    pName.textContent = spell.name
    pDescrip.textContent = spell.desc
    ico.src = spell.ico

    fightBtn.addEventListener('click', () => {
      spellsPanel
        .querySelectorAll('.spell-container')
        .forEach(el => el.classList.remove('active'))
    })

    spellCont.addEventListener('click', () => {
      spellsPanel.querySelectorAll('.spell-container').forEach(el => {
        el.classList.remove('active')
      })
      spellCont.classList.add('active')
      selectedSpellData = {
        damage: spell.damage,
        manaCost: spell.manacost,
        name: spell.name,
        index: i,
      }
    })
    spellCont.addEventListener('mouseenter', () => {
      pDescrip.classList.add('show')
    })
    spellCont.addEventListener('mouseleave', () => {
      pDescrip.classList.remove('show')
    })

    spellCont.appendChild(ico)
    spellCont.appendChild(pName)
    spellCont.appendChild(pDescrip)
    spellsPanel.appendChild(spellCont)
    spellContainers.push(spellCont)
  })

  mainContainer.appendChild(wrapper)
  let currentMana = 0
  const updateManaCostForIcons = mana => {
    currentMana = mana
    spellContainers.forEach((el, i) => {
      if (mana < spellMass[i].manacost) {
        el.classList.add('disable')
      } else {
        el.classList.remove('disable')
      }
    })
  }
  return {
    wrapper,
    fightBtn,
    getSelectedSpell: () => selectedSpellData,
    updateManaCostForIcons,
  }
}

export const playerStats = (parrent, data) => {
  const container = document.createElement('div')
  container.classList.add('stats-info')
  const winsP = document.createElement('p')
  winsP.textContent = `Побед: ${data.wins}`
  const losesP = document.createElement('p')
  losesP.classList.add('lose-color')
  losesP.textContent = `Поражений: ${data.losses}`
  container.appendChild(winsP)
  container.appendChild(losesP)
  parrent.appendChild(container)
  return container
}

const sounds = {
  enemy: new Audio('./sounds/enemy.mp3'),
  hero: new Audio('./sounds/Fireball.wav'),
  heal: new Audio('./sounds/heal.wav'),
  curse: new Audio('./sounds/curse.wav'),
}

export const playSound = unit => {
  const sound = sounds[unit]
  if (!sound) return
  sound.currentTime = 0
  sound.play()
}
