import { View } from "./View.js";
import nightIcon from "url:../icons/moon-filled.svg";
import icon from "url:../icons/moon.svg";

class modeView extends View {
  _parentEl = document.querySelector(".mode");
  _bodyEl = document.querySelector("body");
  _shadowEl = Array.from(document.querySelectorAll(".shadow"));
  _countryCard = document.querySelectorAll(".country_link");

  addWindowRender(handler) {
    handler();
    if (this._data.nightMode) {
      this._bodyEl.classList.add("nightMode");

      this._countryCard.forEach((el) => el.classList.toggle("lightMode"));
      this._shadowEl.forEach((el) => {
        el.classList.toggle("shadow");
        el.classList.toggle("nightMode-shadow");
      });
    } else return;
  }

  addHandlerRender(handler) {
    this._parentEl.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest("img");
        if (!btn) return;
        this._bodyEl.classList.toggle("nightMode");
        this._countryCard.forEach((el) => el.classList.toggle("lightMode"));
        this._shadowEl.forEach((el) => {
          el.classList.toggle("shadow");
        });
        handler();
      }.bind(this)
    );
  }

  _generateMarkup() {
    return `<img class="${
      this._data.nightMode ? "hide" : ""
    }" src="${icon}" alt="" />
    <img class="${
      this._data.nightMode ? "" : "hide"
    }" src="${nightIcon}" alt="" />
    <h3>Dark mode</h3>
    `;
  }
}

export default new modeView();
