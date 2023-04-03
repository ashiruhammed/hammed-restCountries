// import
import * as model from "./model.js";
import { async } from "regenerator-runtime/runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import modeView from "./modeView.js";

import filterView from "./filterView.js";
import countryCardView from "./countryCardView.js";
import searchView from "./searchView.js";
import clickedCountry from "./clickedCountry.js";

const controlMode = function () {
  if (model.state.nightMode) {
    model.setDayMode();
  } else {
    model.setNightMode();
  }
  modeView.render(model.state);
};

const controlData = async function () {
  try {
    if (window.location.pathname === "/moreIndex.html") return;
    const data = await model.loadData();
    countryCardView.render(model.state.results);
  } catch (err) {
    countryCardView._renderError(err);
  }
};

const controlLoad = function () {
  model.loadMode();
  modeView.render(model.state);
};

const controlFilter = function (data) {
  model.loadFilter(data);
  countryCardView.render(model.state.filterResults);
};

const controlSearch = function (data) {
  model.loadSearch(data);
  countryCardView.render(model.state.searchResults);
};

const controlClick = function (data) {
  model.setClickedCountry(data);
};

const controlClickLoad = async function () {
  try {
    if (!window.location.pathname.includes("/more")) return;
    await model.getClickedCountry();
    model.state.clickedCountry[0].borders = model.state.clickedborders;

    clickedCountry.render(model.state.clickedCountry[0]);
    console.log(model);
  } catch (err) {
    clickedCountry._renderError(err);
  }
};

const init = function () {
  modeView.render(model.state);

  controlData();
  modeView.addHandlerRender(controlMode);
  modeView.addWindowRender(controlLoad);
  filterView.addHandlerRender(controlFilter);
  searchView.addHandlerRender(controlSearch);
  clickedCountry.addHandlerRender(controlClick);
  clickedCountry.addWindowRender(controlClickLoad);
  countryCardView.addHandlerRender();
};

init();
