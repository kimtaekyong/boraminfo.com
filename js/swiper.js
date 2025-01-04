var swiper = new Swiper(".mySwiper", {
  init: true,
  initialSlide: 0,
  loopedSlides: 1,
  spaceBetween: 0,
  speed: 1200,
  loop: true,
  observer: true,  // DOM 변경 감지
  observeParents: true,  // 부모 요소 변경 감지
  autoplay: {
    delay: 4000,
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

  on: {
    init: function () {
      startProgressBar(this);
      animateText(this.params.speed);
    },
    slideChangeTransitionStart: resetProgressAndText,
    slideChangeTransitionEnd: function () {
      startProgressBar(this);
      animateText(this.params.speed);
    },
    resize: function () {
      this.update();
      if (!autoplayPaused) {
        this.autoplay.start();
      }
    }
  },
});

let autoplayPaused = false;
const autoplayBtn = document.querySelector(".autoplay-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

// 초기 아이콘 설정
if (playIcon && pauseIcon) {
  playIcon.style.display = "none";
  pauseIcon.style.display = "block";
}

// 자동재생 버튼 클릭 이벤트
if (autoplayBtn) {
  autoplayBtn.addEventListener("click", toggleAutoplay);
}

function toggleAutoplay() {
  autoplayPaused = !autoplayPaused;

  if (autoplayPaused) {
    swiper.autoplay.stop();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
    stopProgressBar();
    // resetTextAnimation();
  } else {
    swiper.autoplay.start();
    swiper.slideTo(swiper.activeIndex); // 현재 슬라이드 재활성화
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
    startProgressBar(swiper);
    // resumeTextAnimation();
  }
}

// 진행 바 시작
function startProgressBar(swiper) {
  const progressFill = document.querySelector(".progress-bar-fill");
  if (progressFill) {
    progressFill.style.transition = `width ${swiper.params.autoplay.delay}ms linear`;
    progressFill.style.width = "100%";
  }
}

// 진행 바 멈춤
function stopProgressBar() {
  const progressFill = document.querySelector(".progress-bar-fill");
  if (progressFill) {
    progressFill.style.transition = "none";
    progressFill.style.width = "0%";
  }
}

// 텍스트 애니메이션 설정
function animateText(speed) {
  const activeSlide = document.querySelector(' .slide-text-animated');
  if (activeSlide) {
    setSlideTextAnimation(activeSlide, speed);
  }
}

// 텍스트 애니메이션 초기화
function resetTextAnimation() {
  const activeSlide = document.querySelector(' .slide-text-animated');
  if (activeSlide) {
    activeSlide.querySelectorAll('h4').forEach(title => title.classList.remove('active'));
  }
}

// 텍스트 애니메이션 재개
function resumeTextAnimation() {
  animateText(swiper.params.speed);
}

// 진행 바 및 텍스트 리셋
function resetProgressAndText() {
  stopProgressBar();
  resetTextAnimation();
}

// 텍스트 애니메이션 세부 설정
function setSlideTextAnimation(activeSlide, speed) {
  const titles = activeSlide.querySelectorAll('h4');
  titles.forEach(title => title.classList.remove('active'));

  ['first-title', 'middle-title', 'last-title'].forEach((cls, idx) => {
    const title = activeSlide.querySelector(`.${cls}`);
    if (title) {
      setTimeout(() => title.classList.add('active'), speed * (0.1 * (idx + 1)));
    }
  });
}
