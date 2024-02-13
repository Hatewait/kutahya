document.addEventListener("DOMContentLoaded", () => {
  const swiperIntro = new Swiper('[data-intro-swiper]', {
    loop: true,
    //releaseOnEdges: true,
    //autoplay: true,
    speed: 900,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 16,
      },

      728: {
        slidesPerView: 2,
        spaceBetween: 24,
      },

      991: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    }
  });

  let y = 0; // Initialize a variable to keep track of the scroll position

  window.addEventListener("scroll", function(e) {
    // Check if the window has been scrolled down
    if (window.scrollY > y) {
      swiperIntro.slideNext(); // Scroll the slider to the next slide
    } else {
      swiperIntro.slidePrev(); // Scroll the slider to the previous slide
    }

    // Update the scroll position variable
    y = window.scrollY;
  });


  const swiperTabsContainers = document.querySelectorAll('[data-tabs-swiper]');
  let prevArrow = document.querySelectorAll('.bp-collections-nav__prev')
  let nextArrow = document.querySelectorAll('.bp-collections-nav__next')

  /*const swiperTabs = new Swiper('[data-tabs-swiper]', {
    loop: false,
    slidesPerView: 'auto',
    allowTouchMove: false,
    spaceBetween: 80,
    mousewheel: true,
    slideToClickedSlide: true,
    centeredSlides: false,
    navigation: {
      nextEl: '.bp-collections-nav__next',
      prevEl: '.bp-collections-nav__prev',
    }
  });
*/

  swiperTabsContainers.forEach(function (element, index) {
    let swiper = new Swiper(element, {
      loop: false,
      slidesPerView: 'auto',
      allowTouchMove: false,
      spaceBetween: 80,
      mousewheel: true,
      slideToClickedSlide: true,
      centeredSlides: false,

      navigation: {
        nextEl: nextArrow[index],
        prevEl: prevArrow[index],
      },

    });
  });


  const swiperCollectionContainers = document.querySelectorAll('[data-collection-swiper]');
  //let prevArrow = document.querySelectorAll('.bp-collections-nav__prev')
  //let nextArrow = document.querySelectorAll('.bp-collections-nav__next')

  swiperCollectionContainers.forEach(function (element, index) {
    let swiper = new Swiper(element, {
      loop: true,
      autoplay: true,
      speed: 300,

      /*navigation: {
        nextEl: nextArrow[index],
        prevEl: prevArrow[index],
      },*/

      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },

        728: {
          slidesPerView: 2,
          spaceBetween: 24,
        },

        991: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      }
    });
  });



});
