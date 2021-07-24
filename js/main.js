document.addEventListener('DOMContentLoaded', function () {

  //  Выпадающие списки в header-bottom
  function controlDropdows() {
    const dropdownLinks = document.querySelectorAll('.header-bottom-nav__link');
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
      // console.log('target', event.target);
      // console.log('this', event.this);

      if (event.target.classList.contains('dropdown__container')) {
        // console.log('Yes')
        return;
      } else {
        // console.log('No')
        closeDropdowns();
      }
    });

  };

  function closeDropdowns() {
    const dropdownLinks = document.querySelectorAll('.header-bottom-nav__link');
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

      link.addEventListener('keydown', (event) => {
        event.preventDefault();
        if (event.code = 'Enter') {
          closeDropdowns();
        };
      });
    });

  };

  controlDropdows();


  // Скроллы в выпадающих списках в header-bottom
  document.querySelectorAll('.dropdown__list').forEach(el => {
    new SimpleBar(el)
  });


  // Селект в Gallery
  const selectGallery = () => {
    const item = document.querySelector('.gallery__select');
    const choices = new Choices(item, {
      searchEnabled: false,
      itemSelectText: '',
      sorter: function (a, b) {
      },
    });
  };

  selectGallery();

  // Слайдер в Gallery
  const slider = document.querySelector('.gallery__swiper-container');

  let mySwiper = new Swiper(slider, {
    slidesPerView: 3,
    slidesPerColumnFill: 'row',
    slidesPerColumn: 2,
    slidesPerGroup: 3,
    spaceBetween: 50,
    direction: 'horizontal',
    pagination: {
      el: '.gallery__swiper-pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.gallery__swiper-button-next',
      prevEl: '.gallery__swiper-button-prev',
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
    // console.log(linksToSections);
    linksToSections.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log(link);
        const path = link.dataset.path
        showSection(path);
      });
    });

    function showSection(path) {
      // console.log(path);
      const targetSection = document.getElementById(path);
      // console.log(targetSection);
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
      // const activeCatalog = document.querySelector('.tab-content_active');
      const artistBtns = activeCatalog.querySelectorAll('.accordion__btn');
      artistBtns.forEach((artistBtn) => {
        artistBtn.addEventListener('click', (event) => {
          artistBtns.forEach((button) => {
            button.classList.remove('accordion__btn-active');
          });
          artistBtn.classList.add('accordion__btn-active');
          showArtistCard(activeCatalog);
        })
      });
    }

    function showArtistCard(activeCatalog) {
      const activeArtistBtn = activeCatalog.querySelector('.accordion__btn-active');
      // console.log(activeArtistBtn);
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

      fullNameElement.classList.add('artist-card__name', 'title_reset');
      fullNameElement.textContent = artistData.fullName;

      periodOfLifeElement.classList.add('artist-card__dates');
      periodOfLifeElement.textContent = artistData.periodOfLife;

      infoElement.classList.add('artist-card__info', 'p_reset');
      infoElement.innerHTML = artistData.info;

      cardElement.append(imgElement);
      cardElement.append(fullNameElement);
      cardElement.append(periodOfLifeElement);
      cardElement.append(infoElement);

      if (!artistData.periodOfLife) {
        const linkElement = document.createElement('a');
        linkElement.classList.add('artist-card__link', 'link_reset');
        linkElement.setAttribute('data-path', 'gallery');
        linkElement.innerHTML = `В&nbsp;галерею`;

        cardElement.append(linkElement);
        smoothScrollToAnchor();
      };
    };

  });

});