import {Character} from './characterComponent'

const characterUi = document.querySelector('.character-ui')
const portalContainer = document.createElement('div')
portalContainer.id = 'portal'
portalContainer.classList.add('portal-styles')
characterUi.appendChild(portalContainer)

portalContainer.addEventListener('click', () => {
  console.log('gjhnfk')
})
export const portal = new Character({
  skin: '/public/img/portal.png',
  frameWidth: 128,
  frameHeight: 128,
  container: portalContainer,
})

export const addRemovePortal = (portalID, state) => {
  const portalEl = document.querySelector(`#${portalID}`)
  portalEl.classList.toggle('disable', !state)
  portalEl.classList.toggle('active', state)
  if (state) portal.portal()
}
