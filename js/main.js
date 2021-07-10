document.addEventListener('DOMContentLoaded', function () {

  //  Выпадающие списки в header-bottom

  let link = document.querySelectorAll('.bottom-menu__link');

  for (i = 0; i < link.length; i++) {
    let subMenu = link[i].nextElementSibling;
    let thisLink = link[i];
    console.log(subMenu);
    console.log(thisLink);

    link[i].addEventListener('click', function () {

      if (subMenu.classList.contains('open')) {
        subMenu.classList.remove('open');
        if (thisLink.classList.contains('rotait')) {
          thisLink.classList.remove('rotait');
        };
        return;
      };

      const openedList = document.querySelector('.open');
      rotaitFigure = document.querySelector('.rotait');
      if (openedList) {
        openedList.classList.remove('open')
      };

      if (rotaitFigure) {
        rotaitFigure.classList.remove('rotait')
      };

      subMenu.classList.add('open');
      thisLink.classList.add('rotait');

    });
  };

  // Скроллы в выпадающих списках в header-bottom

  document.querySelectorAll('.bottom-menu__dropdown').forEach(el => {
    new SimpleBar(el)
  });


  // Селект в Gallery

  const selectGallery = () => {
    const item = document.querySelector('.gallery-select');
    const choices = new Choices(item, {
      searchEnabled: false,
      itemSelectText: '',
      sorter: function (a, b) {
      },
    });
  };

  selectGallery();

  // Слайдер в Gallery
  const slider = document.querySelector('.swiper-container');

  let mySwiper = new Swiper(slider, {
    slidesPerView: 3,
    slidesPerColumn: 2,
    slidesPerGroup: 3,
    spaceBetween: 50,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });





})
