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
  const linksToSections = document.querySelectorAll('[data-path]');
  console.log(linksToSections);
  linksToSections.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      // console.log(link);
      const path = link.dataset.path
      showSection(path);
    });
  });

  function showSection(path) {
    console.log(path);
    const targetSection = document.getElementById(path);
    console.log(targetSection);
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  $(function () {
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
          } else {
            catalog.classList.remove('tab-content_active');
          };
        });
        
        $(".accordion").accordion("refresh"); // обновление аккордиона
      });
    });
  });

});