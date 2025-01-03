var swiper = new Swiper(".mySwiper", {
  init: true,
  initialslide: 0,
  loopedSlides: 1,
  spaceBetween: 0,
  speed: 2500,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination-number",
    clickable: true,
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {},
});
