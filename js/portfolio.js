const panels = document.querySelectorAll('.panel')

panels.forEach ((panel) => {
panel.addEventListener('click', () => {
    removeActiveClasses()
    panel.classList.add('active')
})
})


panels.forEach ((panel) => {
panel.addEventListener('dblclick', () => {
    removeActiveClasses()
    panel.classList.remove('active')
    panel.classList.add('panel')
})
})
    

function removeActiveClasses() {
    panels.forEach( panel => {
        panel.classList.remove('active')
    })
}

const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')

open.addEventListener('click', () => container.classList.add('show-nav'))

close.addEventListener('click', () => container.classList.remove('show-nav'))