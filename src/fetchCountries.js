



export default function fetchCountries(country) {
    const BASE_URL = 'https://restcountries.com/v3.1/name';
    const params = 'fields=name,capital,population,flags,languages'
    console.log(`${BASE_URL}/${country}?${params}`);
    return fetch(`${BASE_URL}/${country}?${params}`)
        .then(response => {
            if (!response.ok) {
            throw new Error (`Error: ${response.statusText}`)
            }
            return response.json();
        })
}