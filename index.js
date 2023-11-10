"use strict";

const carouselControls = document.querySelectorAll(".carouselControl");
const carouselIndicators = document.querySelectorAll(".carouselIndicator");

function deactivateActivateCarouselIndicator(carousel) {
  const activeCarouselIndicator = carousel.querySelector(
    ".carouselIndicator.active",
  );
  activeCarouselIndicator.classList.remove("active");
  activeCarouselIndicator.innerHTML = "&#9898;";
}

function activateCarouselIndicator(carousel, index) {
  const newActiveCarouselIndicator = carousel.querySelector(
    `.carouselIndicator[data-move-to="${index}"]`,
  );
  newActiveCarouselIndicator.classList.add("active");
  newActiveCarouselIndicator.innerHTML = "&#9899;";
}

function handleCarouselControlClick(e) {
  const carousel = document.querySelector(e.target.dataset.target);
  const carouselItems = carousel.querySelectorAll(".carouselItem");
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
  deactivateActivateCarouselIndicator(carousel);
  activateCarouselIndicator(carousel, newActiveCarouselItemIndex);
}

function handleCarouselIndicatorClick(e) {
  const carousel = document.querySelector(e.target.dataset.target);
  const carouselItems = carousel.querySelectorAll(".carouselItem");
  const newActiveCarouselItemIndex = e.target.dataset.moveTo;
  const activeCarouselItem = carousel.querySelector(".carouselItem.active");
  const newActiveCarouselItem = carouselItems[newActiveCarouselItemIndex];
  activeCarouselItem.classList.remove("active");
  newActiveCarouselItem.classList.add("active");
  deactivateActivateCarouselIndicator(carousel);
  activateCarouselIndicator(carousel, newActiveCarouselItemIndex);
}

for (const carouselControl of carouselControls) {
  carouselControl.addEventListener("click", handleCarouselControlClick);
}

for (const carouselIndicator of carouselIndicators) {
  carouselIndicator.addEventListener("click", handleCarouselIndicatorClick);
}
