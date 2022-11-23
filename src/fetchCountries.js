const URL_NAME = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages'

export function fetchCountries(name) {
    return fetch(`${URL_NAME}${name}?fields=${FIELDS}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
        return response.json()
    })
}



