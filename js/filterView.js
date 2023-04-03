import { View } from "./View.js";

class FilterView {
  _parentEL = document.querySelector(".country__opt");
  addHandlerRender(handler) {
    if (!this._parentEL) return;
    this._parentEL.addEventListener("change", function () {
      handler(this.value);
    });
  }
}

export default new FilterView();
