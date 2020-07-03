var VISUALLY_HIDDEN = "visually-hidden";
var SHOW = "popup-show";
var ERROR = "popup-error";

var openFeedbackPopupButton = document.querySelector(".contacts__feedback-btn");
var feedbackPopup = document.querySelector(".feedback-popup");
var feedbackPopupWrapper = document.querySelector(".feedback-popup__wrapper");
var feedbackForm = document.querySelector(".feedback-popup__form");
var closeFeedbackPopupButton = document.querySelector(".feedback-popup__close-btn");
var feedbackInputName = document.querySelector(".feedback-popup__input--name");
var feedbackInputSubject = document.querySelector(".feedback-popup__input--subject");
var feedbackInputText = document.querySelector(".feedback-popup__textarea");
var feedbackSubmitButton = document.querySelector(".feedback-popup__submit-btn");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("name-lastname");
} catch (err) {
  isStorageSupport = false;
}

var closeFeedbackPopupButtonClickHandler = function () {
  feedbackPopup.classList.add(VISUALLY_HIDDEN);
  feedbackPopupWrapper.classList.remove(SHOW);

  closeFeedbackPopupButton.setAttribute("tabindex", -1);
  feedbackInputName.setAttribute("tabindex", -1);
  feedbackInputSubject.setAttribute("tabindex", -1);
  feedbackInputText.setAttribute("tabindex", -1);
  feedbackSubmitButton.setAttribute("tabindex", -1);

  openFeedbackPopupButton.focus();
  closeFeedbackPopupButton.removeEventListener("click", closeFeedbackPopupButtonClickHandler);
  feedbackSubmitButton.removeEventListener("click", feedbackSubmitButtonClickHandler);
};

var feedbackSubmitButtonClickHandler = function (evt) {
  evt.preventDefault();
  if (feedbackInputName.value && feedbackInputSubject.value && feedbackInputText.value) {
    if (isStorageSupport) {
      localStorage.setItem("name-lastname", feedbackInputName.value);
      localStorage.setItem("subject", feedbackInputSubject.value);
    }
    feedbackForm.submit();
  } else {
    feedbackPopupWrapper.classList.remove(ERROR);
    feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
    feedbackPopupWrapper.classList.add(ERROR);
  }
};

openFeedbackPopupButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  feedbackPopup.classList.remove(VISUALLY_HIDDEN);
  feedbackPopupWrapper.classList.add(SHOW);
  if (isStorageSupport) {
    feedbackInputName.value = localStorage.getItem("name-lastname");
    feedbackInputSubject.value = localStorage.getItem("subject");
  }

  closeFeedbackPopupButton.setAttribute("tabindex", 0);
  feedbackInputName.setAttribute("tabindex", 0);
  feedbackInputSubject.setAttribute("tabindex", 0);
  feedbackInputText.setAttribute("tabindex", 0);
  feedbackSubmitButton.setAttribute("tabindex", 0);

  feedbackSubmitButton.addEventListener("click", feedbackSubmitButtonClickHandler);
  closeFeedbackPopupButton.addEventListener("click", closeFeedbackPopupButtonClickHandler);
});

ymaps.ready(function () {
  var myMap = new ymaps.Map(
      document.querySelector(".map"),
      {
        center: [59.93895, 30.32625],
        zoom: 17,
      },
      {
        searchControlProvider: "yandex#search",
      }
    ),
    myPlacemarkWithContent = new ymaps.Placemark(
      [59.938549, 30.32301],
      {},
      {
        iconLayout: "default#imageWithContent",
        iconImageHref: "img/pin.svg",
        iconImageSize: [80, 140],
        iconImageOffset: [-34, -150],
      }
    );

  myMap.geoObjects.add(myPlacemarkWithContent);
});
