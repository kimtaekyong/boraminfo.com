document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const heroSection = document.getElementById('swiper-silde');

    const updateHeader = () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom;

        if (heroBottom <= 0) {
            header.classList.add('active');
        } else {
            header.classList.remove('active');
        }
    };

    window.addEventListener('scroll', updateHeader);
    window.addEventListener('resize', updateHeader);  // 화면 크기 변경 시도 반영
    updateHeader();  // 초기 로드 시 상태 업데이트
});
