export const headerMenuUi = () => {
  setup()
  document.querySelector('.reset').addEventListener('click', function () {
    document
      .querySelectorAll('.menu__item')
      .forEach(el => el.classList.remove('menu__item--current'))
    document.querySelector('._avatar').classList.remove('drop')
    this.blur()
    setup()
  })

  function setup() {
    document.querySelector('.menu__item').classList.add('menu__item--current')
    document.querySelector('._avatar').classList.add('drop')
  }

  document.querySelectorAll('.menu__link').forEach(link => {
    link.addEventListener('click', function () {
      document
        .querySelectorAll('.menu__item')
        .forEach(el => el.classList.remove('menu__item--current'))
      this.parentElement.classList.add('menu__item--current')

      const avatar = document.querySelector('._avatar')
      avatar.classList.remove('drop')

      avatar.classList.add('spin')
      setTimeout(() => {
        avatar.classList.remove('spin')
      }, 400)
    })
  })
}
