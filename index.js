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
  const prevNext = (e) => {
    let index = state.getIndex();
    const control = e.target.dataset.control;
    index =
      control === 'prev'
        ? state.updateIndex(index - 1)
        : state.updateIndex(index + 1);
    show(index);
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

  return {
    prevNext,
    show,
  };
})();

const init = () => {
  domItems.carouselControls.forEach((carouselControl) =>
    carouselControl.addEventListener('click', slide.prevNext)
  );
  slide.show(state.getIndex());
};

init();
