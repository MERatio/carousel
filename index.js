const domItems = (() => {
  const carouselItems = document.querySelectorAll('.carousel-item');
  const carouselControls = document.querySelectorAll('.carousel-control');
  const carouselIndicators = document.querySelectorAll('.carousel-indicator');

  return {
    carouselItems,
    carouselControls,
    carouselIndicators,
  };
})();

const state = (() => {
  let index = 0;
  const carouselItemsLength = domItems.carouselItems.length;

  const getCarouselItemsLength = () => carouselItemsLength;

  const getIndex = () => index;

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      index = carouselItemsLength - 1;
    } else if (newIndex > carouselItemsLength - 1) {
      index = 0;
    } else {
      index = newIndex;
    }
    return index;
  };

  return {
    getIndex,
    getCarouselItemsLength,
    updateIndex,
  };
})();

const slide = (() => {
  let slideIntervalID;

  const _resetSlideInterval = () => {
    clearInterval(slideIntervalID);
    activateInterval();
  };

  const prevNext = (e) => {
    let index = state.getIndex();
    const control = e.target.dataset.control;
    index =
      control === 'prev'
        ? state.updateIndex(index - 1)
        : state.updateIndex(index + 1);
    show(index);
    _resetSlideInterval();
  };

  const indicator = (e) => {
    const index = parseInt(e.target.dataset.indicator, 10);
    show(state.updateIndex(index));
    _resetSlideInterval();
  };

  const show = (index) => {
    const carouselItems = domItems.carouselItems;
    const carouselIndicators = domItems.carouselIndicators;

    for (let i = 0; i < state.getCarouselItemsLength(); i++) {
      if (i === index) {
        carouselItems[i].classList.remove('d-none');
        carouselIndicators[i].classList.add('active-indicator');
      } else {
        carouselItems[i].classList.add('d-none');
        carouselIndicators[i].classList.remove('active-indicator');
      }
    }
  };

  const activateInterval = () => {
    slideIntervalID = setInterval(() => {
      show(state.updateIndex(state.getIndex() + 1));
    }, 5000);
  };

  return {
    prevNext,
    indicator,
    show,
    activateInterval,
  };
})();

const init = () => {
  domItems.carouselControls.forEach((carouselControl) =>
    carouselControl.addEventListener('click', slide.prevNext)
  );
  domItems.carouselIndicators.forEach((carouselIndicator) => {
    carouselIndicator.addEventListener('click', slide.indicator);
  });
  slide.show(state.getIndex());
  slide.activateInterval();
};

init();
