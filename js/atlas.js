export default class atlas {
    constructor(parent, item, fullCountry, doApi) {
        this.parent = parent;
        this.name = item.name.common;
        this.flag = item.flags.svg;
        this.pop = item.population.toLocaleString();
        this.region = item.region;
        this.languages = Object.keys(item.languages);
        this.coin = Object.keys(item.currencies);
        this.coinDesc = Object.values(item.currencies)[0].name;
        this.capital = item.capital;
        this.map = item.latlng;
        this.borders = item.borders;
        this.doApi = doApi;
        this.fullCountry = fullCountry;
    }

    render() {
        let div = document.createElement("div");
        div.className = "col-md-8 mx-auto p-4 border shadow overflow-hidden";
        div.style = "background: rgba(255, 255, 255, 0.5);}"
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <img src="${this.flag}" alt="${this.name}" class="w-50 float-end ms-4">
        <h2>${this.name}</h2>
        <div>POP: ${this.pop} </div>
        <div>Region: ${this.region}</div>
        <div>Languages: ${this.languages}</div>
        <div>Coin:  ${this.coin}, ${this.coinDesc}</div>
        <div>Capital: ${this.capital}</div>
        <div class="mt-3 "><strong>States with borders:</strong><br>
        <div class="borders"></div>
        </div>
        
        <iframe class="mt-4 col-12" height="400" 
        src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" 
        frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
       `

        let borders = div.querySelector(".borders");
        this.borders.forEach(async (item) => {
            let a = document.createElement("a");
            a.innerHTML = await this.fullCountry(item) + " ";
            a.style = "color: blue; cursor: pointer; "
            borders.append(a);
            a.addEventListener("click", () => {
                this.doApi(a.innerHTML);
            })
        })
    }
}