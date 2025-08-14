import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'

export const charactersUi = () => {
  const heroes = _CHARS.map(hero => {
    const characterUi = document.querySelector('.character-ui')
    const heroContainer = document.createElement('div')
    const cloud = document.createElement('img')
    const text = document.createElement('p')
    cloud.src = '/img/text_cloud_white.png'
    heroContainer.id = hero.id
    heroContainer.classList.add(hero.class)
    text.classList.add('cloud-text')
    text.textContent = hero.text || ''
    characterUi.appendChild(heroContainer)
    heroContainer.appendChild(cloud)
    heroContainer.appendChild(text)
    heroContainer.addEventListener('click', () => {
      console.log(`Выбран герой: ${hero.name}`)
    })
    return new Character({
      skin: hero.skins.defoult,
      frameWidth: 128,
      frameHeight: 128,
      container: heroContainer,
    })
  })

  heroes.forEach(hero => {
    hero.idle()
    hero.container.addEventListener('click', () => {
      hero.attack()
    })
  })
}
