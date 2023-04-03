import { View } from "./View.js";

class ClickedCountry extends View {
  card = document.querySelector(".countryCont");
  _parentEl = document.querySelector(".moreDetails");

  addHandlerRender(handler) {
    if (!this.card) return;
    this.card.addEventListener("click", function (e) {
      const card = e.target.closest(".country_link");
      console.log(card);
      handler(card.dataset.country);
    });
  }

  addWindowRender(handler) {
    handler();
  }

  _generateMarkup() {
    return `
    <img src="${this._data.flag}" alt="" />
    <div class="country_detCont_par">
    <div class="country_detCont">
    <div class="details">
        <div>
                  <h1>${this._data.name}</h1>
                  <div class="country_det">
                    <h3>Native Name:</h3>
                    <p>${this._data.nativeName}</p>
                  </div>
                  <div class="country_det">
                    <h3>Region:</h3>
                    <p>${this._data.region}</p>
                  </div>
                  <div class="country_det">
                    <h3>Sub Region:</h3>
                    <p>${this._data.subRegion}</p>
                  </div>
                  <div class="country_det">
                    <h3>Capital:</h3>
                    <p>${this._data.capital}</p>
                  </div>
                </div>
                <div>
                  <div class="country_det">
                    <h3>Top Level Domain:</h3>
                    <p>${this._data.topLevelDomain}</p>
                  </div>
                  <div class="country_det">
                    <h3>Currencies:</h3>
                    <p>${this._data.currency}</p>
                  </div>
                  <div class="country_det">
                    <h3>Languages:</h3>
                    <p>${this._data.languages.join(", ")}</p>
                  </div>
                </div>
              </div>
              <div class="country_det border">
                <h3>Border Countries:</h3>
                <div>
                ${
                  this._data.borders.length === 0
                    ? ""
                    : this._data.borders
                        .map((data) => `     <p class="shadow">${data}</p>`)
                        .join("")
                }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    `;
  }
}

export default new ClickedCountry();
