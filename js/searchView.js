class SearchView {
  _parentEl = document.querySelector("input");

  addHandlerRender(handler) {
    if (!this._parentEl) return;
    this._parentEl.addEventListener("input", function (e) {
      handler(this.value);
    });
  }
}

export default new SearchView();
