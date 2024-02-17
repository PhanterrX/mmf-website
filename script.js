/** @format */

const slider = document.querySelector(".slider");

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);

const swiper = document.querySelector('.swiper');
const cardsWrapper = document.querySelector('.cards-wrapper');

let isDragging = false;
let startPosition = 0;
let currentIndex = 0;
let startTranslate = 0;
let cardWidth = 0;

swiper.addEventListener('mousedown', startSwipe);
swiper.addEventListener('touchstart', startSwipe);

swiper.addEventListener('mousemove', swipe);
swiper.addEventListener('touchmove', swipe);

swiper.addEventListener('mouseup', endSwipe);
swiper.addEventListener('touchend', endSwipe);

window.addEventListener('resize', () => {
  cardWidth = document.querySelector('.card').offsetWidth;
});

function startSwipe(event) {
  if (event.type === 'touchstart') {
    startPosition = event.touches[0].clientX;
  } else {
    startPosition = event.clientX;
  }
  startTranslate = -currentIndex * cardWidth;
  isDragging = true;
}

function swipe(event) {
  if (!isDragging) return;
  event.preventDefault();

  let currentPosition;
  if (event.type === 'touchmove') {
    currentPosition = event.touches[0].clientX;
  } else {
    currentPosition = event.clientX;
  }

  const diff = currentPosition - startPosition;
  cardsWrapper.style.transform = `translateX(${startTranslate + diff}px)`;
}

function endSwipe(event) {
  if (!isDragging) return;

  let endPosition;
  if (event.type === 'touchend') {
    endPosition = event.changedTouches[0].clientX;
  } else {
    endPosition = event.clientX;
  }

  const diff = endPosition - startPosition;
  const threshold = cardWidth / 4;

  if (Math.abs(diff) > threshold) {
    if (diff > 0 && currentIndex > 0) {
      currentIndex--;
    } else if (diff < 0 && currentIndex < document.querySelectorAll('.card-grid-space').length - 1) {
      currentIndex++;
    }
  }

  cardsWrapper.style.transition = 'transform 0.5s ease';
  cardsWrapper.style.transform = `translateX(${-currentIndex * cardWidth}px)`;

  setTimeout(() => {
    cardsWrapper.style.transition = '';
  }, 500);

  isDragging = false;
}

// Initial setup
window.dispatchEvent(new Event('resize'));