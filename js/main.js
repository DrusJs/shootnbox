function swapTab(e) {
    console.log(e)
    let active = e.closest(".js-form-tab")

    active.classList.remove('active')
    active.nextElementSibling.classList.add('active')
}

let dropdown = document.querySelector('.cart-personalization__header')

if (dropdown) {
    document.querySelectorAll('.cart-personalization__header').forEach(dropdown=>{
        dropdown.addEventListener('click', (e)=>{
            e.currentTarget.parentElement.classList.toggle('hidden')
        })
    })
}