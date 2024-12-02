class IMGCarousel {
  #active = 0;
  constructor(carouselCont, imgWidth, imgNodes, navBtns) {
    this.carouselCont = carouselCont;
    this.imgWidth = imgWidth;
    this.imgNodes = imgNodes;
    this.navBtns = navBtns;
  }
  addListeners() {
    next.addEventListener('click', () => {
      this.shiftImage(this.#active + 1);
    });
    before.addEventListener('click', () => {
      this.shiftImage(this.#active - 1);
    });

    let intervalId = setInterval(() => {
      this.shiftImage(this.#active + 1);
    }, 5000);

    this.navBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        let par = e.target.parentElement;
        let child = e.target;
        let i = this.getindexOfNodeChild(par, child);
        this.jumpTo(i);
      });
    });
  }

  getindexOfNodeChild(parent, child) {
    return Array.from(parent.children).indexOf(child);
  }
  makeNavBtnActive(i) {
    this.navBtns.forEach((btn) => btn.classList.remove('active'));
    this.navBtns[i].classList.add('active');
  }

  jumpTo(i) {
    this.#active = i;
    this.carouselCont.style.marginLeft = this.#active * -this.imgWidth + 'px';
    this.makeNavBtnActive(this.#active);
  }

  // dir is 1 for next and -1 for previous
  shiftImage(newActive) {
    this.#active = newActive;
    if (this.#active < 0) this.#active = this.imgNodes.length - 1;
    if (this.#active > this.imgNodes.length - 1) this.#active = 0;
    this.carouselCont.style.marginLeft = this.#active * -this.imgWidth + 'px';

    this.makeNavBtnActive(this.#active);
  }
}
module.exports(IMGCarousel);
