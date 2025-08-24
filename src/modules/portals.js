import {Character} from './characterComponent'
import {addHeroCloud, addCloudText} from './helperFunc'

const characterUi = document.querySelector('.character-ui')

// portalContainer.addEventListener('click', () => {
//   console.log('gjhnfk')
// })

export function addRemovePortal(portalID, state, containerId) {
  const parentCont = document.querySelector(`#${containerId}`)
  if (!parentCont) return

  let portalContainer = document.querySelector(`#${portalID}`)
  if (!portalContainer && state) {
    portalContainer = document.createElement('div')
    portalContainer.id = portalID
    portalContainer.classList.add('portal-styles')
    parentCont.appendChild(portalContainer)

    const portal = new Character({
      skin: './img/portal.png',
      frameWidth: 128,
      frameHeight: 128,
      container: portalContainer,
    })
    portal.portal()
  }

  if (portalContainer) {
    portalContainer.classList.toggle('disable', !state)
    portalContainer.classList.toggle('active', state)

    if (!state) {
      portalContainer.remove()
    }
  }
  portalContainer.addEventListener('click', () => {
    // console.log('dfsdff')
  })
  return portalContainer
}
