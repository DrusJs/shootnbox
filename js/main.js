document.addEventListener('DOMContentLoaded', () => {
    function checkBlocksVisibility() {
        let windowHeight = window.innerHeight;
        let blocks = document.querySelectorAll('.fade');
        let delayItem = window.matchMedia('(max-width: 800px)').matches ? 80 : 160
    
        blocks.forEach(block => {
            let blockPosition = block.getBoundingClientRect().top;
    
            if (blockPosition < windowHeight - delayItem) {
                block.classList.remove('fade')
            }
        });
    }

    function showModal(e) {
        if (document.querySelector('.nav__block.active')) {
            document.querySelector('.nav__block.active').classList.remove('active')
            document.querySelector('.button-burger-menu').classList.remove('active')
        }
        if (e.currentTarget.dataset.modal !== "modal-privacy") { closeModal() } else { e.preventDefault() }
        if (!document.querySelector('.modal-wrapper.active')) { document.body.classList.add('no-scroll') }
        document.getElementById(e.currentTarget.dataset.modal).classList.add('active')
    }

    function closeModal() {
        document.querySelector('.modal-wrapper.active') && document.querySelector('.modal-wrapper.active').classList.remove('active')
        if (!document.querySelector('.modal-wrapper.active')) { document.body.classList.remove('no-scroll') }
    }

    function closeModalWrapper(e) {
        if (e.target.classList.contains('modal-wrapper')) {
            e.currentTarget.classList.remove('active')
            if (!document.querySelector('.modal-wrapper.active')) { document.body.classList.remove('no-scroll') }
        }
    }

    function quizNextModal(e) {
        let container = e.currentTarget.closest('.qiuz-modal')
        container.classList.remove('current')
        container.nextElementSibling.classList.add('current')
    }

    function quizNextStep(e) {
        let container = e.currentTarget.closest('.quiz-modal__content')
        // if (!isCheckedInput(container)) {return}
        container.classList.remove('step')
        container.nextElementSibling.classList.add('step')
    }

    function quizPrevModal(e) {
        let container = e.currentTarget.closest('.qiuz-modal')
        container.classList.remove('current')
        if (container.classList.contains('steps')) {
            container.parentElement.querySelector('.first-question').classList.add('current')
        } else {
            container.previousElementSibling.classList.add('current')
        }
    }

    function quizPrevStep(e) {
        let container = e.currentTarget.closest('.quiz-modal__content')
        container.classList.remove('step')
        container.previousElementSibling.classList.add('step')        
    }

    function quizFinish(e) {
        let container = e.currentTarget.closest('.quiz-modal__content')
        if (!isCheckedInput(container)) {return}
        container.classList.remove('step')
        container.closest('.steps').classList.remove('current')
        container.parentElement.querySelector('.quiz-modal__content').classList.add('step')
        document.querySelector('.quiz-finish').classList.add('current') 
    }

    function isCheckedInput(container) {
        return (container.querySelector('input[type="radio"]:checked') || container.querySelector('input[type="checkbox"]:checked'))
    }

    function quizSelectWay(e) {
        let container = e.currentTarget.closest('.qiuz-modal')
        if (isCheckedInput(container)) {
            let item = container.querySelector('input[type="radio"]:checked').id
            container.classList.remove('current')
            document.querySelector(`.${item}`).classList.add('current')
        }        
    }

    function menuToggleEvent(e) {
        if (e.currentTarget.closest('.footer') || !window.matchMedia("(max-width: 1440px)").matches) { return }
        document.querySelector('.nav__block').classList.toggle('active')
        document.querySelector('.button-burger-menu').classList.toggle('active')
        document.body.classList.toggle('no-scroll')
    }
    
    checkBlocksVisibility()
    
    window.addEventListener('scroll', checkBlocksVisibility)

    document.querySelector('.button-burger-menu').addEventListener('click', menuToggleEvent)

    document.querySelectorAll('.nav__link').forEach((link) => {
        link.addEventListener('click', menuToggleEvent)
    })

    document.querySelectorAll('.dropdown-item__buttons .dropdown-item').forEach(el => {
        el.addEventListener('click', (e) => {
            let tabs = e.currentTarget.closest('.tab-dropdown').querySelectorAll('.dropdown-item__info')
            let ind = e.currentTarget.dataset.tab
            let active = e.currentTarget.closest('.tab-dropdown').querySelector('.dropdown-item__info.active')
            let isActive = e.currentTarget.classList.contains('active')
            if (active) {
                active.classList.remove('active')
                document.querySelector('.dropdown-item.active').classList.remove('active')
                if (isActive) { return }
            }
            e.currentTarget.classList.add('active')
            tabs[ind].classList.add('active')
        })
    })

    document.querySelectorAll('.button--switcher').forEach(el => {
        el.addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('button--switcher-active')) {
                document.querySelector('.button--switcher-active').classList.remove('button--switcher-active')
                e.currentTarget.classList.add('button--switcher-active')
                document.querySelector('.tab-item.active').classList.remove('active')
                document.querySelectorAll('.tab-item')[e.currentTarget.dataset.tab].classList.add('active')
            }
        })
    })

    document.querySelectorAll('.subtab-switchers__switcher').forEach(el=>{
        el.addEventListener('click', (e)=>{
            if (!e.currentTarget.classList.contains('subtab-switchers__switcher--active')) {
                let tabs = e.currentTarget.parentElement.parentElement.querySelectorAll('.tab-content')
                let activeTab = e.currentTarget.parentElement.parentElement.querySelector('.tab-content.active')
                let ind = Array.from(e.currentTarget.parentElement.children).indexOf(e.currentTarget)
                activeTab.classList.remove('active')
                e.currentTarget.parentElement.parentElement.querySelector('.subtab-switchers__switcher--active').classList.remove('subtab-switchers__switcher--active')
                e.currentTarget.classList.add('subtab-switchers__switcher--active')
                tabs[ind].classList.add('active')
            }
        })
    })

    document.querySelectorAll('[data-modal]').forEach(el => {
        el.addEventListener('click', showModal)
    })

    document.querySelectorAll('[data-next-modal]').forEach(el => {
        el.addEventListener('click', quizNextModal)
    })

    document.querySelectorAll('[data-next-step]').forEach(el => {
        el.addEventListener('click', quizNextStep)
    })

    document.querySelectorAll('[data-prev-modal]').forEach(el => {
        el.addEventListener('click', quizPrevModal)
    })

    document.querySelectorAll('[data-prev-step]').forEach(el => {
        el.addEventListener('click', quizPrevStep)
    })

    document.querySelectorAll('[data-next-modal-selector]').forEach(el => {
        el.addEventListener('click', quizSelectWay)
    })

    document.querySelectorAll('[data-finish]').forEach(el => {
        el.addEventListener('click', quizFinish)
    })

    document.querySelectorAll('.modal-cancel').forEach(el => {
        el.addEventListener('click', closeModal)
    })

    document.querySelectorAll('.modal-wrapper').forEach(el => {
        el.addEventListener('click', closeModalWrapper)
    })

    document.querySelector('.quiz-finish .button[type="submit"]').addEventListener('click', (e)=> {        
        e.preventDefault()
        document.getElementById('modal-accept').classList.add('active') 
        document.getElementById('modal-quiz').classList.remove('active')
        setTimeout(closeModal, 4000) 
    })

    const videoModal = document.querySelector('#video-modal')
    const videoContent = document.querySelector('#video-content')
    const playVideo = document.querySelectorAll('.button-play')


    if (videoModal) {
        playVideo.forEach(el => {
            el.addEventListener('click', (e) => {
                console.log(e.currentTarget.nextElementSibling.href)
                videoContent.innerHTML = e.currentTarget.dataset.link == "1"?`<iframe width="auto" height="85vh" src="https://www.youtube.com/embed/WSOlBvrQc4I" title="Запуск лазерного станка OREE LASER у клиента" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`:`<iframe width="auto" height="85vh" src="https://www.youtube.com/embed/zc166TqeqfQ" title="Как подключить лазерный станок OREE LASER" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                videoModal.classList.add('active')
                document.body.classList.add('no-scroll')
            })
        })
        videoModal.addEventListener('click', () => {
            videoModal.classList.remove('active')
            document.body.classList.remove('no-scroll')
            setTimeout(()=>{
                videoContent.innerHTML = ''
            },700)
            
        })      

    }

});