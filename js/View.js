export class View {
  _data;
  render(data) {
    if (!data) return;
    if (!this._parentEl) return;
    this._data = data;

    const markup = this._generateMarkup();
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
  _renderError(data) {
    const markup = `
    <div class="error">
        <p>
        ${data}.
        <a class="error_link" href="">Please try again later</a>
        </p>
        </div>
  `;
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }
}
