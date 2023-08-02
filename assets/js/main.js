/**
* Template Name: iPortfolio - v3.10.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();


  /* Scripts dos modais */
  const fade = document.querySelector("#fade");

  /*Modal Obrigado*/

  const OpenObrigado = document.querySelector("#btn_form_cursos");
  const CloseObrigado = document.querySelector("#close-modal-obrigado");
  const modalObrigado = document.querySelector("#modal-obrigado");

  const toggleModalObrigado = () => {
    modalObrigado.classList.toggle("hide");
    fade.classList.toggle("hide");
  };
  const recarregar = () =>{
    window.location.reload(true);
  }

  [CloseObrigado].forEach((el) => {
    el.addEventListener("click", () => recarregar());
  });

  // [OpenObrigado].forEach((el) => {
  //   el.addEventListener("click", () => toggleModalObrigado());
  // });

  /*Modal Oratoria*/
  const openModalButton = document.querySelector("#open-modal-oratoria");
  const closeModalButton = document.querySelector("#close-modal-oratoria");
  const modal = document.querySelector("#modal-oratoria");
  const formOratoria = document.querySelector("#formOratoria");

  formOratoria.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.classList.add("hide");
    fade.classList.add("hide")
    toggleModalObrigado();
  });

  const toggleModalOratoria = () => {    
    modal.classList.toggle("hide");
    fade.classList.toggle("hide");
  };

  closeModalButton.addEventListener("click", toggleModalOratoria)
  openModalButton.addEventListener("click", toggleModalOratoria)
  // [openModalButton, closeModalButton].forEach((el) => {
  //   el.addEventListener("click", () => toggleModalOratoria());
  // });

  /*Modal Media Training*/
  const OpenMediaTraining = document.querySelector("#open-modal-MediaTraining");
  const CloseMediaTraining = document.querySelector("#close-modal-MediaTraining");
  const ModalMediaTraining = document.querySelector("#modal-MediaTraining");
  const formMediaTraining = document.querySelector("#formMT");

  formMediaTraining.addEventListener("submit", (event) => {
    event.preventDefault();
    ModalMediaTraining.classList.add("hide");
    fade.classList.add("hide")
    toggleModalObrigado();
  });

  const toggleModalMediaTraining = () => {
    ModalMediaTraining.classList.toggle("hide");
    fade.classList.toggle("hide");
  };

  CloseMediaTraining.addEventListener("click", toggleModalMediaTraining)
  OpenMediaTraining.addEventListener("click", toggleModalMediaTraining)
  
  // [OpenMediaTraining, CloseMediaTraining, ModalMediaTraining].forEach((el) => {
  //   el.addEventListener("click", () => toggleModalMediaTraining());
  // });

  /*Modal Oratória para apresentações acadêmicas*/
  const Openoratoria2 = document.querySelector("#open-modal-oratoria2");
  const Closeoratoria2 = document.querySelector("#close-modal-oratoria2");
  const Modaloratoria2 = document.querySelector("#modal-oratoria2");
  const formOratoria2 = document.querySelector("#formOratoria2");

  formOratoria2.addEventListener("submit", (event) => {
    event.preventDefault();
    Modaloratoria2.classList.add("hide");
    fade.classList.add("hide")
    toggleModalObrigado();
  });

  const toggleModaloratoria2 = () => {
    Modaloratoria2.classList.toggle("hide");
    fade.classList.toggle("hide");
  };


  Closeoratoria2.addEventListener("click", toggleModaloratoria2)
  Openoratoria2.addEventListener("click", toggleModaloratoria2)
  // [Openoratoria2, Closeoratoria2, Modaloratoria2].forEach((el) => {
  //   el.addEventListener("click", () => toggleModaloratoria2());
  // });

  /*Modal Ferramentas para enfrentar situações desafiadoras*/
  const Opendesafiadoras = document.querySelector("#open-modal-desafiadoras");
  const Closedesafiadoras = document.querySelector("#close-modal-desafiadoras");
  const Modaldesafiadoras = document.querySelector("#modal-desafiadoras");
  const formDesafiadoras = document.querySelector("#formDesafiadoras");

  formDesafiadoras.addEventListener("submit", (event) => {
    event.preventDefault();
    Modaldesafiadoras.classList.add("hide");
    fade.classList.add("hide")
    toggleModalObrigado();
  });

  const toggleModaldesafiadoras = () => {
    Modaldesafiadoras.classList.toggle("hide");
    fade.classList.toggle("hide");
  };

  Closedesafiadoras.addEventListener("click", toggleModaldesafiadoras)
  Opendesafiadoras.addEventListener("click", toggleModaldesafiadoras)
  // [Opendesafiadoras, Closedesafiadoras, Modaldesafiadoras].forEach((el) => {
  //   el.addEventListener("click", () => toggleModaldesafiadoras());
  // });

  /*Modal Comunicação Não-Violenta*/
  const Opencomunicacao = document.querySelector("#open-modal-comunicacao");
  const Closecomunicacao = document.querySelector("#close-modal-comunicacao");
  const Modalcomunicacao = document.querySelector("#modal-comunicacao");
  const formComunicacao = document.querySelector("#formComunicacao");

  formComunicacao.addEventListener("submit", (event) => {
    event.preventDefault();
    Modalcomunicacao.classList.add("hide");
    fade.classList.add("hide")
    toggleModalObrigado();
  });

  const toggleModalcomunicacao = () => {
    Modalcomunicacao.classList.toggle("hide");
    fade.classList.toggle("hide");
  };

  Closecomunicacao.addEventListener("click", toggleModalcomunicacao)
  Opencomunicacao.addEventListener("click", toggleModalcomunicacao)
  // [Opencomunicacao, Closecomunicacao, Modalcomunicacao].forEach((el) => {
  //   el.addEventListener("click", () => toggleModalcomunicacao());
  // });

  const formContato = document.querySelector("#formContato");

  formContato.addEventListener("submit", (event) => {
    event.preventDefault();
    toggleModalObrigado();
  });
})()