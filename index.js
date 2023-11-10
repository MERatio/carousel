"use strict";

const carouselControls = document.querySelectorAll(".carouselControl");
const carouselItems = document.querySelectorAll(".carouselItem");

function handleCarouselControlClick(e) {
  const carousel = document.querySelector(e.target.dataset.target);
  const indexPad = e.target.classList.contains("carouselControlPrev") ? -1 : 1;
  const activeCarouselItem = carousel.querySelector(".carouselItem.active");
  const activeCarouselItemIndex = [...carouselItems].indexOf(
    activeCarouselItem,
  );
  let newActiveCarouselItemIndex = activeCarouselItemIndex + indexPad;
  if (newActiveCarouselItemIndex <= -1) {
    newActiveCarouselItemIndex = carouselItems.length - 1;
  } else if (newActiveCarouselItemIndex >= carouselItems.length) {
    newActiveCarouselItemIndex = 0;
  }

  const newActiveCarouselItem = carouselItems[newActiveCarouselItemIndex];
  activeCarouselItem.classList.remove("active");
  newActiveCarouselItem.classList.add("active");
}

for (const carouselControl of carouselControls) {
  carouselControl.addEventListener("click", handleCarouselControlClick);
}
