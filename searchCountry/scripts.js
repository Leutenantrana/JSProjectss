let inputName = document.querySelector('.search');
let countryDetails = document.querySelector('.countryForm')
let countryArr = [];
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        console.log(response)
        const data = await response.json();
        countryArr.push(...data)
    } catch (error) {
        console.log(error.message)
    }
}

function findCountry(countryName) {
    let country = countryArr.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()));
    // console.log(`firstone ${country}`)
    const nameToSearch = countryName.toLowerCase();
    return countryArr.filter(country => country.name.common.toLowerCase().includes(nameToSearch));




}

async function displayMatches() {
    if (countryArr.length === 0) {
        await fetchCountries();
    }

    const countries = findCountry(this.value);
    console.log(countries)


    if (countries.length === 0) {
        countryDetails.innerHTML = '<p>No matching countries found</p>';
        return;
    }


    const html = countries.map(country => {
        const countryName = country.name.common;
        const countryCapital = country.capital ? country.capital[0] : 'N/A';
        const flag = country.flags.png;
        const population = country.population;

        return `

            <div class="countryCard">
                <p class="name">Country: <span class="hl">${countryName}</span></p>
                <img src="${flag}" alt="Flag of ${countryName}">
                <p>Capital: <span class="hl">${countryCapital}</span></p>
                <p>Population: <span class="hl">${population.toLocaleString()}</span></p>
            </div>

        `;
    }).join('');

    countryDetails.innerHTML = html;


}
inputName.addEventListener('input', displayMatches);