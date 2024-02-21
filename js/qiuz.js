const buttonNext = document.querySelector('[data-quiz-next]');
const buttonBack = document.querySelector('[data-quiz-back]');
const quizContainer = document.querySelector('[data-quiz-container]');
const quizSlides = document.querySelectorAll('[data-quiz-slide]');
const quizSlidesAmount = quizSlides.length;
const quizRadioElements = document.querySelectorAll('[data-quiz-elem]');
const slideInputs = quizContainer.querySelectorAll('input');
const deliveryInputs = quizContainer.querySelectorAll('[data-delivery]');

const resultElements = document.querySelectorAll('[data-quiz-result]');
const resultButtonsContainer = document.querySelector('[data-result-buttons]');
const resultsContainer = document.querySelector('[data-results-container]');
const restartQuizButton = document.querySelector('[data-quiz-restart]');
const resultLinkButton = document.querySelector('[data-quiz-details]');

const result = {
  blue_blanc: ['cafe', 'restoran', 'west', 'middle', 'small', 'big', 'bright'],
  teos: ['cafe', 'hotel', 'europe', 'mix', 'middle', 'small', 'big', 'bright'],
  tan: ['restoran', 'europe', 'asian', 'mix', 'big', 'neitral'],
  pera: ['cafe', 'restoran', 'hotel', 'europe', 'asian', 'west', 'mix', 'other', 'small', 'neitral', 'no-matter'],
  crouton: ['restoran', 'europe', 'middle', 'mix', 'neitral'],
  chef_taste_of: ['cafe', 'restoran', 'hotel', 'europe', 'asian', 'west', 'mix', 'other', 'middle', 'big', 'no-matter', 'neitral'],
  blue_stone: ['cafe', 'restoran', 'hotel', 'asian', 'europe', 'west', 'mix', 'small', 'middle', 'big', 'bright'],
  sand_wind: ['cafe', 'restoran', 'middle', 'big', 'europe', 'asian', 'west', 'mix', 'other', 'bright']
}


let state = {
  totalSlidesAmount: quizSlidesAmount,
  currentSlideIndex: 1,
  currentSlideId: quizSlides[0].getAttribute('id'),
  isSelected: false,
  selectedItems: {}
}

let deliveryState = {
  selectedValues: {}
}

const resetState = () => {
  state.currentSlideIndex = 1;
  state.currentSlideId = quizSlides[0].getAttribute('id');
  state.isSelected = false;
  state.selectedItems = {}
  deliveryState.selectedValues = {}
}

const resetDeliveryInputs = () => {
  deliveryInputs.forEach((input) => input.value = '');
}

const hideElement = (el) => el.classList.add('d-none');
const showElement = (el) => el.classList.remove('d-none');


const startQuiz = () => {
  showElement(quizContainer);
  showElement(quizSlides[0]);
  hideElement(buttonBack);
  resetDeliveryInputs();

  for (let i = 1; i < quizSlides.length; i++) {
    hideElement(quizSlides[i]);
  }
}

startQuiz();

resultElements.forEach((slide) => hideElement(slide))
hideElement(resultButtonsContainer);

const toggleDisabledAttr = () => {
  if (!state.isSelected) {
    //console.log('state is true from toggleAttr')
    buttonNext.setAttribute('disabled', 'disabled');
    buttonNext.classList.add('btn-disabled');
  } else {
    buttonNext.removeAttribute('disabled');
    buttonNext.classList.remove('btn-disabled');
  }
}

toggleDisabledAttr();


const setSelectedItemsIdToState = (currentSlide, currentInput) => {
  const id = currentSlide.getAttribute('id');
  state.selectedItems[`step_${id}`] = currentInput.value;
}

const removeCheckedClass = () => {
  quizRadioElements.forEach((slide) => slide.classList.remove('checked'));
}


const validateDeliveryInputs = () => {
  deliveryInputs.forEach((input) => {
    input.addEventListener('change', (e) => {
      const currentInput = e.target;
      if (input.value !== '') {
        state.isSelected = true;
        toggleDisabledAttr();
        const id = currentInput.getAttribute('id');
        deliveryState.selectedValues[`step_${id}`] = currentInput.value;
      }
    })
  })
}

const controlRadioInputs = () => {
  state.isSelected = false;
  slideInputs.forEach((input) => {
    input.checked = false;
    input.addEventListener('change', (e) => {
      const currentInput = e.target;
      const currentSlide = currentInput.closest('[data-quiz-slide]');
      const currentRadioElement = currentInput.closest('[data-quiz-elem]');
      if (currentInput.checked) {
        state.isSelected = true;
        toggleDisabledAttr();
        setSelectedItemsIdToState(currentSlide, currentInput);
        removeCheckedClass();
        currentRadioElement.classList.add('checked');

      }
    })
  })
}

controlRadioInputs();

const showResult = () => {
  const arrFromRes = Object.values(state.selectedItems);

  const checker = (arr, target) => target.every(v => arr.includes(v));

  const collectionToShow = Object.entries(result).filter((key, value) => {
    const [collectionName, coll] = key;
    if (checker(coll, arrFromRes)) return collectionName;
  }).flat()[0]

  resultElements.forEach((elem) => {
    hideElement(elem);
    if (elem.getAttribute('id') === collectionToShow) {
      resultLinkButton.href = elem.dataset.collectionSrc;
      showElement(elem);
      showElement(resultsContainer)
      showElement(resultButtonsContainer)
    }
  })

  console.log('result collection:', collectionToShow);
  console.log('results from each slide:', state.selectedItems);
  console.log('results from delivery slide:', deliveryState.selectedValues)
}


const showNextSlide = () => {
  if (state.currentSlideIndex > quizSlides.length) return;
  const current = quizContainer?.querySelector(`#${state.currentSlideId}`);

  if (state.currentSlideIndex === quizSlides.length) {
    hideElement(quizContainer);
    showResult();
  }

  hideElement(current);
  const nextSlide = current.nextElementSibling;
  const nextSlideId = nextSlide.getAttribute('id');
  showElement(nextSlide)
  state.currentSlideIndex++;
  state.currentSlideId = nextSlideId;
}

const showPrevSlide = () => {
  if (state.currentSlideIndex === 1) return;
  const current = quizContainer?.querySelector(`#${state.currentSlideId}`);
  hideElement(current);
  const prevSlide = current.previousElementSibling;
  const prevSlideId = prevSlide.getAttribute('id');
  showElement(prevSlide)
  state.currentSlideIndex--;
  state.currentSlideId = prevSlideId;

}

const toggleButtons = () => {
  if (state.currentSlideIndex > 1) {
    showElement(buttonBack)
  } else if (state.currentSlideIndex === 1) {
    hideElement(buttonBack)
  }
}


buttonNext.addEventListener('click', () => {
  controlRadioInputs();
  validateDeliveryInputs();
  toggleDisabledAttr();
  showNextSlide();
  toggleButtons();
})

buttonBack.addEventListener('click', () => {
  toggleButtons();
  controlRadioInputs();
  resetDeliveryInputs();
  toggleDisabledAttr();
  showPrevSlide();
})

restartQuizButton.addEventListener('click', () => {
  hideElement(resultsContainer);
  startQuiz();
  resetState();
})
