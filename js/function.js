import atlas from "./atlas.js";

export const doApi = async (search) => {
    let url = (`https://restcountries.com/v3.1/name/${search}`);
    try {
        let resp = await fetch(url);
        let data = await resp.json();
        createAtlas(data);
    }
    catch (err) {
        console.log(err);
        alert("Unknown country name")
        doApi("israel");
        events(doApi);
    }
}

const selectCountry = document.querySelector("#select_country_id");

const populateCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries = await response.json();
    
    countries.sort((a, b) => {
        const countryA = a.name.common.toLowerCase();
        const countryB = b.name.common.toLowerCase();
        if (countryA < countryB) return -1;
        if (countryA > countryB) return 1;
        return 0;
      });  

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.text = country.name.common;
      selectCountry.appendChild(option);
    });
  } catch (error) {
    console.log(error);
    alert("Failed to fetch countries data.");
  }
};

populateCountries();

const createAtlas = (ar) => {
    document.querySelector("#parent_id").innerHTML = "";
    let country = new atlas("#parent_id", ar[0], fullCountry, doApi);
    country.render();
}

const fullCountry = async (codeCountry) => {
    let url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    let resp = await fetch(url);
    let data = await resp.json();
    data = data.filter(item => item.name.common != "Palestine");
    let fullCountry = await (data[0].name.common);
    return fullCountry;
}

export const events = (doApi) => {
    let input_id = document.querySelector("#input_id")
    let btn_Search = document.querySelector("#btn_Search");
    let ISRAEL = document.querySelector(`#israel_id`);
    ISRAEL.addEventListener("click", () => {
        doApi(ISRAEL.innerHTML);
    })
    let USA = document.querySelector(`#usa_id`);
    USA.addEventListener("click", () => {
        doApi(USA.innerHTML);
    })
    let THAILAND = document.querySelector(`#thailand_id`);
    THAILAND.addEventListener("click", () => {
        doApi(THAILAND.innerHTML);
    })
    let FRANCE = document.querySelector(`#france_id`);
    FRANCE.addEventListener("click", () => {
        doApi(FRANCE.innerHTML);
    })

    input_id.addEventListener("keydown", (e) => {
        if (e.key == 'Enter')
            doApi(input_id.value);
    })
    btn_Search.addEventListener("click", () => {
        doApi(input_id.value);
    })
}

selectCountry.addEventListener("change", () => {
    const selectedCountry = selectCountry.value;
    doApi(selectedCountry);
  });

