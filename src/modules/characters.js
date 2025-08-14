import {Character} from './characterComponent'
import {_CHARS} from './_CHAR_DATA'
import heroCloudImg from '/img/text_cloud_white.png'

export const charactersUi = () => {
  let pickedHeroData = null
  const addHeroCloud = ({parentContainer, src, text}) => {
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

  const addCloudText = (id, text, duration = 2000) => {
    const container = document.querySelector(`#${id} .cloud-container`)
    document.querySelector(`#${id} p`).textContent = text
    container.style.opacity = '1'

    setTimeout(() => {
      container.style.opacity = '0'
    }, duration)
  }
  const heroes = _CHARS.map(hero => {
    const characterUi = document.querySelector('.character-ui')
    const heroContainer = document.createElement('div')
    heroContainer.id = hero.id
    heroContainer.classList.add(hero.class)
    characterUi.appendChild(heroContainer)
    addHeroCloud({
      parentContainer: heroContainer,
      src: heroCloudImg,
      text: hero.text,
    })
    heroContainer.addEventListener('click', () => {
      pickedHeroData = {id: hero.id, name: hero.name, text: hero.text}
      // console.log(`Выбран герой: ${hero.name}`)
      console.log(`Выбран герой: ${hero.text}`)
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
      const {id, name, text} = pickedHeroData
      hero.attack()
      console.log()
      addCloudText(id, text)
    })
  })
  addCloudText('school_girl', 'ууу бля')
}
