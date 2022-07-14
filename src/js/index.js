const state = {
  isDay: true,
  petName: "",
  isHatched: false,
  getsHungry: null,
  getsBored: null,
  getsSleepy: null,
  dino: null,
  chaoGif: null,
};

let chaoAnim = document.getElementById("chao");

class Pet {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 0;
    this.boredom = 0;
    this.sleepiness = 0;
  }

  feedMe = () => {
    console.log("I'm HUNGERY!!! Feed me!!");
  };

  hatch = () => {
    chaoAnim.style.backgroundImage =
      "url(./resources/images/hatching-animation-SLOW.gif)";
    console.log(this.name + " has hatched!");
    state.isHatched = true;
    setTimeout(() => {
      chaoAnim.classList.remove("egg");
      chaoAnim.classList.add("idle");
      chaoAnim.style.backgroundImage = "url(./resources/images/chao_idle.gif)";
    }, 6000);
  };
} //end of class

const startButton = document.getElementById("start-button");

const startGame = () => {
  const namePrompt = prompt("Hi, please enter your pet's name: ");
  state.dino = new Pet(namePrompt);
  console.log(`${state.dino.name} has been instantiated`);
  console.log("incubation has started...");
  setTimeout(state.dino.hatch, 2000); //FOR DEBUGGING************
};

startButton.addEventListener("click", startGame);

//find current positions
function getOffset(element) {
  let _x = 0;
  let _y = 0;
  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft - element.scrollLeft;
    _y += element.offsetTop - element.scrollTop;
    element = element.offsetParent;
  }
  return { top: _y, left: _x };
}

const repel = () => {
  const bad = document.getElementById("bad");

  Object.defineProperty(Element.prototype, "documentOffsetTop", {
    get: function () {
      return (
        this.offsetTop +
        (this.offsetParent ? this.offsetParent.documentOffsetTop : 0)
      );
    },
  });

  Object.defineProperty(Element.prototype, "documentOffsetLeft", {
    get: function () {
      return (
        this.offsetLeft +
        (this.offsetParent ? this.offsetParent.documentOffsetLeft : 0)
      );
    },
  });

  let x = bad.documentOffsetLeft;

  console.log(x);

  // let x = getOffset(bad).left;
  // console.log(x);
  bad.classList.toggle("anim3DinoSmack");
  bad.style.left = `${x}px`;
  bad.classList.toggle("anim2");
  setTimeout(() => {
    bad.removeAttribute("class");
  }, 1000);
};
