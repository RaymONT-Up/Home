(() => {
  const wrapper = document.querySelector("#jsWrapper");
  const IMAGE_NUMBER = 9;

  function showImage(number) {
    const bgImage = document.querySelector(".bgImage");
    bgImage.src = `images/bg-img(${number + 1}).jpg`;
  }
  function getRandom() {
    let generateRandomNumber = Math.floor(Math.random() * IMAGE_NUMBER);
    return generateRandomNumber;
  }
  function init() {
    const randomNumber = getRandom();
    showImage(randomNumber);
  }
  init();
})();
