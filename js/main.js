document.addEventListener('DOMContentLoaded', function () {

  //  Выпадающие списки в header-bottom
  function controlDropdows() {
    const dropdownLinks = document.querySelectorAll('.header-bottom-nav__btn');
    dropdownLinks.forEach((dropdownLink) => {
      dropdownLink.addEventListener('click', (event) => {
        event.stopImmediatePropagation();
        const dropdown = dropdownLink.nextElementSibling;
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
          dropdownLink.classList.remove('rotait');
        } else {
          closeDropdowns();
          dropdown.classList.add('open');
          dropdownLink.classList.add('rotait');
          getLink(dropdown);
        };
      });
    });

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('dropdown__container')) {
        return;
      } else {
        closeDropdowns();
      }
    });

  };

  function closeDropdowns() {
    const dropdownLinks = document.querySelectorAll('.header-bottom-nav__btn');
    dropdownLinks.forEach((dropdownLink) => {
      dropdownLink.classList.remove('rotait');
      dropdownLink.nextElementSibling.classList.remove('open');
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
  const hero = document.querySelector('.hero');
  const termId = setInterval(() => {
    let indexImage = hero.dataset.image;
    hero.classList.remove(`hero_img${indexImage}`);
        if (indexImage == 3) {
      indexImage = 1;
    } else {
      ++indexImage;
    };
    hero.classList.add(`hero_img${indexImage}`);
    hero.setAttribute('data-image', indexImage);
  }, 8000);


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
      1920: {
        slidesPerView: 3,
        slidesPerColumnFill: 'row',
        slidesPerColumn: 2,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    }
  });


  // Плавный скрол к секции по нажатию на навигацию верхнего меню
  function smoothScrollToAnchor() {
    const linksToSections = document.querySelectorAll('[data-path]');
    linksToSections.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = link.dataset.path
        showSection(path);
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
  let mySwiperEditions = new Swiper('.editions-swiper-container', {
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


      1920: {
        slidesPerView: 3,
        spaceBetween: 50,
        // slidesPerGroup: 3,
      },
    }
  });

  // Слайдер в Projects
  let mySwiperProjects = new Swiper('.projects-swiper-container', {
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
      1920: {
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
      center: [55.760081, 37.7223],
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
  function validateForm(selector, rules) {
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

      submitHandler: function (form, values, ajax) {
        const formData = new formData(form);
        console.log(formData);
        fetch('../mail.php', {
          method: 'POST',
          body: formData,
        })
          .then(function (data) {
            // console.log(data);
            // console.log('Отправлено');
            form.reset();
          });
      },
    });
  };

  validateForm('.contacts', {
    name: {
      required: true,
    },
    tel: {
      required: true,
    },
  })

});