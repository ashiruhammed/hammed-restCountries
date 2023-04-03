import { getJSON } from "./helper.js";
import { API_URL, BORDER_API_URL } from "./config.js";
import { async } from "regenerator-runtime/runtime";

const commaNumber = require("comma-number");

export const state = {
  nightMode: false,
  results: [],
};

const setBorder = async function (datas) {
  try {
    const stateData = datas.map(async (data) => {
      const border = await getJSON(`${BORDER_API_URL}${data}`);
      return border;
    });
    const borderArr = await Promise.all(stateData);
    return borderArr.map((data) => Object.values(data[0])[0].common);
  } catch (err) {
    throw err;
  }
};

const setResults = async function (data) {
  return state.results.push({
    population: commaNumber(data.population),
    borders:
      Object.values(data.borders).length > 3
        ? Object.values(data.borders).splice(0, 3)
        : Object.values(data.borders),
    capital: data.capital[0] ? data.capital[0] : "No capital",
    currency: Object.values(data.currencies)[0]
      ? Object.values(data.currencies)[0].name
      : "No Currency",
    nativeName: Object.values(data.name)[1],
    name: data.name.common,
    flag: data.flags.svg,
    region: data.region,
    subRegion: data.subregion,
    topLevelDomain: data.tld,
    languages:
      Object.values(data.languages).length > 3
        ? Object.values(data.languages).splice(0, 3)
        : Object.values(data.languages),
  });
};

export const loadData = async function () {
  try {
    const data = await getJSON(API_URL);

    data.forEach((data) => {
      setResults(data);
    });
    console.log(state);
  } catch (err) {
    throw err;
  }
};

export const setDayMode = function () {
  state.nightMode = false;
  localStorage.setItem("mode", JSON.stringify(state.nightMode));
};

export const setNightMode = function () {
  state.nightMode = true;
  localStorage.setItem("mode", JSON.stringify(state.nightMode));
};

export const loadMode = function () {
  state.nightMode = JSON.parse(localStorage.getItem("mode"));
};

export const loadFilter = function (data) {
  const filter = state.results.filter((res) => res.region === data);
  state.filterResults = filter;
};

export const loadSearch = function (data) {
  const search = state.filterResults
    ? state.filterResults.filter((res) =>
        res.name.toLowerCase().includes(data.toLowerCase())
      )
    : state.results.filter((res) =>
        res.name.toLowerCase().includes(data.toLowerCase())
      );

  state.searchResults = search;
};

export const setClickedCountry = (data) => {
  state.clickedCountry = state.results.filter((res) => res.name === data);
  console.log(state.clickedCountry);
  localStorage.setItem("clickedCountry", JSON.stringify(state.clickedCountry));
};

export const getClickedCountry = async function () {
  try {
    state.clickedCountry = JSON.parse(localStorage.getItem("clickedCountry"));

    state.clickedborders =
      state.clickedCountry[0].borders.length == 0
        ? state.clickedCountry[0].borders
        : await setBorder(state.clickedCountry[0].borders);
  } catch (err) {
    throw err;
  }
};
