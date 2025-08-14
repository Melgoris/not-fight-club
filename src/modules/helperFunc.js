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
