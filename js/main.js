document.addEventListener('DOMContentLoaded', function () {
  const DELAY_TIME = 300;
  const overlay = document.querySelector('.overlay');
  const siteContainer = document.querySelector('.site-container');
  const burger = siteContainer.querySelector('.burger');
  const burgerMenu = siteContainer.querySelector('.menu-touchscreen');
  const burgerMenuCloseBtn = burgerMenu.querySelector('.header-nav-btn-close');


  //  Выпадающие списки в header-bottom
  function controlDropdows() {
    const dropdownButtons = siteContainer.querySelectorAll('.header-bottom-nav__btn');

    dropdownButtons.forEach((dropdownButton) => {
      dropdownButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const dropdown = dropdownButton.nextElementSibling;
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
          dropdownButton.classList.remove('rotait');
        } else {
          closeDropdowns();
          dropdown.classList.add('open');
          dropdownButton.classList.add('rotait');
          getLink(dropdown);
        };
      });
    });

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('dropdown__container')) {
        return;
      } else {
        closeDropdowns();
      };
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDropdowns();
      }
    });

  };

  function closeDropdowns() {
    const dropdownButtons = document.querySelectorAll('.header-bottom-nav__btn');
    dropdownButtons.forEach((dropdownButton) => {
      dropdownButton.classList.remove('rotait');
      dropdownButton.nextElementSibling.classList.remove('open');
    });
  };

  function getLink(dropdown) {
    const dropdownLiks = dropdown.querySelectorAll('.dropdown__link');
    dropdownLiks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        closeDropdowns();
      });
    });
  };

  controlDropdows();


  // Скроллы в выпадающих списках в header-bottom
  document.querySelectorAll('.dropdown__list').forEach(el => {
    new SimpleBar(el)
  });

  // Смена картинок в Hero
  // Слайдер
  const swiper1 = new Swiper('.hero-swiper-container', {
    direction: 'horizontal',
    loop: true,
    effect: 'fade',
    pagination: {
      el: false,
    },
    autoplay: {
      delay: 8000,
    },
  });


  // Селект в Gallery
  const selectGallery = () => {
    const item = document.querySelector('.gallery-filter__select');
    const choices = new Choices(item, {
      searchEnabled: false,
      itemSelectText: '',
      sorter: function (a, b) {
      },
    });
  };

  selectGallery();


  // Слайдер в Gallery
  const mySwiperGallery = new Swiper('.gallery-swiper-container', {
    slidesPerView: 3,
    slidesPerColumnFill: 'row',
    slidesPerColumn: 2,
    slidesPerGroup: 3,
    spaceBetween: 50,
    direction: 'horizontal',

    pagination: {
      el: '.gallery-button__pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {

      300: {
        slidesPerView: 1,
        // slidesPerColumnFill: 'column',
        slidesPerColumn: 1,
        // spaceBetween: 10,
        slidesPerGroup: 1,
      },

      577: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 36,
        slidesPerGroup: 2,
      },

      769: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      1025: {
        slidesPerView: 3,
        // slidesPerColumnFill: 'row',
        slidesPerColumn: 2,
        spaceBetween: 45,
        slidesPerGroup: 3,
      },
    }
  });


  // Модальное окно в Галерее (инф о картине)
  // const siteContainer = document.querySelector('.site-container');
  const modal = document.querySelector('.modal');
  const modalPictureCard = modal.querySelector('.modal-picture-card');
  const openPictureCardButtons = siteContainer.querySelectorAll('.gallery-swiper-slide');
  let previousActiveElement = null;

  openPictureCardButtons.forEach((openPictureCardButton) => {
    openPictureCardButton.addEventListener('click', (event) => {
      const imgElement = event.currentTarget.querySelector('.gallery-slide__img');
      const pictureImgSrc = imgElement.getAttribute('src');
      const pictureImgAlt = imgElement.getAttribute('alt');
      const pictureWrapper = modalPictureCard.querySelector('.modal-picture-info__left');
      const pictureElement = document.createElement('img');
      pictureElement.classList.add('modal-picture-info__img');
      pictureElement.setAttribute('src', pictureImgSrc);
      pictureElement.setAttribute('alt', pictureImgAlt);
      pictureWrapper.append(pictureElement);
      const pagePosition = openModal(modalPictureCard);
      controlModal(modalPictureCard, pagePosition);
    })
  });

  function controlModal(modalElement, pagePosition) {
    modal.addEventListener('click', clickCloseButtonHandler);

    window.addEventListener('keydown', keydownCloseHandler);

    function clickCloseButtonHandler(ev) {
      const clickedElement = ev.target;
      if (clickedElement.classList.contains('modal') || clickedElement.classList.contains('modal-close-btn')) {
        closeModal(modalElement, pagePosition);
        deleteEvents();
      };
    };

    function keydownCloseHandler(e) {
      if (e.key === 'Escape') {
        if (modal.classList.contains('is-open')) {
          closeModal(modalElement, pagePosition);
          deleteEvents();
        };
      };
    };

    function deleteEvents() {
      modal.removeEventListener('click', clickCloseButtonHandler);

      window.removeEventListener('keydown', keydownCloseHandler);
    };
  };


  function openModal(modalContainer) {
    previousActiveElement = document.activeElement;
    modal.classList.add('is-open');
    const pagePosition = disableScroll();
    modalContainer.classList.add('modal-open');
    setTimeout(() => {
      modalContainer.classList.add('animate-open');
      modalContainer.querySelector('.modal-close-btn').focus();
    }, 300);

    Array.from(siteContainer.children).forEach((child) => {
      child.inert = true;
    });

    return pagePosition;
  };

  function closeModal(modalElement, pagePosition) {
    // console.log('Закрытие окна');
    modalElement.classList.remove('animate-open');
    setTimeout(() => {
      modal.classList.remove('is-open');
      modalElement.classList.remove('modal-open');
      const imgElement = modalElement.querySelector('.modal-picture-info__img');
      console.log(imgElement);
      if (imgElement) {
        console.log("Deleted Img");
        imgElement.remove();
      };
      enableScroll(pagePosition);
      previousActiveElement.focus();
      previousActiveElement = null;
    }, 300);

    Array.from(siteContainer.children).forEach((child) => {
      child.inert = false;
    });
  };

  function disableScroll() {
    const pagePosition = window.scrollY;
    lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.style.top = -pagePosition + 'px';
    return pagePosition;
  };

  function enableScroll(pagePosition) {
    unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute('data-position');
  };

  const fixBlocks = document.querySelectorAll('.fix-block');

  function lockPadding() {
    const paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    fixBlocks.forEach((fixBlock) => {
      fixBlock.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  };

  function unlockPadding() {
    fixBlocks.forEach((fixBlock) => {
      fixBlock.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  };


  // Плавный скрол к секции по нажатию на навигацию верхнего меню
  function smoothScrollToAnchor() {
    const linksToSections = document.querySelectorAll('[data-path]');
    linksToSections.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        if (burgerMenu.classList.contains('menu-touchscreen_visible')) {
          hideBurgerMenu();
        };
        setTimeout(() => {
          const path = link.dataset.path;
          showSection(path);
        }, 150);
      });
    });

    function showSection(path) {
      const targetSection = document.getElementById(path);
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
  };

  smoothScrollToAnchor();


  // Табы в Каталоге, рефреш аккордиона
  $(function () {

    const artistData = {
      imgLink: './img/catalog_unknow_artist.svg',
      imgAlt: 'Здесь должен быть портрет выбранного художника',
      fullName: 'Что мы о нём знаем?',
      periodOfLife: null,
      info: `Пока ничего... Зато мы&nbsp;точно знаем, что в&nbsp;галерее есть на&nbsp;что посмотреть!`,
    };

    const currentArtistData = {
      imgLink: './img/catalog_girlandayo1.jpg',
      imgAlt: 'Портрет художника Доменико Гирландайо',
      fullName: 'Доменико Гирландайо',
      periodOfLife: '2 июня 1448 — 11 января 1494.',
      info: `Один из&nbsp;ведущих флорентийских художников Кватроченто,
      основатель художественной династии, которую продолжили его брат Давид и&nbsp;сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в&nbsp;течение года овладевал профессиональными навыками. Автор фресковых циклов, в&nbsp;которых выпукло, со&nbsp;всевозможными подробностями показана домашняя жизнь библейских персонажей (в&nbsp;их&nbsp;роли выступают знатные граждане Флоренции в&nbsp;костюмах того времени).`,
    };

    const activeCatalog = document.querySelector('.tab-content_active');
    showArtistCard(activeCatalog);
    setEventsOnArtistBtns(activeCatalog);


    const catalogOpenButtons = document.querySelectorAll('.tabs__btn');
    catalogOpenButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        catalogOpenButtons.forEach((button) => {
          button.classList.remove('tabs__btn_active');
        });
        button.classList.add('tabs__btn_active');

        const catalogs = document.querySelectorAll('.tab-content');
        catalogs.forEach((catalog) => {
          if (catalog.dataset.catalog == button.dataset.catalog) {
            catalog.classList.add('tab-content_active');
            showArtistCard(catalog);
            setEventsOnArtistBtns(catalog);
          } else {
            catalog.classList.remove('tab-content_active');
          };
        });

        $(".accordion").accordion("refresh"); // обновление аккордиона

      });
    });

    function setEventsOnArtistBtns(activeCatalog) {
      const artistBtns = activeCatalog.querySelectorAll('.accordion__btn');
      artistBtns.forEach((artistBtn) => {
        artistBtn.addEventListener('click', (event) => {
          artistBtns.forEach((button) => {
            button.classList.remove('accordion__btn_active');
          });
          artistBtn.classList.add('accordion__btn_active');
          showArtistCard(activeCatalog);
        })
      });
    }

    function showArtistCard(activeCatalog) {
      const activeArtistBtn = activeCatalog.querySelector('.accordion__btn_active');
      if (activeArtistBtn) {
        if (activeArtistBtn.dataset.artist == 'Гирландайо') {
          createArtistCard(currentArtistData, activeCatalog);
          return;
        }
      };
      createArtistCard(artistData, activeCatalog);
    };

    function createArtistCard(artistData, activeCatalog) {
      const cardElement = activeCatalog.querySelector('.artist-card');
      cardElement.innerHTML = '';
      const imgElement = document.createElement('img');
      const fullNameElement = document.createElement('h3');
      const periodOfLifeElement = document.createElement('span');
      const infoElement = document.createElement('p');

      imgElement.classList.add('artist-card__img');
      imgElement.setAttribute('src', artistData.imgLink);
      imgElement.setAttribute('alt', artistData.imgAlt);

      fullNameElement.classList.add('artist-card__name', 'title-reset');
      fullNameElement.textContent = artistData.fullName;

      periodOfLifeElement.classList.add('artist-card__dates');
      periodOfLifeElement.textContent = artistData.periodOfLife;

      infoElement.classList.add('artist-card__info', 'p-reset');
      infoElement.innerHTML = artistData.info;

      cardElement.append(imgElement);
      cardElement.append(fullNameElement);
      cardElement.append(periodOfLifeElement);
      cardElement.append(infoElement);

      if (!artistData.periodOfLife) {
        const linkElement = document.createElement('a');
        linkElement.classList.add('artist-card__link', 'link-reset');
        linkElement.setAttribute('data-path', 'gallery');
        linkElement.innerHTML = `В&nbsp;галерею`;
        cardElement.append(linkElement);
        smoothScrollToAnchor();
      };
    };
  });

  // Слайдер в Events
  const eventsSlider = siteContainer.querySelector('.events-swiper-container')
  let mySwiperEvents;

  function setEventsSlider() {
    // console.log(window.innerWidth);
    // console.log(eventsSlider.dataset.mobile);
    if (window.innerWidth < 577 && eventsSlider.dataset.mobile == "false") {
      // console.log("Начинаем!")
      mySwiperEvents = new Swiper(eventsSlider, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        pagination: {
          el: '.events-swiper-pagination',
          type: 'bullets',
        },
      });

      eventsSlider.dataset.mobile = "true";

    };

    if (window.innerWidth > 576) {
      eventsSlider.dataset.mobile = "false";

      if (eventsSlider.classList.contains('swiper-container-initialized')) {
        // console.log('Есть свайпер');
        mySwiperEvents.destroy();
      };
    };
  };

  setEventsSlider();


  // Закрываем и открываем События
  const eventsItems = document.querySelectorAll('.events__item')
  // eventsItems.forEach((eventItem, index) => {
  // if (index > 2) {
  // eventItem.classList.add('events__item_invisible');
  // }
  // })

  const eventButton = document.querySelector('.event__btn')

  eventButton.addEventListener('click', (event) => {
    eventsItems.forEach((eventItem) => {
      eventItem.classList.add('events__item_visible');
    });
    eventButton.classList.add('event__btn-invisible');
  });


  // Слайдер в Editions
  const editionsSlider = siteContainer.querySelector('.editions-swiper-container');
  let mySwiperEditions;

  function setEditionsSlider() {
    if (window.innerWidth > 576) {
      editionsSlider.dataset.mobile == "false";
      mySwiperEditions = new Swiper(editionsSlider, {
        slidesPerView: 3,
        spaceBetween: 50,
        // slidesPerGroup: 3,
        // direction: 'horizontal',
        pagination: {
          el: '.editions-button__pagination',
          type: 'fraction',
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {

          // 150: {
          // slidesPerView: 1,
          // spaceBetween: 10,
          // },


          577: {
            slidesPerView: 2,
            spaceBetween: 36,
          },

          769: {
            slidesPerView: 2,
            spaceBetween: 50,
          },

          1025: {
            slidesPerView: 3,
            spaceBetween: 50,
            // slidesPerGroup: 3,
          },
        },
      });
    };

    if (window.innerWidth < 577 && editionsSlider.dataset.mobile == "false") {
      editionsSlider.dataset.mobile = "true";

      if (editionsSlider.classList.contains('swiper-container-initialized')) {
        mySwiperEditions.destroy();
      };

    };
  };

  setEditionsSlider();


  // Слайдер в Projects
  const mySwiperProjects = new Swiper('.projects-swiper-container', {
    slidesPerView: 3,
    spaceBetween: 50,
    slidesPerGroup: 3,
    // cssMode: true,
    navigation: {
      nextEl: ".projects-button__next",
      prevEl: ".projects-button__prev",
    },
    pagination: {
      // el: ".projects__swiper-pagination",
    },
    // mousewheel: true,
    // keyboard: true,

    breakpoints: {

      150: {
        slidesPerView: 1,
        spaceBetween: 20,
        slidesPerGroup: 1,
      },


      577: {
        slidesPerView: 2,
        spaceBetween: 34,
        slidesPerGroup: 2,
      },

      769: {
        slidesPerView: 2,
        spaceBetween: 50,
        slidesPerGroup: 2,
      },

      1025: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    }
  });


  // Map
  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      center: [55.761497, 37.614109],
      // center: [55.760081, 37.7223],
      zoom: 14,
      controls: [],
    });

    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/contacts_mark.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0]
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier', 'scrollZoom']);
  };


  // InputMask
  const phoneInput = document.querySelector('input[type="tel"]');
  const im = new Inputmask("+7 (999) 999-99-99");
  im.mask(phoneInput);

  // Validate
  function validateForm(selector, rules, successModal) {
    new window.JustValidate(selector, {
      rules: rules,

      messages: {
        name: {
          required: 'Пожалуйста, напишите своё имя',
        },
        tel: {
          required: 'Пожалуйста, напишите свой телефон',
        },
      },

      colorWrong: '#D11616',

      submitHandler: function (form) {
        console.log(form);

        let formData = new FormData(form);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
              console.log(successModal);
              const modalElement = modal.querySelector(successModal);
              const pagePosition = openModal(modalElement);
              controlModal(modalElement, pagePosition);
            };
          };
        };

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        form.reset();
      },
    });
  };

  validateForm('.contacts-form', {
    name: {
      required: true,
    },
    tel: {
      required: true,
    },
  }, '.modal-alert');


  // Оформление стилей для устройств с шириной экрана < 1024

  const currentInnerWidth = window.innerWidth;
  const gallerySwiper = document.querySelector('.gallery-swiper-container');
  const editionsSwiper = document.querySelector('.editions-swiper-container');

  if (currentInnerWidth > 1024) {
    gallerySwiper.classList.add('swiper-no-swiping'); // Запрещаем свайпинг у слайдеров
    editionsSwiper.classList.add('swiper-no-swiping'); // Запрещаем свайпинг у слайдеров
    // burgerMenu.inert = false;
    // inertElements.forEach((el) => {
    // el.inert = true;
    // });
  };

  window.addEventListener('resize', (event) => {

    mySwiperGallery.update();
    setEventsSlider();
    setEditionsSlider();
    // mySwiperEditions.update();
    mySwiperProjects.update();


    if (window.innerWidth > 1024) {
      gallerySwiper.classList.add('swiper-no-swiping');
      editionsSwiper.classList.add('swiper-no-swiping');
      // burgerMenu.inert = false;
      // inertElements.forEach((el) => {
      // el.inert = true;
      // });
    } else if (window.innerWidth < 1025) {
      gallerySwiper.classList.remove('swiper-no-swiping');
      editionsSwiper.classList.remove('swiper-no-swiping');
      // burgerMenu.inert = true;
      // inertElements.forEach((el) => {
      // el.inert = false;
      // });
    };
  });


  // Открытие бургера
  const inertElements = getInertElements(burgerMenu, siteContainer);
  let pagePosition = null;
  let burgerSimpleBar = null;

  burgerMenuCloseBtn.inert = true;

  // burgerMenu.inert = true;

  burger.addEventListener('click', showBurgerMenu);
  burgerMenuCloseBtn.addEventListener('click', ckickMenuCloseBtnHandler);
  overlay.addEventListener('click', clickOverlayHandler);
  window.addEventListener('keydown', keydownHandler);

  function clickOverlayHandler() {
    hideBurgerMenu();
  }

  function keydownHandler(event) {
    if (event.key === 'Escape') {
      if (burgerMenu.classList.contains('menu-touchscreen_visible')) {
        hideBurgerMenu();
      };
    };
  };


  function showBurgerMenu() {
    previousActiveElement = document.activeElement;
    // console.log(previousActiveElement);

    burgerMenuCloseBtn.inert = false;

    inertElements.forEach((el) => {
      el.inert = true;
    });

    showOverlay();

    pagePosition = disableScroll();

    burgerMenu.classList.add('menu-touchscreen_visible');

    // burgerSimpleBar = new SimpleBar(burgerMenu);

    setTimeout(() => {
      burgerMenu.classList.add('menu-touchscreen_animate');
      burgerMenuCloseBtn.focus();
      // console.log(document.activeElement);
    }, 100);

  };



  function ckickMenuCloseBtnHandler(event) {
    const clickedElement = event.target;
    // console.log(clickedElement);
    if (clickedElement.classList.contains('overlay') || clickedElement === burgerMenuCloseBtn) {
      hideBurgerMenu();
    };
  };

  function hideBurgerMenu() {

    inertElements.forEach((el) => {
      el.inert = false;
    });

    burgerMenuCloseBtn.inert = true;

    enableScroll(pagePosition);

    // burgerSimpleBar.unMount();

    burgerMenu.classList.remove('menu-touchscreen_animate');


    hideOverlay();

    // burgerMenu.inert = true;

    // inertElements.forEach((el) => {
    // el.inert = false;
    // });

    // console.log(previousActiveElement);

    setTimeout(() => {
      burgerMenu.classList.remove('menu-touchscreen_visible');
      previousActiveElement.focus();
      previousActiveElement = null;
      // console.log(document.activeElement);
    }, 100);
  };

  function showOverlay() {
    overlay.classList.add('overlay-visible');
  }

  function hideOverlay() {
    overlay.classList.remove('overlay-visible');
  }

  function getInertElements(element, container) {  // Получает все соседние элементы родителей от element до container
    const siblingsElements = [];
    while (element !== container) {
      siblingsElements.push(...(getSiblings(element)));
      element = element.parentElement;
    };

    return siblingsElements;
  };

  function getSiblings(elem) {  // Получает все соседние элементы от elem
    const siblings = [];
    let sibling = elem;
    while (sibling.previousSibling) {
      sibling = sibling.previousSibling;
      sibling.nodeType == 1 && siblings.push(sibling);
    };

    sibling = elem;
    while (sibling.nextSibling) {
      sibling = sibling.nextSibling;
      sibling.nodeType == 1 && siblings.push(sibling);
    };

    return siblings;
  };



});
