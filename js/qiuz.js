const buttonContainer = document.querySelector('[data-quiz-controls]');
const buttonNext = buttonContainer?.querySelector('[data-quiz-next]');
const buttonBack = buttonContainer?.querySelector('[data-quiz-back]');
const quizContainer = document.querySelector('[data-quiz-container]');
const quizSlides = document.querySelectorAll('[data-quiz-slide]');
const quizSlidesAmount =quizSlides.length;
const quizRadioElements = document.querySelectorAll('[data-quiz-elem]');
const slideInputs = quizContainer.querySelectorAll('input');

const state = {
  totalSlidesAmount: quizSlidesAmount,
  currentSlideIndex: 1,
  currentSlide: 'one',
  isSelected: false,
  selectedItems: {}
}

const checkSelectedRadio = () => {
  if (!state.isSelected) {
    buttonNext.setAttribute('disabled', 'disabled');
    buttonNext.classList.add('btn-disabled');
  } else {
    buttonNext.removeAttribute('disabled');
    buttonNext.classList.remove('btn-disabled');
  }
}

checkSelectedRadio();

const hideSlide = (slide) => {
  slide.classList.add('d-none');
}

const selectInput = (currentSlide, currentInput) => {
  const id = currentSlide.getAttribute('id');
  state.selectedItems[`step_${id}`] = currentInput.value;
}

const removeCheckedClass = () => {
  quizRadioElements.forEach((slide) => slide.classList.remove('checked'));
}

slideInputs.forEach((input) => {
  input.addEventListener('change', (e) => {
    const currentInput = e.target;
    const currentSlide = currentInput.closest('[data-quiz-slide]');
    const currentRadioElement = currentInput.closest('[data-quiz-elem]');
    if (currentInput.checked) {
      state.isSelected = true;
      checkSelectedRadio();
      selectInput(currentSlide, currentInput);
      removeCheckedClass();
      currentRadioElement.classList.add('checked');
      console.log(state.selectedItems)
    }
  })
})

const showNextSlide = () => {
  const current = quizContainer?.querySelector(`#${state.currentSlide}`);
  hideSlide(current);
  const nextSlide = current.nextElementSibling;
  const nextSlideId = nextSlide.getAttribute('id');
  nextSlide.classList.remove('d-none');
  state.currentSlideIndex++;
  state.currentSlide = nextSlideId;
}

const showPrevSlide = () => {
  if (state.currentSlideIndex === 1) return;
  const current = quizContainer?.querySelector(`#${state.currentSlide}`);
  hideSlide(current);
  const prevSlide = current.previousElementSibling;
  const prevSlideId = prevSlide.getAttribute('id');
  prevSlide.classList.remove('d-none');
  state.currentSlideIndex--;
  state.currentSlide = prevSlideId;

}


const toggleButtons = () => {
  if (state.currentSlideIndex > 1) {
    buttonBack.classList.remove('d-none');
  } else if (state.currentSlideIndex === 1) {
    buttonBack.classList.add('d-none');
  }
}


buttonNext.addEventListener('click', () => {
  checkSelectedRadio();
  showNextSlide();
  toggleButtons();
})

buttonBack.addEventListener('click', () => {
  showPrevSlide();
  toggleButtons();
})
