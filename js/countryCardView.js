import { View } from "./View.js";
class CountryRenderView extends View {
  _parentEl = document.querySelector(".countryCont");
  addHandlerRender() {
    if (!this._parentEl) return;
    this._parentEl.addEventListener("click", function () {
      window.location.pathname = "/moreIndex.html";
    });
  }

  _generateMarkup() {
    return this._data
      .map((data) => {
        return `
   
        <div data-country="${data.name}" class="country__card shadow country_link ">
          <img src="${data.flag}" alt="" />
          <div>
            <h1>${data.name}</h1>
            <div class="country_det">
              <h3>Population:</h3>
              <p>${data.population}</p>
            </div>
            <div class="country_det">
              <h3>Region:</h3>
              <p>${data.region}</p>
            </div>
            <div class="country_det">
              <h3>Capital:</h3>
              <p>${data.capital}</p>
            </div>
          </div>
        </div>
        `;
      })
      .join("");
  }
}

export default new CountryRenderView();
