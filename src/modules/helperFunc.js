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

export const addCloudText = (id, text, duration = 2000) => {
  const container = document.querySelector(`#${id} .cloud-container`)
  document.querySelector(`#${id} p`).textContent = text
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
    heroEl.style.transform = `translate(${deltaX}px, ${deltaY - 40}px)`
  }, 3000)
}
